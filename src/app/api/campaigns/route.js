import { supabase } from "@/app/utils/supabaseClient";

// GET /api/campaigns - List all campaigns with aggregated metrics
export async function GET(req) {
  try {
    const { data: campaigns, error } = await supabase
      .from("campaigns")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, campaigns }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET /api/campaigns error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// POST /api/campaigns - Create a new campaign and bulk insert recipients (filtering out suppressed emails)
export async function POST(req) {
  try {
    const { name, subject, template_html, recipients } = await req.json();

    if (!name || !subject || !template_html || !recipients || !Array.isArray(recipients)) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 1. Fetch all suppressed emails to filter them out
    const { data: suppressions, error: supError } = await supabase
      .from("email_suppressions")
      .select("email");

    if (supError) throw supError;
    const suppressedSet = new Set(suppressions.map((s) => s.email.toLowerCase()));

    // 2. Validate and filter recipients
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validFilteredRecipients = recipients
      .filter((r) => {
        const email = r.email?.trim().toLowerCase();
        return email && emailRegex.test(email) && !suppressedSet.has(email);
      })
      .map((r) => ({
        email: r.email.trim().toLowerCase(),
        metadata: r.metadata || {},
        status: "pending",
      }));

    // 3. Create campaign in the database
    const { data: campaign, error: campaignError } = await supabase
      .from("campaigns")
      .insert([
        {
          name,
          subject,
          template_html,
          status: "draft",
          total_recipients: validFilteredRecipients.length,
        },
      ])
      .select()
      .single();

    if (campaignError) throw campaignError;

    // 4. Bulk insert recipients linked to the campaign
    if (validFilteredRecipients.length > 0) {
      const dbRecipients = validFilteredRecipients.map((r) => ({
        campaign_id: campaign.id,
        email: r.email,
        metadata: r.metadata,
        status: r.status,
      }));

      const { error: recError } = await supabase
        .from("campaign_recipients")
        .insert(dbRecipients);

      if (recError) {
        // Rollback campaign insertion if recipient insertion fails
        await supabase.from("campaigns").delete().eq("id", campaign.id);
        throw recError;
      }
    }

    return new Response(JSON.stringify({ success: true, campaign }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("POST /api/campaigns error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
