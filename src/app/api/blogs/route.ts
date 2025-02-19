import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://dev.to/api/articles');
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}