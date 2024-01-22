import { ViperBasic } from '@/types/viper'
import { viperService } from '@/services/servicesInitializer'
import ViperSwitchButton from './viper-switch-button'
import ViperBackgroundImage from './viper-background-image'
import ViperImage from './viper-image'
import ViperWebsite from './viper-website'
import ViperJoinDate from './viper-join-date'
import ViperName from './viper-name'
import ViperVerified from './viper-verified'
import ViperUsername from './viper-username'
import AtSymbol from '@/app/_components/viper/at-symbol'
import ViperBio from './viper-bio'
import ViperFollowCount from './viper-follow-count'

export const Viper = async ({ username }: { username: string }) => {
   const viper: ViperBasic | null = await viperService.getByUsername(username)

   // TODO:
   //    preloadViperFollowed(viperId)
   return (
      <div className="min-h-fit">
         <ViperBackgroundImage backgroundImage={viper.backgroundImage} />
         <div
            className={`-mt-12 justify-between px-4 sm:flex sm:items-end sm:space-x-5 lg:px-6 xl:-mt-14`}
         >
            <ViperImage username={username} image={viper.image} />
            <ViperSwitchButton username={username} viperId={String(viper._id)} />
         </div>
         <div className="pl-5">
            <div className={'mt-2 flex flex-col items-start justify-center pb-1'}>
               <div className="flex min-w-0 flex-1 items-center space-x-2">
                  <ViperName name={viper.name}>
                     <ViperVerified isVerified={viper.verified} className="h-6 w-6" />
                  </ViperName>
               </div>
               <ViperUsername username={viper.username}>
                  <AtSymbol className="text-sm" />
               </ViperUsername>
            </div>
            <div className={'mt-3'}>
               <ViperBio bio={viper.bio} />
            </div>
            <div className="mt-3 flex flex-row gap-3">
               {viper.website && <ViperWebsite website={viper.website} />}
               <ViperJoinDate createdAt={viper.createdAt} />
            </div>
            <div className="mt-3 flex flex-row gap-5">
               <ViperFollowCount followCount={viper.followingsCount} label="Followings" />
               <ViperFollowCount followCount={viper.followersCount} label="Followers" />
            </div>
         </div>
      </div>
   )
}
