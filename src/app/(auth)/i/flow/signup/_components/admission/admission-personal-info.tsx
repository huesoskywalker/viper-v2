import { FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import FormSelect from '@/app/_components/form/form-select'
import getMonths from '../../_utils/get-months'
import getDays from '../../_utils/get-days'
import getYears from '../../_utils/get-years'
import FormInput from '@/app/_components/form/form-input'
import { AdmissionFormControl } from '../../_hooks/admission/use-admission-form'
import { FormControlSteps } from '@/types/forms/steps'

const AdmissionPersonalInfo: React.FC<FormControlSteps<AdmissionFormControl>> = ({
   formControl,
}) => {
   const { months } = getMonths()
   const { days } = getDays()
   const { years } = getYears()

   return (
      <>
         <FormDescription className="mt-3 text-3xl font-bold text-foreground ">
            Create your account
         </FormDescription>
         <FormField
            control={formControl}
            name="name"
            render={({ field }) => (
               <FormItem>
                  <FormInput
                     id={field.name}
                     type="text"
                     variant={'plain'}
                     label="Name"
                     {...field}
                  />
               </FormItem>
            )}
         />
         <FormField
            control={formControl}
            name="email"
            render={({ field }) => (
               <FormItem>
                  <FormInput
                     id={field.name}
                     type="email"
                     variant={'plain'}
                     label="Email"
                     {...field}
                  />
               </FormItem>
            )}
         />
         <div className="space-y-4">
            <FormDescription className="flex flex-col items-start justify-center gap-1">
               <span className="text-md font-semibold text-primary">Date of birth</span>
               <span className="text-xs font-normal">
                  Protected in privacy, unveil the secret of your age, whether it&apos;s for
                  business, a beloved pet, or any other venture.
               </span>
            </FormDescription>
            <div className="flex w-full flex-row items-start gap-2">
               <FormField
                  control={formControl}
                  name="birthDate.month"
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
                  control={formControl}
                  name="birthDate.day"
                  render={({ field }) => (
                     <FormItem className="w-2/6">
                        <FormSelect
                           id={'birthDate.day'}
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
                  control={formControl}
                  name="birthDate.year"
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
         </div>
      </>
   )
}

export default AdmissionPersonalInfo
