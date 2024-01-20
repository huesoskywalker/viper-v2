import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

type FollowCount = HTMLAttributes<HTMLDivElement> & {
   followCount: number
   label: 'Followings' | 'Followers'
}
const ViperFollowCount: React.FC<FollowCount> = ({ className, followCount, label, ...props }) => {
   return (
      <div className={cn('flex items-center space-x-1 text-sm font-normal', className)} {...props}>
         <span className="font-semibold text-foreground">{followCount}</span>
         <span className=" text-muted-foreground">{label}</span>
      </div>
   )
}

export default ViperFollowCount
