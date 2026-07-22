import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log(`GET request received at ${request.url}`);
  try {
    const apiKey = process.env.PROJECT_BUILDER_API_KEY;
    const apiUrl =
      process.env.NEXT_PUBLIC_API ??
      'https://api-rest.it-coder.com/api/v1';

    const response = await fetch(`${apiUrl}/project-builder/steps`, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey ?? '',
      },
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Backend error (fetching steps):', response.status, detail);
      return NextResponse.json(
        { error: 'Failed to fetch steps', detail },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/project-builder/steps:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
