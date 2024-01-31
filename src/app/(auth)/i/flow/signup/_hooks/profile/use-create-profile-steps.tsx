import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import LoadingSpinner from '@/app/_components/loading/loading-spinner'
import { useCreateAccountStore } from '../../_stores/create-account-store'

const CreateProfileBio = dynamic(() => import('../../_components/profile/create-profile-bio'), {
   loading: () => <LoadingSpinner className="h-full" />,
})
const CreateProfileUsername = dynamic(
   () => import('../../_components/profile/create-profile-username'),
   { loading: () => <LoadingSpinner className="h-full" /> },
)
const CreateProfileAvatar = dynamic(
   () => import('../../_components/profile/create-profile-avatar'),
   { loading: () => <LoadingSpinner className="h-full" /> },
)
const CreateProfileInterests = dynamic(
   () => import('../../_components/profile/create-profile-interests'),
   { loading: () => <LoadingSpinner className="h-full" /> },
)

export const useCreateProfileSteps = () => {
   const { step } = useCreateAccountStore()

   const renderStep = useMemo(() => {
      switch (step) {
         case 1:
            return <CreateProfileBio />
         case 2:
            return <CreateProfileUsername />
         case 3:
            return <CreateProfileAvatar />
         case 4:
            return <CreateProfileInterests />
         case 5:
            return null
         default:
            return null
      }
   }, [step])

   return { renderStep }
}
