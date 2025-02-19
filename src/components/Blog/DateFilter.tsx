'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateFilterProps {
  onFilterChange: (value: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onFilterChange }) => {
  return (
    <Select onValueChange={onFilterChange} defaultValue="all">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by date" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Time</SelectItem>
        <SelectItem value="today">Today</SelectItem>
        <SelectItem value="week">This Week</SelectItem>
        <SelectItem value="month">This Month</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DateFilter;