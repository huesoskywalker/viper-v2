import ToggleFollowButton from '@/app/_components/toggle-follow-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { viperService } from '@/services/servicesInitializer'

const ProfileFirstFollowing = async () => {
   const vipers = await viperService.getAll()
   return (
      <>
         <DialogTitle className="mt-2 text-3xl font-bold text-primary ">
            Don't miss out
         </DialogTitle>
         <DialogDescription>
            When you follow someone, you'll see their posts, events and engagement in your
            Timeline. You'll also get more relevant recommendations.
         </DialogDescription>
         <div className="p-2">
            <h1 className="text-md pb-4 font-sans font-bold text-primary">
               Follow 1 or more accounts
            </h1>
            <div className="flex w-full flex-col justify-center space-y-3">
               {vipers.map((viper) => (
                  <Card key={JSON.stringify(viper._id)} className="border-none bg-black">
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
                                 <ToggleFollowButton username={viper.username} />
                              </div>
                              <p className="text-sm text-gray-200">{viper.bio}</p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>
      </>
   )
}

export default ProfileFirstFollowing
