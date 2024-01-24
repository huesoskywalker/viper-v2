import { FormField, FormItem, FormMessage } from '@/components/ui/form'
import FormSelect from './form-select'
import getMonths from '@/app/(auth)/i/flow/signup/_utils/get-months'
import getDays from '@/app/(auth)/i/flow/signup/_utils/get-days'
import getYears from '@/app/(auth)/i/flow/signup/_utils/get-years'
import { AdmissionFormValues } from '@/app/(auth)/i/flow/signup/_hooks/admission/use-admission-form'
import { useFormContext } from 'react-hook-form'
import { ProviderProfileFormValues } from '@/app/(auth)/i/flow/signup/_hooks/provider/use-provider-profile-form'

type FormContextValues = AdmissionFormValues | ProviderProfileFormValues
const BirthDateFormField = () => {
   const { control } = useFormContext<FormContextValues>()

   const { months } = getMonths()
   const { days } = getDays()
   const { years } = getYears()

   return (
      <div className="flex w-full flex-row items-start gap-2">
         <FormField
            control={control}
            name={'birthDate.month'}
            render={({ field }) => (
               <FormItem className="w-4/5">
                  <FormSelect
                     id={field.name}
                     label="Month"
                     options={months}
                     variant={'plain'}
                     {...field}
                  />

                  <FormMessage />
               </FormItem>
            )}
         />{' '}
         <FormField
            control={control}
            name={'birthDate.day'}
            render={({ field }) => (
               <FormItem className="w-2/6">
                  <FormSelect
                     id={field.name}
                     label="Day"
                     options={days}
                     variant={'plain'}
                     {...field}
                  />

                  <FormMessage />
               </FormItem>
            )}
         />{' '}
         <FormField
            control={control}
            name={'birthDate.year'}
            render={({ field }) => (
               <FormItem className="w-2/5">
                  <FormSelect
                     id={field.name}
                     label="Year"
                     options={years}
                     variant={'plain'}
                     {...field}
                  />
                  <FormMessage />
               </FormItem>
            )}
         />
      </div>
   )
}

export default BirthDateFormField
