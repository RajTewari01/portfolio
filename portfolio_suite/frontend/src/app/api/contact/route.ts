import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, budget } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    // Save message to Firestore database so Admin can see it in his portal
    try {
      await addDoc(collection(db, "messages"), {
        name,
        email,
        budget,
        message,
        createdAt: new Date().toISOString()
      });
    } catch (dbError) {
      console.error("Failed to save to Firestore:", dbError);
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password (server-side only)
      },
    });

    // Email to you (the admin)
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: "mericans24@gmail.com",
      subject: `🚀 New Portfolio Inquiry from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6366f1, #22d3ee); padding: 24px 32px;">
            <h1 style="margin: 0; font-size: 20px; color: #fff;">New Hire Inquiry</h1>
          </div>
          <div style="padding: 32px;">
            <p style="color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px;">From</p>
            <p style="font-size: 18px; font-weight: 600; margin-bottom: 20px;">${name}</p>
            
            <p style="color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px;">Email</p>
            <p style="font-size: 16px; margin-bottom: 20px;"><a href="mailto:${email}" style="color: #818cf8;">${email}</a></p>
            
            <p style="color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px;">Budget Range</p>
            <p style="font-size: 16px; margin-bottom: 20px;">${budget || "Not specified"}</p>
            
            <p style="color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px;">Message</p>
            <div style="background: #111; border: 1px solid #222; border-radius: 8px; padding: 16px; margin-top: 8px;">
              <p style="font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="padding: 16px 32px; border-top: 1px solid #1a1a1a; text-align: center;">
            <p style="color: #555; font-size: 11px;">Sent from your Portfolio — Digital Nexus</p>
          </div>
        </div>
      `,
    });

    // Auto-reply to the sender
    await transporter.sendMail({
      from: `"Biswadeep Tewari" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for reaching out! — Biswadeep Tewari",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6366f1, #22d3ee); padding: 24px 32px;">
            <h1 style="margin: 0; font-size: 20px; color: #fff;">Message Received ✓</h1>
          </div>
          <div style="padding: 32px;">
            <p style="font-size: 16px; line-height: 1.6;">Hi ${name},</p>
            <p style="font-size: 15px; line-height: 1.6; color: #ccc;">Thank you for your message! I've received your inquiry and will get back to you within 24 hours.</p>
            <p style="font-size: 15px; line-height: 1.6; color: #ccc;">In the meantime, feel free to check out my work at <a href="https://biswadeep.dev" style="color: #818cf8;">biswadeep.dev</a></p>
            <p style="font-size: 15px; margin-top: 24px; color: #ccc;">Best,<br/>Biswadeep Tewari</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }
}
