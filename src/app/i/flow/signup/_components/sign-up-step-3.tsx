import FormInput from '../../../../_components/form-input'
import { FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Control } from 'react-hook-form'

const SignUpStep3 = ({
   formControl,
}: {
   formControl: Control<
      {
         name: string
         email: string
         month: string
         day: string
         year: string
         contentDiscovery?: boolean
      },
      any
   >
}) => {
   return (
      <>
         <FormField
            control={formControl}
            name="name"
            render={({ field }) => (
               <FormItem>
                  <FormInput
                     id="name"
                     type="text"
                     variant={'viper'}
                     label="Name"
                     checked={true}
                     defaultValue={field.value}
                     {...field}
                  />
                  <FormMessage />
               </FormItem>
            )}
         />
         <FormField
            control={formControl}
            name="email"
            render={({ field }) => (
               <FormItem>
                  <FormInput id="email" type="email" variant={'viper'} label="Email" {...field} />
                  <FormMessage />
               </FormItem>
            )}
         />
         {/* <div className="space-y-4">
            <FormDescription className="flex flex-col justify-center items-start gap-1">
               <span className="text-primary text-md font-semibold">Date of birth</span>
               <span className="text-xs font-normal">
                  Protected in privacy, unveil the secret of your age, whether it&apos;s for
                  business, a beloved pet, or any other venture.
               </span>
            </FormDescription>
            <div className="flex flex-row w-full items-start gap-2">
               <FormField
                  control={formControl}
                  name="month"
                  render={({ field }) => (
                     <FormItem className="w-4/5">
                        <FormSelect
                           id="month"
                           label="Month"
                           //   Refactor this once it does work
                           options={[]}
                           variant={'viper'}
                           {...field}
                        />

                        <FormMessage />
                     </FormItem>
                  )}
               />{' '}
               <FormField
                  control={formControl}
                  name="day"
                  render={({ field }) => (
                     <FormItem className="w-2/6">
                        <FormSelect
                           id="day"
                           label="Day"
                           //   Refactor this once it does work
                           options={[]}
                           variant={'viper'}
                           {...field}
                        />

                        <FormMessage />
                     </FormItem>
                  )}
               />{' '}
               <FormField
                  control={formControl}
                  name="year"
                  render={({ field }) => (
                     <FormItem className="w-2/5">
                        <FormSelect
                           id="year"
                           label="Year"
                           //   Refactor this once it does work
                           options={[]}
                           variant={'viper'}
                           {...field}
                        />
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
         </div>{' '} */}
      </>
   )
}

export default SignUpStep3
