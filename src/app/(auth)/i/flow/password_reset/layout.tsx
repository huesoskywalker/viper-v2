import { ReactNode } from 'react'
import CreateAccount from '../_components/create-account'

const PasswordResetLayout = ({ children }: { children: ReactNode }) => {
   return <CreateAccount>{children}</CreateAccount>
}

export default PasswordResetLayout
