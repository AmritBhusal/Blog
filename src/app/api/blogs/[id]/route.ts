import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    const response = await fetch(`https://dev.to/api/articles/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch blog: ${response.statusText}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog details:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
