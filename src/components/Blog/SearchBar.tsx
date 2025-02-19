'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const debouncedSearch = useDebounce((value: string) => {
    onSearch(value);
  }, 300);

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search blogs..."
        className="pl-10 w-full"
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;