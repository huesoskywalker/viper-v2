import { BASE_URL } from '@/config/env'
import { CreateProfileFormValues } from '../(auth)/i/flow/signup/_hooks/profile/use-create-profile-form'
import { ProviderAdmissionFormValues } from '../(auth)/i/flow/signup/_hooks/provider-admission/use-provier-admission-form'
import { BasicViperResponse } from '@/types/api/response'

const updateProfileEndpoint = async (
   formData: CreateProfileFormValues | ProviderAdmissionFormValues,
) => {
   try {
      const updateViper = await fetch(`${BASE_URL}/api/viper`, {
         headers: {
            'Content-Type': 'application/json',
         },
         method: 'PATCH',
         body: JSON.stringify({ formData }),
      })

      if (!updateViper.ok) {
         const { error }: BasicViperResponse = await updateViper.json()
         throw new Error(error)
      }

      const { data }: BasicViperResponse = await updateViper.json()

      return { data }
   } catch (error) {
      throw new Error(`${error instanceof Error ? error.message : 'Unknown error'}`)
   }
}

export default updateProfileEndpoint
