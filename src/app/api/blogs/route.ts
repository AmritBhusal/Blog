import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://dev.to/api/articles', {
      signal: AbortSignal.timeout(5000), 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Invalid data format received');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
