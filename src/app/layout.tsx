import './globals.css'
import AuthProvider from './_providers/auth-provider'
import { Metadata } from 'next'
import { GlobalNav } from './_components/global-nav'
import { Inter } from 'next/font/google'
import { auth } from '@/lib/auth'
import Image from 'next/image'
import { UserAuthForm } from './_components/user-auth-form'
import type { PropsWithChildren } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Viper',
   description: 'The best application to find events and schedule your week with fun',
}

export default async function RootLayout({ children }: PropsWithChildren) {
   const session = await auth()

   // check if we should warp the whole entry point with the AuthProvider
   return (
      <html>
         <body className={`${inter.className} overflow-y-scroll bg-viper-background `}>
            {session ? (
               <>
                  <AuthProvider>
                     <GlobalNav />
                     <div className="lg:pl-44"> {children} </div>
                  </AuthProvider>
               </>
            ) : (
               <div className=" max-w-screen min-h-screen flex-1 bg-black ">
                  <div className="flex min-h-screen flex-col items-start justify-start space-y-2 p-6 md:mx-12 md:p-8 lg:mx-0 lg:flex-row lg:items-center lg:justify-center lg:space-y-0 lg:p-0 ">
                     <div className="flex items-center justify-center lg:w-1/3 lg:p-6 xl:w-1/2">
                        <Image
                           src={'/viper.png'}
                           alt="Viper logo"
                           width={300}
                           height={400}
                           sizes="(min-width: 1040px) calc(25.05vw - 49px), (min-width: 800px) calc(4.55vw + 4px), (min-width: 760px) calc(-185vw + 1481px), (min-width: 580px) 16.25vw, (min-width: 340px) 18.64vw, calc(-175vw + 619px)"
                           quality={100}
                           priority={true}
                           className="h-auto w-3/4 invert filter md:w-full lg:w-3/4 xl:w-1/2"
                        />
                     </div>
                     <div className=" flex h-auto w-full flex-col items-start justify-center lg:w-2/3 lg:p-6  xl:max-h-[760px] xl:min-h-[500px] xl:w-1/2  ">
                        <div className="my-8">
                           <h1
                              data-test-id="authenticated"
                              className="text-4xl font-bold leading-tight text-secondary-foreground md:text-5xl md:leading-snug lg:text-start xl:text-6xl xl:leading-tight"
                           >
                              Your epic journey
                           </h1>
                        </div>
                        <div className="mb-6">
                           <span className="text-2xl font-bold leading-[40px] tracking-tight text-primary ">
                              Join today.
                           </span>
                        </div>
                        <UserAuthForm />
                     </div>
                  </div>
                  {children}
               </div>
            )}
         </body>
      </html>
   )
}
