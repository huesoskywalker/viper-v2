import { FormControl, FormLabel, useFormField } from '@/components/ui/form'
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectProps,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'
import React from 'react'
import useFocusBlurState from '../../_hooks/use-focus-blur-states'
import { cn } from '@/lib/utils'

export type SelectOptions = {
   value: string
   label: string
}
const FormSelect = React.forwardRef<
   HTMLSelectElement & HTMLButtonElement,
   SelectProps & { label: string } & { options: SelectOptions[] }
>(({ label, options, className, variant, ...props }, ref) => {
   // props.onChange does not handle the return string from onValueChange
   const handleOnChange = (event: any) => {
      if (!props.onChange) return
      props.onChange(event)
   }

   const { isFocused, handleOnFocus, handleOnBlur } = useFocusBlurState(props.value as string)

   const { error } = useFormField()
   return (
      <div
         className={cn(
            'relative flex h-[63px] w-full justify-start rounded-[4px] ',
            isFocused ? 'border-2 border-viper-dodger-blue' : 'border-[1px] border-input',
            error && 'border-viper-red',
         )}
      >
         <FormLabel
            htmlFor={props.id}
            className={cn(
               'absolute translate-y-1 px-2 text-xs',
               isFocused ? ' text-viper-dodger-blue' : 'text-muted-foreground',
            )}
         >
            {label}
         </FormLabel>{' '}
         <div className="mt-3 flex w-full py-1">
            <Select onValueChange={handleOnChange} defaultValue={props.value as string}>
               <FormControl id={props.id}>
                  <SelectTrigger
                     ref={ref}
                     className={`justify-between pb-3`}
                     variant={variant}
                     onFocus={handleOnFocus}
                     onBlur={handleOnBlur}
                     isFocused={isFocused}
                  >
                     <SelectValue />
                  </SelectTrigger>
               </FormControl>
               <SelectContent id={props.id} onFocus={handleOnFocus}>
                  <SelectGroup>
                     <SelectLabel className="py-3.5"></SelectLabel>
                     {options.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                           {item.label}
                        </SelectItem>
                     ))}
                  </SelectGroup>
               </SelectContent>
            </Select>
         </div>
      </div>
   )
})

FormSelect.displayName = 'FormSelect'
export default FormSelect
