import React, { useMemo } from 'react'
import NextStepButton from '../../_components/next-step-button'
import { ProviderAdmissionFieldState } from './use-provider-admission-form'
import providerAdmissionFieldValidity from '../../_utils/provider-admission-field-validity'
import ProfileInterestsButton from '../../_components/profile/profile-interests-button'

const useProviderAdmissionButtons = (step: number, getFieldState: ProviderAdmissionFieldState) => {
   const { isBirthDateValid, isUsernameValid } = providerAdmissionFieldValidity(getFieldState)

   const validStepMap = new Map<number, boolean>([
      [1, isBirthDateValid],
      [2, isBirthDateValid],
      [3, isUsernameValid],
   ])

   const disableButton = !validStepMap.get(step)

   const isUsernameDirty = getFieldState('username').isDirty
   const usernameLabel = isUsernameDirty ? undefined : 'Skip for now'
   const usernameVariant = isUsernameDirty ? 'default' : 'outline'

   const renderButton = useMemo(() => {
      switch (step) {
         case 1:
         case 2:
            return <NextStepButton size={'lg'} disabled={disableButton} />
         case 3:
            return (
               <NextStepButton
                  variant={usernameVariant}
                  size={'lg'}
                  label={usernameLabel}
                  disabled={disableButton}
               />
            )
         case 4:
            return <ProfileInterestsButton />
         default:
            return null
      }
   }, [step, disableButton])

   return { renderButton }
}

export default useProviderAdmissionButtons
