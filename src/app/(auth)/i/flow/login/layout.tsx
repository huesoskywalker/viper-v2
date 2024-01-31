import React, { ReactNode } from 'react'
import CreateAccount from '../_components/create-account'

const LoginLayout = ({ children }: { children: ReactNode }) => {
   return <CreateAccount>{children}</CreateAccount>
}

export default LoginLayout
