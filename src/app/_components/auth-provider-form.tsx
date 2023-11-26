'use client'
import React from 'react'
import { handleAuthProviders } from '../_actions/handle-auth-providers'
import AuthProviderButton from './auth-provider-button'
import { useFormState } from 'react-dom'

const initialState = {
   success: false,
   message: null,
}
const AuthProviderForm = ({ provider, label }: { provider: string; label: string }) => {
   const [state, formAction] = useFormState(handleAuthProviders, initialState)

   return (
      <form action={formAction}>
         <input type="hidden" id={provider} name="provider" value={provider} />
         <AuthProviderButton label={label} />
      </form>
   )
}

export default AuthProviderForm
