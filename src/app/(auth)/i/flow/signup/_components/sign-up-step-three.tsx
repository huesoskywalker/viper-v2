import { FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'
import { useCreateAccountStore } from '../_stores/create-account-store'
import { getBirthDate } from '../_utils/get-birth-date'
import FormInput from '@/app/_components/form-input'
import { CreateAccountFormControl } from '../_hooks/use-create-account-form'

const SignUpStepThree = ({ formControl }: { formControl: CreateAccountFormControl }) => {
   const { redirectStep, setFocusElem } = useCreateAccountStore()

   const { dateOfBirth } = getBirthDate()

   const handlePrevState = (event: any) => {
      redirectStep(1)
      setFocusElem(event.target.id)
   }

   return (
      <>
         <FormDescription className="mt-3  text-3xl font-bold text-primary">
            Create your account
         </FormDescription>
         <FormField
            control={formControl}
            name="name"
            render={({ field }) => (
               <FormItem className="relative" onFocus={handlePrevState}>
                  <FormInput
                     id={field.name}
                     type="text"
                     variant={'viper'}
                     label="Name"
                     {...field}
                  />
                  <Checkbox
                     className="absolute bottom-3 right-3 rounded-lg border-none data-[state=checked]:bg-viper-forest-green "
                     defaultChecked={true}
                  />
               </FormItem>
            )}
         />
         <FormField
            control={formControl}
            name="email"
            render={({ field }) => (
               <FormItem className="relative" onFocus={handlePrevState}>
                  <FormInput
                     id={field.name}
                     type="text"
                     variant={'viper'}
                     label="Email"
                     {...field}
                  />
                  <Checkbox
                     className="absolute bottom-3 right-3 rounded-lg border-none data-[state=checked]:bg-viper-forest-green "
                     defaultChecked={true}
                  />
               </FormItem>
            )}
         />{' '}
         <FormField
            control={formControl}
            name="birthDate"
            render={({ field }) => (
               <FormItem className="relative" onFocus={handlePrevState}>
                  <FormInput
                     {...field}
                     id={'birthDate.month'}
                     type="text"
                     variant={'viper'}
                     label="Date of birth"
                     value={dateOfBirth}
                  />
                  <Checkbox
                     className="absolute bottom-3 right-3 rounded-lg border-none data-[state=checked]:bg-viper-forest-green "
                     defaultChecked={true}
                  />
               </FormItem>
            )}
         />
      </>
   )
}

export default SignUpStepThree
