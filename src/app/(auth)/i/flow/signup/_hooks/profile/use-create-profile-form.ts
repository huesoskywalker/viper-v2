import { isViperPropAvailable } from '@/app/_utils/is-viper-prop-available'
import { zodResolver } from '@hookform/resolvers/zod'
import {
   Control,
   UseFormGetFieldState,
   UseFormGetValues,
   UseFormSetValue,
   useForm,
} from 'react-hook-form'
import { z } from 'zod'

export type CreateProfileFormValues = z.infer<typeof createProfileSchema>

export type CreateProfileFormControl = Control<CreateProfileFormValues, any>

export type CreateProfileFieldState = UseFormGetFieldState<CreateProfileFormValues>

export type CreateProfileFieldValue = UseFormGetValues<CreateProfileFormValues>

export type CreateProfileSetValue = UseFormSetValue<CreateProfileFormValues>

let memoizedUsername: string | null = null

type InterestItem = Array<{
   id: string
   label: string
}>

export const interestItems: InterestItem = [
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

const createProfileSchema = z.object({
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
   image: z.string().optional(),
   interests: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
   }),
})

export const useCreateProfileForm = () => {
   const defaultValues = {
      interests: [],
   }

   const createProfileForm = useForm<CreateProfileFormValues>({
      resolver: zodResolver(createProfileSchema),
      defaultValues,
      mode: 'onChange',
   })

   return { createProfileForm }
}
