'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ActiveFiltersProps {
  searchQuery: string;
  dateFilter: string;
  showLikedOnly: boolean;
  onClearSearch: () => void;
  onClearDateFilter: () => void;
  onClearLikedFilter: () => void;
  onClearAll: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  searchQuery,
  dateFilter,
  showLikedOnly,
  onClearSearch,
  onClearDateFilter,
  onClearLikedFilter,
  onClearAll,
}) => {
  const hasActiveFilters = searchQuery || dateFilter !== 'all' || showLikedOnly;

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {searchQuery && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Search: {searchQuery}
          <X className="w-3 h-3 cursor-pointer" onClick={onClearSearch} />
        </Badge>
      )}
      {dateFilter !== 'all' && (
        <Badge variant="secondary" className="flex items-center gap-1">
          {dateFilter.charAt(0).toUpperCase() + dateFilter.slice(1)}
          <X className="w-3 h-3 cursor-pointer" onClick={onClearDateFilter} />
        </Badge>
      )}
      {showLikedOnly && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Liked Only
          <X className="w-3 h-3 cursor-pointer" onClick={onClearLikedFilter} />
        </Badge>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="text-red-500 hover:text-red-700"
      >
        Clear All
      </Button>
    </div>
  );
};

export default ActiveFilters;