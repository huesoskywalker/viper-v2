import { viperService } from '@/services/servicesInitializer'
import React from 'react'
import ToggleFollowButton from './toggle-follow-button'

const ToggleFollow = async ({ viperId, sessionId }: { viperId: string; sessionId: string }) => {
   const isFollowing = await viperService.isFollowing(viperId, sessionId)

   return <ToggleFollowButton isFollowing={isFollowing} viperId={viperId} />
}

export default ToggleFollow
