import { isViperPropAvailable } from '@/app/_utils/is-viper-prop-available'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { UseFormGetFieldState, UseFormGetValues, UseFormSetValue, useForm } from 'react-hook-form'
import { z } from 'zod'

export type CreateProfileFormValues = z.infer<typeof createProfileSchema>

export type CreateProfileFieldState = UseFormGetFieldState<CreateProfileFormValues>

export type CreateProfileFieldValue = UseFormGetValues<CreateProfileFormValues>

export type CreateProfileSetValue = UseFormSetValue<CreateProfileFormValues>

let memoizedUsername: string | null = null

type InterestItem = {
   id: string
   label: string
}

export const interestItems: ReadonlyArray<InterestItem> = [
   {
      id: 'music',
      label: 'Music',
   },
   {
      id: 'entertainment',
      label: 'Entertainment',
   },
   {
      id: 'sports',
      label: 'Sports',
   },
   {
      id: 'fashion & beauty',
      label: 'Fashion & beauty',
   },
   {
      id: 'arts & culture',
      label: 'Arts & culture',
   },
   {
      id: 'concerts',
      label: 'Concerts',
   },
   {
      id: 'festivals',
      label: 'Festivals',
   },
   {
      id: 'bars',
      label: 'Bars',
   },
   {
      id: 'clubs',
      label: 'Clubs',
   },
] as const

export const createProfileSchema = z.object({
   bio: z.string().min(0).max(160, { message: 'Bio must not be longer than 160 characters.' }),
   username: z
      .string({
         required_error: 'Username is required',
      })
      .min(3, {
         message: 'Username must be at least 3 characters.',
      })
      .max(22, {
         message: 'Username must not be longer than 22 characters.',
      })
      .regex(/^\S+$/, {
         message: 'Username must not contain spaces.',
      })
      .regex(/^[a-zA-Z0-9]+$/, {
         message: 'Username must only contain letters and numbers.',
      })
      .refine(
         async (value) => {
            if (memoizedUsername === null) {
               memoizedUsername = value
            }
            if (value === memoizedUsername) return true

            if (value.length < 3) return

            const isTaken = await isViperPropAvailable('username', value)

            return !isTaken
         },
         {
            message: 'Username has already been taken.',
         },
      ),
   image: z.string(),
   interests: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
   }),
   role: z.string(),
})

export const useCreateProfileForm = () => {
   const { data: session } = useSession()

   const defaultValues = {
      bio: '',
      username: session?.user.username,
      image: '/default-user.png',
      interests: [],
      role: 'viper',
   }

   const createProfileForm = useForm<CreateProfileFormValues>({
      resolver: zodResolver(createProfileSchema),
      defaultValues,
      mode: 'onChange',
   })

   return { createProfileForm }
}
