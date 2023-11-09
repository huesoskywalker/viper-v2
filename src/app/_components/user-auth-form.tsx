import * as React from 'react'
import { cn } from '@/lib/utils'
import TermsAndConditions from './terms-and-conditions'
import SignLink from './sign-link'
import ProviderForm from './provider-form'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ children, className, ...props }: UserAuthFormProps) {
   return (
      <div className={cn('grid w-full md:w-3/5 lg:w-1/2 2xl:w-2/5 ', className)} {...props}>
         <div className="grid gap-3">
            <ProviderForm provider="google" label="Google" />
            <ProviderForm provider="github" label="Github" />
         </div>
         {/* make this span abstract in a class */}
         <div className="relative my-[6px] w-[300px]">
            <div className="absolute inset-0 flex items-center">
               <span className="w-full border-t-[1.5px] border-gray-700 xl:border-t-2" />
            </div>
            <div className="relative flex justify-center">
               <span className="bg-background px-2 text-sm text-primary">or</span>
            </div>
         </div>
         <SignLink href={'/i/flow/signup'} variant="sign-up" label="Create an account" />
         <TermsAndConditions />
         <div className="mt-9">
            <div className="mb-4">
               <span className="text-primary text-base font-medium">Already have an account?</span>
            </div>
            <SignLink href="/i/flow/signin" variant="sign-in" label="Sign in" />
         </div>
      </div>
   )
}
