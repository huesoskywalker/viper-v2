import OrSeparator from '@/app/_components/or-separator'
import { DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import React from 'react'
import { ViperAuthForm } from '@/app/_components/form/viper-auth-form'
import ViperLoginForm from './viper-login-form'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

const ViperLogin = () => {
   return (
      <div className="flex h-full w-full flex-col items-center justify-between overflow-hidden px-1">
         <div
            className={cn(
               ` flex h-full w-full  items-start justify-center space-y-4 overflow-y-auto scroll-smooth px-[80px]`,
            )}
         >
            <div className="grid gap-2">
               <DialogDescription className="m-3 text-3xl font-bold text-foreground ">
                  Sign in to V
               </DialogDescription>
               <ViperAuthForm className="grid gap-4" />
               <OrSeparator />
               <ViperLoginForm />
               <DialogFooter className="pt-2">
                  <Link
                     href={'/i/flow/password_reset'}
                     className={cn(buttonVariants({ variant: 'outline', size: 'provider' }))}
                  >
                     Forgot password?
                  </Link>
               </DialogFooter>
            </div>
         </div>
      </div>
   )
}

export default ViperLogin
