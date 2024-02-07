import React, { ComponentPropsWithoutRef } from 'react'
import { Icons } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

type Loading = ComponentPropsWithoutRef<'div'>

const LoadingSpinner: React.FC<Loading> = ({ className, ...props }) => {
   return (
      <div
         className={cn('flex w-full items-center justify-center bg-background', className)}
         {...props}
      >
         <Icons.spinner className="h-6 w-6 animate-spin text-viper-dodger-blue" />
      </div>
   )
}

export default LoadingSpinner
