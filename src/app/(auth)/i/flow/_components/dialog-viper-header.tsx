import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

type ViperHeader = HTMLAttributes<HTMLDivElement>
const DialogViperHeader: React.FC<ViperHeader> = ({ className, children, ...props }) => {
   return (
      <div
         className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
         {...props}
      >
         {children}
      </div>
   )
}

export default DialogViperHeader
