'use server';

import nodemailer from 'nodemailer';

export async function submitContactForm(formData: FormData) {
  // --- 1. Extract Common Fields ---
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  
  // --- 2. Extract Optional/Specific Fields ---
  // If the field doesn't exist (e.g. 'budget' on the standard contact form), default to empty string or 'N/A'
  const mobile = (formData.get('mobile') as string) || 'N/A'; 
  const service = (formData.get('service') as string) || 'General Inquiry'; 
  
  // New Booking Fields
  const company = (formData.get('company') as string) || 'N/A';
  const budget = (formData.get('budget') as string) || 'N/A';
  const demoDate = (formData.get('demo_date') as string) || null; // Will be null if not a booking

  // --- 3. Determine Request Type (Lead vs Demo) ---
  const isDemoRequest = !!demoDate;
  const typeLabel = isDemoRequest ? '📅 DEMO REQUEST' : '🔥 NEW LEAD';
  
  // --- 4. Log to Terminal (Server Side) ---
  console.log('--------------------------------');
  console.log(`${typeLabel} RECEIVED`);
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Mobile:', mobile);
  if (isDemoRequest) {
    console.log('Company:', company);
    console.log('Budget:', budget);
    console.log('Demo Date:', demoDate);
  } else {
    console.log('Service:', service);
  }
  console.log('--------------------------------');

  // --- 5. Configure Transporter ---
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    // --- 6. Construct Email Subject ---
    // Example: "📅 New Demo Request: John Doe [5k-10k]" OR "🔥 New Lead: Web Dev from John Doe"
    const subjectLine = isDemoRequest 
      ? `📅 Demo Request: ${name} [${budget}]`
      : `🔥 New Lead: ${service} from ${name}`;

    // --- 7. Send Email ---
    await transporter.sendMail({
      from: `"Hoursdev Website" <${process.env.GMAIL_USER}>`,
      to: 'hoursdevs@gmail.com', // Your receiving email
      replyTo: email,
      subject: subjectLine,
      
      // Plain Text Version
      text: `
        TYPE: ${typeLabel}
        
        CONTACT INFO
        Name: ${name}
        Email: ${email}
        Mobile: ${mobile}
        Company: ${company}
        
        ${isDemoRequest ? `
        BOOKING DETAILS
        Budget: ${budget}
        Requested Date: ${demoDate}
        ` : `
        INTEREST
        Service: ${service}
        `}
        
        MESSAGE
        ${message}
      `,
      
      // HTML Version
      html: `
        <div style="font-family: sans-serif; color: #1a1a1a; max-width: 600px;">
          <h2 style="color: ${isDemoRequest ? '#059669' : '#7c3aed'}; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            ${typeLabel}: ${name}
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
              <td style="padding: 8px 0;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Mobile:</strong></td>
              <td style="padding: 8px 0;">${mobile}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Company:</strong></td>
              <td style="padding: 8px 0;">${company}</td>
            </tr>
            
            ${isDemoRequest ? `
            <tr style="background-color: #f0fdf4;">
              <td style="padding: 8px 0; color: #047857;"><strong>💰 Budget:</strong></td>
              <td style="padding: 8px 0; font-weight: bold;">${budget}</td>
            </tr>
            <tr style="background-color: #f0fdf4;">
              <td style="padding: 8px 0; color: #047857;"><strong>🗓 Time Slot:</strong></td>
              <td style="padding: 8px 0; font-weight: bold;">${demoDate?.replace('T', ' ')}</td>
            </tr>
            ` : `
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Service:</strong></td>
              <td style="padding: 8px 0;">${service}</td>
            </tr>
            `}
          </table>
          
          <div style="margin-top: 25px;">
            <p style="font-weight: bold; color: #444;">Message / Project Brief:</p>
            <div style="background: #f4f4f5; padding: 15px; border-radius: 8px; border-left: 4px solid ${isDemoRequest ? '#059669' : '#7c3aed'}; white-space: pre-wrap;">
              ${message}
            </div>
          </div>
          
          <p style="font-size: 12px; color: #999; margin-top: 30px; text-align: center;">
            Sent from Hoursdev Website V2
          </p>
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