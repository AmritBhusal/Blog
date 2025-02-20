
import BlogList from '@/components/Blog/BlogList';
import { Suspense } from 'react';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function getBlogs() {
  try {
    // Add 5 second delay
    await delay(5000);
    
    const res = await fetch('http://localhost:3000/api/blogs', { 
      cache: 'no-store' 
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch blogs');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<BlogList blogs={[]} isLoading={true} />}>
        <BlogList blogs={blogs} isLoading={false} />
      </Suspense>
    </main>
  );
}