'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import Cookies from 'js-cookie';
import type { Blog } from '@/types/blog';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const defaultImage = '/api/placeholder/400/300';
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Check if this blog is liked on component mount
    const likedBlogs = Cookies.get('likedBlogs');
    if (likedBlogs) {
      const likedBlogsArray = JSON.parse(likedBlogs);
      setIsLiked(likedBlogsArray.includes(blog.id));
    }
  }, [blog.id]);

  const handleLike = () => {
    const likedBlogs = Cookies.get('likedBlogs');
    let likedBlogsArray = likedBlogs ? JSON.parse(likedBlogs) : [];

    if (isLiked) {
      // Remove from liked blogs
      likedBlogsArray = likedBlogsArray.filter((id: string) => id !== blog.id);
    } else {
      // Add to liked blogs
      likedBlogsArray.push(blog.id);
    }

    // Update cookie with new likes (expires in 30 days)
    Cookies.set('likedBlogs', JSON.stringify(likedBlogsArray), { expires: 30 });
    setIsLiked(!isLiked);
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden bg-white">
      <div className="flex flex-col md:flex-row md:h-64">
        {/* Left side - Image */}
        <div className="relative w-full md:w-2/5 h-48 md:h-full group">
          <Image
            src={blog.cover_image || blog.social_image || defaultImage}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
        </div>

        {/* Right side - Content */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <Link href={`/blogs/${blog.id}`} className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                {blog.title}
              </h3>
            </Link>
            <button
              onClick={handleLike}
              className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label={isLiked ? 'Unlike post' : 'Like post'}
            >
              <Heart
                className={`w-5 h-5 transition-colors duration-200 ${
                  isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <div className="relative w-8 h-8">
              <Image
                src={blog.user.profile_image}
                alt={blog.user.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">{blog.user.name}</span>
              <span className="text-xs text-gray-500">{blog.readable_publish_date}</span>
            </div>
          </div>

          <p className="text-gray-600 line-clamp-2 mb-4 flex-grow">
            {blog.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Link 
              href={`/blogs/${blog.id}`}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 group"
            >
              Read more
              <span className="transform transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {blog.reading_time_minutes} min read
              </span>
              <div className="flex gap-2">
                {blog.tag_list.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;