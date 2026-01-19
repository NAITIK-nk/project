import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@samay.com';

// Lazy initialization - only create Resend instance when needed
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set in environment variables');
  }
  return new Resend(apiKey);
};

/**
 * Send complaint notification emails
 * @param {Object} complaintData - Complaint details
 * @param {string} complaintData.name - User's name
 * @param {string} complaintData.email - User's email
 * @param {string} complaintData.subject - Complaint subject
 * @param {string} complaintData.message - Complaint message
 * @returns {Promise<Object>} Email sending result
 */
export const sendComplaintMail = async ({ name, email, subject, message }) => {
  try {
    const resend = getResend();
    
    // Send email to admin
    const adminEmailResult = await resend.emails.send({
      from: 'SAMAY Watch Store <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      subject: `New Complaint: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Complaint Received</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px;">This is an automated notification from SAMAY Watch Store.</p>
        </div>
      `,
    });

    // Send confirmation email to user
    const userEmailResult = await resend.emails.send({
      from: 'SAMAY Watch Store <onboarding@resend.dev>',
      to: email,
      subject: 'We received your complaint',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for contacting us!</h2>
          <p>Dear ${name},</p>
          <p>We have received your complaint and our team will review it shortly. We appreciate your patience and will get back to you as soon as possible.</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <p>If you have any urgent concerns, please feel free to contact us directly.</p>
          <p style="margin-top: 30px;">Best regards,<br>The SAMAY Watch Store Team</p>
        </div>
      `,
    });

    return {
      success: true,
      adminEmailId: adminEmailResult.data?.id,
      userEmailId: userEmailResult.data?.id,
    };
  } catch (error) {
    console.error('[sendMail] Error sending complaint emails:', error);
    throw new Error(`Failed to send emails: ${error.message}`);
  }
};
