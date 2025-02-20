import BlogDetailClient from './BlogDetailClient';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getBlogDetail(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog details: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching blog details:', error);
    return null; // Prevents page crashes
  }
}


interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  if (!params?.id) {
    return <p>Invalid blog ID</p>;
  }

  const blogData = await getBlogDetail(params.id);

  if (!blogData) {
    return <p>Failed to load blog details.</p>;
  }

  return <BlogDetailClient blog={blogData} />;
}
