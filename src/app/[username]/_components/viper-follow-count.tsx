import { cn } from '@/lib/utils'
import React, { ComponentPropsWithoutRef } from 'react'

type FollowCount = ComponentPropsWithoutRef<'div'> & {
   followCount: number
   label: 'Followings' | 'Followers'
}
const ViperFollowCount: React.FC<FollowCount> = ({ className, followCount, label, ...props }) => {
   return (
      <div className={cn('flex items-center space-x-1 text-xs font-normal', className)} {...props}>
         <span className="font-semibold text-foreground">{followCount}</span>
         <span className=" text-muted-foreground">{label}</span>
      </div>
   )
}

export default ViperFollowCount
