import BlogList from '@/components/Blog/BlogList';
import { Suspense } from 'react';
import Loading from "./loading";

async function getBlogs() {
  try {
    const response = await fetch('https://dev.to/api/articles', {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 }, 
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error; 
  }
}

// A separate component for handling suspense
async function BlogListWrapper() {
  const blogs = await getBlogs();

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogList blogs={blogs} isLoading={false} />
    </div>
  );
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<Loading />}>
        <BlogListWrapper />
      </Suspense>
    </main>
  );
}

