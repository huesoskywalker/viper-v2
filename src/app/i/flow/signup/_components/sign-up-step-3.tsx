import FormInput from '../../../../_components/form-input'
import { FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Control } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'
import { useSignUpStore } from '../_stores/sign-up-store'
import FormSelect from '@/app/_components/form-select'
import { getBirthDate } from '../_utils/get-birth-date'

const SignUpStep3 = ({
   formControl,
}: {
   formControl: Control<
      {
         name: string
         email: string
         birthDate: {
            month: string
            day: string
            year: string
         }
         contentDiscovery: boolean
      },
      any
   >
}) => {
   const { redirectStep, setFocusElem } = useSignUpStore()

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
                  <FormMessage />
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
                     type="email"
                     variant={'viper'}
                     label="Email"
                     {...field}
                  />
                  <Checkbox
                     className="absolute bottom-3 right-3 rounded-lg border-none data-[state=checked]:bg-viper-forest-green "
                     defaultChecked={true}
                  />
                  <FormMessage />
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
                  <FormMessage />
               </FormItem>
            )}
         />
      </>
   )
}

export default SignUpStep3
