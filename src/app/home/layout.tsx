import { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
   title: 'Viper',
   description: 'The best application to find events and schedule your week with fun',
}

// check what can we do with this layout
export default function RootLayout({ children }: PropsWithChildren) {
   return <div className="min-h-screen">{children}</div>
}
