import * as React from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useHandleProvider } from '../_hooks/useHandleProvider'
import SubmitButton from './submit-button'
import { useHandleEmail } from '../_hooks/useHandleEmail'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
   return (
      <div className={cn('grid gap-6', className)} {...props}>
         <form action={useHandleEmail}>
            <div className="grid gap-2">
               <div className="grid gap-1">
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
               </div>
               <SubmitButton provider={'Email'} />
            </div>
         </form>
         <div className="relative">
            <div className="absolute inset-0 flex items-center">
               <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
               <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
         </div>
         <form action={useHandleProvider}>
            <input type="hidden" id="github" name="provider" value="google" />
            <SubmitButton provider={'Google'} />
         </form>
         <form action={useHandleProvider} className="inline-flex justify-center whitespace-nowrap">
            <input type="hidden" id="github" name="provider" value="github" />
            <SubmitButton provider={'Github'} />
         </form>
      </div>
   )
}
