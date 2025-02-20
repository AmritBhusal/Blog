import { Skeleton } from "@/components/ui/skeleton";

const BlogSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row md:h-64 rounded-lg border bg-card text-card-foreground shadow-sm">
      {/* Left side - Image skeleton */}
      <div className="relative w-full md:w-1/3 h-48 md:h-full">
        <Skeleton className="h-full w-full rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
      </div>

      {/* Right side - Content skeleton */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-start mb-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-20" />
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        <div className="flex justify-between items-center mt-6">
          <Skeleton className="h-4 w-24" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSkeleton;