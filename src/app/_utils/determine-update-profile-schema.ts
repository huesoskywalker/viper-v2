import { CreateProfileFormValues } from '../(auth)/i/flow/signup/_hooks/profile/use-create-profile-form'
import { ProviderProfileFormValues } from '../(auth)/i/flow/signup/_hooks/provider/use-provider-profile-form'

export const determineUpdateProfileSchema = (
   formData: CreateProfileFormValues | ProviderProfileFormValues,
) => {
   if ('contentDiscovery' in formData) {
      return formData as ProviderProfileFormValues
   } else {
      return formData as CreateProfileFormValues
   }
}
