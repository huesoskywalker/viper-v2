'use client'

import { Input, inputVariants } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { VariantProps } from 'class-variance-authority'
import React, { useState } from 'react'

const FormInput = ({
   id,
   type,
   label,
   variant,
}: {
   id: string
   type: string
   label: string
   variant: VariantProps<typeof inputVariants>['variant']
}) => {
   const [isFocused, setIsFocused] = useState(false)

   const handleInputFocus = () => {
      setIsFocused(true)
   }

   const handleInputBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
      if (!event.target.value) {
         setIsFocused(false)
      }
   }
   return (
      <div
         className={`relative h-[63px] flex justify-start w-full rounded-[4px] ${
            isFocused ? 'border-2 border-viper-dodger-blue' : 'border-[1px] border-gray-600'
         }`}
      >
         <Label
            htmlFor={id}
            className={`absolute px-3 pt-1 text-md transition-transform duration-200 transform ${
               isFocused
                  ? 'text-sm translate-y-0 scale-80 text-viper-dodger-blue'
                  : 'text-md translate-y-2 scale-100 text-gray-600'
            } `}
         >
            {label}
         </Label>
         <div className="flex w-full py-1 mt-3">
            <Input
               id={id}
               type={type}
               autoCapitalize="none"
               autoComplete={id}
               autoCorrect="off"
               variant={variant}
               className="self-end "
               onFocus={handleInputFocus}
               onBlur={handleInputBlur}
            />
         </div>
      </div>
   )
}

export default FormInput
