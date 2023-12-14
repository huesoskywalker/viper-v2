import React from 'react'
import {
   CreateProfileFormControl,
   interestItems,
} from '../../_hooks/profile/use-create-profile-form'
import { FormControlSteps } from '@/types/forms/steps'
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
import { CheckedState } from '@radix-ui/react-checkbox'

const CreateProfileInterests: React.FC<FormControlSteps<CreateProfileFormControl>> = ({
   formControl,
}) => {
   const { setInterest, removeInterest } = useCreateProfileStore()

   return (
      <>
         <DialogDescription className="mt-3 text-3xl font-bold text-primary ">
            What do you want to see on Viper?
         </DialogDescription>
         <FormField
            control={formControl}
            name="interests"
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
                           control={formControl}
                           name="interests"
                           render={({ field }) => (
                              <FormItem key={item.id}>
                                 <FormLabel className="flex h-full w-full cursor-pointer text-secondary-foreground">
                                    <ToggleGroupItem
                                       value={item.id}
                                       variant={'toggle'}
                                       aria-label={`Toggle ${item.id}`}
                                       className="relative -z-10 flex h-20 w-full justify-start rounded-lg p-2"
                                    >
                                       <FormControl>
                                          <Checkbox
                                             className="absolute right-2 top-2 rounded-full border-none data-[state=checked]:bg-white data-[state=checked]:text-2xl data-[state=checked]:text-viper-dodger-blue"
                                             checked={field.value?.includes(item.id)}
                                             onCheckedChange={(checked) => {
                                                if (checked) {
                                                   field.onChange([...field.value, item.id])
                                                   setInterest()
                                                } else {
                                                   field.onChange(
                                                      field.value?.filter(
                                                         (value) => value !== item.id,
                                                      ),
                                                   )
                                                   removeInterest()
                                                }
                                                return
                                             }}
                                          />
                                       </FormControl>
                                       <span className="flex self-end text-left font-semibold">
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
