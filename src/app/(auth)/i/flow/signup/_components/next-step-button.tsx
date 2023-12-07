import { Button, ButtonProps } from '@/components/ui/button'
import React from 'react'
import { useCreateAccountStore } from '../_stores/create-account-store'

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
            className="text-md  font-semibold"
            type={'button'}
            onClick={nextStep}
            variant={variant}
            size={'lg'}
            disabled={disabled}
         >
            {label ? label : 'Next'}
         </Button>
      </>
   )
}

export default NextStepButton
