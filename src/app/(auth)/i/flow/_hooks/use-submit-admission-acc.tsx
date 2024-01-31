import { AdmissionFormValues } from '../signup/_hooks/admission/use-admission-form'
import { PUBLIC_API_URL, PUBLIC_VIPER_API_KEY } from '@/config/env'
import { ApiResponse } from '@/types/api/response'
import { PasswordResetFormValues } from '../password_reset/_hooks/use-password-reset-form'
import { signIn } from 'next-auth/react'

const useSubmitAdmissionAcc = () => {
   const onSubmit = async (restForm: Partial<AdmissionFormValues | PasswordResetFormValues>) => {
      try {
         const updateViper = await fetch(`${PUBLIC_API_URL}/i/flow/signup/api/verify`, {
            headers: {
               'Content-Type': 'application/json',
               'API-Key': `${PUBLIC_VIPER_API_KEY}`,
            },
            method: 'PATCH',
            body: JSON.stringify({
               restForm,
            }),
         })

         const { data, error }: ApiResponse<{ username: string }> = await updateViper.json()

         if (!updateViper.ok) {
            throw new Error(error)
         }

         await signIn('credentials', {
            identifier: data.username,
            password: restForm.password,
            redirect: false,
         })
      } catch (error) {
         throw new Error(`${error instanceof Error ? error.message : 'Unknown error'}`)
      }
   }
   return { onSubmit }
}

export default useSubmitAdmissionAcc
