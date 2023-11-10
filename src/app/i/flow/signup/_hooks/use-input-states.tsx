'use client'
import React, { useState } from 'react'

const useInputStates = () => {
   const [isFocused, setIsFocused] = useState<boolean>(false)
   const [hasValue, setHasValue] = useState<boolean>(false)

   const handleFocus = () => {
      setIsFocused(true)
   }

   const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
      setIsFocused(false)
      const targetValue = event.target.value ? true : false
      setHasValue(targetValue)
   }
   return { isFocused, handleFocus, hasValue, handleBlur }
}

export default useInputStates
