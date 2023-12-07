import TermsAndConditions from '@/app/_components/terms-and-conditions'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { DialogDescription } from '@radix-ui/react-dialog'
import Link from 'next/link'
import { FormControlSteps } from '@/types/forms/steps'
import { AdmissionFormControl } from '../../_hooks/admission/use-admission-form'

const AdmissionContentDiscovery: React.FC<FormControlSteps<AdmissionFormControl>> = ({
   formControl,
}) => {
   const linkClass = 'text-viper-dodger-blue hover:underline hover:underline-offset-4 '

   return (
      <div className="flex flex-col space-y-6">
         <DialogDescription className="mt-3 text-3xl font-semibold text-primary">
            Customize your experience
         </DialogDescription>
         <div className="space-y-2">
            <FormField
               control={formControl}
               name="contentDiscovery"
               render={({ field }) => (
                  <FormItem className="space-y-2">
                     <FormLabel
                        htmlFor={field.name}
                        className="text-lg font-semibold text-primary"
                     >
                        Discover Viper content across the web.
                     </FormLabel>
                     <div className="flex flex-row gap-6">
                        <FormDescription className="text-sm font-normal leading-5 text-gray-200">
                           Viper tailors a personalized experience using this data. This web
                           browsing history will never be stored with your name, email, or phone
                           number.
                        </FormDescription>
                        <FormControl id={field.name}>
                           <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-accent-foreground data-[state=checked]:border-none data-[state=checked]:bg-viper-dodger-blue data-[state=checked]:text-primary"
                           />
                        </FormControl>
                     </div>
                  </FormItem>
               )}
            />
         </div>
         <div>
            <TermsAndConditions className="text-sm leading-4">
               Viper may use your contact information, including your email address and phone
               number for purposes outlined in our Privacy Policy.{' '}
               <Link href="/privacy" target="_blank" className={linkClass}>
                  Learn more
               </Link>
               .
            </TermsAndConditions>
         </div>
      </div>
   )
}

export default AdmissionContentDiscovery
