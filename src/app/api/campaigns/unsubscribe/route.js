import { supabase } from "@/app/utils/supabaseClient";

// GET /api/campaigns/unsubscribe - Handles unsubscribe links from emails
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return new Response("Missing email parameter", { status: 400 });
    }

    // 1. Add email to suppressions table
    const { error } = await supabase
      .from("email_suppressions")
      .upsert([{ email: email.toLowerCase(), reason: "unsubscribe" }], {
        onConflict: "email",
      });

    if (error) throw error;

    // 2. Return a simple, clean, branded unsubscribe confirmation HTML page
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsubscribed | Gearters Sports</title>
  <style>
    body { font-family: sans-serif; background-color: #000000; color: #ffffff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; padding: 20px; text-align: center; }
    .card { background-color: #0b0b0b; border: 2px solid #FCA600; padding: 40px; border-radius: 12px; max-width: 400px; box-shadow: 0 4px 20px rgba(252, 166, 0, 0.15); }
    h1 { color: #FCA600; font-size: 28px; margin-bottom: 20px; font-weight: bold; }
    p { color: #aaaaaa; font-size: 15px; line-height: 1.6; margin-bottom: 30px; }
    .logo { max-width: 120px; margin-bottom: 30px; }
    .badge { border: 1px solid #555; padding: 6px 12px; font-size: 13px; border-radius: 20px; color: #888; display: inline-block; }
  </style>
</head>
<body>
  <div class="card">
    <img src="https://gearterssports.com/logo.svg" alt="Gearters Sports" class="logo">
    <h1>Unsubscribed</h1>
    <p>You have successfully unsubscribed from Gearters Sports campaigns. You will no longer receive marketing emails or news updates from us at <strong>${email}</strong>.</p>
    <div class="badge">Unsubscribed Successfully</div>
  </div>
</body>
</html>
`;

    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return new Response("An error occurred while unsubscribing.", { status: 500 });
  }
}
