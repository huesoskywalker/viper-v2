import { viperService } from '@/services/servicesInitializer'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { CreateAccountFormValues } from '@/app/(auth)/i/flow/signup/_hooks/use-create-account-form'
import { authMiddleware } from '@/lib/middleware'

export const PATCH = authMiddleware(async (request) => {
   const { restForm }: { restForm: Omit<CreateAccountFormValues, 'token' | 'email'> } =
      await request.json()

   const user = request.auth?.user

   if (!user)
      return NextResponse.json(
         { error: 'User session not found, Please log in or try again later' },
         { status: 401 },
      )

   try {
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(restForm.password, saltRounds)
      restForm.password = hashedPassword

      const data = await viperService.update(user.id, restForm)
      return NextResponse.json({ data }, { status: 200 })
   } catch (error) {
      return NextResponse.json({ error }, { status: 400 })
   }
})
