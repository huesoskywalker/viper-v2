import LoadingSpinner from '@/app/_components/loading/loading-spinner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

const ViperImage = ({ image }: { image: string }) => {
   return (
      <Avatar className="h-full w-full">
         <AvatarImage
            width={135}
            height={135}
            src={image}
            alt="Profile Image"
            loading="lazy"
            className="object-cover"
         />
         <AvatarFallback className="bg-background">
            <LoadingSpinner></LoadingSpinner>
         </AvatarFallback>
      </Avatar>
   )
}

export default ViperImage
