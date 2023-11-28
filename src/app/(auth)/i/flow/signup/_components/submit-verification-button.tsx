'use client'
import { Button, ButtonProps } from '@/components/ui/button'
import React from 'react'
import { useFormStatus } from 'react-dom'

const SubmitVerificationButton: React.FC<ButtonProps & { label: string }> = ({
   disabled,
   label,
   variant,
   size,
}) => {
   const { pending } = useFormStatus()

   const disableButton = disabled || pending
   return (
      <>
         <Button
            className="text-md font-semibold"
            type={'submit'}
            variant={variant}
            size={size}
            disabled={disableButton}
         >
            {label}
         </Button>
      </>
   )
}

export default SubmitVerificationButton
