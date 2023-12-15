'use client'
import { Button } from '@/components/ui/button'
import React from 'react'

const ToggleFollowButton = ({ username }: { username: string }) => {
   const toggleFollow = async () => {
      //   const res = await fetch()
   }
   return (
      <>
         <Button
            variant={'default'}
            size={'default'}
            className="h-8 rounded-3xl"
            onClick={toggleFollow}
         >
            Follow
         </Button>
      </>
   )
}

export default ToggleFollowButton
