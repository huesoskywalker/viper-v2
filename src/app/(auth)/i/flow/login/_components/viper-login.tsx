import { DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

const ViperLogin = ({ children }: { children: ReactNode }) => {
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
               {children}
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
