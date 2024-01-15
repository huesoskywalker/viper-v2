import { PasswordResetFormValues } from '../(auth)/i/flow/password_reset/_hooks/use-password-reset-form'
import { AdmissionFormValues } from '../(auth)/i/flow/signup/_hooks/admission/use-admission-form'
import { CreateProfileFormValues } from '../(auth)/i/flow/signup/_hooks/profile/use-create-profile-form'
import { ProviderProfileFormValues } from '../(auth)/i/flow/signup/_hooks/provider/use-provider-profile-form'

export const determineUpdateProfileSchema = <
   T extends
      | AdmissionFormValues
      | ProviderProfileFormValues
      | CreateProfileFormValues
      | PasswordResetFormValues,
>(
   formData: T,
) => {
   if ('birthDate' in formData && 'email' in formData) {
      return formData as AdmissionFormValues
   } else if ('contentDiscovery' in formData && 'username' in formData) {
      return formData as ProviderProfileFormValues
   } else if ('role' in formData) {
      return formData as CreateProfileFormValues
   } else {
      return formData as PasswordResetFormValues
   }
}
