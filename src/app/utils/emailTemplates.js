// Utility file defining predefined, high-quality, responsive HTML email templates for Gearters Sports.

export const templates = [
  {
    id: "newsletter",
    name: "Newsletter / Announcement",
    description: "Clean layout with header, body content, custom CTA button, and promotional image.",
    getHtml: (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.subject || "Gearters Sports Update"}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
    .header { background-color: #000000; padding: 30px 20px; text-align: center; border-bottom: 3px solid #FCA600; }
    .logo { max-width: 140px; height: auto; }
    .content { padding: 40px 30px; text-align: left; line-height: 1.6; color: #333333; }
    .greeting { font-size: 20px; font-weight: 700; margin-bottom: 20px; color: #000000; }
    .paragraph { font-size: 15px; margin-bottom: 24px; color: #555555; }
    .cta-container { text-align: center; margin: 35px 0; }
    .cta-button { background-color: #FCA600; color: #000000 !important; text-decoration: none; font-weight: bold; padding: 14px 30px; border-radius: 6px; display: inline-block; font-size: 16px; transition: background-color 0.2s; }
    .footer { background-color: #f8f8f8; padding: 30px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #eeeeee; }
    .footer-socials { margin-bottom: 15px; }
    .footer-socials a { color: #888888; text-decoration: none; margin: 0 10px; font-weight: 600; }
    .unsubscribe { color: #FCA600; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <!-- Standard path pointing to deployed asset -->
      <img src="https://gearterssports.com/logo.svg" alt="Gearters Sports" class="logo">
    </div>
    
    <div class="content">
      <div class="greeting">Hello {{first_name}},</div>
      <div class="paragraph">
        ${data.bodyHtml || "We have some exciting news for you! Explore our latest arrivals and premium custom gear collections built specifically for combat sports."}
      </div>
      
      ${data.buttonText && data.buttonUrl ? `
      <div class="cta-container">
        <a href="${data.buttonUrl}" class="cta-button" target="_blank">${data.buttonText}</a>
      </div>
      ` : ''}
    </div>
    
    <div class="footer">
      <div class="footer-socials">
        <a href="https://www.facebook.com/share/16oHMtQQQS/?mibextid=wwXIfr" target="_blank">Facebook</a> | 
        <a href="https://www.instagram.com/gearterssports4" target="_blank">Instagram</a>
      </div>
      <p>&copy; ${new Date().getFullYear()} Gearters Sports. All rights reserved.</p>
      <p>Chenab Rangers, Alrehman Road, Mirza Street, Sialkot, Pakistan</p>
      <p style="margin-top: 20px;">
        You received this email because you subscribed to our sports business updates. 
        <br>
        <a href="https://www.gearterssports.com/api/campaigns/unsubscribe?email={{email}}" class="unsubscribe" target="_blank">Unsubscribe here</a>
      </p>
    </div>
  </div>
</body>
</html>
`
  },
  {
    id: "product_showcase",
    name: "Product Showcase / Offer",
    description: "Designed for highlighting boxing gloves, combat sports gear and specials, with dynamic gold and black styling.",
    getHtml: (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.subject || "Premium Sports Gear Promo"}</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #111111; margin: 0; padding: 0; color: #ffffff; }
    .email-container { max-width: 600px; margin: 20px auto; background-color: #0b0b0b; border: 1px solid #222222; border-radius: 12px; overflow: hidden; }
    .header { background-color: #000000; padding: 35px 20px; text-align: center; border-bottom: 2px solid #FCA600; }
    .logo { max-width: 150px; height: auto; }
    .hero-image { width: 100%; height: auto; display: block; border-bottom: 1px solid #222222; }
    .content { padding: 40px 30px; text-align: center; }
    .badge { background-color: #FCA600; color: #000000; font-size: 12px; font-weight: bold; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; display: inline-block; margin-bottom: 15px; letter-spacing: 1px; }
    .greeting { font-size: 24px; font-weight: 800; color: #ffffff; margin-bottom: 15px; }
    .paragraph { font-size: 15px; line-height: 1.6; color: #aaaaaa; margin-bottom: 30px; }
    .product-grid { margin: 30px 0; text-align: left; }
    .cta-button { background-color: #FCA600; color: #000000 !important; text-decoration: none; font-weight: bold; padding: 15px 40px; border-radius: 8px; display: inline-block; font-size: 16px; box-shadow: 0 4px 15px rgba(252, 166, 0, 0.3); }
    .footer { background-color: #000000; padding: 40px 30px; text-align: center; font-size: 12px; color: #666666; border-top: 1px solid #222222; }
    .unsubscribe { color: #FCA600; text-decoration: none; }
    .unsubscribe:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="https://gearterssports.com/logo.svg" alt="Gearters Sports" class="logo">
    </div>
    
    ${data.promoImageUrl ? `<img src="${data.promoImageUrl}" alt="Promo Banner" class="hero-image">` : ''}
    
    <div class="content">
      <div class="badge">Exclusive Gear Announcement</div>
      <div class="greeting">Hey {{first_name}},</div>
      <div class="paragraph">
        ${data.bodyHtml || "Discover why Gearters Sports is recognized as one of the best manufacturers of boxing gloves and high-end combat accessories. Grab our top-tier catalog now."}
      </div>
      
      ${data.buttonText && data.buttonUrl ? `
      <div>
        <a href="${data.buttonUrl}" class="cta-button" target="_blank">${data.buttonText}</a>
      </div>
      ` : ''}
    </div>
    
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Gearters Sports. All rights reserved.</p>
      <p>Chenab Rangers, Alrehman Road, Mirza Street, Sialkot, Pakistan</p>
      <p style="margin-top: 20px;">
        Click <a href="https://www.gearterssports.com/api/campaigns/unsubscribe?email={{email}}" class="unsubscribe" target="_blank">here to unsubscribe</a> if you no longer wish to receive sports business alerts.
      </p>
    </div>
  </div>
</body>
</html>
`
  },
  {
    id: "rich_text",
    name: "Plain Text/Rich Text",
    description: "Simple rich text email format, good for quick announcements and direct business inquiries.",
    getHtml: (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${data.subject || "Message from Gearters Sports"}</title>
  <style>
    body { font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #333333; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; }
    .logo-container { margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
    .logo { max-width: 100px; }
    .footer { margin-top: 40px; font-size: 12px; color: #888888; border-top: 1px solid #eee; padding-top: 20px; }
    .unsubscribe { color: #888888; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo-container">
      <img src="https://gearterssports.com/logo.svg" alt="Gearters Sports" class="logo">
    </div>
    <p>Dear {{first_name}},</p>
    <div>
      ${data.bodyHtml || ""}
    </div>
    <div class="footer">
      <p>Best regards,<br><strong>Gearters Sports Team</strong></p>
      <p>Chenab Rangers, Alrehman Road, Mirza Street, Sialkot, Pakistan</p>
      <p><a href="https://www.gearterssports.com/api/campaigns/unsubscribe?email={{email}}" class="unsubscribe">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>
`
  }
];

// Helper function to compile merge tags for a specific recipient
export function compileTemplate(html, recipient) {
  let compiled = html;
  
  const firstName = recipient.metadata?.first_name || recipient.metadata?.firstName || "Customer";
  const lastName = recipient.metadata?.last_name || recipient.metadata?.lastName || "";
  const email = recipient.email || "";

  compiled = compiled.replace(/{{first_name}}/g, firstName);
  compiled = compiled.replace(/{{last_name}}/g, lastName);
  compiled = compiled.replace(/{{email}}/g, email);
  
  return compiled;
}
