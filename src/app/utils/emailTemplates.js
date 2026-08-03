// Utility file defining predefined, high-quality, responsive HTML email templates for Gearters Sports.

// ====================================================================
// ✍️ REUSABLE SIGNATURE CONFIGURATION
// You can easily edit these values here to update the signature globally
// ====================================================================
export const SIGNATURE_CONFIG = {
  logoUrl: "https://gearterssports.com/logo.svg",
  companyName: "Gearters Sports",
  tagline: "World Class Boxing Gear",
  department: "Export Department",
  phone: "+92 327 9988069",
  email: "info@gearterssports.com",
  website: "gearterssports.com",
  websiteUrl: "https://www.gearterssports.com",
  instagram: "@gearterssports4",
  instagramUrl: "https://instagram.com/gearterssports4",
  themeColor: "#FCA600" // Brand Gold Color
};

// Branded Signature Block Helper using the config and attractive icon assets
export const getSignatureHtml = () => {
  const c = SIGNATURE_CONFIG;
  // Icons8 custom colored icons in your brand color (#FCA600)
  const phoneIcon = "https://img.icons8.com/ios-glyphs/32/fca600/phone.png";
  const mailIcon = "https://img.icons8.com/ios-glyphs/32/fca600/filled-message.png";
  const webIcon = "https://img.icons8.com/ios-glyphs/32/fca600/domain.png";
  const instaIcon = "https://img.icons8.com/ios-glyphs/32/fca600/instagram-new.png";

  return `
<!-- Email Signature Table (White background, left-aligned, gold accent side-bar with padding) -->
<table align="left" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; width: 100%; max-width: 520px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin-top: 35px; border-collapse: collapse;">
  <tr>
    <!-- Left Border Shape Column (stretches to height of content) -->
    <td width="4" style="width: 4px; background-color: ${c.themeColor}; font-size: 1px; line-height: 1px;">&nbsp;</td>
    
    <!-- Spacing Column to push logo away from the left border -->
    <td width="15" style="width: 15px; font-size: 1px; line-height: 1px;">&nbsp;</td>

    <!-- Left Column: Logo inside a clean black badge with gold border -->
    <td valign="middle" style="padding-right: 15px; width: 20%;">
      <div style="background-color: #000000; padding: 5px; border-radius: 50%; border: 2px solid ${c.themeColor}; width: 45px; height: 45px; display: block; text-align: center;">
        <img src="${c.logoUrl}" alt="${c.companyName}" width="40" height="40" style="display: inline-block; width: 40px; height: 40px; object-fit: contain;" />
      </div>
    </td>

    <!-- Middle Column: Name & Title (High contrast dark text on white background) -->
    <td valign="middle" style="padding-right: 15px; border-right: 1px solid #e0e0e0; width: 35%;">
      <div style="color: ${c.themeColor}; font-size: 16px; font-weight: 700; letter-spacing: 0.5px;">${c.companyName}</div>
      <div style="color: #222222; font-size: 11px; margin-top: 3px; font-weight: 600;">${c.tagline}</div>
      <div style="color: #666666; font-size: 10px; font-style: italic; margin-top: 2px;">${c.department}</div>
    </td>
    
    <!-- Right Column: Contact Details (Dark text, golden icons) -->
    <td valign="middle" style="padding-left: 15px; width: 40%; font-size: 11px; line-height: 1.6; color: #333333; font-family: sans-serif;">
      <!-- Phone -->
      <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 4px; border-collapse: collapse;">
        <tr>
          <td valign="middle" style="padding-right: 6px;">
            <img src="${phoneIcon}" alt="Phone" width="13" height="13" style="display: block; width: 13px; height: 13px;" />
          </td>
          <td valign="middle">
            <a href="tel:${c.phone.replace(/\s+/g, '')}" style="color: #333333; text-decoration: none; font-weight: 500;">${c.phone}</a>
          </td>
        </tr>
      </table>
      
      <!-- Email -->
      <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 4px; border-collapse: collapse;">
        <tr>
          <td valign="middle" style="padding-right: 6px;">
            <img src="${mailIcon}" alt="Email" width="13" height="13" style="display: block; width: 13px; height: 13px;" />
          </td>
          <td valign="middle">
            <a href="mailto:${c.email}" style="color: #333333; text-decoration: none; font-weight: 500;">${c.email}</a>
          </td>
        </tr>
      </table>
      
      <!-- Website -->
      <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 4px; border-collapse: collapse;">
        <tr>
          <td valign="middle" style="padding-right: 6px;">
            <img src="${webIcon}" alt="Website" width="13" height="13" style="display: block; width: 13px; height: 13px;" />
          </td>
          <td valign="middle">
            <a href="${c.websiteUrl}" style="color: #333333; text-decoration: none; font-weight: 500;">${c.website}</a>
          </td>
        </tr>
      </table>
      
      <!-- Instagram -->
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
        <tr>
          <td valign="middle" style="padding-right: 6px;">
            <img src="${instaIcon}" alt="Instagram" width="13" height="13" style="display: block; width: 13px; height: 13px;" />
          </td>
          <td valign="middle">
            <a href="${c.instagramUrl}" style="color: #333333; text-decoration: none; font-weight: 500;">${c.instagram}</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`;
};

export const templates = [
  {
    id: "standard",
    name: "Standard White Template",
    description: "Clean layout with a white background, logo header, your message content, your branded signature block, and unsubscribe footer.",
    getHtml: (data) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data.subject || "Gearters Sports Update"}</title>
</head>
<body style="margin: 0; padding: 0; width: 100% !important; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a1a1a; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; width: 100%; table-layout: fixed;">
    <tr>
      <td align="center" style="padding: 20px 10px 40px 10px;">
        <table align="center" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e8e8e8; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border-collapse: collapse;">
          
          <!-- Pure White Header with Logo Wrapper (Centered) -->
          <tr>
            <td align="center" style="background-color: #ffffff; padding: 35px 20px; text-align: center;">
              <div style="background-color: #000000; padding: 10px 30px; border-radius: 50px; display: inline-block; border: 2px solid #FCA600; box-shadow: 0 4px 10px rgba(252, 166, 0, 0.15);">
                <img src="https://gearterssports.com/logo.svg" alt="Gearters Sports" width="120" style="display: block; width: 120px; height: auto;" />
              </div>
            </td>
          </tr>
          
          <!-- Content Body (Left Aligned) -->
          <tr>
            <td align="left" style="padding: 40px 30px; text-align: left; background-color: #ffffff;">
              <div style="font-size: 15px; line-height: 1.7; color: #1a1a1a; margin-bottom: 30px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: left;">
                ${data.bodyHtml || "Write your message content..."}
              </div>
              
              <!-- Signature Block (Left Aligned) -->
              ${getSignatureHtml()}
            </td>
          </tr>
          
          <!-- Pure White Footer with Brand Color Social Links (Centered) -->
          <tr>
            <td align="center" style="background-color: #ffffff; padding: 35px 30px; border-top: 1px solid #eeeeee;">
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px; border-collapse: collapse;">
                <tr>
                  <td><a href="https://www.facebook.com/share/16oHMtQQQS/?mibextid=wwXIfr" target="_blank" style="color: #1877F2; text-decoration: none; font-weight: 700; font-size: 12px; margin: 0 12px; letter-spacing: 0.5px;">Facebook</a></td>
                  <td style="color: #e0e0e0; font-size: 12px;">|</td>
                  <td><a href="https://www.instagram.com/gearterssports4" target="_blank" style="color: #E4405F; text-decoration: none; font-weight: 700; font-size: 12px; margin: 0 12px; letter-spacing: 0.5px;">Instagram</a></td>
                </tr>
              </table>
              <p style="font-size: 11px; line-height: 1.5; color: #777777; margin: 0 0 15px 0; font-family: sans-serif;">&copy; ${new Date().getFullYear()} Gearters Sports. All rights reserved.<br>Chenab Rangers, Alrehman Road, Mirza Street, Sialkot, Pakistan</p>
              <p style="font-size: 11px; color: #777777; margin: 0; font-family: sans-serif;"><a href="https://www.gearterssports.com/api/campaigns/unsubscribe?email={{email}}" target="_blank" style="color: #FCA600; text-decoration: none; font-weight: 700;">Unsubscribe from list</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
  },
  {
    id: "custom_html",
    name: "Custom HTML Import",
    description: "Allows you to paste your own raw, custom responsive HTML email code. We will compile merge tags like {{first_name}} automatically.",
    getHtml: (data) => data.bodyHtml || ""
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
