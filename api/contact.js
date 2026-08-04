import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, phone, subject, message } = req.body || {};

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email Template
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <!-- Header with Logo -->
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-bottom: 2px solid #e0e0e0;">
          <img src="https://rg-sfrontend.vercel.app/logo.png" alt="RGS CONSTRUCTOR" style="max-height: 60px; width: auto; object-fit: contain;" />
        </div>
        
        <!-- Content -->
        <div style="padding: 30px; background-color: #fff;">
          <h2 style="color: #333; margin-top: 0;">New Contact Request</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${phone || 'N/A'}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Subject:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${subject || 'General Inquiry'}</td></tr>
          </table>
          <div style="margin-top: 30px;">
            <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; white-space: pre-wrap; line-height: 1.6;">${message}</div>
          </div>
        </div>
      </div>
    `;

    // Send the email
    await transporter.sendMail({
      from: `"RGS Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Request: ${subject || 'Website Inquiry'}`,
      html: emailHtml,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, error: String(error), stack: error.stack });
  }
}
