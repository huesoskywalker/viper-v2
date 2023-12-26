import { AdmissionFormValues } from '../(auth)/i/flow/signup/_hooks/admission/use-admission-form'
import { CreateProfileFormValues } from '../(auth)/i/flow/signup/_hooks/profile/use-create-profile-form'

// change the AdmissionFormValues when we have a edit profile page
// this is for an endpoint
export const determineUpdateProfileSchema = (
   formData: CreateProfileFormValues | AdmissionFormValues,
) => {
   if ('interests' in formData) {
      return formData as CreateProfileFormValues
   } else {
      return formData as AdmissionFormValues
   }
}
