import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.BACKEND_LEADS_API_KEY ?? '',
      },
      body: JSON.stringify(body),
    });

    // 409 = email already exists; treat as success so the user isn't blocked
    if (response.status === 409) {
      return NextResponse.json({ success: true });
    }

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: data.message ?? 'Failed to submit' },
        { status: response.status },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
