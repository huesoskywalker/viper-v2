import { useFormField } from '@/components/ui/form'
import debounce from 'lodash/debounce'
import { ChangeEvent, useCallback, useState } from 'react'

const useOnChangeState = (
   onChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
   name: string | undefined,
) => {
   const [isChanging, setIsChanging] = useState<boolean>(false)

   const { clearErrors } = useFormField()

   const onChangeDebounce = useCallback(
      debounce((event: ChangeEvent<HTMLInputElement>) => {
         if (!onChange) return
         clearErrors(name)
         setIsChanging(false)
         onChange(event)
      }, 500),
      [],
   )

   const handleOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
      if (!isChanging) {
         setIsChanging(true)
      }
      onChangeDebounce(event)
   }

   return { handleOnChange, isChanging }
}

export default useOnChangeState
