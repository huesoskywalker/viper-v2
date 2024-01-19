import { Avatar, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import React from 'react'

const ViperImage = ({ username, image }: { username: string; image: string }) => {
   return (
      <div className="relative flex h-20 w-20 justify-center overflow-hidden rounded-full border-[3px] border-solid border-primary-foreground align-middle sm:h-24 sm:w-24 sm:border-4 xl:h-28 xl:w-28">
         {/* this is nice, clicking the image and opening it to catch a view */}
         <Link href={`${username}/photo`}>
            <Avatar className="h-full w-full">
               <AvatarImage
                  width={135}
                  height={135}
                  src={image}
                  alt="Profile Image"
                  loading="lazy"
               />
            </Avatar>
         </Link>
      </div>
   )
}

export default ViperImage
