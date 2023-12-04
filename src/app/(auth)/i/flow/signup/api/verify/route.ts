import { viperService } from '@/services/servicesInitializer'
import { NextResponse, type NextRequest } from 'next/server'
import { isValidApiKey } from '../../_utils/is-valid-api-key'
import bcrypt from 'bcrypt'
import { CreateAccountFormValues } from '@/app/(auth)/i/flow/signup/_hooks/use-create-account-form'

export async function GET(request: NextRequest) {
   const params = request.nextUrl.searchParams
   const email = params.get('email')

   const headers = request.headers
   const apiKey = headers.get('API-Key')
   if (!isValidApiKey(apiKey)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

   if (!email) return NextResponse.json({ error: 'Email must be provided ' }, { status: 400 })

   try {
      const data = await viperService.checkEmailAvailability(email)
      return NextResponse.json({ data }, { status: 200 })
   } catch (error) {
      return NextResponse.json({ error }, { status: 400 })
   }
}

export async function PATCH(request: NextRequest) {
   const headers = request.headers
   const apiKey = headers.get('API-Key')

   if (!isValidApiKey(apiKey)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

   const { formData }: { formData: CreateAccountFormValues } = await request.json()
   const { token, ...restForm } = formData

   try {
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(restForm.password, saltRounds)
      restForm.password = hashedPassword

      const data = await viperService.update({ field: 'email', value: restForm.email }, restForm)
      return NextResponse.json({ data }, { status: 200 })
   } catch (error) {
      return NextResponse.json({ error }, { status: 400 })
   }
}
