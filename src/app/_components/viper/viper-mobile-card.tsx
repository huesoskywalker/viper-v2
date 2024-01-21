import React from 'react'
import { AvatarImage, Avatar } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { useSession } from 'next-auth/react'
import AtSymbol from './at-symbol'
import ViperName from '@/app/[username]/_components/viper-name'
import { redirect } from 'next/navigation'
import ViperUsername from '@/app/[username]/_components/viper-username'
import ViperVerified from '@/app/[username]/_components/viper-verified'
import ViperFollowCount from '@/app/[username]/_components/viper-follow-count'

const ViperMobileCard = () => {
   const { data: session } = useSession()
   if (!session) {
      redirect('/i/flow/login')
   }

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
                  <ViperName name={session.user.name} className="text-base">
                     <ViperVerified isVerified={session.user.verified} />
                  </ViperName>
                  <ViperUsername username={session.user.username} className="text-sm">
                     <AtSymbol />
                  </ViperUsername>
               </div>
            </div>
            <div className="grid-2 grid w-full grid-flow-col items-start justify-items-start">
               <ViperFollowCount
                  followCount={session.user.followings}
                  label="Followings"
                  className="text-xs"
               />
               <ViperFollowCount
                  followCount={session.user.followers}
                  label="Followers"
                  className="text-xs"
               />
            </div>
         </CardContent>
      </Card>
   )
}

export default ViperMobileCard
