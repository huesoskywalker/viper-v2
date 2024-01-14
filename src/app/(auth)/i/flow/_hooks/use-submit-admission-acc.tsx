import { BaseSyntheticEvent } from 'react'
import { AdmissionFormValues } from '../signup/_hooks/admission/use-admission-form'
import { PUBLIC_API_URL, PUBLIC_VIPER_API_KEY } from '@/config/env'
import { ApiResponse } from '@/types/api/response'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCreateAccountStore } from '../signup/_stores/create-account-store'

const useSubmitAdmissionAcc = (password: string) => {
   const { redirectStep } = useCreateAccountStore()

   const { refresh } = useRouter()

   const onSubmit = async (formData: AdmissionFormValues, e?: BaseSyntheticEvent) => {
      if (e) e.preventDefault

      const { token, ...restForm } = formData

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
            password: password,
            redirect: false,
         }),
            await Promise.all([redirectStep(1), refresh()])
      } catch (error) {
         throw new Error(`${error instanceof Error ? error.message : 'Unknown error'}`)
      }
   }

   return { onSubmit }
}

export default useSubmitAdmissionAcc
