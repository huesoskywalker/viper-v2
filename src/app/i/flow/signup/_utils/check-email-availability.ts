export const checkEmailAvailability = async (value: string) => {
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
   const { data } = await res.json()

   return data
}
