export const useEmailAvailability = () => {
   const checkEmail = async (value: string) => {
      const res = await fetch(`http://localhost:3000/i/flow/signup/api?email=${value}`, {
         headers: {
            'content-type': 'application/json',
         },
         method: 'GET',
      })
      if (!res.ok) {
         const { error } = await res.json()
         throw new Error(error)
      }
      // How can we handle the types from the fetch? data and error
      const { data } = await res.json()

      return !!data
   }

   return { checkEmail }
}
