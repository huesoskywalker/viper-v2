import { cn } from '@/lib/utils'
import { Camera } from 'lucide-react'
import React, { HTMLAttributes } from 'react'

type CameraIcon = HTMLAttributes<HTMLDivElement>

const CameraEditIcon: React.FC<CameraIcon> = ({ className, ...props }) => {
   return (
      <div
         className={cn(
            'absolute z-10 flex cursor-pointer items-center justify-center rounded-full  bg-black/50 p-[1.35rem] duration-300 ease-in-out hover:bg-black/30',
            className,
         )}
      >
         <Camera className="absolute z-20 text-gray-300" size={27} strokeWidth={1.5} />
      </div>
   )
}

export default CameraEditIcon
