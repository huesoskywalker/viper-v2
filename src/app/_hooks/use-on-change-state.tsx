import { useFormField } from '@/components/ui/form'
import debounce from 'lodash/debounce'
import { ChangeEvent, useCallback } from 'react'

const useOnChangeState = (
   onChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
   name: string | undefined,
) => {
   const { clearErrors, invalid } = useFormField()

   const onChangeDebounce = useCallback(
      debounce((event: ChangeEvent<HTMLInputElement>) => {
         if (onChange) {
            onChange(event)
         }
      }, 550),
      [],
   )

   const handleOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
      if (invalid) {
         clearErrors(name)
      }
      onChangeDebounce(event)
   }

   return { handleOnChange }
}

export default useOnChangeState
