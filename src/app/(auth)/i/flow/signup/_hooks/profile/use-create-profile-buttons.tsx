import { useMemo } from 'react'
import { CreateProfileFieldState } from './use-create-profile-form'
import { createProfileFieldValidity } from '../../_utils/create-profile-field-validity'
import { useCreateProfileStore } from '../../_stores/create-profile-store'
import dynamic from 'next/dynamic'
import { useCreateAccountStore } from '../../_stores/create-account-store'

const NextStepButton = dynamic(() => import('../../../_components/next-step-button'))
const ProfileInterestsButton = dynamic(
   () => import('../../_components/profile/profile-interests-button'),
)

export const useCreateProfileButtons = (getFieldState: CreateProfileFieldState) => {
   const { step } = useCreateAccountStore()

   const { images } = useCreateProfileStore()

   const { isBioValid, isBioDirty, isUsernameValid, isUsernameDirty, isImageValid } =
      createProfileFieldValidity(getFieldState)

   const validStepMap = new Map<number, boolean>([
      [1, isBioValid],
      [2, isUsernameValid],
      [3, isImageValid],
   ])

   const disableButton = !validStepMap.get(step)

   const profileImage = images.profile

   const renderButton = useMemo(() => {
      switch (step) {
         case 1:
            const bioVariant = isBioDirty ? 'default' : 'outline'
            const bioLabel = isBioDirty ? undefined : 'Skip for now'

            return (
               <NextStepButton
                  variant={bioVariant}
                  size={'lg'}
                  label={bioLabel}
                  disabled={disableButton}
               />
            )
         case 2:
            const usernameVariant = isUsernameDirty ? 'default' : 'outline'
            const usernameLabel = isUsernameDirty ? undefined : 'Skip for now'

            return (
               <NextStepButton
                  variant={usernameVariant}
                  size={'lg'}
                  label={usernameLabel}
                  disabled={disableButton}
               />
            )
         case 3:
            return (
               <NextStepButton
                  variant={!profileImage ? 'outline' : 'default'}
                  size={'lg'}
                  label={!profileImage ? 'Skip for now' : 'Next'}
                  disabled={false}
               />
            )
         case 4:
            return <ProfileInterestsButton />
         case 5:
            return null
         default:
            return null
      }
   }, [step, disableButton, isBioDirty, isUsernameDirty, profileImage])

   return { renderButton }
}
