import type { Blog_Detail } from '@/types/blog';
import BlogDetailClient from './BlogDetailClient';

async function getBlogDetail(id: string) {
  try {
    const response = await fetch(`https://dev.to/api/articles/${id}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error('Failed to fetch blog details');
    }

    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch blog details');
  }
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const blogData = await getBlogDetail(params.id);
  
  return <BlogDetailClient blog={blogData} />;
}