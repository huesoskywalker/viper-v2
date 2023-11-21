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
         {/* <html> */}
         {/* <body className={`${inter.className} overflow-y-scroll bg-gray-900 `}> */}
         {/* <AuthProvider> */}
         {/* <GlobalNav /> */}
         {/* <div className="lg:pl-44"> */}
         <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:px-8 lg:py-8">
            <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
               <div className="rounded-lg bg-black p-3.5 lg:p-6">{children}</div>
            </div>
         </div>
         {/* </div> */}
         {/* </AuthProvider> */}
         {/* </body> */}
         {/* </html> */}
      </>
   )
}
