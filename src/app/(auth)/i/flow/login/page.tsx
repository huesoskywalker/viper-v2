import React from 'react'
import { Toaster } from '@/components/ui/toaster'
import ViperLogin from './_components/viper-login'
import { CreateAccount } from '../_components/create-account'

const LogInPage = () => {
   return (
      <CreateAccount>
         <ViperLogin />
         <Toaster />
      </CreateAccount>
   )
}

export default LogInPage
