'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import type { Blog_Detail } from '@/types/blog';

interface BlogDetailClientProps {
  blog: Blog_Detail;
}

export default function BlogDetailClient({ blog }: BlogDetailClientProps) {
  const defaultImage = '/api/placeholder/400/300';

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Card className="overflow-hidden bg-white">
        {/* Cover Image */}
        <div className="relative w-full h-72 md:h-96">
          <Image
            src={blog.cover_image || blog.social_image || defaultImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="p-6 md:p-10">
          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
            {blog.title}
          </h1>
          
          {/* Author and Meta Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Image
                src={blog.user.profile_image}
                alt={blog.user.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <span className="font-medium text-gray-900">{blog.user.name}</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span>{blog.readable_publish_date}</span>
              <span>•</span>
              <span>{blog.reading_time_minutes} min read</span>
              <span>•</span>
              <span>{blog.public_reactions_count} reactions</span>
              <span>•</span>
              <span>{blog.comments_count} comments</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Blog Content */}
          <div 
            dangerouslySetInnerHTML={{ __html: blog.body_html }}
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mb-4
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
              prose-li:my-2 prose-li:text-gray-700
              prose-blockquote:border-l-4 prose-blockquote:border-gray-300 
              prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6
              prose-blockquote:text-gray-700
              prose-pre:bg-gray-50 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
              prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 
              prose-code:rounded prose-code:text-sm
              prose-img:rounded-lg prose-img:my-8"
          />

          {/* Interaction Stats */}
          <div className="mt-12 pt-6 border-t border-gray-200 flex flex-wrap items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2 hover:text-gray-900 transition-colors cursor-pointer">
              <span className="text-xl">💖</span>
              <span className="font-medium">{blog.positive_reactions_count} reactions</span>
            </div>
            <div className="flex items-center gap-2 hover:text-gray-900 transition-colors cursor-pointer">
              <span className="text-xl">💬</span>
              <span className="font-medium">{blog.comments_count} comments</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}