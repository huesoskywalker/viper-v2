import * as React from 'react'

import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'

export const FormSelect = ({
   label,
   options,
}: {
   label: string
   options: Array<{ value: string; label: string }>
}) => {
   return (
      <Select>
         <SelectTrigger className={`w-[180px]`}>
            <SelectValue placeholder={`Select ${label}`} />
         </SelectTrigger>
         <SelectContent>
            <SelectGroup>
               {/* <SelectLabel>{label}</SelectLabel> */}
               {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                     {option.label}
                  </SelectItem>
               ))}
            </SelectGroup>
         </SelectContent>
      </Select>
   )
}

export default FormSelect
