import nodemailer from 'nodemailer';

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const rawBody = req.body;
  const name = escapeHtml(rawBody.name);
  const email = escapeHtml(rawBody.email);
  const phone = escapeHtml(rawBody.phone);
  const subject = rawBody.subject;
  const message = escapeHtml(rawBody.message);

  if (!rawBody.name || !rawBody.email || !rawBody.subject || !rawBody.message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const subjectMap = {
    admission: 'Admission Inquiry',
    courses: 'Course Information',
    fees: 'Fee Structure',
    general: 'General Inquiry'
  };
  const subjectLabel = subjectMap[subject] || subject;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f4f7fa; padding: 20px; }
        .email-card { background: #fff; max-width: 600px; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .email-header { background: linear-gradient(135deg, #0ea5e9, #0284c7); padding: 24px; color: #fff; }
        .email-header h2 { margin: 0; font-size: 20px; }
        .email-body { padding: 24px; }
        .field { margin-bottom: 16px; }
        .field-label { font-size: 12px; text-transform: uppercase; color: #999; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 4px; }
        .field-value { font-size: 15px; color: #333; }
        .message-box { background: #f8fafc; border-left: 4px solid #0ea5e9; padding: 16px; border-radius: 4px; margin-top: 8px; }
        .email-footer { text-align: center; padding: 16px; color: #aaa; font-size: 12px; border-top: 1px solid #eee; }
      </style>
    </head>
    <body>
      <div class="email-card">
        <div class="email-header">
          <h2>New Website Inquiry</h2>
        </div>
        <div class="email-body">
          <div class="field">
            <div class="field-label">Full Name</div>
            <div class="field-value">${name}</div>
          </div>
          <div class="field">
            <div class="field-label">Email Address</div>
            <div class="field-value"><a href="mailto:${email}">${email}</a></div>
          </div>
          <div class="field">
            <div class="field-label">Phone Number</div>
            <div class="field-value">${phone || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="field-label">Subject</div>
            <div class="field-value">${subjectLabel}</div>
          </div>
          <div class="field">
            <div class="field-label">Message</div>
            <div class="message-box">${message}</div>
          </div>
        </div>
        <div class="email-footer">
          Sent from Stellar Academy Website Contact Form
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const port = parseInt(process.env.SMTP_PORT || '587');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: port,
      secure: port === 465, // SSL for port 465, TLS for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Stellar Academy" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'info@stellarinstitute.pk',
      replyTo: `"${name}" <${email}>`,
      subject: `New Website Inquiry: ${subjectLabel}`,
      html: htmlBody,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ success: false, error: 'Failed to send email. Please try again later.' });
  }
}
