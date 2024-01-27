import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type EditViperFormValues = z.infer<typeof editViperSchema>

const editViperSchema = z.object({
   backgroundImage: z.string(),
   image: z.string(),
   name: z.string(),
   bio: z.string().max(160),
   location: z.string().max(30),
   website: z.string(),
   birthDate: z.object({
      month: z.string(),
      day: z.string(),
      year: z.string(),
   }),
})

export const useEditViperForm = () => {
   const { data: session } = useSession()
   const user = session?.user

   const defaultValues = {
      backgroundImage: user?.backgroundImage,
      image: user?.image,
      name: user?.name,
      bio: user?.bio,
      location: user?.location,
      website: user?.website,
      birthDate: user?.birthDate,
   }

   const editViperForm = useForm<EditViperFormValues>({
      resolver: zodResolver(editViperSchema),
      defaultValues,
      mode: 'onSubmit',
   })

   return { editViperForm }
}
