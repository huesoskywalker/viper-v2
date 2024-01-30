'use client'
import { ReactNode, useEffect } from 'react'
import { useEditViperForm } from '../_hooks/use-edit-viper-form'
import DialogForm from '@/app/_components/form/dialog-form'
import useSubmitEditViper from '../_hooks/use-submit-edit-viper'

const EditViperForm = ({ children }: { children: ReactNode }) => {
   const { editViperForm } = useEditViperForm()

   const { control } = editViperForm
   const { _updateValid } = control

   useEffect(() => {
      _updateValid(true)
   }, [])

   const { handleOnSubmit } = useSubmitEditViper()

   return (
      <DialogForm formReturn={editViperForm} handleSubmit={handleOnSubmit}>
         {children}
      </DialogForm>
   )
}

export default EditViperForm
