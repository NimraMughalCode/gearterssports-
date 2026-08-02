import { supabase } from "@/app/utils/supabaseClient";

// POST /api/campaigns/webhooks/resend - Resend webhook listener
export async function POST(req) {
  try {
    const payload = await req.json();
    
    // Log the incoming webhook event
    console.log("Resend Webhook Event received:", payload.type, payload.data?.email_id || payload.data?.id);

    const { type, data } = payload;

    if (!type || !data) {
      return new Response(JSON.stringify({ error: "Invalid webhook payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Resend email ID is in data.email_id or data.id depending on payload type
    const resendEmailId = data.email_id || data.id;

    if (!resendEmailId) {
      return new Response(JSON.stringify({ error: "Missing email identifier" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 1. Fetch recipient from database by the Resend email id
    const { data: recipient, error: fetchError } = await supabase
      .from("campaign_recipients")
      .select("*")
      .eq("resend_email_id", resendEmailId)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (!recipient) {
      // Return 200 to acknowledge receipt (the email might be a transactional sign-up email not tied to a campaign)
      return new Response(JSON.stringify({ message: "Email not tracked as campaign recipient" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const campaignId = recipient.campaign_id;
    let updates = {};

    // 2. Map Resend webhook events to statuses
    if (type === "email.sent") {
      updates = { 
        status: "sent", 
        sent_at: new Date().toISOString() 
      };
    } 
    else if (type === "email.delivered") {
      updates = { 
        status: "delivered", 
        delivered_at: new Date().toISOString() 
      };

      // Increment delivered count on campaign (avoid double counting)
      if (recipient.status !== "delivered" && recipient.status !== "opened" && recipient.status !== "clicked") {
        const { error: rpcError } = await supabase.rpc("increment_campaign_delivered_count", { campaign_id_param: campaignId });
        if (rpcError) {
          // Fallback to manual increment if RPC is missing
          const { data: campaign } = await supabase.from("campaigns").select("delivered_count").eq("id", campaignId).single();
          await supabase.from("campaigns").update({ delivered_count: (campaign?.delivered_count || 0) + 1 }).eq("id", campaignId);
        }
      }
    } 
    else if (type === "email.opened") {
      updates = { 
        status: "opened", 
        opened_at: new Date().toISOString() 
      };

      // Increment opened count on campaign (avoid double counting)
      if (recipient.status !== "opened" && recipient.status !== "clicked") {
        const { error: rpcError } = await supabase.rpc("increment_campaign_opened_count", { campaign_id_param: campaignId });
        if (rpcError) {
          // Fallback to manual increment if RPC is missing
          const { data: campaign } = await supabase.from("campaigns").select("opened_count").eq("id", campaignId).single();
          await supabase.from("campaigns").update({ opened_count: (campaign?.opened_count || 0) + 1 }).eq("id", campaignId);
        }
      }
    } 
    else if (type === "email.clicked") {
      updates = { 
        status: "clicked" 
      };
    } 
    else if (type === "email.bounced") {
      updates = { 
        status: "bounced", 
        bounced_at: new Date().toISOString() 
      };

      // Automatically add recipient to email_suppressions list
      await supabase
        .from("email_suppressions")
        .upsert([{ email: recipient.email.toLowerCase(), reason: "bounce" }], {
          onConflict: "email"
        });

      // Increment bounced count on campaign (avoid double counting)
      if (recipient.status !== "bounced") {
        const { error: rpcError } = await supabase.rpc("increment_campaign_bounced_count", { campaign_id_param: campaignId });
        if (rpcError) {
          // Fallback to manual increment if RPC is missing
          const { data: campaign } = await supabase.from("campaigns").select("bounced_count").eq("id", campaignId).single();
          await supabase.from("campaigns").update({ bounced_count: (campaign?.bounced_count || 0) + 1 }).eq("id", campaignId);
        }
      }
    } 
    else if (type === "email.complained") {
      updates = { 
        status: "complained" 
      };

      // Automatically add recipient to suppressions list
      await supabase
        .from("email_suppressions")
        .upsert([{ email: recipient.email.toLowerCase(), reason: "complaint" }], {
          onConflict: "email"
        });
    }

    // 3. Apply updates to the campaign_recipient record
    if (Object.keys(updates).length > 0) {
      const { error: updateError } = await supabase
        .from("campaign_recipients")
        .update(updates)
        .eq("id", recipient.id);

      if (updateError) throw updateError;
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("POST /api/campaigns/webhooks/resend error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
