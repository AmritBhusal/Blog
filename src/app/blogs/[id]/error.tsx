'use client';

import { useEffect } from 'react';
import { Card } from '@/components/ui/card';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Card className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Something went wrong!</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => reset()}
        >
          Try again
        </button>
      </Card>
    </div>
  );
}