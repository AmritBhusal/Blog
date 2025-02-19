import BlogList from '@/components/Blog/BlogList';

async function getBlogs() {
  const res = await fetch('http://localhost:3000/api/blogs', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return res.json();
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  
  return (
    <main>
      <BlogList blogs={blogs} />
    </main>
  );
}

