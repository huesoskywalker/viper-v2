import React, { ReactNode } from 'react'
import CreateAccount from '../_components/create-account'

const SignUpLayout = ({ children }: { children: ReactNode }) => {
   return (
      <>
         <CreateAccount>{children}</CreateAccount>
      </>
   )
}

export default SignUpLayout
