import { NextRequest, NextResponse } from 'next/server';
import Mailgun from 'mailgun.js';
import FormData from 'form-data';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const apiKey = process.env.MAILGUN_API_KEY;
    const domain = process.env.MAILGUN_DOMAIN ?? 'itcoder.ca';
    const sender = process.env.MAILGUN_SENDER ?? 'support@itcoder.ca';

    if (!apiKey) {
      console.error('MAILGUN_API_KEY is not set');
      return NextResponse.json({ error: 'Mail service not configured' }, { status: 500 });
    }

    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({ username: 'api', key: apiKey });

    await mg.messages.create(domain, {
      from: `ITCoder Contact Form <${sender}>`,
      to: ['admin@itcoder.ca'],
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <h3>Message:</h3>
        <p>${escapeHtml(message)}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', detail: message },
      { status: 500 }
    );
  }
}
