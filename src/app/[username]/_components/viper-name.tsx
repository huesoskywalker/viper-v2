import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

type ViperNameProps = HTMLAttributes<HTMLSpanElement> & { name: string }
const ViperName: React.FC<ViperNameProps> = ({ className, children, name, ...props }) => {
   return (
      <div className="flex min-w-0 flex-1 items-center space-x-2">
         <span
            className={cn('truncate text-xl font-semibold text-foreground', className)}
            {...props}
         >
            {name}
         </span>
         {children}
      </div>
   )
}

export default ViperName
