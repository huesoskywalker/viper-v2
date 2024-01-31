import React from 'react'
import CreateAccount from '../_components/create-account'
import dynamic from 'next/dynamic'
import DialogVHeader from '../_components/dialog-v-header'
const PasswordReset = dynamic(() => import('./_components/password-reset'))

const PasswordResetPage = () => {
   return (
      <CreateAccount>
         <DialogVHeader />
         <PasswordReset />
      </CreateAccount>
   )
}

export default PasswordResetPage
