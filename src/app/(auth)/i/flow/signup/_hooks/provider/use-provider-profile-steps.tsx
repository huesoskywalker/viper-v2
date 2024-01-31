import React, { useMemo } from 'react'
import LoadingSpinner from '@/app/_components/loading/loading-spinner'
import dynamic from 'next/dynamic'
import { useCreateAccountStore } from '../../_stores/create-account-store'

const ProviderProfileBirthDate = dynamic(
   () => import('../../_components/provider/provider-profile-birth-date'),
   { loading: () => <LoadingSpinner className="h-full" /> },
)
const ProfileContentDiscovery = dynamic(
   () => import('../../_components/admission/admission-content-discovery'),
   { loading: () => <LoadingSpinner className="h-full" /> },
)
const CreateProfileBio = dynamic(() => import('../../_components/profile/create-profile-bio'), {
   loading: () => <LoadingSpinner className="h-full" />,
})
const CreateProfileUsername = dynamic(
   () => import('../../_components/profile/create-profile-username'),
   { loading: () => <LoadingSpinner className="h-full" /> },
)
const CreateProfileInterests = dynamic(
   () => import('../../_components/profile/create-profile-interests'),
   { loading: () => <LoadingSpinner className="h-full" /> },
)

const useProviderProfileSteps = () => {
   const { step } = useCreateAccountStore()

   const renderStep = useMemo(() => {
      switch (step) {
         case 1:
            return <ProviderProfileBirthDate />
         case 2:
            return <ProfileContentDiscovery />
         case 3:
            return <CreateProfileBio />
         case 4:
            return <CreateProfileUsername />
         case 5:
            return <CreateProfileInterests />
         default:
            return null
      }
   }, [step])

   return { renderStep }
}

export default useProviderProfileSteps
