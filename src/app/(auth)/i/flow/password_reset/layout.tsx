import { ReactNode } from 'react'
import CreateAccount from '../_components/create-account'
import DialogViperHeader from '../_components/dialog-viper-header'
import Image from 'next/image'

const PasswordResetLayout = ({ children }: { children: ReactNode }) => {
   return (
      <CreateAccount>
         <DialogViperHeader className="self-center pt-3">
            <Image
               src={'/viper-small.png'}
               alt="Viper logo"
               width={40}
               height={40}
               loading="lazy"
               quality={100}
               className="invert-image"
            />
         </DialogViperHeader>
         {children}
      </CreateAccount>
   )
}

export default PasswordResetLayout
