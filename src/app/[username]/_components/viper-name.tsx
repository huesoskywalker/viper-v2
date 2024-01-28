import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

type ViperNameProps = HTMLAttributes<HTMLSpanElement> & { name: string }
const ViperName: React.FC<ViperNameProps> = ({ className, children, name, ...props }) => {
   return (
      <div className="flex flex-1 items-center space-x-2 truncate">
         <span
            className={cn('text-lg font-semibold leading-5 text-foreground', className)}
            {...props}
         >
            {name}
         </span>
         {children}
      </div>
   )
}

export default ViperName
