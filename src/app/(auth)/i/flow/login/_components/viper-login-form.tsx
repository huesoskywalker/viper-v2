'use client'
import FormInput from '@/app/_components/form/form-input'
import React, { BaseSyntheticEvent } from 'react'
import { LoginFormValues, useLoginForm } from '../_hooks/use-login-form'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

const ViperLoginForm = () => {
   const { loginForm } = useLoginForm()

   const { control, resetField, formState } = loginForm

   const { isValid } = formState

   const { toast } = useToast()

   const onSubmit = async (formData: LoginFormValues, e?: BaseSyntheticEvent) => {
      if (e) e.preventDefault

      const login = await signIn('credentials', {
         identifier: formData.identifier,
         password: formData.password,
         redirect: false,
         callbackUrl: '/home',
      })

      if (!login) throw new Error(`Unexpected login error. Please try again later.`)

      if (login.error) {
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
            <div className="pt-4">
               <Button variant={'default'} size={'provider'} type="submit" disabled={!isValid}>
                  {' '}
                  Next
               </Button>
            </div>
         </form>
      </Form>
   )
}

export default ViperLoginForm
