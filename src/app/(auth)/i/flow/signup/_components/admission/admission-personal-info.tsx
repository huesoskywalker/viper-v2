import { FormDescription, FormField, FormItem } from '@/components/ui/form'
import FormInput from '@/app/_components/form/form-input'
import { AdmissionFormValues } from '../../_hooks/admission/use-admission-form'
import { FormControlStep } from '@/types/forms/steps'
import BirthDateSelector from '@/app/_components/form/birth-date-selector'
import { DialogDescription } from '@radix-ui/react-dialog'

const AdmissionPersonalInfo: React.FC<FormControlStep<AdmissionFormValues>> = ({
   formControl,
}) => {
   return (
      <>
         <DialogDescription className="mt-3 text-2xl font-bold text-foreground sm:text-3xl ">
            Create your account
         </DialogDescription>
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
            <BirthDateSelector formControl={formControl} />
         </div>
      </>
   )
}

export default AdmissionPersonalInfo
