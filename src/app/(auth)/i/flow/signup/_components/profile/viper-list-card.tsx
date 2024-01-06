import ToggleFollowButton from '@/app/_components/viper/toggle-follow-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { auth } from '@/lib/auth'
import { viperService } from '@/services/servicesInitializer'
import { ViperBasic } from '@/types/viper'

const ViperListCard = async ({ viper }: { viper: ViperBasic }) => {
   const session = await auth()
   if (!session) {
      throw new Error(`Authentication session not found. Please log in.`)
   }
   const isFollowing = await viperService.isFollowing(String(viper._id), session.user.id)

   const viperBio = viper.bio.length > 80 ? viper.bio.slice(0, 80) + '...' : viper.bio

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
                           <span className="flex-1 overflow-hidden overflow-ellipsis text-sm font-bold sm:text-base">
                              {viper.name}
                           </span>
                           <span className="flex-1 overflow-hidden overflow-ellipsis text-[17px] text-muted-foreground sm:text-sm">
                              <span className="align-text-top text-xs text-muted-foreground">
                                 @
                              </span>
                              {viper.username}
                           </span>
                        </div>
                        <ToggleFollowButton
                           isFollowing={isFollowing}
                           viperId={String(viper._id)}
                        />
                     </div>
                     <p className="text-[17px] text-gray-200">{viperBio}</p>
                  </div>
               </div>
            </CardContent>
         </Card>
      </>
   )
}

export default ViperListCard
