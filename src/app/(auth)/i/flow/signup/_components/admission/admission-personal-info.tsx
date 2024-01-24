import { FormDescription } from '@/components/ui/form'
import { DialogDescription } from '@radix-ui/react-dialog'
import NameFormField from '@/app/_components/form/name-form-field'
import EmailFormField from '@/app/_components/form/email-form-field'
import BirthDateFormField from '@/app/_components/form/birth-date-form-field'

const AdmissionPersonalInfo = () => {
   return (
      <>
         <DialogDescription className="mt-3 text-2xl font-bold text-foreground sm:text-3xl ">
            Create your account
         </DialogDescription>
         <NameFormField />
         <EmailFormField />
         <div className="space-y-4">
            <FormDescription className="flex flex-col items-start justify-center gap-1">
               <span className="text-md font-semibold text-primary">Date of birth</span>
               <span className="text-xs font-normal">
                  Protected in privacy, unveil the secret of your age, whether it&apos;s for
                  business, a beloved pet, or any other venture.
               </span>
            </FormDescription>
            <BirthDateFormField />
         </div>
      </>
   )
}

export default AdmissionPersonalInfo
