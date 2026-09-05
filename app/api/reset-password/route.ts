import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { sendPasswordResetEmail } from '@/lib/email/resend';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Generate cryptographically secure random reset token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

    // 2. Upsert or save token in VerificationToken table
    try {
      await prisma.verificationToken.create({
        data: {
          email: normalizedEmail,
          token,
          expiresAt,
        },
      });
    } catch (dbErr) {
      console.warn('Could not store token in DB (local preview mode):', dbErr);
    }

    // 3. Construct the password reset link
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password?token=${token}&email=${encodeURIComponent(normalizedEmail)}`;

    // 4. Dispatch transactional email via Resend
    const emailResult = await sendPasswordResetEmail({
      toEmail: normalizedEmail,
      resetUrl,
    });

    return NextResponse.json({
      message: 'Password reset link generated.',
      devResetUrl: emailResult.devUrl || undefined,
    });
  } catch (error: any) {
    console.error('Password reset handler error:', error);
    return NextResponse.json(
      { error: 'Failed to process password reset request.' },
      { status: 500 }
    );
  }
}
