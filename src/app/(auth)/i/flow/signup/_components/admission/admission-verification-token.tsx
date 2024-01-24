import FormInput from '@/app/_components/form/form-input'
import { FormField, FormItem, FormMessage } from '@/components/ui/form'
import { DialogDescription } from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import ResendTokenButton from './resend-token-button'
import { AdmissionFormValues } from '../../_hooks/admission/use-admission-form'
import { PasswordResetFormValues } from '../../../password_reset/_hooks/use-password-reset-form'
import { Control, useFormContext } from 'react-hook-form'

const isAdmissionFormControl = <T extends AdmissionFormValues | PasswordResetFormValues>(
   formControl: Control<T>,
): formControl is Control<T> => {
   return 'name' in formControl._fields
}

type FormContextValues = AdmissionFormValues | PasswordResetFormValues

const AdmissionVerificationToken = ({
   children,
   label,
}: {
   children: ReactNode
   label: string
}) => {
   const { control } = useFormContext<FormContextValues>()

   return (
      <>
         <DialogDescription className="mt-3 text-2xl font-bold text-foreground sm:text-3xl ">
            We sent you a code
         </DialogDescription>
         {children}
         <FormField
            control={control}
            name={'token'}
            render={({ field }) => (
               <FormItem>
                  <FormInput
                     id={field.name}
                     type="string"
                     variant={'plain'}
                     label={label}
                     {...field}
                  />
               </FormItem>
            )}
         />
         <FormMessage className="text-viper-dodger-blue">
            {isAdmissionFormControl(control) ? <ResendTokenButton /> : null}
         </FormMessage>
      </>
   )
}

export default AdmissionVerificationToken
