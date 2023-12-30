import { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
   title: 'Viper',
   description: 'The best application to find events and schedule your week with fun',
}

// check what can we do with this layout
export default function RootLayout({ children }: PropsWithChildren) {
   return (
      <>
         <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:px-8 lg:py-8">
            <div className="rounded-lg bg-vp-border-gradient p-px shadow-lg shadow-secondary/20">
               <div className="rounded-lg bg-background p-3.5 lg:p-6">{children}</div>
            </div>
         </div>
      </>
   )
}
