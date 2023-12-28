import React from 'react'
import { CreateAccountDialog } from '../signup/_components/create-account-dialog'
import { Toaster } from '@/components/ui/toaster'
import ViperLogin from './_components/viper-login'

const LogInPage = () => {
   return (
      <CreateAccountDialog>
         <ViperLogin />
         <Toaster />
      </CreateAccountDialog>
   )
}

export default LogInPage
