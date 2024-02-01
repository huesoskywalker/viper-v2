import React from 'react'
import dynamic from 'next/dynamic'
import LoadingSpinner from '@/app/_components/loading/loading-spinner'
const PasswordReset = dynamic(() => import('./_components/password-reset'), {
   loading: () => <LoadingSpinner className="h-full" />,
})

const PasswordResetPage = () => {
   return (
      <>
         <PasswordReset />
      </>
   )
}

export default PasswordResetPage
