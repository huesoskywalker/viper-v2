import { FormControl, FormLabel, FormMessage, useFormField } from '@/components/ui/form'
import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React from 'react'
import useOnChangeState from '../../_hooks/use-on-change-state'
import useFocusBlurState from '../../_hooks/use-focus-blur-states'
import { PasswordToggle } from './password-toggle'
import useShowPassword from '../../_hooks/use-show-password'
import { Checkbox } from '@/components/ui/checkbox'

const FormInput = React.forwardRef<
   HTMLInputElement,
   InputProps & { label: string } & { checkbox?: true }
>(({ label, checkbox, className, variant, ...props }, ref) => {
   const { error } = useFormField()
   const { isFocused, handleOnFocus, hasValue, handleOnBlur } = useFocusBlurState(
      props.value as string,
   )
   const { handleOnChange, isChanging } = useOnChangeState(props.onChange, props.name)
   const { showPassword, handleShowPassword } = useShowPassword()

   const inputType = props.type === 'password' ? showPassword : props.type

   return (
      <>
         <div
            className={cn(
               'relative flex h-[63px] w-full justify-start rounded-[4px] ',
               isFocused ? 'border-2 border-viper-dodger-blue' : 'border-[1px] border-input',
               error && !isChanging && 'border-viper-red',
            )}
         >
            <FormLabel
               htmlFor={props.id}
               className={cn(
                  'text-md absolute transform px-2 pt-1 transition-transform duration-200 ',
                  isFocused
                     ? 'translate-y-0 text-sm  text-viper-dodger-blue'
                     : 'text-md translate-y-2  text-muted-foreground',
                  hasValue && 'translate-y-0 text-sm',
               )}
               isChanging={isChanging}
            >
               {label}
            </FormLabel>
            <div className="mt-3 flex w-full py-1">
               {props.id === 'username' && (
                  <span className="relative bottom-[1px] left-2 self-end pr-1 text-sm text-muted-foreground">
                     @
                  </span>
               )}
               <FormControl>
                  <Input
                     id={props.id}
                     ref={ref}
                     type={inputType}
                     autoCapitalize="none"
                     autoComplete={props.id}
                     autoCorrect="off"
                     variant={variant}
                     className="self-end"
                     onFocus={handleOnFocus}
                     onBlur={handleOnBlur}
                     onChange={handleOnChange}
                     defaultValue={props.value}
                     // having issues with the value and the onchange states
                     // {...props}
                  />
               </FormControl>{' '}
               {props.type === 'password' && (
                  <PasswordToggle showPassword={showPassword} onToggle={handleShowPassword} />
               )}
            </div>
            {checkbox && (
               <Checkbox
                  className="absolute bottom-3 right-3 rounded-lg border-none text-sm text-white data-[state=checked]:bg-viper-forest-green"
                  checked={!error}
               />
            )}
         </div>
         {!isChanging && <FormMessage />}
      </>
   )
})

FormInput.displayName = 'FormInput'
export default FormInput
