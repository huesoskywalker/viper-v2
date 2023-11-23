export const UseVerificationToken = async (
   email: string | null,
): Promise<{ token: string; expires: string }> => {
   // we can add in here  the unstable_cache
   // and revalidate option for 2 hours
   if (!email) throw new Error('Email must be provided')
   try {
      const res = await fetch(`http://localhost:3000/i/flow/signup/api`, {
         headers: {
            'content-type': 'application/json',
         },
         method: 'POST',
         body: JSON.stringify({
            email: email,
         }),
         next: { revalidate: 60 * 60 * 2 },
      })
      if (!res.ok) {
         const { error } = await res.json()
         // This will activate the closest `error.js` Error Boundary
         throw new Error(error)
      }
      const { data } = await res.json()
      return data
   } catch (error) {
      throw new Error(`Unable to fetch verification token, ${error}`)
   }
}
