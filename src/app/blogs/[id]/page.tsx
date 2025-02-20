import { Suspense } from 'react';
import BlogDetailClient from './BlogDetailClient';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getBlogDetail(id: string) {
  try {
    const response = await fetch(`https://dev.to/api/articles/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog details: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching blog details:', error);
    throw error;
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  try {
    const { id } = await params; 

    if (!id) {
      throw new Error('Blog ID is required');
    }

    const blogData = await getBlogDetail(id);

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <BlogDetailClient blog={blogData} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error in BlogDetailPage:', error);
    return <div className="p-4 text-red-500">Failed to load blog details.</div>;
  }
}
