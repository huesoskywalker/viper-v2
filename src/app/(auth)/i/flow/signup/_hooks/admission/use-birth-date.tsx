import { useFormContext } from 'react-hook-form'
import { AdmissionFormValues } from './use-admission-form'
import { EditViperFormValues } from '@/app/[username]/@editViper/(.settings)/profile/_hooks/use-edit-viper-form'

type FormContextValues = AdmissionFormValues | EditViperFormValues

export type BirthDateFormat = {
   monthFormat: Intl.DateTimeFormatOptions['month']
   dayFormat: Intl.DateTimeFormatOptions['day']
   yearFormat: Intl.DateTimeFormatOptions['year']
}

export const useBirthDate = ({ monthFormat, dayFormat, yearFormat }: BirthDateFormat) => {
   const { getValues } = useFormContext<FormContextValues>()

   const month = getValues('birthDate.month')
   const day = getValues('birthDate.day')
   const year = getValues('birthDate.year')

   const date = new Date(`${year}-${month}-${day}T00:00:00`)

   const dateOfBirth = date.toLocaleDateString(undefined, {
      month: monthFormat,
      day: dayFormat,
      year: yearFormat,
   })

   return { dateOfBirth }
}
