import { Skeleton } from "./Skeleton";

export function GameCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111]">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-6">
        <div className="flex justify-between gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="mt-4 h-12 w-full" />
        <Skeleton className="mt-6 h-5 w-24" />
      </div>
    </div>
  );
}

export function NewsCardSkeleton() {
  return (
    <div>
      <Skeleton className="mb-5 aspect-[16/10] w-full rounded-2xl" />
      <div className="flex gap-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="mt-3 h-8 w-3/4" />
      <Skeleton className="mt-2 h-16 w-full" />
      <Skeleton className="mt-4 h-5 w-20" />
    </div>
  );
}
