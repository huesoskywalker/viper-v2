import { SelectOptions } from '@/app/_components/form/form-select'

const getYears = (): { years: SelectOptions[] } => {
   const years: SelectOptions[] = []

   for (let year = 2023; year >= 1940; year--) {
      years.push({ value: String(year), label: String(year) })
   }

   return { years }
}

export default getYears
