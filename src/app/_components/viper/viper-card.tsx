import React from 'react'
import { AvatarImage, Avatar } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { useSession } from 'next-auth/react'
import AtSymbol from './at-symbol'

const ViperCard = () => {
   const { data: session } = useSession()
   return (
      <Card className="border-none bg-background">
         <CardContent className="flex flex-col items-start justify-start space-y-2 p-0">
            <div>
               <Avatar>
                  <AvatarImage
                     width={44}
                     height={44}
                     className="h-9 w-9 rounded-full p-0 xl:h-10 xl:w-10"
                     src={session?.user.image}
                     alt="Profile preview"
                     loading="eager"
                  />
               </Avatar>
               <div className="flex flex-col items-start justify-start">
                  <span className="text-base font-semibold text-foreground">
                     {session?.user.name}
                  </span>
                  <span className="text-sm font-normal text-muted-foreground">
                     <AtSymbol />
                     {session?.user.username}
                  </span>
               </div>
            </div>
            <div className="grid-2 grid w-full grid-flow-col items-start justify-items-start">
               <div className="flex items-center space-x-1 text-xs font-normal">
                  <span className="font-semibold text-foreground">{session?.user.followings}</span>
                  <span className=" text-muted-foreground">Following</span>
               </div>
               <div className="flex items-center space-x-1 text-xs font-normal">
                  <span className="font-semibold text-foreground">{session?.user.followers}</span>
                  <span className=" text-muted-foreground">Followers</span>
               </div>
            </div>
         </CardContent>
      </Card>
   )
}

export default ViperCard
