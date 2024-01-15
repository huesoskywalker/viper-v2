import { PasswordResetFormValues } from '../password_reset/_hooks/use-password-reset-form'
import { AdmissionFormValues } from '../signup/_hooks/admission/use-admission-form'
import { CreateProfileFormValues } from '../signup/_hooks/profile/use-create-profile-form'
import { ProviderProfileFormValues } from '../signup/_hooks/provider/use-provider-profile-form'

type AllFormValues =
   | AdmissionFormValues
   | ProviderProfileFormValues
   | CreateProfileFormValues
   | PasswordResetFormValues

export const isAdmissionFormValues = (
   formValues: AllFormValues,
): formValues is AdmissionFormValues => {
   return 'name' in formValues
}

export const isPasswordResetFormValues = (
   formValues: AllFormValues,
): formValues is PasswordResetFormValues => {
   return 'password' in formValues
}
