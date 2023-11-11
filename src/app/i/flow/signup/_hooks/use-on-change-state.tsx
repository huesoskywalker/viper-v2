import { useFormField } from '@/components/ui/form'
import debounce from 'lodash/debounce'
import { ChangeEvent, useCallback } from 'react'
import { useCheckAvailability } from './use-check-availability'

const useOnChangeState = (
   onChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
   name: string | undefined,
) => {
   const { availabilityDebounce } = useCheckAvailability(name)
   const { clearErrors, invalid } = useFormField()

   const onChangeDebounce = useCallback(
      debounce((event: ChangeEvent<HTMLInputElement>) => {
         if (onChange) {
            if (name === 'email' && !event.target.value) {
               clearErrors(name)
            } else {
               onChange(event)
            }
         }
      }, 700),
      [],
   )

   const handleOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
      if (invalid) {
         clearErrors(name)
      }
      onChangeDebounce(event)
      availabilityDebounce(event.target.value)
   }

   return { handleOnChange }
}

export default useOnChangeState
