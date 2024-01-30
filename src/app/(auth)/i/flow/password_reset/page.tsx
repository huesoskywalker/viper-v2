import React from 'react'
import { CreateAccount } from '../_components/create-account'
import dynamic from 'next/dynamic'
const PasswordReset = dynamic(() => import('./_components/password-reset'))

const PasswordResetPage = () => {
   return (
      <CreateAccount>
         <PasswordReset />
      </CreateAccount>
   )
}

export default PasswordResetPage
