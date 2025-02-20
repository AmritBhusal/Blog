'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-lg bg-primary p-2 dark:bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-white dark:text-primary"
              >
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.586 7.586" />
                <path d="M11 11l-4 4" />
              </svg>
            </div>
            <span className="hidden text-xl font-bold text-gray-900 dark:text-white sm:inline-block">
              DevBlog
            </span>
          </Link>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle theme"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>
      </div>
    </nav>
  );
}