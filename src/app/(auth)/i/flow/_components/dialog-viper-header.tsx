import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'

type ViperHeader = ComponentPropsWithoutRef<'div'>

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
