import './globals.css'
import AuthProvider from './_providers/auth-provider'
import { Metadata } from 'next'
import { GlobalNav } from './_components/global-nav'
import { PageProps } from '@/types/page-props'
import { Inter } from 'next/font/google'
import { auth } from '@/lib/auth'
import Image from 'next/image'
import { UserAuthForm } from './_components/user-auth-form'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Viper',
   description: 'The best application to find events and schedule your week with fun',
}

export default async function RootLayout({ children }: PageProps) {
   const session = await auth()

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
               <div className=" bg-black min-h-screen max-w-screen flex-1 ">
                  <div className="flex flex-col justify-start items-start p-6 space-y-2 min-h-screen md:mx-12 md:p-8 lg:space-y-0 lg:mx-0 lg:p-0 lg:flex-row lg:justify-center lg:items-center ">
                     <div className="flex justify-center items-center lg:p-6 lg:w-1/3 xl:w-1/2">
                        <Image
                           src={'/viper.png'}
                           alt="Dragon flying"
                           width={300}
                           height={400}
                           sizes="(min-width: 1040px) calc(25.05vw - 49px), (min-width: 800px) calc(4.55vw + 4px), (min-width: 760px) calc(-185vw + 1481px), (min-width: 580px) 16.25vw, (min-width: 340px) 18.64vw, calc(-175vw + 619px)"
                           quality={100}
                           priority={true}
                           className="filter invert h-auto w-3/4 md:w-full lg:w-3/4 xl:w-1/2"
                        />
                     </div>
                     <div className=" flex justify-center items-start flex-col w-full h-auto lg:p-6 lg:w-2/3  xl:w-1/2 xl:min-h-[500px] xl:max-h-[760px]  ">
                        <div className="my-8">
                           <h1
                              data-test-id="authenticated"
                              className="text-4xl font-bold text-secondary-foreground leading-tight md:leading-snug md:text-5xl lg:text-start xl:text-6xl xl:leading-tight"
                           >
                              Your epic journey
                           </h1>
                        </div>
                        <div className="mb-6">
                           <span className="text-2xl font-bold tracking-tight leading-[40px] text-primary ">
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
