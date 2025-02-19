'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import type { Blog } from '@/types/blog';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const defaultImage = '/api/placeholder/400/300'; // Placeholder image URL

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row md:h-64">
        {/* Left side - Image */}
        <div className="relative w-full md:w-1/3 h-48 md:h-full">
          <Image
            src={blog.cover_image || blog.social_image || defaultImage}
            alt={blog.title}
            fill
            className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>

        {/* Right side - Content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold hover:text-blue-600 cursor-pointer line-clamp-2">
              {blog.title}
            </h3>
            <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
              {blog.readable_publish_date}
            </span>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <Image
              src={blog.user.profile_image}
              alt={blog.user.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <p className="text-sm text-gray-500">By {blog.user.name}</p>
          </div>

          <p className="text-gray-600 line-clamp-2 mb-4">
            {blog.description}
          </p>

          <div className="flex justify-between items-center mt-auto">
            <button 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
              onClick={() => window.open(blog.url, '_blank')}
            >
              Read more
              <span className="text-lg">→</span>
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {blog.reading_time_minutes} min read
              </span>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-500">
                  {blog.tag_list.slice(0, 2).join(', ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;