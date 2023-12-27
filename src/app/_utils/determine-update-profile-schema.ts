import { CreateProfileFormValues } from '../(auth)/i/flow/signup/_hooks/profile/use-create-profile-form'
import { ProviderAdmissionFormValues } from '../(auth)/i/flow/signup/_hooks/provider-admission/use-provier-admission-form'

export const determineUpdateProfileSchema = (
   formData: CreateProfileFormValues | ProviderAdmissionFormValues,
) => {
   if ('contentDiscovery' in formData) {
      return formData as ProviderAdmissionFormValues
   } else {
      return formData as CreateProfileFormValues
   }
}
