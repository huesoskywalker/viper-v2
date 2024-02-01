'use client'
import FormInput from '@/app/_components/form/form-input'
import { BaseSyntheticEvent } from 'react'
import { LoginFormValues, useLoginForm } from '../_hooks/use-login-form'
import { Form, FormField, FormItem } from '@/components/ui/form'
import PasswordFormField from '@/app/_components/form/password-form-field'
import ValidFormSubmitButton from '@/app/_components/form/valid-form-submit-button'
import dynamic from 'next/dynamic'

const Toaster = dynamic(() => import('@/components/ui/toaster').then((mod) => mod.Toaster))

const ViperLoginForm = () => {
   const { loginForm } = useLoginForm()

   const { control, resetField } = loginForm

   const onSubmit = async (formData: LoginFormValues, e?: BaseSyntheticEvent) => {
      if (e) e.preventDefault

      const { signIn } = await import('next-auth/react')

      const login = await signIn('credentials', {
         identifier: formData.identifier,
         password: formData.password,
         redirect: false,
      })

      if (!login) throw new Error(`Unexpected login error. Please try again later.`)

      if (login.error) {
         const { toast } = await import('@/components/ui/use-toast')
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
      <>
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
               <PasswordFormField fieldName="password" label="Password" />
               <div className="pt-4">
                  <ValidFormSubmitButton label="Next" />{' '}
               </div>
            </form>
         </Form>
         <Toaster />
      </>
   )
}

export default ViperLoginForm
