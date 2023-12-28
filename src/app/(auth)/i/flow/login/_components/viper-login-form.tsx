'use client'
import FormInput from '@/app/_components/form/form-input'
import React, { BaseSyntheticEvent, useEffect } from 'react'
import { useLoginForm } from '../_hooks/use-login-form'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { SignInResponse, signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

const ViperLoginForm = () => {
   const { loginForm } = useLoginForm()

   const { control, resetField } = loginForm

   const { toast } = useToast()

   const onSubmit = async (formData: any, e?: BaseSyntheticEvent) => {
      if (e) e.preventDefault

      const viperSignIn: SignInResponse | undefined = await signIn('credentials', {
         identifier: formData.identifier,
         password: formData.password,
         redirect: false,
         callbackUrl: '/home',
      })

      if (viperSignIn && viperSignIn.error) {
         resetField('password')
         toast({
            variant: 'sky',
            size: 'sm',
            title: 'Credentials do not match.',
            className: 'right-7',
         })
      }
   }

   return (
      <Form {...loginForm}>
         <form onSubmit={loginForm.handleSubmit(onSubmit)} className=" space-y-2">
            <FormField
               control={control}
               name="identifier"
               render={({ field }) => (
                  <FormItem>
                     <FormInput
                        id={field.name}
                        type="text"
                        variant={'plain'}
                        label="Email or username"
                        {...field}
                     />
                  </FormItem>
               )}
            />
            <FormField
               control={control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormInput
                        id={field.name}
                        type="password"
                        variant={'plain'}
                        label="Password"
                        {...field}
                     />
                  </FormItem>
               )}
            />
            <div className="pt-3">
               <Button variant={'default'} size={'provider'} type="submit">
                  {' '}
                  Next
               </Button>
            </div>
         </form>
      </Form>
   )
}

export default ViperLoginForm
