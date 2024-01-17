import { BaseSyntheticEvent } from 'react'
import { ProviderProfileFormValues } from '../signup/_hooks/provider/use-provider-profile-form'
import { useCreateProfileStore } from '../signup/_stores/create-profile-store'
import { useSession } from 'next-auth/react'
import updateProfileEndpoint from '@/app/_utils/update-profile-endpoint'
import { CreateProfileFormValues } from '../signup/_hooks/profile/use-create-profile-form'
import { useRouter } from 'next/navigation'

const useSubmitCreateProfile = () => {
   const { update } = useSession()
   const { clearInterests } = useCreateProfileStore()
   const { push } = useRouter()

   const onSubmit = async (
      formData: CreateProfileFormValues | ProviderProfileFormValues,
      e?: BaseSyntheticEvent,
   ) => {
      if (e) e.preventDefault
      clearInterests()

      const { data } = await updateProfileEndpoint(formData)

      await Promise.all([
         await update({
            username: data.username,
            image: data.image,
            role: data.role,
            followings: data.followings.length,
         }),
         push('/home'),
      ])
   }
   return { onSubmit }
}

export default useSubmitCreateProfile
