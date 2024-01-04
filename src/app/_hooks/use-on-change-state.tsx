import { useFormField } from '@/components/ui/form'
import debounce from 'lodash/debounce'
import { ChangeEvent, useCallback, useState } from 'react'

type ChangeEventElement = HTMLInputElement | HTMLTextAreaElement
const useOnChangeState = (
   onChange: React.ChangeEventHandler<ChangeEventElement> | undefined,
   name: string | undefined,
) => {
   const [isChanging, setIsChanging] = useState<boolean>(false)

   const { clearErrors } = useFormField()

   const onChangeDebounce = useCallback(
      debounce((event: ChangeEvent<ChangeEventElement>) => {
         if (!onChange) return
         clearErrors(name)
         setIsChanging(false)
         onChange(event)
      }, 500),
      [],
   )

   const handleOnChange = async (event: ChangeEvent<ChangeEventElement>) => {
      if (!isChanging) {
         setIsChanging(true)
      }
      onChangeDebounce(event)
   }

   return { handleOnChange, isChanging }
}

export default useOnChangeState
