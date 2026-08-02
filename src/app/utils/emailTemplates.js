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
const getSignatureHtml = () => {
  const c = SIGNATURE_CONFIG;
  // Icons8 custom colored icons in your brand color (#FCA600)
  const phoneIcon = "https://img.icons8.com/ios-glyphs/32/fca600/phone.png";
  const mailIcon = "https://img.icons8.com/ios-glyphs/32/fca600/filled-message.png";
  const webIcon = "https://img.icons8.com/ios-glyphs/32/fca600/domain.png";
  const instaIcon = "https://img.icons8.com/ios-glyphs/32/fca600/instagram-new.png";

  return `
<!-- Email Signature Table -->
<table cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #121212, #000000); background-color: #121212; border: 1px solid ${c.themeColor}; border-radius: 8px; padding: 15px; width: 100%; max-width: 520px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin-top: 30px; border-collapse: collapse;">
  <tr>
    <!-- Left Column: Logo -->
    <td valign="middle" style="padding-right: 15px; width: 20%;">
      <img src="${c.logoUrl}" alt="${c.companyName}" width="55" height="55" style="display: block; width: 55px; height: 55px; border-radius: 50%; border: 1px solid ${c.themeColor}; background-color: #000000; object-fit: contain; padding: 3px;" />
    </td>

    <!-- Middle Column: Name & Title -->
    <td valign="middle" style="padding-right: 15px; border-right: 1px solid #333333; width: 40%;">
      <div style="color: ${c.themeColor}; font-size: 15px; font-weight: 700; letter-spacing: 0.5px;">${c.companyName}</div>
      <div style="color: #C0C0C0; font-size: 11px; margin-top: 3px; font-weight: 500;">${c.tagline}</div>
      <div style="color: #888888; font-size: 10px; font-style: italic; margin-top: 2px;">${c.department}</div>
    </td>
    
    <!-- Right Column: Contact Details (with attractive brand-gold icons) -->
    <td valign="middle" style="padding-left: 15px; width: 40%; font-size: 11px; line-height: 1.6; color: #FFFFFF; font-family: sans-serif;">
      <!-- Phone -->
      <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 4px;">
        <tr>
          <td valign="middle" style="padding-right: 6px;">
            <img src="${phoneIcon}" alt="Phone" width="13" height="13" style="display: block; width: 13px; height: 13px;" />
          </td>
          <td valign="middle">
            <a href="tel:${c.phone.replace(/\s+/g, '')}" style="color: #FFFFFF; text-decoration: none; font-weight: 500;">${c.phone}</a>
          </td>
        </tr>
      </table>
      
      <!-- Email -->
      <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 4px;">
        <tr>
          <td valign="middle" style="padding-right: 6px;">
            <img src="${mailIcon}" alt="Email" width="13" height="13" style="display: block; width: 13px; height: 13px;" />
          </td>
          <td valign="middle">
            <a href="mailto:${c.email}" style="color: #FFFFFF; text-decoration: none; font-weight: 500;">${c.email}</a>
          </td>
        </tr>
      </table>
      
      <!-- Website -->
      <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 4px;">
        <tr>
          <td valign="middle" style="padding-right: 6px;">
            <img src="${webIcon}" alt="Website" width="13" height="13" style="display: block; width: 13px; height: 13px;" />
          </td>
          <td valign="middle">
            <a href="${c.websiteUrl}" style="color: #FFFFFF; text-decoration: none; font-weight: 500;">${c.website}</a>
          </td>
        </tr>
      </table>
      
      <!-- Instagram -->
      <table cellpadding="0" cellspacing="0" border="0;">
        <tr>
          <td valign="middle" style="padding-right: 6px;">
            <img src="${instaIcon}" alt="Instagram" width="13" height="13" style="display: block; width: 13px; height: 13px;" />
          </td>
          <td valign="middle">
            <a href="${c.instagramUrl}" style="color: #FFFFFF; text-decoration: none; font-weight: 500;">${c.instagram}</a>
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
    id: "newsletter",
    name: "Newsletter / Announcement",
    description: "Clean layout with header, custom body html content, CTA button, signature, and footer.",
    getHtml: (data) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data.subject || "Gearters Sports Update"}</title>
</head>
<body style="margin: 0; padding: 0; width: 100% !important; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #dddddd; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #050505; width: 100%; table-layout: fixed;">
    <tr>
      <td align="center" style="padding: 20px 10px 40px 10px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #0b0b0b; border: 1px solid #1a1a1a; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
          <tr>
            <td align="center" style="background-color: #000000; padding: 25px; border-bottom: 3px solid #FCA600;">
              <img src="https://gearterssports.com/logo.svg" alt="Gearters Sports" width="130" style="display: block; width: 130px; height: auto;" />
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <div style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 20px;">Hello {{first_name}},</div>
              <div style="font-size: 15px; line-height: 1.7; color: #b5b5b5; margin-bottom: 25px;">
                ${data.bodyHtml || "We have some exciting updates for you!"}
              </div>
              
              ${data.buttonText && data.buttonUrl ? `
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 30px; margin-bottom: 20px;">
                <tr>
                  <td align="center">
                    <a href="${data.buttonUrl}" target="_blank" style="background-color: #FCA600; color: #000000 !important; text-decoration: none; font-weight: bold; padding: 14px 35px; border-radius: 6px; display: inline-block; font-size: 15px; font-family: sans-serif;">${data.buttonText}</a>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Signature Block -->
              ${getSignatureHtml()}
            </td>
          </tr>
          <tr>
            <td align="center" style="background-color: #000000; padding: 35px 30px; border-top: 1px solid #1a1a1a;">
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                <tr>
                  <td><a href="https://www.facebook.com/share/16oHMtQQQS/?mibextid=wwXIfr" target="_blank" style="color: #888888; text-decoration: none; font-weight: 600; font-size: 12px; margin: 0 10px;">Facebook</a></td>
                  <td style="color: #222;">|</td>
                  <td><a href="https://www.instagram.com/gearterssports4" target="_blank" style="color: #888888; text-decoration: none; font-weight: 600; font-size: 12px; margin: 0 10px;">Instagram</a></td>
                </tr>
              </table>
              <p style="font-size: 11px; line-height: 1.5; color: #555555; margin: 0 0 15px 0;">&copy; ${new Date().getFullYear()} Gearters Sports. All rights reserved.<br>Chenab Rangers, Alrehman Road, Mirza Street, Sialkot, Pakistan</p>
              <p style="font-size: 11px; color: #555555; margin: 0;"><a href="https://www.gearterssports.com/api/campaigns/unsubscribe?email={{email}}" target="_blank" style="color: #FCA600; text-decoration: none;">Unsubscribe from list</a></p>
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
    id: "product_showcase",
    name: "Product Showcase / Offer",
    description: "Features a top header bar, hero promo image banner, product cards, signature block, and gold accents.",
    getHtml: (data) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data.subject || "Premium Sports Gear Offer"}</title>
</head>
<body style="margin: 0; padding: 0; width: 100% !important; background-color: #030303; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #dddddd; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #030303; width: 100%; table-layout: fixed;">
    <tr>
      <td align="center" style="padding: 20px 10px 40px 10px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background: #0c0c0c; border: 1px solid #231c0e; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);">
          <tr>
            <td height="5" style="height: 5px; background: linear-gradient(90deg, #9A7B33 0%, #FCA600 50%, #FFD700 80%, #9A7B33 100%);"></td>
          </tr>
          <tr>
            <td align="center" style="background-color: #000000; padding: 30px 20px; border-bottom: 1px solid #161209;">
              <img src="https://gearterssports.com/logo.svg" alt="Gearters Sports" width="130" style="display: block; width: 130px; height: auto;" />
            </td>
          </tr>
          
          ${data.promoImageUrl ? `
          <tr>
            <td>
              <img src="${data.promoImageUrl}" alt="Promo Banner" width="100%" style="display: block; width: 100%; height: auto; max-height: 280px; object-fit: cover; border-bottom: 1px solid #1a150c;" />
            </td>
          </tr>
          ` : ''}
          
          <tr>
            <td style="padding: 40px 30px;">
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #FCA600, #D4AF37); color: #000000; font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 5px 14px; border-radius: 50px; letter-spacing: 2px;">
                    Handcrafted Quality
                  </td>
                </tr>
              </table>
              <h1 style="font-size: 26px; font-weight: 800; line-height: 1.3; color: #ffffff; margin: 0 0 20px 0; letter-spacing: -0.5px;">
                The Art of <span style="color: #FCA600;">Combat Sports</span>
              </h1>
              <div style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 15px;">Hi {{first_name}},</div>
              <p style="font-size: 15px; line-height: 1.7; color: #b5b5b5; margin: 0 0 30px 0; font-weight: 300;">
                ${data.bodyHtml || "Discover why Gearters Sports is recognized as one of the best manufacturers of boxing gloves and high-end combat accessories."}
              </p>
              
              <!-- Predefined card structures -->
              <h2 style="font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #ffffff; border-bottom: 2px solid #231c0e; padding-bottom: 10px; margin: 40px 0 20px 0;">Featured Gear</h2>
              
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #111111; border: 1px solid #1a150c; border-left: 4px solid #FCA600; border-radius: 8px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 8px;">
                      <tr>
                        <td style="font-size: 17px; font-weight: 700; color: #ffffff; font-family: sans-serif;">Pro-Leather Fight Gloves</td>
                        <td align="right" style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #FCA600; border: 1px solid rgba(252, 166, 0, 0.3); padding: 2px 8px; border-radius: 4px;">Premium</td>
                      </tr>
                    </table>
                    <p style="font-size: 13px; color: #999999; line-height: 1.6; margin: 0 0 15px 0; font-weight: 300;">Features multi-layered foam protection, premium cowhide leather lining, and custom lace attachment designs for maximum safety and wrist support.</p>
                    <a href="https://www.gearterssports.com/products" target="_blank" style="font-size: 13px; color: #FCA600; text-decoration: none; font-weight: 600;">Order Sample &rarr;</a>
                  </td>
                </tr>
              </table>
              
              ${data.buttonText && data.buttonUrl ? `
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 35px; margin-bottom: 15px;">
                <tr>
                  <td align="center">
                    <a href="${data.buttonUrl}" target="_blank" style="background-color: #FCA600; color: #000000 !important; font-weight: 800; text-decoration: none; padding: 16px 40px; border-radius: 8px; display: inline-block; font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; box-shadow: 0 6px 20px rgba(252, 166, 0, 0.3); font-family: sans-serif;">${data.buttonText}</a>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Signature Block -->
              ${getSignatureHtml()}
            </td>
          </tr>
          <tr>
            <td align="center" style="background-color: #000000; padding: 40px 30px; border-top: 1px solid #161209;">
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                <tr>
                  <td><a href="https://www.facebook.com/share/16oHMtQQQS/?mibextid=wwXIfr" target="_blank" style="color: #aaaaaa; text-decoration: none; font-weight: 600; font-size: 12px; margin: 0 15px; letter-spacing: 1px; text-transform: uppercase;">Facebook</a></td>
                  <td style="color: #222;">|</td>
                  <td><a href="https://www.instagram.com/gearterssports4" target="_blank" style="color: #aaaaaa; text-decoration: none; font-weight: 600; font-size: 12px; margin: 0 15px; letter-spacing: 1px; text-transform: uppercase;">Instagram</a></td>
                </tr>
              </table>
              <p style="font-size: 11px; line-height: 1.6; color: #555555; margin: 0 0 15px 0;">&copy; ${new Date().getFullYear()} Gearters Sports. All rights reserved.<br>Chenab Rangers, Alrehman Road, Mirza Street, Sialkot, Pakistan</p>
              <p style="font-size: 11px; color: #555555; margin: 0;"><a href="https://www.gearterssports.com/api/campaigns/unsubscribe?email={{email}}" target="_blank" style="color: #FCA600; text-decoration: none; font-weight: 600;">Unsubscribe from list</a></p>
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
    id: "rich_text",
    name: "Plain Text / Rich Text",
    description: "Direct email format. Good for quick announcements and direct business inquiries, with signature and unsubscribe option.",
    getHtml: (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${data.subject || "Message from Gearters Sports"}</title>
</head>
<body style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #333333; margin: 0; padding: 20px; background-color: #fafafa;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #eeeeee; box-shadow: 0 2px 5px rgba(0,0,0,0.02);">
    <div style="margin-bottom: 25px; border-bottom: 2px solid #000000; padding-bottom: 15px;">
      <img src="https://gearterssports.com/logo.svg" alt="Gearters Sports" width="100" style="display: block; width: 100px; height: auto;" />
    </div>
    <p style="font-size: 16px; font-weight: bold; color: #000000;">Dear {{first_name}},</p>
    <div style="font-size: 15px; color: #444444; line-height: 1.7; margin-bottom: 30px;">
      ${data.bodyHtml || ""}
    </div>
    
    <!-- Signature Block -->
    ${getSignatureHtml()}

    <div style="margin-top: 40px; font-size: 11px; color: #888888; border-top: 1px solid #eeeeee; padding-top: 20px; text-align: center;">
      <p>&copy; ${new Date().getFullYear()} Gearters Sports. All rights reserved.</p>
      <p>Chenab Rangers, Alrehman Road, Mirza Street, Sialkot, Pakistan</p>
      <p><a href="https://www.gearterssports.com/api/campaigns/unsubscribe?email={{email}}" style="color: #FCA600; text-decoration: none; font-weight: bold;">Unsubscribe</a></p>
    </div>
  </div>
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
