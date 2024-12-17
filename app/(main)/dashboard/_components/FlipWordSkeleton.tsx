import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const FlipWordSkeleton = () => {
  return (
    <span>
        <Skeleton className="h-[50px] w-80 max-lg:w-60" />
    </span>
  )
}

export default FlipWordSkeleton