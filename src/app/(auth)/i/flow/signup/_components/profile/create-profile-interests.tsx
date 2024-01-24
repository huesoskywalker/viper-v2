import React from 'react'
import {
   CreateProfileFormValues,
   interestItems,
} from '../../_hooks/profile/use-create-profile-form'
import { DialogDescription } from '@/components/ui/dialog'
import {
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Checkbox } from '@/components/ui/checkbox'
import { useCreateProfileStore } from '../../_stores/create-profile-store'
import { ProviderProfileFormValues } from '../../_hooks/provider/use-provider-profile-form'
import { useFormContext } from 'react-hook-form'

type FormContextValues = CreateProfileFormValues | ProviderProfileFormValues

const CreateProfileInterests = () => {
   const { control } = useFormContext<FormContextValues>()

   const { setInterest, removeInterest } = useCreateProfileStore()

   return (
      <>
         <DialogDescription className="mt-3 text-2xl font-bold text-foreground sm:text-3xl ">
            What do you want to see on Viper?
         </DialogDescription>
         <FormField
            control={control}
            name={'interests'}
            render={() => (
               <FormItem>
                  <FormDescription className="mb-4">
                     Select at least 3 interests to personalize your Viper experience. They will be
                     visible on your profile.
                  </FormDescription>
                  <ToggleGroup type="multiple" className="grid grid-cols-3 gap-2">
                     {interestItems.map((item) => (
                        <FormField
                           key={item.id}
                           control={control}
                           name={'interests'}
                           render={({ field }) => (
                              <FormItem key={item.id}>
                                 <FormLabel className="flex h-full w-full cursor-pointer rounded-lg text-secondary-foreground hover:bg-viper-dodger-blue-hover/10">
                                    <ToggleGroupItem
                                       value={item.id}
                                       variant={'toggle'}
                                       aria-label={`Toggle ${item.id}`}
                                       className="relative -z-10 flex h-20 w-full justify-start rounded-lg p-1"
                                    >
                                       <FormControl>
                                          <Checkbox
                                             className="absolute right-2 top-2 rounded-full border-none data-[state=checked]:bg-white data-[state=checked]:text-2xl data-[state=checked]:text-viper-dodger-blue"
                                             checked={
                                                Array.isArray(field.value) &&
                                                field.value.includes(item.id)
                                             }
                                             onCheckedChange={(checked) => {
                                                if (Array.isArray(field.value)) {
                                                   if (checked) {
                                                      field.onChange([...field.value, item.id])
                                                      setInterest()
                                                   } else {
                                                      field.onChange(
                                                         field.value?.filter(
                                                            (value: string) => value !== item.id,
                                                         ),
                                                      )
                                                      removeInterest()
                                                   }
                                                }
                                                return
                                             }}
                                          />
                                       </FormControl>
                                       <span className="flex-1 self-end overflow-ellipsis text-left text-[17px] font-semibold sm:flex sm:overflow-visible">
                                          {item.label}
                                       </span>
                                    </ToggleGroupItem>
                                 </FormLabel>
                              </FormItem>
                           )}
                        />
                     ))}
                  </ToggleGroup>
                  <FormMessage />
               </FormItem>
            )}
         />
      </>
   )
}

export default CreateProfileInterests
