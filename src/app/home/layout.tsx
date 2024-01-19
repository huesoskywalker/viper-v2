import { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import GlobalLayout from '../_components/layout/GlobalLayout'

export const metadata: Metadata = {
   title: 'Viper',
   description: 'The best application to find events and schedule your week with fun',
}

// check what can we do with this layout
export default function RootLayout({ children }: PropsWithChildren) {
   return (
      <>
         <GlobalLayout>{children}</GlobalLayout>
      </>
   )
}
