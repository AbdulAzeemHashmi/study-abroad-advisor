import { Resend } from 'resend';

export async function sendPasswordResetEmail({
  toEmail,
  resetUrl,
}: {
  toEmail: string;
  resetUrl: string;
}): Promise<{ success: boolean; messageId?: string; devUrl?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn('[DEV NOTICE] RESEND_API_KEY not configured.');
    console.info(`[PASSWORD RESET LINK for ${toEmail}]: ${resetUrl}`);
    return {
      success: true,
      devUrl: resetUrl,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const data = await resend.emails.send({
      from: 'Study Abroad Advisor <onboarding@resend.dev>',
      to: toEmail,
      subject: 'Reset Your Study Abroad Advisor Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
          <h2 style="color: #059669; margin-top: 0;">Study Abroad Advisor</h2>
          <p style="color: #334155; font-size: 16px;">Hello,</p>
          <p style="color: #334155; font-size: 15px; line-height: 1.6;">
            We received a request to reset your password. Click the secure link below to set a new password. This link will expire in 1 hour.
          </p>
          <div style="margin: 28px 0; text-align: center;">
            <a href="${resetUrl}" style="background-color: #059669; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 15px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #64748b; font-size: 12px;">
            If you did not request this, you can safely ignore this email. Your password will remain unchanged.
          </p>
          <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 11px; text-align: center;">
            © ${new Date().getFullYear()} Study Abroad Advisor • Free AI Guidance for Pakistani Students
          </p>
        </div>
      `,
    });

    return {
      success: true,
      messageId: data.data?.id,
    };
  } catch (error) {
    console.error('Error dispatching password reset email via Resend:', error);
    return {
      success: false,
      devUrl: resetUrl,
    };
  }
}
