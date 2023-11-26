import { Button } from '@/components/ui/button'
import React from 'react'
import { useCreateAccountStore } from '../_stores/create-account-store'

const NextStepButton = ({ disabled }: { disabled: boolean }) => {
   const { nextStep } = useCreateAccountStore()
   return (
      <>
         <Button
            className="text-md h-11 rounded-3xl font-semibold"
            type={'button'}
            onClick={nextStep}
            variant={'default'}
            disabled={disabled}
         >
            Next
         </Button>
      </>
   )
}

export default NextStepButton
