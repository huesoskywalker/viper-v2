import { useState } from 'react'

export type FocusElement = 'email' | 'name' | 'month'

export const useFocusElement = () => {
   const [focusElem, setFocusElem] = useState<FocusElement>()

   const handleFocusElement = (value: FocusElement) => {
      setFocusElem(value)
   }

   return { focusElem, handleFocusElement }
}
