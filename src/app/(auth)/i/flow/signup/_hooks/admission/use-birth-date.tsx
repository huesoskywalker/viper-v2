import { useFormContext } from 'react-hook-form'

export const useBirthDate = () => {
   const { getValues } = useFormContext()

   const month = getValues('birthDate.month')
   const day = getValues('birthDate.day')
   const year = getValues('birthDate.year')

   const date = new Date(`${year}-${month}-${day}T00:00:00`)

   const dateOfBirth = date.toLocaleDateString(undefined, {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
   })

   return { dateOfBirth }
}
