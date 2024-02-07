import { cn } from '@/lib/utils'
import React, { ComponentPropsWithoutRef } from 'react'

type DragAndDrop = ComponentPropsWithoutRef<'div'>

const DragAndDropBorder: React.FC<DragAndDrop> = ({ className, ...props }) => {
   return (
      <div
         className={cn(
            `absolute inset-0 z-30 h-full w-full  border-[3px] border-dashed border-viper-blue`,
            className,
         )}
      />
   )
}

export default DragAndDropBorder
