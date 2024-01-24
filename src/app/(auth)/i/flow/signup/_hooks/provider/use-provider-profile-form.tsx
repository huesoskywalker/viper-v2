import { z } from 'zod'
import { admissionSchema } from '../admission/use-admission-form'
import { createProfileSchema } from '../profile/use-create-profile-form'
import { UseFormGetFieldState, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'

export type ProviderProfileFormValues = z.infer<typeof providerProfileSchema>

export type ProviderProfileFieldState = UseFormGetFieldState<ProviderProfileFormValues>

const providerProfileSchema = z.object({
   birthDate: admissionSchema.shape.birthDate,
   contentDiscovery: admissionSchema.shape.contentDiscovery,
   bio: createProfileSchema.shape.bio,
   username: createProfileSchema.shape.username,
   interests: createProfileSchema.shape.interests,
   role: createProfileSchema.shape.role,
})

export const useProviderProfileForm = () => {
   const { data: session } = useSession()

   const defaultValues = {
      birthDate: {
         month: '',
         day: '',
         year: '',
      },
      contentDiscovery: true,
      bio: '',
      username: session?.user.username,
      interests: [],
      role: 'viper',
   }

   const providerProfileForm = useForm<ProviderProfileFormValues>({
      resolver: zodResolver(providerProfileSchema),
      defaultValues,
      mode: 'onChange',
   })

   return { providerProfileForm }
}
