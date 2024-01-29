import ToggleFollowButton from '@/app/_components/viper/toggle-follow-button'
import { getCurrentSession } from '@/app/_utils/get-current-viper'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { viperService } from '@/services/servicesInitializer'
import { Session } from 'next-auth/types'
import Link from 'next/link'
import React from 'react'

const ViperSwitchButton = async ({ username, viperId }: { username: string; viperId: string }) => {
   const session: Session['user'] = await getCurrentSession()

   const isCurrentViper = username.toLowerCase() === session.username.toLowerCase()

   const isFollowing = !isCurrentViper && (await viperService.isFollowing(viperId, session._id))
   return (
      <>
         {isCurrentViper ? (
            <div className="flex flex-col items-center justify-stretch sm:flex-row">
               <Link
                  href={`/settings/profile`}
                  className={cn(
                     buttonVariants({ variant: 'outline', size: 'sm' }),
                     'rounded-3xl ',
                  )}
               >
                  Edit profile
               </Link>
            </div>
         ) : (
            <div className="flex flex-col justify-stretch sm:flex-row">
               <ToggleFollowButton isFollowing={isFollowing} viperId={viperId} />
            </div>
         )}
      </>
   )
}

export default ViperSwitchButton
