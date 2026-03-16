import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// In-memory OTP store (per server instance)
const otpStore = new Map<string, { code: string; expires: number }>();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Store OTP
    otpStore.set(email, { code: otp, expires: expiresAt });
    
    // Optional: Share globally via environment variable to support local dev HMR
    (global as any).__OTP_STORE__ = otpStore;

    // Send OTP email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Admin 2FA" <${process.env.EMAIL_USER}>`,
      to: "mericans24@gmail.com", // Always send to YOUR private email
      subject: `🔐 Admin OTP: ${otp}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 400px; margin: 0 auto; background: #0a0a0a; color: #fff; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #ef4444, #f97316); padding: 20px 28px;">
            <h1 style="margin: 0; font-size: 18px; color: #fff;">🔐 Admin Verification</h1>
          </div>
          <div style="padding: 28px; text-align: center;">
            <p style="color: #999; font-size: 13px; margin-bottom: 16px;">Your one-time verification code:</p>
            <div style="background: #111; border: 2px solid #333; border-radius: 12px; padding: 20px; display: inline-block; margin-bottom: 16px;">
              <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #fff; font-family: monospace;">${otp}</span>
            </div>
            <p style="color: #666; font-size: 12px;">Expires in 5 minutes. If you didn't request this, ignore this email.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "OTP sent to your email." });
  } catch (error: any) {
    console.error("OTP send error:", error);
    return NextResponse.json({ error: "Failed to send OTP." }, { status: 500 });
  }
}

export { otpStore };
