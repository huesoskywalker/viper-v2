import { auth } from '@/lib/auth'

export const manageEndpointSession = async () => {
   const session = await auth()

   if (!session) {
      return {
         error: 'Unauthorized: User session not found, Please log in or try again later',
         status: 401,
      }
   } else {
      return { session }
   }
}
