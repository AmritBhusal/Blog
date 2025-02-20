import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`https://dev.to/api/articles/${params.id}`, {
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
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

    return NextResponse.json(
      { error: 'Failed to fetch blog details' },
      { status: 500 }
    );
  }
}