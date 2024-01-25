import TermsAndConditions from '@/app/_components/terms-and-conditions'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { DialogDescription } from '@radix-ui/react-dialog'
import Link from 'next/link'
import { AdmissionFormValues } from '../../_hooks/admission/use-admission-form'
import { useFormContext } from 'react-hook-form'
import { ProviderProfileFormValues } from '../../_hooks/provider/use-provider-profile-form'

type FormContextValues = AdmissionFormValues | ProviderProfileFormValues

const AdmissionContentDiscovery = () => {
   const { control } = useFormContext<FormContextValues>()
   return (
      <div className="flex flex-col space-y-6">
         <DialogDescription className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
            Customize your experience
         </DialogDescription>
         <div className="space-y-2">
            <FormField
               control={control}
               name={'contentDiscovery'}
               render={({ field }) => (
                  <FormItem className="space-y-2">
                     <FormLabel
                        htmlFor={field.name}
                        className="text-lg font-semibold text-primary"
                     >
                        Discover Viper content across the web.
                     </FormLabel>
                     <div className="flex flex-row gap-2.5 sm:gap-6">
                        <FormDescription className="text-[17px] font-normal leading-[22px] text-foreground">
                           Viper tailors a personalized experience using this data. This web
                           browsing history will never be stored with your name, email, or phone
                           number.
                        </FormDescription>
                        <FormControl id={field.name}>
                           <Checkbox
                              checked={Boolean(field.value)}
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
            <TermsAndConditions className="text-[17px] leading-4">
               Viper may use your contact information, including your email address and phone
               number for purposes outlined in our Privacy Policy.{' '}
               <Link
                  href="/privacy"
                  target="_blank"
                  className={'text-viper-dodger-blue hover:underline hover:underline-offset-4 '}
               >
                  Learn more
               </Link>
               .
            </TermsAndConditions>
         </div>
      </div>
   )
}

export default AdmissionContentDiscovery
