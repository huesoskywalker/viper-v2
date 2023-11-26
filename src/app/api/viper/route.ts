import { viperService } from '@/services/servicesInitializer'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { auth } from '@/lib/auth'
import { CreateAccountFormValues } from '@/app/(auth)/i/flow/signup/_hooks/use-create-account-form'

// let's implement middleware
// This is a PATCH request or PUT
export async function POST(request: NextRequest) {
   const { restForm }: { restForm: Omit<CreateAccountFormValues, 'token' | 'email'> } =
      await request.json()
   const session = await auth()

   if (!session)
      return NextResponse.json(
         { error: 'User session not found, Please log in or try again later' },
         { status: 401 },
      )

   try {
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(restForm.password, saltRounds)
      restForm.password = hashedPassword

      const data = await viperService.update(session.user.id, restForm)
      return NextResponse.json({ data }, { status: 200 })
   } catch (error) {
      return NextResponse.json({ error }, { status: 400 })
   }
}
