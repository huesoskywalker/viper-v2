import ToggleFollowButton from '@/app/_components/toggle-follow-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { auth } from '@/lib/auth'
import { viperService } from '@/services/servicesInitializer'
import { ViperBasicProps } from '@/types/viper'

const ViperListCard = async ({ viper }: { viper: ViperBasicProps }) => {
   const session = await auth()
   if (!session) {
      throw new Error(`Authentication session not found. Please log in.`)
   }
   const isFollowing = await viperService.isFollowing(String(viper._id), session.user.id)
   return (
      <>
         <Card key={String(viper._id)} className="border-none bg-black">
            <CardContent className="relative grid p-0">
               <div className="flex items-start space-x-3 p-0">
                  <Avatar className="static left-0 top-0">
                     <AvatarImage src={viper.image} />
                     <AvatarFallback>Profile</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-grow flex-col">
                     <div className="mb-1 flex items-center justify-between">
                        <div>
                           <span className="font-bold">{viper.name}</span>
                           <span className="block text-sm text-muted-foreground">
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
                     <p className="text-sm text-gray-200">{viper.bio}</p>
                  </div>
               </div>
            </CardContent>
         </Card>
      </>
   )
}

export default ViperListCard
