import { isViperPropAvailable } from '@/app/_utils/is-viper-prop-available'
import { zodResolver } from '@hookform/resolvers/zod'
import { Control, UseFormGetFieldState, UseFormGetValues, useForm } from 'react-hook-form'
import { z } from 'zod'

export type CreateProfileFormValues = z.infer<typeof createProfileSchema>

export type CreateProfileFormControl = Control<CreateProfileFormValues, any>

export type CreateProfileFieldState = UseFormGetFieldState<CreateProfileFormValues>

export type CreateProfileFieldValue = UseFormGetValues<CreateProfileFormValues>

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
            if (value.length < 3) return

            const isTaken = await isViperPropAvailable('username', value)

            return !isTaken
         },
         {
            message: 'Username has already been taken.',
         },
      ),
   image: z.string().min(1).optional(),
})

export const useCreateProfileForm = () => {
   const defaultValues = {
      image: undefined,
   }

   const createProfileForm = useForm<CreateProfileFormValues>({
      resolver: zodResolver(createProfileSchema),
      defaultValues,
      mode: 'onChange',
   })

   return { createProfileForm }
}
