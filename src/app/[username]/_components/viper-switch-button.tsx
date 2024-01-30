import { getCurrentSession } from '@/app/_utils/get-current-viper'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { preloadViperService } from '@/services/servicesInitializer'
import { Session } from 'next-auth/types'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React, { Suspense } from 'react'

const ToggleFollow = dynamic(() => import('@/app/_components/viper/toggle-follow'))

const ViperSwitchButton = async ({ username, viperId }: { username: string; viperId: string }) => {
   const session: Session['user'] = await getCurrentSession()

   const isCurrentViper = username.toLowerCase() === session.username.toLowerCase()

   if (!isCurrentViper) {
      preloadViperService.isFollowing(viperId, session._id)
   }

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
               <Suspense fallback={<Skeleton className={'h-8 w-20 rounded-3xl'} />}>
                  <ToggleFollow viperId={viperId} sessionId={session._id} />
               </Suspense>
            </div>
         )}
      </>
   )
}

export default ViperSwitchButton
