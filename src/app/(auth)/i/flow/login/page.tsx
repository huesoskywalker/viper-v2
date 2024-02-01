import React from 'react'
import OrSeparator from '@/app/_components/or-separator'
import { ViperAuthForm } from '@/app/_components/form/viper-auth-form'
import ViperLoginForm from './_components/viper-login-form'

const LogInPage = () => {
   return (
      <>
         <ViperAuthForm className="grid gap-4" />
         <OrSeparator />
         <ViperLoginForm />
      </>
   )
}

export default LogInPage
