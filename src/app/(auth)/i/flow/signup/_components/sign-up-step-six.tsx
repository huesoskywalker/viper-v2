import FormInput from '@/app/_components/form-input'
import { DialogDescription } from '@/components/ui/dialog'
import { FormDescription, FormField, FormItem, useFormField } from '@/components/ui/form'
import { FormStepsControl } from '@/types/forms/steps'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

const SignUpStepSix: React.FC<FormStepsControl> = ({ formControl }) => {
   const { trigger } = useFormContext()

   const name = formControl._formValues['name']
   formControl._defaultValues['username'] = name.trim().replace(/\s+/g, '')

   useEffect(() => {
      trigger('username')
   }, [])

   return (
      <>
         <DialogDescription className="mt-3 text-3xl font-bold text-primary ">
            What should we call you?
         </DialogDescription>
         <FormDescription>
            Your @username is unique. You can always change it later.
         </FormDescription>
         <FormField
            control={formControl}
            name="username"
            render={({ field }) => (
               <FormItem className="relative">
                  <FormInput
                     id={field.name}
                     type={'text'}
                     variant={'viper'}
                     label="Username"
                     checkbox={true}
                     {...field}
                  />
               </FormItem>
            )}
         />
      </>
   )
}

export default SignUpStepSix
