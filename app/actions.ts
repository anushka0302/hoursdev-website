'use server';

import nodemailer from 'nodemailer';

export async function submitContactForm(formData: FormData) {
  // --- 1. Extract Common Fields ---
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = (formData.get('message') as string) || 'No message provided';
  
  // --- 2. Extract Optional/Specific Fields ---
  const mobile = (formData.get('mobile') as string) || 'N/A'; 
  const service = (formData.get('service') as string) || 'General Inquiry'; 
  
  // Book Demo Fields
  const company = (formData.get('company') as string) || 'N/A';
  const budget = (formData.get('budget') as string) || 'N/A';
  const demoDate = (formData.get('demo_date') as string) || null;

  // Sentinel Specific Fields
  const organization = (formData.get('organization') as string) || 'N/A';
  const deploymentScale = (formData.get('deployment_scale') as string) || null;

  // --- 3. Determine Request Type & Styling ---
  let typeLabel = '🔥 NEW LEAD';
  let color = '#7c3aed'; // Purple (Default)

  if (deploymentScale) {
    typeLabel = '🛡️ SENTINEL ACCESS';
    color = '#dc2626'; // Red (Sentinel)
  } else if (demoDate) {
    typeLabel = '📅 DEMO REQUEST';
    color = '#059669'; // Emerald (Book Demo)
  }

  // --- 4. Log to Terminal (Server Side) ---
  console.log('--------------------------------');
  console.log(`${typeLabel} RECEIVED`);
  console.log(`From: ${name} (${email})`);
  console.log(`Mobile: ${mobile}`); // Added log for verification
  if (deploymentScale) console.log(`Scale: ${deploymentScale}`);
  else if (demoDate) console.log(`Budget: ${budget}, Date: ${demoDate}`);
  else console.log(`Service: ${service}`);
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
    let subjectLine = `🔥 New Lead: ${service} from ${name}`;
    
    if (deploymentScale) {
      subjectLine = `🛡️ Sentinel Request: ${name} [${deploymentScale}]`;
    } else if (demoDate) {
      subjectLine = `📅 Demo Request: ${name} [${budget}]`;
    }

    // --- 7. Send Email ---
    await transporter.sendMail({
      from: `"Hoursdev System" <${process.env.GMAIL_USER}>`,
      to: 'hoursdevs@gmail.com',
      replyTo: email,
      subject: subjectLine,
      
      // HTML Version
      html: `
        <div style="font-family: sans-serif; color: #1a1a1a; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
          <h2 style="color: ${color}; border-bottom: 2px solid ${color}; padding-bottom: 10px; margin-top: 0;">
            ${typeLabel}: ${name}
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;"><strong>Email:</strong></td>
              <td style="padding: 8px 0;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Mobile:</strong></td>
              <td style="padding: 8px 0;">${mobile}</td>
            </tr>
            
            ${/* Sentinel Specifics */ ''}
            ${deploymentScale ? `
            <tr style="background-color: #fef2f2;">
              <td style="padding: 8px 0; color: #991b1b;"><strong>Organization:</strong></td>
              <td style="padding: 8px 0; color: #991b1b;">${organization}</td>
            </tr>
            <tr style="background-color: #fef2f2;">
              <td style="padding: 8px 0; color: #991b1b;"><strong>Deployment:</strong></td>
              <td style="padding: 8px 0; font-weight: bold; color: #991b1b;">${deploymentScale}</td>
            </tr>
            ` : ''}

            ${/* Book Demo Specifics */ ''}
            ${demoDate ? `
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Company:</strong></td>
              <td style="padding: 8px 0;">${company}</td>
            </tr>
            <tr style="background-color: #f0fdf4;">
              <td style="padding: 8px 0; color: #047857;"><strong>Goal:</strong></td>
              <td style="padding: 8px 0; font-weight: bold;">${service}</td> 
            </tr>
            <tr style="background-color: #f0fdf4;">
              <td style="padding: 8px 0; color: #047857;"><strong>Budget:</strong></td>
              <td style="padding: 8px 0; font-weight: bold;">${budget}</td>
            </tr>
            <tr style="background-color: #f0fdf4;">
              <td style="padding: 8px 0; color: #047857;"><strong>Time Slot:</strong></td>
              <td style="padding: 8px 0; font-weight: bold;">${demoDate.replace('T', ' ')}</td>
            </tr>
            ` : ''}

            ${/* Standard Contact Specifics */ ''}
            ${!demoDate && !deploymentScale ? `
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Service:</strong></td>
              <td style="padding: 8px 0;">${service}</td>
            </tr>
            ` : ''}
          </table>
          
          <div style="margin-top: 25px;">
            <p style="font-weight: bold; color: #444;">Message / Brief:</p>
            <div style="background: #f4f4f5; padding: 15px; border-radius: 5px; border-left: 4px solid ${color}; white-space: pre-wrap;">
              ${message}
            </div>
          </div>
          
          <p style="font-size: 11px; color: #999; margin-top: 30px; text-align: center;">
            Sent from Hoursdev Website V2
          </p>
        </div>
      `,
    });

    console.log("✅ Email sent successfully");
    return { success: true };

  } catch (error) {
    console.error("❌ Email failed to send:", error);
    return { success: false };
  }
}