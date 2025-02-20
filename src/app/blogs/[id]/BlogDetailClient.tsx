'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Heart, MessageCircle, Twitter, Github, Globe } from 'lucide-react';
import type { Blog_Detail } from '@/types/blog';

interface BlogDetailClientProps {
  blog: Blog_Detail;
}

function formatTextContent(htmlContent: string) {
  // Create section breaks for better readability
  const processedContent = htmlContent
    .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">')
    .replace(/<h3>/g, '<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">')
    .replace(/<p>/g, '<p class="text-gray-700 leading-relaxed mb-4">');
  
  return processedContent;
}

export default function BlogDetailClient({ blog }: BlogDetailClientProps) {
  const defaultImage = '/api/placeholder/400/300';

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-4xl mx-auto px-4">
        <Card className="overflow-hidden bg-white shadow-xl">
          {/* Cover Image */}
          <div className="relative w-full aspect-[2/1]">
            <Image
              src={blog.cover_image || blog.social_image || defaultImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="p-6 lg:p-12">
            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
              {blog.title}
            </h1>
            
            {/* Author and Meta Info */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative h-8 w-8 rounded-full overflow-hidden">
                <Image
                  src={blog.user.profile_image}
                  alt={blog.user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-medium text-gray-900">{blog.user.name}</span>
              <span className="text-gray-400">•</span>
              <time dateTime={blog.published_timestamp} className="text-gray-600">
                {blog.readable_publish_date}
              </time>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{blog.reading_time_minutes} min read</span>
              <span className="text-gray-400">•</span>
              <div className="flex items-center gap-1 text-gray-600">
                <Heart size={16} />
                <span>{blog.public_reactions_count}</span>
              </div>
            </div>

            {/* Tags */}
            {blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Blog Content */}
            <div className="space-y-6">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: formatTextContent(blog.body_html)
                }}
                className="prose prose-lg max-w-none
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-4
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 
                  prose-code:rounded prose-code:text-sm prose-code:text-gray-800
                  prose-pre:bg-gray-50 prose-pre:p-4 prose-pre:rounded-lg 
                  prose-pre:overflow-x-auto"
              />

              {/* Section Dividers */}
              <div className="my-8 border-t border-gray-200" />

              {/* Key Benefits Section */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Key Benefits:</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Simple, low friction deployment</li>
                  <li>Scaling and service management</li>
                  <li>Access to the add-on ecosystem</li>
                  <li>Security and governance features for enterprise use</li>
                </ul>
              </section>

              {/* Command Examples */}
              <section className="space-y-4 my-8">
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                  <div className="text-gray-600">~/project$ heroku create</div>
                  <div className="text-gray-600">~/project$ git push heroku main</div>
                </div>
              </section>
            </div>

            {/* Interaction Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
                  <Heart size={20} />
                  <span>{blog.positive_reactions_count} reactions</span>
                </button>
                <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
                  <MessageCircle size={20} />
                  <span>{blog.comments_count} comments</span>
                </button>
              </div>
            </div>
          </div>
        </Card>
      </article>
    </main>
  );
}