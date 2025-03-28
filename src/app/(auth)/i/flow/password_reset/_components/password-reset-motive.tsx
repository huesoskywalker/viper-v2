import React from 'react'
import { PasswordResetFormValues, motiveOptions } from '../_hooks/use-password-reset-form'
import { DialogDescription } from '@/components/ui/dialog'
import {
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { useFormContext } from 'react-hook-form'

const PasswordResetMotive = () => {
   const { control } = useFormContext<PasswordResetFormValues>()

   return (
      <>
         <DialogDescription className="mt-3 text-2xl font-bold text-foreground sm:text-3xl ">
            What do you want to see on Viper?
         </DialogDescription>
         <FormField
            control={control}
            name={'passwordResetMotive'}
            render={() => (
               <FormItem>
                  <FormDescription className="mb-4">
                     Select at least 3 interests to personalize your Viper experience. They will be
                     visible on your profile.
                  </FormDescription>
                  <div className="flex w-full flex-col space-y-2">
                     {motiveOptions.map((item) => (
                        <FormField
                           key={item.id}
                           control={control}
                           name={'passwordResetMotive'}
                           render={({ field }) => (
                              <FormItem
                                 key={item.id}
                                 className="relative w-full items-start justify-between"
                              >
                                 <FormLabel className="flex h-full w-full cursor-pointer rounded-lg p-2 text-secondary-foreground hover:bg-viper-dodger-blue-hover/10">
                                    <FormControl>
                                       <Checkbox
                                          className="absolute right-2 top-2 rounded-full border-none data-[state=checked]:bg-viper-dodger-blue data-[state=checked]:text-2xl data-[state=checked]:text-white"
                                          checked={
                                             Array.isArray(field.value) &&
                                             field.value.includes(item.id)
                                          }
                                          onCheckedChange={(checked) => {
                                             return checked
                                                ? field.onChange([item.id])
                                                : field.onChange(
                                                     field.value.filter(
                                                        (value) => value !== item.id,
                                                     ),
                                                  )
                                          }}
                                       />
                                    </FormControl>
                                    <span className="flex-1 self-end overflow-ellipsis pl-2 text-left text-[19px] font-semibold sm:flex sm:overflow-visible">
                                       {item.label}
                                    </span>
                                 </FormLabel>
                              </FormItem>
                           )}
                        />
                     ))}
                  </div>
                  <FormMessage />
               </FormItem>
            )}
         />
      </>
   )
}

export default PasswordResetMotive
