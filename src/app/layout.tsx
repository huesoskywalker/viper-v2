import './globals.css'
import '@uploadthing/react/styles.css'

import AuthProvider from './_providers/auth-provider'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { PropsWithChildren } from 'react'
import { ThemeProvider } from './_providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Viper',
   description: 'The best application to find events and schedule your week with fun',
}

export default async function RootLayout({ children }: PropsWithChildren) {
   return (
      <html suppressHydrationWarning>
         <body className={`${inter.className} overflow-y-scroll bg-accent `}>
            <ThemeProvider>
               <main>
                  <AuthProvider>{children}</AuthProvider>
               </main>
            </ThemeProvider>
         </body>
      </html>
   )
}
