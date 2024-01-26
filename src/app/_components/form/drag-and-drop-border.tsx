import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

type DragAndDrop = HTMLAttributes<HTMLDivElement> & { isDragActive: boolean }

const DragAndDropBorder: React.FC<DragAndDrop> = ({ className, isDragActive, ...props }) => {
   return (
      <div
         className={cn(
            isDragActive &&
               `absolute inset-0 z-30 h-full w-full rounded-full border-4 border-dashed border-viper-blue`,
            className,
         )}
      />
   )
}

export default DragAndDropBorder
