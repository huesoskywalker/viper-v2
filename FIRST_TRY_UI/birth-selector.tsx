import React from 'react'
import FormSelect from './form-select'

type SelectOptions = {
   value: string
   label: string
}

const BirthSelector = () => {
   // Separate concerns of each of this ones
   const months: SelectOptions[] = Array.from({ length: 12 }, (_, index) => {
      const monthNumber = (index + 1).toString().padStart(2, '0')
      const date = new Date(0, index)
      const monthName = date.toLocaleString('default', { month: 'long' })

      return {
         value: monthNumber,
         label: monthName,
      }
   })

   const days: SelectOptions[] = Array.from({ length: 31 }, (_, index) => ({
      value: (index + 1).toString().padStart(2, '0'),
      label: (index + 1).toString(),
   }))

   const years: SelectOptions[] = []

   for (let year = 1940; year <= 2023; year++) {
      years.push({ value: String(year), label: String(year) })
   }

   return (
      <div className="flex flex-row justify-center items-start gap-2">
         <FormSelect label="Month" options={months} />
         <FormSelect label="Day" options={days} />
         <FormSelect label="Year" options={years} />
      </div>
   )
}

export default BirthSelector
