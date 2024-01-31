import React from 'react'
import { Toaster } from '@/components/ui/toaster'
import ViperLogin from './_components/viper-login'
import DialogVHeader from '../_components/dialog-v-header'

const LogInPage = () => {
   return (
      <>
         <DialogVHeader />
         <ViperLogin />
         <Toaster />
      </>
   )
}

export default LogInPage
