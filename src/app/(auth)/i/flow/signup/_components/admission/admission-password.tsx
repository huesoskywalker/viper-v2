import { DialogDescription } from '@/components/ui/dialog'
import { FormDescription } from '@/components/ui/form'
import React from 'react'
import PasswordFormField from '@/app/_components/form/password-form-field'

const AdmissionPassword = () => {
   return (
      <>
         <DialogDescription className="mt-3 text-2xl font-bold text-foreground sm:text-3xl ">
            You&apos;ll need a password
         </DialogDescription>
         <FormDescription>Make sure it&apos;s 8 characters or more.</FormDescription>
         <PasswordFormField fieldName="password" label="Password" />
      </>
   )
}

export default AdmissionPassword
