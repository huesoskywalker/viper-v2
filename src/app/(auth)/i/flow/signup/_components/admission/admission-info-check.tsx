import { FormDescription } from '@/components/ui/form'
import React from 'react'
import { FocusElement, useCreateAccountStore } from '../../_stores/create-account-store'
import NameFormField from '@/app/_components/form/name-form-field'
import EmailFormField from '@/app/_components/form/email-form-field'
import FormattedBirthDateFormField from '@/app/_components/form/formatted-birthdate-form-field'

const AdmissionInfoCheck = () => {
   const { redirectStep, setFocusElem } = useCreateAccountStore()

   const handlePrevState = (e: React.FocusEvent<HTMLDivElement, Element>) => {
      redirectStep(1)

      const validFocusElem: FocusElement[] = ['email', 'name', 'birthDate.month']

      const matchedFocusElem = validFocusElem.find((elem) => e.target.id.includes(elem))
      if (matchedFocusElem) {
         setFocusElem(matchedFocusElem)
      }
   }

   return (
      <>
         <FormDescription className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
            Create your account
         </FormDescription>
         <NameFormField checkbox={true} itemOnFocus={handlePrevState} />
         <EmailFormField checkbox={true} itemOnFocus={handlePrevState} />
         <FormattedBirthDateFormField checkbox={true} itemOnFocus={handlePrevState} />
      </>
   )
}

export default AdmissionInfoCheck
