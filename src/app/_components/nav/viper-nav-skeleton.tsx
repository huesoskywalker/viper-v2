import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ViperNavSkeleton = () => {
   return (
      <div className="hidden w-fit items-center space-x-4 sm:relative sm:mb-3 sm:flex">
         <Skeleton className={`h-12 w-12 rounded-full`} />
         <div className="hidden space-y-2 xl:block">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
         </div>
      </div>
   )
}

export default ViperNavSkeleton
