import { PUBLIC_API_URL } from '@/config/env'
import { ApiResponse } from '@/types/api/response'
import { ViperSimple } from '@/types/viper'
import { debounce } from 'lodash'
import { useCallback, useState } from 'react'

const useOnValueChange = () => {
   const [newValue, setNewValue] = useState<string | undefined>(undefined)

   const [vipers, setVipers] = useState<Array<ViperSimple> | []>([])

   const handleValueChange = useCallback(
      debounce(async (value: string) => {
         setNewValue(value)

         if (!value) return

         const hasMatch = vipers.some(
            (viper) =>
               viper.name.toLowerCase().includes(value.toLowerCase()) ||
               viper.username.toLowerCase().includes(value.toLowerCase()),
         )

         if (hasMatch) return

         try {
            const res = await fetch(`${PUBLIC_API_URL}/[username]/api?search=${value}`, {
               headers: {
                  'Content-Type': 'application/json',
               },
               method: 'GET',
            })
            const { data, error }: ApiResponse<Array<ViperSimple>> = await res.json()

            if (!res.ok) {
               throw new Error(error)
            }
            setVipers(data)
         } catch (error) {
            throw new Error(`${error instanceof Error ? error.message : 'Unknown error'}`)
         }
      }, 500),
      [vipers],
   )

   return { newValue, vipers, handleValueChange }
}

export default useOnValueChange
