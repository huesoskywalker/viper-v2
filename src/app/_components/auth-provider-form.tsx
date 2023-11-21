import React from 'react'
import { handleAuthProviders } from '../_utils/handle-auth-providers'
import AuthProviderButton from './auth-provider-button'

const AuthProviderForm = ({ provider, label }: { provider: string; label: string }) => {
   return (
      <form action={handleAuthProviders}>
         <input type="hidden" id={provider} name="provider" value={provider} />
         <AuthProviderButton label={label} />
      </form>
   )
}

export default AuthProviderForm
