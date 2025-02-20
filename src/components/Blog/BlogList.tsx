'use client';

import React, { useState, useMemo } from 'react';
import { subDays } from 'date-fns';
import Cookies from 'js-cookie';
import type { Blog } from '@/types/blog';
import BlogCard from '../card/BlogCard';
import BlogPagination from '../Pagination';
import BlogSkeleton from '../../app/loading';
import SearchBar from './SearchBar';
import { Skeleton } from "@/components/ui/skeleton";
import ActiveFilters from './ActiveFilters';
import FilterBar from './FilterBar';

interface BlogListProps {
  blogs: Blog[];
  isLoading?: boolean;
}

const ITEMS_PER_PAGE = 5;

const BlogList: React.FC<BlogListProps> = ({ blogs, isLoading = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [showLikedOnly, setShowLikedOnly] = useState(false);

  const getLikedBlogs = () => {
    const likedBlogs = Cookies.get('likedBlogs');
    return likedBlogs ? JSON.parse(likedBlogs) : [];
  };

  const filteredBlogs = useMemo(() => {
    let filtered = [...blogs];

    if (searchQuery) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (dateFilter !== 'all') {
      const now = new Date();
      const dateConstraints = {
        today: subDays(now, 1),
        week: subDays(now, 7),
        month: subDays(now, 30)
      };

      filtered = filtered.filter(blog => {
        const blogDate = new Date(blog.published_at);
        return blogDate >= dateConstraints[dateFilter as keyof typeof dateConstraints];
      });
    }

    if (showLikedOnly) {
      const likedBlogIds = getLikedBlogs();
      filtered = filtered.filter(blog => likedBlogIds.includes(blog.id));
    }

    return filtered;
  }, [blogs, searchQuery, dateFilter, showLikedOnly]);

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setDateFilter('all');
    setShowLikedOnly(false);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {isLoading ? (
        <Skeleton className="h-10 w-48 mb-8" />
      ) : (
        <h1 className="text-3xl font-bold mb-8">Latest Blog Posts</h1>
      )}
      
      <div className="space-y-4 mb-8">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-[180px]" />
              <Skeleton className="h-10 w-[120px]" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-4">
              <SearchBar
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <FilterBar
                dateFilter={dateFilter}
                showLikedOnly={showLikedOnly}
                onDateFilterChange={(value) => {
                  setDateFilter(value);
                  setCurrentPage(1);
                }}
                onLikedFilterChange={() => {
                  setShowLikedOnly(!showLikedOnly);
                  setCurrentPage(1);
                }}
              />
            </div>

            <ActiveFilters
              searchQuery={searchQuery}
              dateFilter={dateFilter}
              showLikedOnly={showLikedOnly}
              onClearSearch={() => setSearchQuery('')}
              onClearDateFilter={() => setDateFilter('all')}
              onClearLikedFilter={() => setShowLikedOnly(false)}
              onClearAll={clearFilters}
            />
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