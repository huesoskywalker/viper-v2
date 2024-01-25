import React from 'react'
import { Toaster } from '@/components/ui/toaster'
import ViperLogin from './_components/viper-login'
import CreateAccountDialogHeader from '../_components/create-account-dialog-header'

const LogInPage = () => {
   return (
      <>
         <CreateAccountDialogHeader />
         <ViperLogin />
         <Toaster />
      </>
   )
}

export default LogInPage
