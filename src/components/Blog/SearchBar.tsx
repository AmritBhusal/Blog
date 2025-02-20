'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search blogs..."
        value={value}
        onChange={onChange}
        className="pl-10"
      />
    </div>
  );
};

export default SearchBar;