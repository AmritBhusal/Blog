'use client';

import React from 'react';
import { Heart, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  dateFilter: string;
  showLikedOnly: boolean;
  onDateFilterChange: (value: string) => void;
  onLikedFilterChange: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  dateFilter,
  showLikedOnly,
  onDateFilterChange,
  onLikedFilterChange,
}) => {
  return (
    <div className="flex gap-4">
      <Select value={dateFilter} onValueChange={onDateFilterChange}>
        <SelectTrigger className="w-[180px]">
          <Calendar className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Filter by date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant={showLikedOnly ? "secondary" : "outline"}
        onClick={onLikedFilterChange}
        className="flex items-center gap-2"
      >
        <Heart className={`w-4 h-4 ${showLikedOnly ? "fill-current" : ""}`} />
        Liked
      </Button>
    </div>
  );
};

export default FilterBar;