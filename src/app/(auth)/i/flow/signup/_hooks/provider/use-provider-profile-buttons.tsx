import React, { useMemo } from 'react'
import NextStepButton from '../../../_components/next-step-button'
import { ProviderProfileFieldState } from './use-provider-profile-form'
import providerProfileFieldValidity from '../../_utils/provider-profile-field-validity'
import ProfileInterestsButton from '../../_components/profile/profile-interests-button'
import { useCreateAccountStore } from '../../_stores/create-account-store'

const useProviderProfileButtons = (getFieldState: ProviderProfileFieldState) => {
   const { step } = useCreateAccountStore()

   const { isBirthDateValid, isBioDirty, isBioValid, isUsernameDirty, isUsernameValid } =
      providerProfileFieldValidity(getFieldState)

   const validStepMap = new Map<number, boolean>([
      [1, isBirthDateValid],
      [2, isBirthDateValid],
      [3, isBioValid],
      [4, isUsernameValid],
   ])

   const disableButton = !validStepMap.get(step)

   const renderButton = useMemo(() => {
      switch (step) {
         case 1:
         case 2:
            return <NextStepButton size={'lg'} disabled={disableButton} />
         case 3:
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
         case 4:
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
         case 5:
            return <ProfileInterestsButton />
         default:
            return null
      }
   }, [step, disableButton, isBioDirty, isUsernameDirty])

   return { renderButton }
}

export default useProviderProfileButtons
