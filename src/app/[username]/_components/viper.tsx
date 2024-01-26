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
import { getCurrentSession } from '@/app/_utils/get-current-viper'
import ViperLocation from './viper-location'
import Link from 'next/link'
import { Session } from 'next-auth/types'
import { WithId } from 'mongodb'

export const Viper = async ({ username }: { username: string }) => {
   const viper: WithId<ViperBasic> | Session['user'] =
      username === 'settings'
         ? await getCurrentSession()
         : await viperService.getByUsername(username)

   // TODO: preloadViperFollowed(viperId)
   return (
      <div className="min-h-fit">
         <ViperBackgroundImage backgroundImage={viper.backgroundImage} />
         <div
            className={`-mt-12 justify-between px-4 sm:flex sm:items-end sm:space-x-5 lg:px-6 xl:-mt-14`}
         >
            {/* this is nice, clicking the image and opening it to catch a view */}
            <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-[3px] border-solid border-primary-foreground align-middle sm:h-24 sm:w-24 sm:border-4 xl:h-28 xl:w-28">
               <Link href={`${username}/photo`}>
                  <ViperImage image={viper.image} />
               </Link>
            </div>
            <ViperSwitchButton username={viper.username} viperId={String(viper._id)} />
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
            <div className="mt-3 flex flex-wrap gap-3">
               {viper.location && <ViperLocation location={viper.location} />}
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
