'use client'
import { Button } from '@/components/ui/button'
import { PUBLIC_API_URL } from '@/config/env'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useOptimistic, useState, useTransition } from 'react'

const ToggleFollowButton = ({
   isFollowing,
   viperId,
}: {
   isFollowing: boolean
   viperId: string
}) => {
   const [isPending, startTransition] = useTransition()

   const [clicked, setClicked] = useState<boolean>(false)
   const [unFollowLabel, setUnFollowLabel] = useState<boolean>(false)

   const [optimisticFollowing, addOptimisticFollowing] = useOptimistic(
      isFollowing,
      (state: boolean, following: boolean) => following,
   )

   const { refresh } = useRouter()

   const toggleFollow = () => {
      setClicked(true)

      startTransition(async () => {
         addOptimisticFollowing(!isFollowing)

         const res = await fetch(`${PUBLIC_API_URL}/api/viper/follow`, {
            headers: {
               'Content-Type': 'application/json',
            },
            method: 'PATCH',
            body: JSON.stringify({
               isFollowing,
               viperId,
            }),
         })

         if (!res.ok) {
            const { error }: { error: string } = await res.json()
            throw new Error(error)
         }

         refresh()
      })
   }

   const handleMouseEnter = () => {
      if (!optimisticFollowing) return
      setUnFollowLabel(true)
   }

   const handleMouseLeave = () => {
      if (unFollowLabel) setUnFollowLabel(false)
      if (!clicked) return
      setClicked(false)
   }

   const getFollowLabel = (): 'Follow' | 'Unfollow' | 'Following' => {
      if (!optimisticFollowing) return 'Follow'
      if (!unFollowLabel) return 'Following'
      return 'Unfollow'
   }
   return (
      <>
         <Button
            variant={!optimisticFollowing || clicked ? 'default' : 'outline'}
            size={'sm'}
            type={'button'}
            className={cn('rounded-3xl', {
               'hover:border-destructive hover:bg-destructive/20 hover:text-viper-red':
                  optimisticFollowing && !clicked,
            })}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={toggleFollow}
         >
            {getFollowLabel()}
         </Button>
      </>
   )
}

export default ToggleFollowButton
