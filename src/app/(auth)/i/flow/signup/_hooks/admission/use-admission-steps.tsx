import { useMemo } from 'react'
import { FormDescription } from '@/components/ui/form'
import dynamic from 'next/dynamic'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import LoadingSpinner from '@/app/_components/loading/loading-spinner'

const AdmissionPersonalInfo = dynamic(
   () => import('../../_components/admission/admission-personal-info'),
   { loading: () => <LoadingSpinner className="h-full" /> },
)
const AdmissionContentDiscovery = dynamic(
   () => import('../../_components/admission/admission-content-discovery'),
   { loading: () => <LoadingSpinner className="h-full" /> },
)
const AdmissionInfoCheck = dynamic(
   () => import('../../_components/admission/admission-info-check'),
   { loading: () => <LoadingSpinner className="h-full" /> },
)
const AdmissionVerificationToken = dynamic(
   () => import('../../_components/admission/admission-verification-token'),
   { loading: () => <LoadingSpinner className="h-full" /> },
)
const AdmissionPassword = dynamic(() => import('../../_components/admission/admission-password'), {
   loading: () => <LoadingSpinner className="h-full" />,
})

export const useAdmissionSteps = (email: string) => {
   const { step } = useCreateAccountStore()

   const renderStep = useMemo(() => {
      switch (step) {
         case 1:
            return <AdmissionPersonalInfo />
         case 2:
            return <AdmissionContentDiscovery />
         case 3:
            return <AdmissionInfoCheck />
         case 4:
            return (
               <AdmissionVerificationToken label={'Verification token'}>
                  <FormDescription>Enter it below to verify {email}.</FormDescription>
               </AdmissionVerificationToken>
            )
         case 5:
            return <AdmissionPassword />
         default:
            return null
      }
   }, [step, email])

   return { renderStep }
}
