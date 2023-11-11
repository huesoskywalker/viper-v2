import { FormControl, FormLabel, useFormField } from '@/components/ui/form'
import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React from 'react'
import useInputStates from '../_hooks/use-input-states'
import useOnChangeState from '../_hooks/use-on-change-state'

const FormInput = React.forwardRef<HTMLInputElement, InputProps & { label: string }>(
   ({ label, variant, ...props }, ref) => {
      const { error } = useFormField()

      const { isFocused, handleFocus, hasValue, handleBlur } = useInputStates()

      const { handleOnChange } = useOnChangeState(props.onChange, props.name)

      return (
         <div
            className={cn(
               'relative h-[63px] flex justify-start w-full rounded-[4px] ',
               isFocused ? 'border-2 border-viper-dodger-blue' : 'border-[1px] border-gray-600',
               error && 'border-viper-red',
            )}
         >
            <FormLabel
               htmlFor={props.id}
               className={cn(
                  'absolute px-3 pt-1 text-md transition-transform duration-200 transform ',
                  isFocused
                     ? 'text-sm translate-y-0  text-viper-dodger-blue'
                     : 'text-md translate-y-2  text-gray-600',
                  hasValue && 'text-sm translate-y-0',
               )}
            >
               {label}
            </FormLabel>
            <div className="flex w-full py-1 mt-3">
               <FormControl>
                  <Input
                     id={props.id}
                     autoCapitalize="none"
                     autoComplete={props.id}
                     autoCorrect="off"
                     variant={variant}
                     className="self-end "
                     onFocus={handleFocus}
                     onBlur={handleBlur}
                     onChange={handleOnChange}
                  />
               </FormControl>
            </div>
         </div>
      )
   },
)

export default FormInput
