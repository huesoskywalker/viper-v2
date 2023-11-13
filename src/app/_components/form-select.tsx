import { FormControl, FormLabel, useFormField } from '@/components/ui/form'
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
   selectVariants,
} from '@/components/ui/select'
import { VariantProps } from 'class-variance-authority'
import React from 'react'
import useFocusBlurState from '../_hooks/use-focus-blur-states'
import { cn } from '@/lib/utils'

export type SelectOptions = {
   value: string
   label: string
}
interface SelectPropsTest
   extends React.SelectHTMLAttributes<HTMLSelectElement>,
      VariantProps<typeof selectVariants> {}

const FormSelect = React.forwardRef<
   HTMLSelectElement,
   SelectPropsTest & { label: string } & { options: SelectOptions[] }
>(({ label, options, className, variant, ...props }, ref) => {
   const handleChange = (event: any) => {
      if (!props.onChange) return
      props.onChange(event)
   }
   //   console.log(props.value)
   const { isFocused, handleOnFocus, handleOnBlur } = useFocusBlurState()

   const { error } = useFormField()
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
               'absolute px-3 pt-1 text-sd translate-y-1 ',
               isFocused ? ' text-viper-dodger-blue' : '   text-gray-600',
            )}
         >
            {label}
         </FormLabel>{' '}
         <div className="flex w-full py-1 mt-3">
            <Select onValueChange={handleChange}>
               <FormControl id={props.id}>
                  <SelectTrigger
                     className="justify-between"
                     variant={variant}
                     onBlur={handleOnBlur}
                  >
                     <SelectValue />
                  </SelectTrigger>
               </FormControl>
               <SelectContent id={props.id}>
                  <SelectGroup>
                     <SelectLabel className="py-3.5"></SelectLabel>
                     {options.map((item) => (
                        <SelectItem key={item.value} value={item.value} onFocus={handleOnFocus}>
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

export default FormSelect
