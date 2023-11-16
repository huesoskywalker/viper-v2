import { FormControl, FormLabel, useFormField } from '@/components/ui/form'
import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React from 'react'
import useOnChangeState from '../_hooks/use-on-change-state'
import useFocusBlurState from '../_hooks/use-focus-blur-states'

const FormInput = React.forwardRef<HTMLInputElement, InputProps & { label: string }>(
   ({ label, className, variant, ...props }, ref) => {
      const { error } = useFormField()
      const { isFocused, handleOnFocus, hasValue, handleOnBlur } = useFocusBlurState(
         props.value as string,
      )
      const { handleOnChange } = useOnChangeState(props.onChange, props.name)

      return (
         <div
            className={cn(
               'relative flex h-[63px] w-full justify-start rounded-[4px] ',
               isFocused ? 'border-2 border-viper-dodger-blue' : 'border-[1px] border-gray-600',
               error && 'border-viper-red',
            )}
         >
            <FormLabel
               htmlFor={props.id}
               className={cn(
                  'text-md absolute transform px-2 pt-1 transition-transform duration-200 ',
                  isFocused
                     ? 'translate-y-0 text-sm  text-viper-dodger-blue'
                     : 'text-md translate-y-2  text-gray-500',
                  hasValue && 'translate-y-0 text-sm',
               )}
            >
               {label}
            </FormLabel>
            <div className="mt-3 flex w-full py-1">
               <FormControl>
                  <Input
                     id={props.id}
                     ref={ref}
                     autoCapitalize="none"
                     autoComplete={props.id}
                     autoCorrect="off"
                     variant={variant}
                     className="self-end "
                     onFocus={handleOnFocus}
                     onBlur={handleOnBlur}
                     onChange={handleOnChange}
                     defaultValue={props.value}
                     // {...props}
                  />
               </FormControl>
            </div>
         </div>
      )
   },
)

FormInput.displayName = 'FormInput'
export default FormInput
