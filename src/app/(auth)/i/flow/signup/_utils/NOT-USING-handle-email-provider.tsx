'use server'

import { signIn } from '@/lib/auth'

export const handleEmailProvider = async (formData: any) => {
   // console.log({ formData })
   const email = formData.get('email')

   const result = await signIn('email', { redirect: false, email: email })
   console.log(`---result handle email provider`)
   console.log()
   // console.log(result)

   // we need to handle the email with node mailer
}
