import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Skeleton className="h-64 w-full mb-8" />
      <Skeleton className="h-10 w-3/4 mb-4" />
      <Skeleton className="h-6 w-1/4 mb-8" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}