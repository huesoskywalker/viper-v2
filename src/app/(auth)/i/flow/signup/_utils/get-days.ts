import { SelectOptions } from '@/app/_components/form-select'

const getDays = (): { days: SelectOptions[] } => {
   const days: SelectOptions[] = Array.from({ length: 31 }, (_, index) => ({
      value: (index + 1).toString().padStart(2, '0'),
      label: (index + 1).toString(),
   }))
   return { days }
}

export default getDays
