import nodemailer from 'nodemailer';
import { getDbData, saveDbData } from '../db.js';

export const handleContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    // Save message to persistent database
    const dbData = getDbData();
    if (!dbData.messages) dbData.messages = [];
    const newMessage = {
      id: 'msg-' + Date.now(),
      name,
      email,
      subject: subject || 'No Subject',
      message,
      timestamp,
      createdAt: new Date().toISOString()
    };
    dbData.messages.unshift(newMessage);
    saveDbData(dbData);

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
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; rounded: 8px; background-color: #0f172a; color: #f8fafc;">
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

    console.log('\n--- PORTFOLIO CONTACT NOTIFICATION DISPATCH ---');
    console.log(textContent);
    console.log('--------------------------------------------------\n');

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpUser = process.env.SMTP_USER || 'sourabhsheoran695@gmail.com';
    const smtpPass = process.env.SMTP_PASS || 'yxfauxswyxdaepph';

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(smtpPort),
          secure: Number(smtpPort) === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass
          },
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          socketTimeout: 10000
        });

        await transporter.sendMail({
          from: `"${name} (Portfolio)" <${smtpUser}>`,
          replyTo: email,
          to: recipientEmail,
          subject: emailSubject,
          text: textContent,
          html: htmlContent
        });

        console.log(`✅ Email successfully dispatched via Nodemailer to ${recipientEmail}`);
      } catch (mailErr) {
        console.error('Nodemailer dispatch error:', mailErr.message);
      }
    } else {
      console.log('⚠️ SMTP credentials (SMTP_HOST, SMTP_USER, SMTP_PASS) not fully set in .env.');
      console.log('Message logged locally to console. Set SMTP credentials in .env to receive live email inbox dispatches.');
    }

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!'
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return res.status(500).json({
      error: 'Failed to send message. Please try again later.'
    });
  }
};
