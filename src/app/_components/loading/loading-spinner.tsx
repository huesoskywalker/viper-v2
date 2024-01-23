import React, { HTMLAttributes } from 'react'
import { Icons } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

type Loading = HTMLAttributes<HTMLDivElement>
const LoadingSpinner: React.FC<Loading> = ({ className, ...props }) => {
   return (
      <div className={cn('flex items-center justify-center', className)} {...props}>
         <Icons.spinner className="h-6 w-6 animate-spin text-viper-dodger-blue" />
      </div>
   )
}

export default LoadingSpinner
