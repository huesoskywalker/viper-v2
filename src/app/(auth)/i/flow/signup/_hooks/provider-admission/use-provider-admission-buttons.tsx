import React, { useMemo } from 'react'
import NextStepButton from '../../../_components/next-step-button'
import { ProviderAdmissionFieldState } from './use-provider-admission-form'
import providerAdmissionFieldValidity from '../../_utils/provider-admission-field-validity'
import ProfileInterestsButton from '../../_components/profile/profile-interests-button'

const useProviderAdmissionButtons = (step: number, getFieldState: ProviderAdmissionFieldState) => {
   const { isBirthDateValid, isBioDirty, isBioValid, isUsernameDirty, isUsernameValid } =
      providerAdmissionFieldValidity(getFieldState)

   const validStepMap = new Map<number, boolean>([
      [1, isBirthDateValid],
      [2, isBirthDateValid],
      [3, isBioValid],
      [4, isUsernameValid],
   ])

   const disableButton = !validStepMap.get(step)

   const bioVariant = isBioDirty ? 'default' : 'outline'
   const bioLabel = isBioDirty ? undefined : 'Skip for now'

   const usernameVariant = isUsernameDirty ? 'default' : 'outline'
   const usernameLabel = isUsernameDirty ? undefined : 'Skip for now'

   const renderButton = useMemo(() => {
      switch (step) {
         case 1:
         case 2:
            return <NextStepButton size={'lg'} disabled={disableButton} />
         case 3:
            return (
               <NextStepButton
                  variant={bioVariant}
                  size={'lg'}
                  label={bioLabel}
                  disabled={disableButton}
               />
            )
         case 4:
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
   }, [step, disableButton])

   return { renderButton }
}

export default useProviderAdmissionButtons
