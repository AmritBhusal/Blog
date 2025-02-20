import BlogList from '@/components/Blog/BlogList';
import { Suspense } from 'react';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function getBlogs() {
  try {
    // Add 5-second delay (optional)
    await delay(5000);

    const res = await fetch('http://localhost:3000/api/blogs', {
      next: { revalidate: 60 }, // Ensure server-side caching behavior
    });

    if (!res.ok) {
      throw new Error('Failed to fetch blogs');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return null; // Prevents crashing
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<BlogList blogs={[]} isLoading={true} />}>
        {blogs ? <BlogList blogs={blogs} isLoading={false} /> : <p>Failed to load blogs.</p>}
      </Suspense>
    </main>
  );
}
