import Image from 'next/image'
import React, { PropsWithChildren } from 'react'
import { UserAuthForm } from './form/user-auth-form'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import TermsAndConditions from './terms-and-conditions'
import Link from 'next/link'

const UnauthenticatedLayout = ({ children }: PropsWithChildren) => {
   return (
      <div className=" max-w-screen min-h-screen flex-1 bg-background ">
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
                  className="invert-image h-auto w-3/4 md:w-full lg:w-3/4 xl:w-1/2"
               />
            </div>
            <div className=" flex h-auto w-full flex-col items-start justify-center lg:w-2/3 lg:p-6  xl:max-h-[760px] xl:min-h-[500px] xl:w-1/2  ">
               <div className="my-8">
                  <h1
                     data-test-id="authenticated"
                     className="text-4xl font-bold leading-tight text-foreground md:text-5xl md:leading-snug lg:text-start xl:text-6xl xl:leading-tight"
                  >
                     Your epic journey
                  </h1>
               </div>
               <div className="mb-6">
                  <span className="text-2xl font-bold leading-[40px] tracking-tight text-foreground ">
                     Join today.
                  </span>
               </div>
               <div className={'grid w-full md:w-3/5 lg:w-1/2 2xl:w-2/5 '}>
                  <UserAuthForm />
                  <div className="relative my-[6px] w-[300px]">
                     <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t-[1.5px] border-muted " />
                     </div>
                     <div className="relative flex justify-center">
                        <span className="bg-background px-2 text-sm text-foreground">or</span>
                     </div>
                  </div>{' '}
                  <Link
                     href={'/i/flow/signup'}
                     className={cn(buttonVariants({ variant: 'sky', size: 'sign' }), ' mb-2 ')}
                  >
                     Create an account
                  </Link>
                  <TermsAndConditions className="mb-5 w-[300px] text-start text-[12px] leading-[13px]" />
                  <div className="mb-4 mt-8">
                     <span className="text-base font-medium text-foreground">
                        Already have an account?
                     </span>
                  </div>{' '}
                  <Link
                     href={'/i/flow/signin'}
                     className={cn(buttonVariants({ variant: 'midnight-blue', size: 'sign' }))}
                  >
                     Sign in
                  </Link>
               </div>
            </div>
         </div>
         {children}
      </div>
   )
}

export default UnauthenticatedLayout
