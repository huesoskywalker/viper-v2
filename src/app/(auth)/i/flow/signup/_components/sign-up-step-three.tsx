import { FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import React from 'react'
import { useCreateAccountStore } from '../_stores/create-account-store'
import { getBirthDate } from '../_utils/get-birth-date'
import FormInput from '@/app/_components/form-input'
import { FormStepsControl } from '@/types/forms/steps'

const SignUpStepThree: React.FC<FormStepsControl> = ({ formControl }) => {
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
                     checkbox={true}
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
                     checkbox={true}
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
                     checkbox={true}
                  />
               </FormItem>
            )}
         />
      </>
   )
}

export default SignUpStepThree
