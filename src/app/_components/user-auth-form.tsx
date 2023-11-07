import * as React from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useHandleProvider } from '../_hooks/useHandleProvider'
import SubmitButton from './submit-button'
import { useHandleEmail } from '../_hooks/useHandleEmail'
import TermsAndConditions from './terms-and-conditions'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ children, className, ...props }: UserAuthFormProps) {
   return (
      <div
         className={cn('grid space-y-1 w-full md:w-3/5 lg:w-1/2 2xl:w-2/5 ', className)}
         {...props}
      >
         <div className="grid gap-3">
            <form action={useHandleProvider}>
               <input type="hidden" id="github" name="provider" value="google" />
               <SubmitButton provider={'Google'} />
            </form>
            <form
               action={useHandleProvider}
               className="inline-flex justify-center whitespace-nowrap"
            >
               <input type="hidden" id="github" name="provider" value="github" />
               <SubmitButton provider={'Github'} />
            </form>
         </div>
         <div className="relative">
            <div className="absolute inset-0 flex items-center">
               <span className="w-full border-t-2 border-secondary " />
            </div>
            <div className="relative flex justify-center text-sm">
               <span className="bg-background px-2 text-primary">or</span>
            </div>
         </div>
         <Link href="/" className={cn(buttonVariants({ variant: 'signup' }))}>
            Create an account
         </Link>
         {/* <form action={useHandleEmail}>
            <div className="grid gap-3">
               <Label className="sr-only" htmlFor="email">
                  Email
               </Label>
               <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
               />
               <SubmitButton provider={'Email'} />
            </div>
         </form> */}
         <TermsAndConditions />
      </div>
   )
}
