import { Button } from '@/components/ui/button'
import React from 'react'
import { useCreateAccountStore } from '../_stores/create-account-store'

const NextStepButton = ({ disabled }: { disabled: boolean }) => {
   const { nextStep } = useCreateAccountStore()
   return (
      <>
         <Button
            className="text-md  font-semibold"
            type={'button'}
            onClick={nextStep}
            variant={'default'}
            size={'lg'}
            disabled={disabled}
         >
            Next
         </Button>
      </>
   )
}

export default NextStepButton
