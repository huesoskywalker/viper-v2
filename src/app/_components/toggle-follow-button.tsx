'use client'
import { Button } from '@/components/ui/button'
import { BASE_URL } from '@/config/env'
import { useRouter } from 'next/navigation'
import { useOptimistic, useTransition } from 'react'

const ToggleFollowButton = ({
   isFollowing,
   viperId,
}: {
   isFollowing: boolean
   viperId: string
}) => {
   const [isPending, startTransition] = useTransition()

   const { refresh } = useRouter()

   const [optimisticFollowing, addOptimisticFollowing] = useOptimistic(
      isFollowing,
      (state: boolean, following: boolean) => following,
   )

   const toggleFollow = async () => {
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
            // TODO: send a proper message based on the error
            throw new Error(error)
         }
         refresh()
      })
      // TODO: add trcp
   }
   return (
      <>
         <Button
            variant={!optimisticFollowing ? 'default' : 'outline'}
            size={'default'}
            className="h-8 rounded-3xl"
            onClick={toggleFollow}
            disabled={isPending}
         >
            {!optimisticFollowing ? 'Follow' : 'Following'}
         </Button>
      </>
   )
}

export default ToggleFollowButton
