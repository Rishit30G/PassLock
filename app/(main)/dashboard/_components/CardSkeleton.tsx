import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-10">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
        <Skeleton
          className="min-h-[180px] w-full rounded-lg shadow-2xl shadow-blue-500/20 dark:shadow-blue-500/10 relative"
          key={item}
        >
          <Skeleton className="flex flex-col justify-end h-full p-5">
            <div className="flex items-center justify-between gap-5 w-full">
              <div className="flex items-start flex-col gap-2">
                <Skeleton className="h-5 w-40"></Skeleton>
                <Skeleton className="h-5 w-20"></Skeleton>
              </div>
              <div className="flex items-center justify-center">
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
            </div>
          </Skeleton>
        </Skeleton>
      ))}
    </div>
  );
};

export default CardSkeleton;
