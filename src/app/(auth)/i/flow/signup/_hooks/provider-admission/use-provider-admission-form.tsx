import { z } from 'zod'
import { admissionSchema } from '../admission/use-admission-form'
import { createProfileSchema } from '../profile/use-create-profile-form'
import { UseFormGetFieldState, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export type ProviderAdmissionFormValues = z.infer<typeof providerAdmissionSchema>

export type ProviderAdmissionFieldState = UseFormGetFieldState<ProviderAdmissionFormValues>

const providerAdmissionSchema = z.object({
   birthDate: admissionSchema.shape.birthDate,
   contentDiscovery: admissionSchema.shape.contentDiscovery,
   bio: createProfileSchema.shape.bio,
   username: createProfileSchema.shape.username,
   interests: createProfileSchema.shape.interests,
   role: createProfileSchema.shape.role,
})

export const useProviderAdmissionForm = () => {
   const defaultValues = {
      birthDate: {
         month: '',
         day: '',
         year: '',
      },
      contentDiscovery: true,
      bio: '',
      //   username: '',
      interests: [],
      role: 'viper',
   }

   const providerAdmissionForm = useForm<ProviderAdmissionFormValues>({
      resolver: zodResolver(providerAdmissionSchema),
      defaultValues,
      mode: 'onChange',
   })

   return { providerAdmissionForm }
}
