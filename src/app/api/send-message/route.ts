import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      );
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASSWORD, // Your Gmail password or app password
      },
    });

    // Format the email content with HTML
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'thinh.iuh.work@gmail.com',
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #8b5cf6; margin-bottom: 20px; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">New Contact Form Message</h2>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 5px 0; font-weight: bold;">Name:</p>
            <p style="margin: 5px 0; background-color: #f9fafb; padding: 10px; border-radius: 5px;">${name}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 5px 0; font-weight: bold;">Email:</p>
            <p style="margin: 5px 0; background-color: #f9fafb; padding: 10px; border-radius: 5px;">
              <a href="mailto:${email}" style="color: #8b5cf6; text-decoration: none;">${email}</a>
            </p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 5px 0; font-weight: bold;">Message:</p>
            <p style="margin: 5px 0; background-color: #f9fafb; padding: 10px; border-radius: 5px; white-space: pre-line;">${message}</p>
          </div>
          
          <div style="font-size: 14px; color: #6b7280; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p>This message was sent from your portfolio website contact form.</p>
            <p>Date: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}