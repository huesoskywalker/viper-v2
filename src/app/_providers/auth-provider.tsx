import { SessionProvider } from 'next-auth/react'
import { AuthLayout } from '../_components/auth-layout'

export default function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
   return (
      <SessionProvider>
         <AuthLayout>{children}</AuthLayout>
      </SessionProvider>
   )
}
