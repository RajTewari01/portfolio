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
      from: `"NEXUS SECURITY" <${process.env.EMAIL_USER}>`,
      to: "mericans24@gmail.com",
      subject: `[ACTION REQUIRED] Nexus Admin Clearance Code: ${otp}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Syne:wght@700;800&family=Fira+Code:wght@500&display=swap');
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #050505; color: #ffffff; font-family: 'Space Grotesk', sans-serif; -webkit-font-smoothing: antialiased;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #050505; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" max-width="500px" cellpadding="0" cellspacing="0" style="max-width: 500px; background-color: #0a0a0b; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); overflow: hidden;">
                  
                  <!-- HEADER -->
                  <tr>
                    <td style="padding: 30px 40px; border-bottom: 1px solid rgba(255,255,255,0.05); background: linear-gradient(90deg, rgba(20,20,25,1) 0%, rgba(10,10,12,1) 100%); text-align: center;">
                      <div style="display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; margin-bottom: 16px;">
                        <span style="font-family: 'Syne', sans-serif; font-weight: 800; letter-spacing: 4px; font-size: 14px; color: #ffffff;">BT // NEXUS</span>
                      </div>
                      <h1 style="font-family: 'Syne', sans-serif; font-weight: 700; margin: 0; font-size: 20px; letter-spacing: 2px; color: #e5e5e5; text-transform: uppercase;">Security Clearance</h1>
                    </td>
                  </tr>

                  <!-- BODY -->
                  <tr>
                    <td style="padding: 40px; text-align: center;">
                      <p style="margin: 0 0 24px 0; font-size: 14px; color: #888888; line-height: 1.6; letter-spacing: 0.5px;">
                        An authentication attempt was detected for the Admin Command Center. Enter the following OTP code to proceed.
                      </p>
                      
                      <!-- OTP BOX -->
                      <div style="background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%); border: 1px solid rgba(255, 255, 255, 0.1); padding: 30px; border-radius: 12px; margin: 0 auto; display: inline-block;">
                        <span style="font-family: 'Fira Code', monospace; font-size: 42px; font-weight: 500; letter-spacing: 12px; color: #4ade80; text-shadow: 0 0 20px rgba(74, 222, 128, 0.4);">${otp}</span>
                      </div>

                      <p style="margin: 30px 0 0 0; font-size: 11px; color: #555555; text-transform: uppercase; letter-spacing: 1px;">
                        Code self-destructs in <span style="color: #fb923c;">5 minutes</span>.
                      </p>
                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td style="padding: 24px 40px; background-color: #030303; border-top: 1px dashed rgba(255,255,255,0.05); text-align: center;">
                      <p style="margin: 0; font-size: 10px; color: #444444; font-family: 'Fira Code', monospace; text-transform: uppercase; letter-spacing: 1px;">
                        IP SECURED // ZERO-TRUST PROTOCOL // ENCRYPTED
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, message: "OTP sent to your email." });
  } catch (error: any) {
    console.error("OTP SMTP Send Error Breakdown:", {
      message: error.message,
      code: error.code,
      command: error.command,
      stack: error.stack
    });
    return NextResponse.json({ error: `SMTP Failed: ${error.message || "Unknown Error"}` }, { status: 500 });
  }
}

export { otpStore };
