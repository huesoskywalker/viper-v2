'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormStatus } from 'react-dom'

interface VerificationButton {
   readonly disabled: boolean
   label: string
   variant: 'default' | 'sign-up'
}
const SubmitVerificationButton: React.FC<VerificationButton> = ({ disabled, label }) => {
   const { pending } = useFormStatus()

   const disableButton = disabled || pending
   return (
      <div>
         <Button
            className="text-md h-11 rounded-3xl font-semibold"
            type={'submit'}
            variant={'default'}
            disabled={disableButton}
         >
            {label}
         </Button>
      </div>
   )
}

export default SubmitVerificationButton
