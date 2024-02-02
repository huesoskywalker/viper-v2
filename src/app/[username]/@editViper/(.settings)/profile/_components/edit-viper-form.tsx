'use client'
import { BaseSyntheticEvent, ReactNode, useEffect } from 'react'
import { EditViperFormValues, useEditViperForm } from '../_hooks/use-edit-viper-form'
import DialogForm from '@/app/_components/form/dialog-form'

const EditViperForm = ({ children }: { children: ReactNode }) => {
   const { editViperForm } = useEditViperForm()

   const { control } = editViperForm
   const { _updateValid } = control

   useEffect(() => {
      _updateValid(true)
   }, [])

   const handleOnSubmit = async (formData: EditViperFormValues, e?: BaseSyntheticEvent) => {
      if (e) e.preventDefault()
      try {
         const { onSubmit } = await import('../_hooks/use-submit-edit-viper').then((mod) =>
            mod.useSubmitEditViper(),
         )
         await onSubmit(formData)
      } catch (error) {
         throw new Error(
            error instanceof Error ? error.message : 'Something went wrong. Please try again.',
         )
      }
   }

   return (
      <DialogForm formReturn={editViperForm} handleSubmit={handleOnSubmit}>
         {children}
      </DialogForm>
   )
}

export default EditViperForm
