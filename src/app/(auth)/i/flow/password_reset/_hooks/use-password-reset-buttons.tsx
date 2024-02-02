import { useMemo } from 'react'
import { PasswordResetFieldState } from './use-password-reset-form'
import { passwordResetFieldValidity } from '../_utils/password-reset-field-validity'
import dynamic from 'next/dynamic'
import { useCreateAccountStore } from '../../signup/_stores/create-account-store'
import { Skeleton } from '@/components/ui/skeleton'

const NextStepButton = dynamic(() => import('../../_components/next-step-button'), { ssr: false })
const PasswordMatchAccountButton = dynamic(
   () => import('../_components/password-match-account-button'),
   { ssr: false },
)
const RequestVerificationTokenButton = dynamic(
   () => import('../../signup/_components/admission/request-verification-token-button'),
   { ssr: false },
)
const CancelPasswordResetButton = dynamic(
   () => import('../_components/cancel-password-reset-button'),
)
const ConfirmTokenVerificationButton = dynamic(
   () => import('../../signup/_components/admission/confirm-token-verification-button'),
   {
      loading: () => <Skeleton className={'h-11 w-full rounded-3xl'} />,
      ssr: false,
   },
)
const Button = dynamic(() => import('@/components/ui/button').then((mod) => mod.Button))
const ValidFormSubmitButton = dynamic(
   () => import('@/app/_components/form/valid-form-submit-button'),
   { ssr: false },
)

const usePasswordResetButtons = (getFieldState: PasswordResetFieldState) => {
   const { step, prevStep } = useCreateAccountStore()

   const {
      isFindByDirty,
      isEmailValid,
      isUsernameDirty,
      isTokenValid,
      isConfirmPasswordValid,
      isMotiveValid,
      isTokenDirty,
   } = passwordResetFieldValidity(getFieldState)

   const validStepMap = new Map<number, boolean>([
      [1, isFindByDirty],
      [2, isUsernameDirty || isEmailValid],
      [4, isTokenValid],
      [5, isConfirmPasswordValid],
      [6, isMotiveValid],
   ])

   const disableButton = !validStepMap.get(step)

   const renderButton = useMemo(() => {
      switch (step) {
         case 1:
            return <NextStepButton variant={'default'} size={'lg'} disabled={disableButton} />
         case 2:
            return <PasswordMatchAccountButton disabled={disableButton} />
         case 3:
            return (
               <div className="space-y-4">
                  <RequestVerificationTokenButton variant={'default'} size={'lg'} label={'Next'} />
                  <CancelPasswordResetButton />
               </div>
            )
         case 4:
            return isTokenDirty ? (
               <ConfirmTokenVerificationButton
                  variant={'default'}
                  size={'lg'}
                  disabled={disableButton}
               />
            ) : (
               <Button onClick={prevStep} type="button" variant={'outline'} size={'lg'}>
                  Back
               </Button>
            )
         case 5:
            return (
               <NextStepButton
                  variant={'default'}
                  size={'lg'}
                  label={'Change password'}
                  disabled={disableButton}
               />
            )
         case 6:
            return <NextStepButton variant={'default'} size={'lg'} disabled={disableButton} />
         case 7:
            return (
               <ValidFormSubmitButton
                  label={'Continue to Viper'}
                  variant={'default'}
                  size={'lg'}
               />
            )
         default:
            return null
      }
   }, [step, disableButton, isTokenDirty])

   return { renderButton }
}

export default usePasswordResetButtons
