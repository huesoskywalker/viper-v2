import * as React from 'react'
import { cn } from '@/lib/utils'
import TermsAndConditions from './terms-and-conditions'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import AuthSignInForm from './auth-signin-form'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ children, className, ...props }: UserAuthFormProps) {
   return (
      <div className={cn('grid w-full md:w-3/5 lg:w-1/2 2xl:w-2/5 ', className)} {...props}>
         <div className="grid gap-3">
            <AuthSignInForm provider="google" label="Google" />
            <AuthSignInForm provider="github" label="Github" />
         </div>
         {/* make this span abstract in a class */}
         <div className="relative my-[6px] w-[300px]">
            <div className="absolute inset-0 flex items-center">
               <span className="w-full border-t-[1.5px] border-gray-700 xl:border-t-2" />
            </div>
            <div className="relative flex justify-center">
               <span className="bg-background px-2 text-sm text-primary">or</span>
            </div>
         </div>{' '}
         <Link
            href={'/i/flow/signup'}
            className={cn(buttonVariants({ variant: 'sign-up', size: 'sign' }), ' mb-2 ')}
         >
            Create an account
         </Link>
         <TermsAndConditions className="mb-5 text-start text-[12px] leading-[13px]" />
         <div className="mt-9">
            <div className="mb-4">
               <span className="text-base font-medium text-primary">Already have an account?</span>
            </div>{' '}
            <Link
               href={'/i/flow/signin'}
               className={cn(buttonVariants({ variant: 'sign-in', size: 'sign' }), ' mb-2 ')}
            >
               Sign in
            </Link>
         </div>
      </div>
   )
}
