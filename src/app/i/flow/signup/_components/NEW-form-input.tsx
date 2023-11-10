import { FormControl, FormLabel, useFormField } from '@/components/ui/form'
import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import debounce from 'lodash/debounce'
import React, { ChangeEvent, useCallback } from 'react'
import useInputStates from '../_hooks/use-input-states'

const NewFormInput = React.forwardRef<HTMLInputElement, InputProps & { label: string }>(
   ({ label, variant, ...props }, ref) => {
      const { isFocused, handleFocus, hasValue, handleBlur } = useInputStates()

      const { error, clearErrors } = useFormField()

      const handleDebounce = useCallback(
         debounce((event: ChangeEvent<HTMLInputElement>) => {
            if (props.onChange) {
               if (props.name === 'email' && !event.target.value) {
                  clearErrors(props.name)
               } else {
                  props.onChange(event)
               }
            }
         }, 700),
         [],
      )

      // const checkAvailability = async (value: string) => {
      //    const res = await fetch(`http://localhost:3000/i/flow/signup/api?email=${value}`, {
      //       headers: {
      //          'content-type': 'application/json',
      //       },
      //       method: 'GET',
      //    })
      //    const viper = await res.json()
      //    if (!res.ok) {
      //       throw new Error(`Unable to check availability`)
      //    }
      //    return viper
      // }

      const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
         clearErrors(props.name)
         // const isAvailable = await checkAvailability(event.target.value)
         handleDebounce(event)
      }

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
                     onChange={handleChange}
                     // {...props}
                  />
               </FormControl>
            </div>
         </div>
      )
   },
)

export default NewFormInput
