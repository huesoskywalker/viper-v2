import ToggleFollowButton from '@/app/_components/viper/toggle-follow-button'
import { getCurrentSession } from '@/app/_utils/get-current-viper'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { viperService } from '@/services/servicesInitializer'
import { Session } from 'next-auth/types'
import Link from 'next/link'
import React from 'react'

const ViperSwitchButton = async ({ username, viperId }: { username: string; viperId: string }) => {
   const session: Session = await getCurrentSession()

   const isCurrentViper = username.toLowerCase() === session.user.username.toLowerCase()

   const isFollowing =
      !isCurrentViper && (await viperService.isFollowing(viperId, session.user.id))
   return (
      <>
         {isCurrentViper ? (
            <div className="self-flex flex-col justify-stretch sm:flex-row">
               <Link
                  // TODO: check if we will need the username in this component
                  href={`/${username}/settings/profile`}
                  className={cn(
                     buttonVariants({ variant: 'outline', size: 'md' }),
                     'rounded-3xl px-4 text-sm lg:text-[17px] xl:px-5',
                  )}
               >
                  Edit profile
               </Link>
            </div>
         ) : (
            <div className="self-flex flex-col justify-stretch sm:flex-row">
               <ToggleFollowButton isFollowing={isFollowing} viperId={viperId} />
            </div>
         )}
      </>
   )
}

export default ViperSwitchButton
