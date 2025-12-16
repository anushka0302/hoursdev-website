'use server';

import nodemailer from 'nodemailer';

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  // 1. Get the mobile number
  const mobile = formData.get('mobile') as string; 
  const service = formData.get('service') as string;
  const message = formData.get('message') as string;

  // Log to terminal
  console.log('--------------------------------');
  console.log('🔥 NEW LEAD RECEIVED');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Mobile:', mobile); // Log mobile
  console.log('Service:', service);
  console.log('--------------------------------');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Hoursdev Website" <${process.env.GMAIL_USER}>`,
      to: 'hoursdevs@gmail.com',
      replyTo: email,
      subject: `🔥 New Lead: ${service} from ${name}`,
      // 2. Add Mobile to Plain Text version
      text: `
        Name: ${name}
        Email: ${email}
        Mobile: ${mobile}
        Service: ${service}
        
        Message:
        ${message}
      `,
      // 3. Add Mobile to HTML version
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2 style="color: #6d28d9;">New Project Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mobile:</strong> ${mobile}</p>
          <p><strong>Service:</strong> ${service}</p>
          <br/>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; border-left: 4px solid #6d28d9;">
            ${message}
          </div>
        </div>
      `,
    });

    console.log("✅ Email sent successfully to hoursdevs@gmail.com");
    return { success: true };

  } catch (error) {
    console.error("❌ Email failed to send:", error);
    return { success: false };
  }
}