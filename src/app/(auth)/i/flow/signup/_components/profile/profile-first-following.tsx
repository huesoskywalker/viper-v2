import { DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { viperService } from '@/services/servicesInitializer'
import ViperListCard from './viper-list-card'

const ProfileFirstFollowing = async () => {
   const vipers = await viperService.getAllBasic()
   return (
      <>
         <DialogTitle className="mt-2 text-2xl font-bold text-foreground sm:text-3xl ">
            Don&apos;t miss out
         </DialogTitle>
         <DialogDescription>
            When you follow someone, you&apos;ll see their posts, events and engagement in your
            Timeline. You&apos;ll also get more relevant recommendations.
         </DialogDescription>
         <div className="p-0 sm:p-2">
            <h1 className="text-md pb-4 font-sans font-bold text-primary">
               Follow 1 or more accounts
            </h1>
            <div className="flex w-full flex-col justify-center space-y-2 lg:space-y-3">
               {vipers.map((viper) => (
                  <ViperListCard key={String(viper._id)} viper={viper} />
               ))}
            </div>
         </div>
      </>
   )
}

export default ProfileFirstFollowing
