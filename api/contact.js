import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    const { name, email, subject, message } = body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const recipientEmail = 'sourabhsheoran695@gmail.com';
    const emailSubject = `[Portfolio Contact] ${subject || 'New Message from ' + name}`;

    const textContent = `
NEW PORTFOLIO CONTACT FORM SUBMISSION
====================================
Visitor Name: ${name}
Visitor Email: ${email}
Submission Date/Time: ${timestamp}
Subject: ${subject || 'N/A'}

Message:
------------------------------------
${message}
------------------------------------
`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #0f172a; color: #f8fafc;">
        <h2 style="color: #38bdf8; border-bottom: 2px solid #0284c7; padding-bottom: 8px;">New Portfolio Contact Submission</h2>
        <p style="margin-top: 15px;"><strong>Visitor Name:</strong> ${name}</p>
        <p><strong>Visitor Email:</strong> <a href="mailto:${email}" style="color: #38bdf8;">${email}</a></p>
        <p><strong>Date & Time:</strong> ${timestamp}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <div style="margin-top: 20px; padding: 15px; background-color: #1e293b; border-left: 4px solid #38bdf8; border-radius: 4px;">
          <h4 style="margin-top: 0; color: #94a3b8;">Message Content:</h4>
          <p style="white-space: pre-wrap; color: #e2e8f0;">${message}</p>
        </div>
        <footer style="margin-top: 25px; font-size: 12px; color: #64748b;">
          This notification was sent automatically from your portfolio website.
        </footer>
      </div>
    `;

    // Respond INSTANTLY to visitor (< 50ms)
    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!'
    });

    const smtpUser = process.env.SMTP_USER || 'sourabhsheoran695@gmail.com';
    const smtpPass = process.env.SMTP_PASS || 'yxfauxswyxdaepph';

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });

        await transporter.sendMail({
          from: `"${name} (Portfolio Inquiry)" <sourabhsheoran.portfolio@gmail.com>`,
          replyTo: email,
          to: recipientEmail,
          subject: emailSubject,
          text: textContent,
          html: htmlContent
        });

        console.log(`✅ Background email successfully dispatched to ${recipientEmail}`);
      } catch (mailErr) {
        console.error('Background Nodemailer error:', mailErr.message);
      }
    }
  } catch (error) {
    console.error('Vercel contact function outer error:', error);
    if (!res.headersSent) {
      return res.status(200).json({
        success: true,
        message: 'Your message has been received!'
      });
    }
  }
}
