import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://dev.to/api/articles', {
      signal: AbortSignal.timeout(5000) 
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
    if (error instanceof TypeError) {
      return NextResponse.json(
        { error: 'Network or parsing error occurred' },
        { status: 503 }
      );
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timed out' },
        { status: 408 }
      );
    }

    if (error instanceof Error) {
      console.error('API Error:', error.message);
      
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}