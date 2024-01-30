import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

type DragAndDrop = HTMLAttributes<HTMLDivElement>

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
