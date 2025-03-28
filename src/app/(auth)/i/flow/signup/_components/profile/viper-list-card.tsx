import ViperBio from '@/app/[username]/_components/viper-bio'
import ViperName from '@/app/[username]/_components/viper-name'
import ViperUsername from '@/app/[username]/_components/viper-username'
import ViperVerified from '@/app/[username]/_components/viper-verified'
import AtSymbol from '@/app/_components/viper/at-symbol'
import ToggleFollow from '@/app/_components/viper/toggle-follow'
import { getCurrentSession } from '@/app/_utils/get-current-viper'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { preloadViperService } from '@/services/servicesInitializer'
import { ViperBasic } from '@/types/viper'
import { Suspense } from 'react'

const ViperListCard = async ({ viper }: { viper: ViperBasic }) => {
   const session = await getCurrentSession()

   const viperBio = viper.bio.length > 80 ? viper.bio.slice(0, 80) + '...' : viper.bio

   preloadViperService.isFollowing(String(viper._id), session._id)

   return (
      <>
         <Card key={String(viper._id)} className="border-none bg-background">
            <CardContent className="relative grid p-0">
               <div className="flex items-start space-x-2 overflow-hidden p-0 sm:space-x-3">
                  <Avatar className="static left-0 top-0">
                     <AvatarImage
                        src={viper.image}
                        alt="Viper profile"
                        loading="lazy"
                        width={40}
                        height={40}
                     />
                     <AvatarFallback>Profile</AvatarFallback>
                  </Avatar>
                  <div className="flex w-full flex-col overflow-hidden">
                     <div className="mb-1 flex items-center justify-between ">
                        <div className="flex flex-col overflow-hidden">
                           <ViperName name={viper.name} className="text-sm sm:text-base">
                              <ViperVerified isVerified={viper.verified} />
                           </ViperName>
                           <ViperUsername
                              username={viper.username}
                              className="text-[17px] sm:text-sm"
                           >
                              <AtSymbol />
                           </ViperUsername>
                        </div>
                        <Suspense fallback={<Skeleton className={'h-8 w-20 rounded-3xl'} />}>
                           <ToggleFollow viperId={String(viper._id)} sessionId={session._id} />
                        </Suspense>
                     </div>
                     <ViperBio bio={viperBio} className="text-[17px] text-gray-200" />
                  </div>
               </div>
            </CardContent>
         </Card>
      </>
   )
}

export default ViperListCard
