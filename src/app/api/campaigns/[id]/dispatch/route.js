import { supabase } from "@/app/utils/supabaseClient";
import { Resend } from "resend";
import { compileTemplate } from "@/app/utils/emailTemplates";

const resend = new Resend(process.env.RESEND_API_KEY);

// GET /api/campaigns/[id]/dispatch - Get campaign details and its recipients
export async function GET(req, { params }) {
  try {
    const { id } = await params;

    // 1. Fetch Campaign
    const { data: campaign, error: cError } = await supabase
      .from("campaigns")
      .select("*")
      .eq("id", id)
      .single();

    if (cError) throw cError;

    // 2. Fetch Recipients (supports status filtering or basic limit)
    const { data: recipients, error: rError } = await supabase
      .from("campaign_recipients")
      .select("*")
      .eq("campaign_id", id)
      .order("created_at", { ascending: true });

    if (rError) throw rError;

    // 3. Active Poll: Query Resend for any non-terminal emails to sync status (helps with local testing when webhooks aren't setup)
    const pollCandidates = recipients
      .filter((r) => r.resend_email_id && ["sent", "delivered"].includes(r.status))
      .slice(0, 15);

    let updatedAny = false;

    if (pollCandidates.length > 0) {
      for (const rec of pollCandidates) {
        try {
          const resendResponse = await resend.emails.get(rec.resend_email_id);
          const resendData = resendResponse.data;

          if (resendData && resendData.status && resendData.status !== rec.status) {
            const newStatus = resendData.status;
            let updates = { status: newStatus };

            if (newStatus === "delivered") {
              updates.delivered_at = new Date().toISOString();
              const { error: rpcErr } = await supabase.rpc("increment_campaign_delivered_count", { campaign_id_param: id });
              if (rpcErr) {
                const { data: c } = await supabase.from("campaigns").select("delivered_count").eq("id", id).single();
                await supabase.from("campaigns").update({ delivered_count: (c?.delivered_count || 0) + 1 }).eq("id", id);
              }
            } else if (newStatus === "opened") {
              updates.opened_at = new Date().toISOString();
              const { error: rpcErr } = await supabase.rpc("increment_campaign_opened_count", { campaign_id_param: id });
              if (rpcErr) {
                const { data: c } = await supabase.from("campaigns").select("opened_count").eq("id", id).single();
                await supabase.from("campaigns").update({ opened_count: (c?.opened_count || 0) + 1 }).eq("id", id);
              }
            } else if (newStatus === "bounced") {
              updates.bounced_at = new Date().toISOString();
              await supabase
                .from("email_suppressions")
                .upsert([{ email: rec.email.toLowerCase(), reason: "bounce" }], { onConflict: "email" });
              const { error: rpcErr } = await supabase.rpc("increment_campaign_bounced_count", { campaign_id_param: id });
              if (rpcErr) {
                const { data: c } = await supabase.from("campaigns").select("bounced_count").eq("id", id).single();
                await supabase.from("campaigns").update({ bounced_count: (c?.bounced_count || 0) + 1 }).eq("id", id);
              }
            }

            await supabase.from("campaign_recipients").update(updates).eq("id", rec.id);

            // Update local memory reference
            rec.status = newStatus;
            if (updates.delivered_at) rec.delivered_at = updates.delivered_at;
            if (updates.opened_at) rec.opened_at = updates.opened_at;
            if (updates.bounced_at) rec.bounced_at = updates.bounced_at;
            
            updatedAny = true;
          }
        } catch (pollErr) {
          console.error(`Failed to poll status for recipient ${rec.email}:`, pollErr.message);
        }
      }
    }

    // Re-fetch campaign metrics if we updated any recipient status
    let finalCampaign = campaign;
    if (updatedAny) {
      const { data: refreshedCampaign } = await supabase
        .from("campaigns")
        .select("*")
        .eq("id", id)
        .single();
      if (refreshedCampaign) finalCampaign = refreshedCampaign;
    }

    return new Response(JSON.stringify({ success: true, campaign: finalCampaign, recipients }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET /api/campaigns/[id]/dispatch error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// POST /api/campaigns/[id]/dispatch - Control sending actions
export async function POST(req, { params }) {
  try {
    const { id } = await params;
    const { action, recipientId } = await req.json();

    if (!action) {
      return new Response(JSON.stringify({ error: "Action is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 1. Fetch Campaign Info
    const { data: campaign, error: cError } = await supabase
      .from("campaigns")
      .select("*")
      .eq("id", id)
      .single();

    if (cError) throw cError;

    // 2. Handle Pause Campaign
    if (action === "pause") {
      const { error: updateError } = await supabase
        .from("campaigns")
        .update({ status: "paused" })
        .eq("id", id);

      if (updateError) throw updateError;

      return new Response(JSON.stringify({ success: true, status: "paused" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 3. Handle Single Recipient Retry
    if (action === "retry" && recipientId) {
      const { data: recipient, error: recError } = await supabase
        .from("campaign_recipients")
        .select("*")
        .eq("id", recipientId)
        .single();

      if (recError) throw recError;

      // Compile content
      const htmlContent = compileTemplate(campaign.template_html, recipient);

      try {
        const { data: sendData, error: sendError } = await resend.emails.send({
          from: "info@gearterssports.com",
          to: recipient.email,
          subject: campaign.subject,
          html: htmlContent,
        });

        if (sendError || !sendData?.id) {
          throw new Error(sendError?.message || "Failed to dispatch email");
        }

        // Update recipient
        await supabase
          .from("campaign_recipients")
          .update({
            status: "sent",
            resend_email_id: sendData.id,
            error_message: null,
            sent_at: new Date().toISOString(),
          })
          .eq("id", recipientId);

        // Update campaign count
        const { error: countError } = await supabase.rpc("increment_campaign_sent_count", { campaign_id_param: id });
        if (countError) {
          const newSentCount = (campaign.sent_count || 0) + 1;
          await supabase
            .from("campaigns")
            .update({ sent_count: newSentCount })
            .eq("id", id);
        }

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        await supabase
          .from("campaign_recipients")
          .update({
            status: "failed",
            error_message: err.message,
          })
          .eq("id", recipientId);

        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // 4. Handle Batch Sending Chunk (action = 'send_batch')
    if (action === "send_batch") {
      // Find up to 100 recipients with pending or failed status
      const { data: recipients, error: fetchError } = await supabase
        .from("campaign_recipients")
        .select("*")
        .eq("campaign_id", id)
        .in("status", ["pending", "failed"])
        .order("created_at", { ascending: true })
        .limit(100);

      if (fetchError) throw fetchError;

      if (!recipients || recipients.length === 0) {
        // No more recipients to process, mark campaign as completed
        await supabase
          .from("campaigns")
          .update({ status: "completed" })
          .eq("id", id);

        return new Response(JSON.stringify({ success: true, completed: true, sent_in_batch: 0 }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Update campaign status to processing
      await supabase
        .from("campaigns")
        .update({ status: "processing" })
        .eq("id", id);

      // Prepare batch emails
      const batchPayload = recipients.map((r) => ({
        from: "info@gearterssports.com",
        to: r.email,
        subject: campaign.subject,
        html: compileTemplate(campaign.template_html, r),
      }));

      console.log("Resend API Key loaded:", process.env.RESEND_API_KEY ? `${process.env.RESEND_API_KEY.substring(0, 7)}...` : "NOT FOUND");
      console.log("Preparing Resend Batch Send. Recipient count:", batchPayload.length);
      console.log("Batch Payload Sample (first recipient):", JSON.stringify(batchPayload[0] || {}));

      const resendResponse = await resend.batch.send(batchPayload);

      console.log("Resend API Response:", JSON.stringify(resendResponse));

      // Process batch response
      const resendDataList = resendResponse.data?.data || [];
      const resendError = resendResponse.error;

      if (resendError) {
        console.error("Resend Batch Send Error:", resendError);
        // If Resend failed the entire batch
        const errorMsg = resendError.message || "Resend batch send failure";
        const recipientIds = recipients.map((r) => r.id);
        
        await supabase
          .from("campaign_recipients")
          .update({
            status: "failed",
            error_message: errorMsg,
          })
          .in("id", recipientIds);

        return new Response(JSON.stringify({ error: errorMsg }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Track how many emails were successfully pushed to Resend in this batch
      let sentCount = 0;

      for (let i = 0; i < recipients.length; i++) {
        const recipient = recipients[i];
        const resendItem = resendDataList[i];

        if (resendItem && resendItem.id) {
          await supabase
            .from("campaign_recipients")
            .update({
              status: "sent",
              resend_email_id: resendItem.id,
              error_message: null,
              sent_at: new Date().toISOString(),
            })
            .eq("id", recipient.id);

          sentCount++;
        } else {
          // If a specific item in the batch failed
          const errorMsg = resendItem?.error?.message || "Individual item batch dispatch failed";
          await supabase
            .from("campaign_recipients")
            .update({
              status: "failed",
              error_message: errorMsg,
            })
            .eq("id", recipient.id);
        }
      }

      // Update metrics on campaigns table: increment sent count
      if (sentCount > 0) {
        // Update campaigns count
        const { data: updatedCampaign, error: countError } = await supabase
          .rpc("increment_campaign_sent_count_by", { 
            campaign_id_param: id,
            increment_by: sentCount
          });
        
        // Fallback: If trigger/RPC is not loaded yet, update manually
        if (countError) {
          const newSentCount = (campaign.sent_count || 0) + sentCount;
          await supabase
            .from("campaigns")
            .update({ sent_count: newSentCount })
            .eq("id", id);
        }
      }

      // Check if there are any remaining recipients to send to
      const { count: remainingCount, error: countError } = await supabase
        .from("campaign_recipients")
        .select("*", { count: "exact", head: true })
        .eq("campaign_id", id)
        .in("status", ["pending", "failed"]);

      let isFinished = false;
      if (!countError && remainingCount === 0) {
        await supabase
          .from("campaigns")
          .update({ status: "completed" })
          .eq("id", id);
        isFinished = true;
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          completed: isFinished, 
          sent_in_batch: sentCount,
          remaining: remainingCount || 0
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("POST /api/campaigns/[id]/dispatch error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
