import { SelectContent, SelectItem } from '@/components/ui/select'
import React from 'react'

type SelectOptions = {
   value: string
   label: string
}
const MonthSelector = () => {
   const months: SelectOptions[] = Array.from({ length: 12 }, (_, index) => {
      const monthNumber = (index + 1).toString().padStart(2, '0')
      const date = new Date(0, index)
      const monthName = date.toLocaleString('default', { month: 'long' })

      return {
         value: monthNumber,
         label: monthName,
      }
   })
   return (
      <SelectContent>
         {months.map((month) => (
            <SelectItem value={month.value}>{month.label}</SelectItem>
         ))}
      </SelectContent>
   )
}

export default MonthSelector
