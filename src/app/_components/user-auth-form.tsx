import * as React from 'react'
import { cn } from '@/lib/utils'
import { useHandleProvider } from '../_hooks/useHandleProvider'
import SubmitButton from './submit-button'
import TermsAndConditions from './terms-and-conditions'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ children, className, ...props }: UserAuthFormProps) {
   return (
      <div className={cn('grid w-full md:w-3/5 lg:w-1/2 2xl:w-2/5 ', className)} {...props}>
         <div className="grid gap-3">
            <form action={useHandleProvider}>
               <input type="hidden" id="github" name="provider" value="google" />
               <SubmitButton provider={'Google'} />
            </form>
            <form action={useHandleProvider}>
               <input type="hidden" id="github" name="provider" value="github" />
               <SubmitButton provider={'Github'} />
            </form>
         </div>
         <div className="relative my-[6px] w-[300px]">
            <div className="absolute inset-0 flex items-center">
               <span className="w-full border-t-[1.5px] border-secondary" />
            </div>
            <div className="relative flex justify-center">
               <span className="bg-background px-2 text-sm text-primary">or</span>
            </div>
         </div>
         <Link
            href="/i/flow/signup"
            className={cn(buttonVariants({ variant: 'signup' }), 'w-[300px] h-[44px] mb-2')}
         >
            Create an account
         </Link>
         <TermsAndConditions />
         <div className="mt-9">
            <div className="mb-4">
               <span className="text-primary text-base font-medium">Already have an account?</span>
            </div>
            <Link
               href="/i/flow/singin"
               className={cn(buttonVariants({ variant: 'signup' }), 'w-[300px] h-[44px] mb-2')}
            >
               Sign in
            </Link>
         </div>
      </div>
   )
}
