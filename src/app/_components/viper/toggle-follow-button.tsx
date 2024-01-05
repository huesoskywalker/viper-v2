'use client'
import { Button } from '@/components/ui/button'
import { BASE_URL } from '@/config/env'
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

         const res = await fetch(`${BASE_URL}/api/viper/follow`, {
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
            const { error } = await res.json()
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
            size={'default'}
            type={'button'}
            className={cn('h-8 rounded-3xl', {
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
