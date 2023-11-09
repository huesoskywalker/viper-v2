import React from 'react'
import { useHandleProvider } from '../_hooks/useHandleProvider'
import ProviderButton from './provider-button'

const ProviderForm = ({ provider, label }: { provider: string; label: string }) => {
   return (
      <form action={useHandleProvider}>
         <input type="hidden" id={provider} name="provider" value={provider} />
         <ProviderButton label={label} />
      </form>
   )
}

export default ProviderForm
