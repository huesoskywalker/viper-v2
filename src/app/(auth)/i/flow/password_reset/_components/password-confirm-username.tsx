import { PasswordResetFormValues } from '../_hooks/use-password-reset-form'
import { FormDescription } from '@/components/ui/form'
import { DialogDescription } from '@/components/ui/dialog'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'
import UsernameFormField from '@/app/_components/form/username-form-field'

const PasswordConfirmUsername = () => {
   const { setFocus } = useFormContext<PasswordResetFormValues>()

   useEffect(() => {
      void setFocus('username')
   }, [])

   return (
      <>
         <DialogDescription className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
            Confirm your username
         </DialogDescription>
         <FormDescription className="pb-3">
            Verify your identity by entering the username associated with your Viper account.
         </FormDescription>
         <UsernameFormField />
      </>
   )
}

export default PasswordConfirmUsername
