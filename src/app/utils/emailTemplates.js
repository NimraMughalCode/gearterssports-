// Utility file defining the official Gearters Sports responsive HTML email templates and compiler.

// 🏆 TEMPLATE 1: Official Branded Newsletter / Marketing Template (Export Header + Brand Card)
export const GEARTERS_BRANDED_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Gearters Sports</title>
    <style>
      body, p, h1, h2, h3, div, td, a {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table {
        border-spacing: 0;
        border-collapse: separate;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        border: 0;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }
      @media only screen and (max-width: 620px) {
        .outer-body-cell {
          padding: 8px 4px !important;
        }
        .stack-column {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }
        .header-left-col {
          border-right: none !important;
          border-bottom: 3px solid #FCA600 !important;
          text-align: center !important;
          padding: 16px !important;
          border-radius: 8px 8px 0 0 !important;
        }
        .header-left-col img {
          margin: 0 auto 6px auto !important;
        }
        .content-padding {
          padding: 20px 14px !important;
        }
        .footer-padding {
          padding: 0 14px 20px 14px !important;
        }
      }
    </style>
  </head>
  <body style="background-color: #f4f4f5; padding: 0; margin: 0; width: 100% !important; min-width: 100%;">
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="background-color: #f4f4f5; margin: 0; padding: 0; width: 100%;"
    >
      <tr>
        <td class="outer-body-cell" align="center" style="padding: 12px 8px;">
          <table
            role="presentation"
            width="100%"
            align="center"
            style="width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e4e4e7; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);"
          >
            <!-- HEADER -->
            <tr>
              <td style="padding: 0;">
                <table
                  role="presentation"
                  width="100%"
                  style="border-collapse: collapse; border-bottom: 1px solid #e5e5e5;"
                >
                  <tr>
                    <td
                      class="stack-column header-left-col"
                      width="140"
                      align="center"
                      style="background-color: #000000; padding: 18px 14px; border-right: 3px solid #FCA600; vertical-align: middle;"
                    >
                      <img
                        src="https://gearterssports.com/logo.svg"
                        alt="Gearters Sports"
                        width="75"
                        style="display: block; width: 75px; height: auto; margin: 0 auto 6px auto;"
                      />
                      <span
                        style="color: #FCA600; font-size: 8.5px; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase; display: block; text-align: center;"
                        >Export Dept</span
                      >
                    </td>
                    <td
                      class="stack-column"
                      style="background-color: #ffffff; padding: 16px 20px; vertical-align: middle;"
                    >
                      <div
                        style="font-size: 13px; font-weight: 800; color: #111111; margin-bottom: 1px; letter-spacing: 0.3px;"
                      >
                        GEARTERS SPORTS
                      </div>
                      <div style="color: #777777; font-size: 10.5px; margin-bottom: 8px;">
                        World Class Boxing Gear &bull; Sialkot, PK
                      </div>

                      <div style="font-size: 11px; line-height: 1.5; color: #333333; margin-bottom: 3px;">
                        <a href="tel:+923279988069" style="color: #111111; text-decoration: none; font-weight: 600;"
                          >+92 327 9988069</a
                        >
                        <span style="color: #d1d1d1; margin: 0 4px;">|</span>
                        <a
                          href="mailto:info@gearterssports.com"
                          style="color: #111111; text-decoration: none; font-weight: 600;"
                          >info@gearterssports.com</a
                        >
                      </div>
                      <div style="font-size: 11px; line-height: 1.5;">
                        <a
                          href="https://www.gearterssports.com"
                          target="_blank"
                          style="color: #FCA600; text-decoration: none; font-weight: 700;"
                          >www.gearterssports.com</a
                        >
                        <span style="color: #d1d1d1; margin: 0 4px;">|</span>
                        <a
                          href="https://instagram.com/gearterssports4"
                          target="_blank"
                          style="color: #E4405F; text-decoration: none; font-weight: 700;"
                          >@gearterssports4</a
                        >
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- BODY CONTENT -->
            <tr>
              <td
                class="content-padding"
                style="padding: 28px 24px; color: #222222; font-size: 14px; line-height: 1.7;"
              >
                <div style="font-size: 16px; font-weight: 700; color: #111111; margin-bottom: 16px;">
                  Hello {{{name}}},
                </div>
                <div style="color: #333333; font-size: 14px; line-height: 1.7;">{{{content}}}</div>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td class="footer-padding" style="padding: 0 24px 24px 24px;">
                <table
                  role="presentation"
                  width="100%"
                  style="border-top: 2px solid #FCA600; padding-top: 14px; border-collapse: collapse;"
                >
                  <tr>
                    <td style="padding-top: 14px;">
                      <div style="font-size: 14px; font-weight: 800; color: #111111; letter-spacing: 0.3px;">
                        GEARTERS SPORTS
                      </div>
                      <div
                        style="font-size: 10.5px; color: #777777; font-weight: 600; text-transform: uppercase; margin-bottom: 10px; margin-top: 2px;"
                      >
                        World Class Boxing Gear
                      </div>

                      <table role="presentation" style="font-size: 12px; line-height: 1.9; color: #444444;">
                        <tr>
                          <td style="width: 26px; vertical-align: middle; font-size: 13px;">📞</td>
                          <td style="vertical-align: middle;">
                            <a href="tel:+923279988069" style="color: #333333; text-decoration: none; font-weight: 500;"
                              >+92 327 9988069</a
                            >
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 26px; vertical-align: middle; font-size: 13px;">✉️</td>
                          <td style="vertical-align: middle;">
                            <a
                              href="mailto:info@gearterssports.com"
                              style="color: #333333; text-decoration: none; font-weight: 500;"
                              >info@gearterssports.com</a
                            >
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 26px; vertical-align: middle; font-size: 13px;">🌐</td>
                          <td style="vertical-align: middle;">
                            <a
                              href="https://www.gearterssports.com"
                              target="_blank"
                              style="color: #333333; text-decoration: none; font-weight: 500;"
                              >www.gearterssports.com</a
                            >
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 26px; vertical-align: middle; font-size: 13px;">📸</td>
                          <td style="vertical-align: middle;">
                            <a
                              href="https://instagram.com/gearterssports4"
                              target="_blank"
                              style="color: #FCA600; text-decoration: none; font-weight: 600;"
                              >@gearterssports4</a
                            >
                          </td>
                        </tr>
                      </table>

                      <div
                        style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #eeeeee; font-size: 10.5px; color: #888888;"
                      >
                        This email was sent to
                        <a href="mailto:{{{email}}}" style="color: #666666; text-decoration: underline;">{{{email}}}</a>. &bull; <a href="https://www.gearterssports.com/api/campaigns/unsubscribe?email={{{email}}}" target="_blank" style="color: #888888; text-decoration: underline;">Unsubscribe</a>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

export const GEARTERS_EMAIL_TEMPLATE = GEARTERS_BRANDED_TEMPLATE;

// 🥊 TEMPLATE 2: Direct 1-on-1 B2B Outreach (Engineered specifically to land in Gmail PRIMARY tab)
export const GEARTERS_DIRECT_TEMPLATE = `<!-- DIRECT_OUTREACH -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gearters Sports</title>
</head>
<body style="margin: 0; padding: 24px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.65; color: #1a1a1a; background-color: #ffffff;">
  <div style="max-width: 600px; margin: 0 auto; color: #1a1a1a;">
    <div style="margin-bottom: 16px; font-weight: 600; color: #111111;">Hello {{{name}}},</div>
    
    <div style="margin-bottom: 28px; color: #222222; font-size: 15px; line-height: 1.65;">
      {{{content}}}
    </div>

    <!-- Direct Email Signature -->
    <div style="margin-top: 32px; padding-top: 18px; border-top: 1px solid #e5e5e5; font-size: 13px; color: #444444; line-height: 1.6;">
      <div style="font-weight: 700; color: #111111; font-size: 14px;">Gearters Sports | Export Team</div>
      <div style="color: #666666;">World Class Boxing Gear &bull; Sialkot, Pakistan</div>
      <div style="margin-top: 6px;">
        <span style="color: #111111; font-weight: 500;">Phone / WhatsApp:</span> <a href="tel:+923279988069" style="color: #111111; text-decoration: none;">+92 327 9988069</a> &bull;
        <span style="color: #111111; font-weight: 500;">Email:</span> <a href="mailto:info@gearterssports.com" style="color: #111111; text-decoration: none;">info@gearterssports.com</a>
      </div>
      <div>
        <a href="https://www.gearterssports.com" target="_blank" style="color: #FCA600; text-decoration: none; font-weight: 600;">www.gearterssports.com</a> &bull;
        <a href="https://instagram.com/gearterssports4" target="_blank" style="color: #333333; text-decoration: none;">@gearterssports4</a>
      </div>
      
      <div style="margin-top: 24px; font-size: 11px; color: #888888;">
        This email was sent to {{{email}}}. If you'd prefer not to receive updates from us, you can <a href="https://www.gearterssports.com/api/campaigns/unsubscribe?email={{{email}}}" target="_blank" style="color: #666666; text-decoration: underline;">opt out here</a>.
      </div>
    </div>
  </div>
</body>
</html>`;

/**
 * Format raw plain text or HTML into clean, readable email paragraphs.
 */
export function formatEmailContent(text = "") {
  if (!text) return "";
  // If text already has HTML block tags, return as is
  if (/<(p|div|br|h\d|ul|ol|table)[\s>]/i.test(text)) {
    return text;
  }
  // Otherwise split by double newlines into paragraphs, and single newlines into <br />
  return text
    .split(/\r?\n\r?\n/)
    .map((paragraph) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return "";
      return `<p style="margin: 0 0 14px 0; line-height: 1.7;">${trimmed.replace(/\r?\n/g, "<br />")}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}

/**
 * Render the Gearters Sports email template with the given content and optional variable replacements.
 * @param {Object} options
 * @param {"branded" | "direct"} options.mode - "direct" lands in Primary tab, "branded" is the full visual newsletter.
 */
export function renderGeartersEmail({ mode = "direct", name, content = "", email, subject } = {}) {
  let html = mode === "branded" ? GEARTERS_BRANDED_TEMPLATE : GEARTERS_DIRECT_TEMPLATE;

  if (subject) {
    html = html.replace("<title>Gearters Sports</title>", `<title>${subject}</title>`);
  }

  if (content !== undefined) {
    const formatted = formatEmailContent(content);
    html = html.replace(/{{{\s*content\s*}}}/g, formatted);
    html = html.replace(/{{\s*content\s*}}/g, formatted);
  }

  if (name) {
    html = html.replace(/{{{\s*name\s*}}}/g, name);
    html = html.replace(/{{\s*name\s*}}/g, name);
  }

  if (email) {
    html = html.replace(/{{{\s*email\s*}}}/g, email);
    html = html.replace(/{{\s*email\s*}}/g, email);
  }

  return html;
}

/**
 * Compile merge tags for a specific recipient during email dispatch.
 * Handles both triple {{{ }}} and double {{ }} Mustache tags.
 */
export function compileTemplate(html, recipient = {}, extraVariables = {}) {
  if (!html) return "";
  let compiled = html;

  const rawName =
    recipient?.metadata?.name ||
    recipient?.metadata?.first_name ||
    recipient?.metadata?.firstName ||
    extraVariables.name ||
    "Customer";

  const firstName =
    recipient?.metadata?.first_name ||
    recipient?.metadata?.firstName ||
    rawName.split(" ")[0] ||
    "Customer";

  const lastName =
    recipient?.metadata?.last_name ||
    recipient?.metadata?.lastName ||
    "";

  const email = recipient?.email || extraVariables.email || "";

  if (extraVariables.content) {
    const formattedContent = formatEmailContent(extraVariables.content);
    compiled = compiled.replace(/{{{\s*content\s*}}}/g, formattedContent);
    compiled = compiled.replace(/{{\s*content\s*}}/g, formattedContent);
  }

  // Replace name tags
  compiled = compiled.replace(/{{{\s*name\s*}}}/g, rawName);
  compiled = compiled.replace(/{{\s*name\s*}}/g, rawName);
  compiled = compiled.replace(/{{{\s*first_name\s*}}}/g, firstName);
  compiled = compiled.replace(/{{\s*first_name\s*}}/g, firstName);
  compiled = compiled.replace(/{{{\s*last_name\s*}}}/g, lastName);
  compiled = compiled.replace(/{{\s*last_name\s*}}/g, lastName);

  // Replace email tags
  compiled = compiled.replace(/{{{\s*email\s*}}}/g, email);
  compiled = compiled.replace(/{{\s*email\s*}}/g, email);

  return compiled;
}
