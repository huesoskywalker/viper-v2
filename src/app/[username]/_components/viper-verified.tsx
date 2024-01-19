import { cn } from '@/lib/utils'
import { BadgeCheck } from 'lucide-react'
import React from 'react'

const ViperVerified = ({ isVerified, className }: { isVerified: boolean; className?: string }) => {
   return (
      <>
         {isVerified && (
            <BadgeCheck
               className={cn('h-5 w-5', className)}
               color="black"
               fill="hsl(204, 87.6%, 52.7%)"
            />
         )}
      </>
   )
}

export default ViperVerified
