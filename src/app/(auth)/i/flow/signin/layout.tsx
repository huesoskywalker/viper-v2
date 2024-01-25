import React, { ReactNode } from 'react'

const SignInLayout = ({ children }: { children: ReactNode }) => {
   return (
      <div
         style={{
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            left: 0,
            top: 0,
            background: 'white',
         }}
      >
         {children}
      </div>
   )
}

export default SignInLayout
