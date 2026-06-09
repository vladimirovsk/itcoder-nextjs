import { NextRequest, NextResponse } from 'next/server';

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

    const apiKey = process.env.BACKEND_LEADS_API_KEY;
    const apiUrl = process.env.NEXT_PUBLIC_API ?? 'https://api-rest.it-coder.com/api/v1';

    const response = await fetch(`${apiUrl}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey ?? '',
      },
      body: JSON.stringify({
        name: `${firstName} ${lastName}`,
        email,
        phone: phone || undefined,
        note: message,
        source: 'itcoder-contact',
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Backend lead error:', response.status, detail);
      return NextResponse.json(
        { error: 'Failed to send email', detail },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error submitting lead:', error);
    return NextResponse.json(
      { error: 'Failed to send email', detail: message },
      { status: 500 }
    );
  }
}
