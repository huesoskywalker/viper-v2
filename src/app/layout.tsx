import './globals.css'
import '@uploadthing/react/styles.css'

import AuthProvider from './_providers/auth-provider'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { PropsWithChildren } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Viper',
   description: 'The best application to find events and schedule your week with fun',
}

export default async function RootLayout({ children }: PropsWithChildren) {
   return (
      <html>
         <body className={`${inter.className} overflow-y-scroll bg-viper-background `}>
            <AuthProvider>{children}</AuthProvider>
         </body>
      </html>
   )
}
