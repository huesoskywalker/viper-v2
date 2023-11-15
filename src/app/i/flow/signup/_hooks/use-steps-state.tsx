'use client'

import { useState } from 'react'

const useStepsState = () => {
   const [step, setSteps] = useState<number>(1)

   const handleNextStep = () => {
      return setSteps((prevStep) => prevStep + 1)
   }

   const handlePrevStep = (step?: number) => {
      if (!step) return setSteps((prevStep) => prevStep - 1)

      setSteps(step)
   }

   return { step, handleNextStep, handlePrevStep }
}

export default useStepsState
