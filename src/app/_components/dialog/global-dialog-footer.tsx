import { DialogFooter } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import React, { ComponentPropsWithoutRef } from 'react'

type DialogFooterProps = ComponentPropsWithoutRef<'div'>

const GlobalDialogFooter: React.FC<DialogFooterProps> = ({ className, children, ...props }) => {
   return (
      <DialogFooter
         className={cn('mb-6 flex w-full flex-col gap-2 px-8 sm:px-16', className)}
         {...props}
      >
         {children}
      </DialogFooter>
   )
}

export default GlobalDialogFooter
