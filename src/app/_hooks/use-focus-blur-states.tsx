'use client'
import React, { useState } from 'react'

type InputEvent = React.FocusEvent<HTMLInputElement, Element>
type ButtonEvent = React.FocusEvent<HTMLButtonElement, Element>

type EventTypes = InputEvent | ButtonEvent

const useFocusBlurState = () => {
   const [isFocused, setIsFocused] = useState<boolean>(false)
   const [hasValue, setHasValue] = useState<boolean>(false)

   const handleOnFocus = () => {
      setIsFocused(true)
   }

   const handleOnBlur = (event: EventTypes) => {
      setIsFocused(false)
      const targetValue = event.target.value ? true : false
      setHasValue(targetValue)
   }
   return { isFocused, handleOnFocus, hasValue, handleOnBlur }
}

export default useFocusBlurState
