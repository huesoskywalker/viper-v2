import React from 'react'
import { Button } from '@/components/ui/button'
import { PUBLIC_API_URL, PUBLIC_VIPER_API_KEY } from '@/config/env'
import { PasswordResetFormValues } from '../_hooks/use-password-reset-form'
import { useFormContext } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { useCreateAccountStore } from '../../signup/_stores/create-account-store'
import { ApiResponse } from '@/types/api/response'

const FindAccountButton = ({ disabled }: { disabled: boolean }) => {
   const { nextStep } = useCreateAccountStore()
   const { getValues, setValue } = useFormContext<PasswordResetFormValues>()

   const { toast } = useToast()

   const email = getValues('email')
   const username = getValues('username')

   const findAccount = async () => {
      try {
         const response = await fetch(
            `${PUBLIC_API_URL}/i/flow/password_reset/api?email=${email}&username=${username}`,
            {
               headers: {
                  'Content-Type': 'application/json',
                  'API-Key': `${PUBLIC_VIPER_API_KEY}`,
               },
               method: 'GET',
            },
         )
         const { data, error }: ApiResponse<{ username: string }> = await response.json()

         if (!response.ok) {
            toast({
               variant: 'sky',
               size: 'sm',
               title: error,
               className: 'self-center text-center right-16',
            })
         }

         if (data) {
            setValue('username', data.username, { shouldValidate: true })
            nextStep()
         }
      } catch (error) {
         throw new Error(error instanceof Error ? error.message : 'Unknown error')
      }
   }

   return (
      <Button
         type="button"
         onClick={findAccount}
         variant={'default'}
         size={'lg'}
         disabled={disabled}
      >
         Next
      </Button>
   )
}

export default FindAccountButton
