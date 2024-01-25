import React, { ReactNode } from 'react'
import { CreateAccount } from '../_components/create-account'

const SingleSignLayout = ({ children }: { children: ReactNode }) => {
   return <CreateAccount>{children}</CreateAccount>
}

export default SingleSignLayout
