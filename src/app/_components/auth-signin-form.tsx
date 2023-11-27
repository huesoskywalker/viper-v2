'use client'
import React from 'react'
import { useFormState } from 'react-dom'
import { handleAuthProvider } from '../_actions/handle-auth-providers'
import AuthSignInButton from './auth-signin-button'

const initialState = {
   success: false,
}

const AuthSignInForm = ({ provider, label }: { provider: string; label: string }) => {
   const [state, formAction] = useFormState(handleAuthProvider, initialState)

   return (
      <form action={formAction}>
         <input type="hidden" id={provider} name="provider" value={provider} />

         <AuthSignInButton label={label} />
      </form>
   )
}

export default AuthSignInForm
