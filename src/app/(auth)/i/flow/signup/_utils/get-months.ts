import { SelectOptions } from '@/app/_components/form-select'

const getMonths = (): { months: SelectOptions[] } => {
   const months: SelectOptions[] = Array.from({ length: 12 }, (_, index) => {
      const monthNumber = (index + 1).toString().padStart(2, '0')
      const date = new Date(0, index)
      const monthName = date.toLocaleString('default', { month: 'long' })

      return {
         value: monthNumber,
         label: monthName,
      }
   })

   return { months }
}

export default getMonths
