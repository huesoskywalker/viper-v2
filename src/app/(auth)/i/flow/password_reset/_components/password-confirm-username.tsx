import { PasswordResetFormValues } from '../_hooks/use-password-reset-form'
import { FormControlStep } from '@/types/forms/steps'
import { FormDescription, FormField, FormItem } from '@/components/ui/form'
import FormInput from '@/app/_components/form/form-input'

const PasswordConfirmUsername: React.FC<FormControlStep<PasswordResetFormValues>> = ({
   formControl,
}) => {
   return (
      <>
         <FormDescription className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
            Confirm your username
         </FormDescription>
         <FormDescription className="pb-3">
            Verify your identity by entering the username associated with your Viper account.
         </FormDescription>
         <FormField
            control={formControl}
            name="username"
            render={({ field }) => (
               <FormItem className="relative">
                  <FormInput
                     id={field.name}
                     type="text"
                     variant={'plain'}
                     label="Username"
                     {...field}
                  />
               </FormItem>
            )}
         />
      </>
   )
}

export default PasswordConfirmUsername
