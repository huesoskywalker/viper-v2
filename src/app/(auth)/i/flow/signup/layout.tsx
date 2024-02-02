import { ReactNode } from 'react'
import CreateAccount from '../_components/create-account'
import SwitchDialogHeader from '../_components/switch-dialog-header'
const SignUpLayout = async ({ children }: { children: ReactNode }) => {
   return (
      <>
         <CreateAccount>
            <SwitchDialogHeader />
            {children}
         </CreateAccount>
      </>
   )
}

export default SignUpLayout
