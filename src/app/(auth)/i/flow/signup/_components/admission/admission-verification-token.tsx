import FormInput from '@/app/_components/form/form-input'
import { FormField, FormItem, FormMessage } from '@/components/ui/form'
import { DialogDescription } from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import ResendTokenButton from './resend-token-button'
import { AdmissionFormValues } from '../../_hooks/admission/use-admission-form'
import { PasswordResetFormValues } from '../../../password_reset/_hooks/use-password-reset-form'
import { Control, Path } from 'react-hook-form'

const AdmissionVerificationToken = <T extends AdmissionFormValues | PasswordResetFormValues>({
   formControl,
   children,
   label,
}: {
   formControl: Control<T>
   children: ReactNode
   label: string
}) => {
   return (
      <>
         <DialogDescription className="mt-3 text-2xl font-bold text-foreground sm:text-3xl ">
            We sent you a code
         </DialogDescription>
         {children}
         <FormField
            control={formControl}
            name={'token' as Path<T>}
            render={({ field }) => (
               <FormItem>
                  <FormInput
                     id={field.name}
                     type="string"
                     variant={'plain'}
                     label={label}
                     {...field}
                     value={field.value as string}
                  />
               </FormItem>
            )}
         />
         <FormMessage className="text-viper-dodger-blue">
            <ResendTokenButton />
         </FormMessage>
      </>
   )
}

export default AdmissionVerificationToken
