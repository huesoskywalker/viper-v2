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
import { notFound } from 'next/navigation'

export const Viper = async ({ username }: { username: string }) => {
   const isSettings = username === 'settings'

   const viper: WithId<ViperBasic> | Session['user'] | null = isSettings
      ? await getCurrentSession()
      : await viperService.getByUsername(username)

   if (!viper) notFound()

   return (
      <div className="min-h-fit">
         <ViperBackgroundImage backgroundImage={viper.backgroundImage} />
         <div className="mb-3 px-4 pt-3">
            <div className={`items-start justify-between sm:flex sm:space-x-5`}>
               {/* this is nice, clicking the image and opening it to catch a view */}
               <div className="relative -mt-12 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-[3px] border-solid border-primary-foreground align-middle sm:-mt-14 sm:h-24 sm:w-24 sm:border-4 xl:-mt-16 xl:h-28 xl:w-28">
                  <Link href={`${username}/photo`}>
                     <ViperImage image={viper.image} width={135} height={135} />
                  </Link>
               </div>
               <ViperSwitchButton username={viper.username} viperId={String(viper._id)} />
            </div>
            <div className={'mt-2 flex flex-col items-start justify-center truncate '}>
               <ViperName name={viper.name}>
                  <ViperVerified isVerified={viper.verified} />
               </ViperName>
               <ViperUsername username={viper.username}>
                  <AtSymbol />
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
