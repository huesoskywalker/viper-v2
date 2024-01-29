import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React from 'react'

const ViperImage = ({
   image,
   width,
   height,
   className,
}: {
   image: string
   width: number
   height: number
   className?: string
}) => {
   return (
      <Avatar className="h-fit w-fit bg-background">
         <AvatarImage
            width={width}
            height={height}
            src={image}
            alt="Profile Image"
            loading="lazy"
            className={cn('object-cover', className)}
         />
         <AvatarFallback>
            <Skeleton className={`h-full w-full rounded-full  `} />
         </AvatarFallback>
      </Avatar>
   )
}

export default ViperImage
