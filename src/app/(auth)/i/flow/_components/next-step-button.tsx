import { Button, ButtonProps } from '@/components/ui/button'
import React from 'react'
import { useCreateAccountStore } from '../signup/_stores/create-account-store'

const NextStepButton: React.FC<ButtonProps & { disabled: boolean; label?: string }> = ({
   disabled,
   label,
   variant,
   size,
   ...props
}) => {
   const { nextStep } = useCreateAccountStore()
   return (
      <>
         <Button
            type={'button'}
            onClick={nextStep}
            variant={variant}
            size={size}
            disabled={disabled}
            {...props}
         >
            {label ? label : 'Next'}
         </Button>
      </>
   )
}

export default NextStepButton
