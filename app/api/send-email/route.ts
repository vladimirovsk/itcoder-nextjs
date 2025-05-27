import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { firstName, lastName, email, phone, message } = body;
    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a transporter with smtp2go SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'mail.smtp2go.com', // smtp2go SMTP server
      port: parseInt(process.env.EMAIL_PORT || '465'),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER || 'admin@itcoder.ca',
        pass: process.env.EMAIL_PASSWORD || '',
      },
    });

    // Email content
    const mailOptions = {
      from: `"ITCoder Contact Form" <${process.env.EMAIL_USER || 'admin@itcoder.ca'}>`,
      to: 'admin@itcoder.ca',
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}

        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Message:</h3>
        <p>${message}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
