import { useCallback } from 'react'
import debounce from 'lodash/debounce'
import { useFormField } from '@/components/ui/form'

export const useCheckAvailability = (name: string | undefined) => {
   const { setError } = useFormField()

   const checkAvailability = async (value: string) => {
      const res = await fetch(`http://localhost:3000/i/flow/signup/api?email=${value}`, {
         headers: {
            'content-type': 'application/json',
         },
         method: 'GET',
      })
      if (!res.ok) {
         const { error } = await res.json()
         if (name) setError(name, { message: error, type: 'validate' })
         return
      }
      // How can we handle the types from the fetch? data and error
      const { data } = await res.json()

      return data
   }

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

   const availabilityDebounce = useCallback(
      debounce(async (value: string) => {
         if (emailRegex.test(value)) {
            console.log(`check the trigger`)
            const isTaken = await checkAvailability(value)
            if (isTaken && name) {
               setError(name, {
                  message: 'Email has already been taken.',
                  type: 'validate',
               })
            }
         }
      }, 700),
      [],
   )

   return { availabilityDebounce }
}
