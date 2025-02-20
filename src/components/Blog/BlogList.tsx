'use client';

import React, { useState, useMemo } from 'react';
import type { Blog } from '@/types/blog';
import SearchBar from './SearchBar';
import DateFilter from './DateFilter';
import BlogCard from '../card/BlogCard';
import BlogPagination from '../Pagination';
import BlogSkeleton from './BlogSkeleton';
import { Skeleton } from "@/components/ui/skeleton";

interface BlogListProps {
  blogs: Blog[];
  isLoading?: boolean;
}

const ITEMS_PER_PAGE = 5;

const BlogList: React.FC<BlogListProps> = ({ blogs, isLoading = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredBlogs = useMemo(() => {
    let filtered = [...blogs];

    if (searchQuery) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const now = new Date();
    switch (dateFilter) {
      case 'today':
        filtered = filtered.filter(blog => {
          const blogDate = new Date(blog.published_at);
          return blogDate.toDateString() === now.toDateString();
        });
        break;
      case 'week':
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        filtered = filtered.filter(blog => {
          const blogDate = new Date(blog.published_at);
          return blogDate >= weekAgo;
        });
        break;
      case 'month':
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        filtered = filtered.filter(blog => {
          const blogDate = new Date(blog.published_at);
          return blogDate >= monthAgo;
        });
        break;
    }

    return filtered;
  }, [blogs, searchQuery, dateFilter]);

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleDateFilter = (value: string) => {
    setDateFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {isLoading ? (
        <Skeleton className="h-10 w-48 mb-8" />
      ) : (
        <h1 className="text-3xl font-bold mb-8">Latest Blog Posts</h1>
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        {isLoading ? (
          <>
            <Skeleton className="h-10 w-full max-w-md" />
            <Skeleton className="h-10 w-[180px]" />
          </>
        ) : (
          <>
            <SearchBar onSearch={handleSearch} />
            <DateFilter onFilterChange={handleDateFilter} />
          </>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-6 mb-8">
          {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
            <BlogSkeleton key={index} />
          ))}
        </div>
      ) : currentBlogs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No blogs found matching your criteria
        </div>
      ) : (
        <div className="space-y-6 mb-8">
          {currentBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}

      {!isLoading && filteredBlogs.length > ITEMS_PER_PAGE && (
        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default BlogList;