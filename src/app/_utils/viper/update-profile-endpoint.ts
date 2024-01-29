import { PUBLIC_API_URL } from '@/config/env'
import { CreateProfileFormValues } from '../../(auth)/i/flow/signup/_hooks/profile/use-create-profile-form'
import { ProviderProfileFormValues } from '../../(auth)/i/flow/signup/_hooks/provider/use-provider-profile-form'
import { BasicViperResponse } from '@/types/api/response'
import { EditViperFormValues } from '@/app/[username]/@editViper/(.settings)/profile/_hooks/use-edit-viper-form'

const updateProfileEndpoint = async (
   formData: CreateProfileFormValues | ProviderProfileFormValues | EditViperFormValues,
) => {
   try {
      const updateViper = await fetch(`${PUBLIC_API_URL}/api/viper`, {
         headers: {
            'Content-Type': 'application/json',
         },
         method: 'PATCH',
         body: JSON.stringify({ formData }),
      })

      const { data, error }: BasicViperResponse = await updateViper.json()

      if (!updateViper.ok) {
         throw new Error(error)
      }

      return { data }
   } catch (error) {
      throw new Error(`${error instanceof Error ? error.message : 'Unknown error'}`)
   }
}

export default updateProfileEndpoint
