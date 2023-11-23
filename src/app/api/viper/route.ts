import { SignUpFormValues } from '@/app/(auth)/i/flow/signup/_hooks/use-sign-up-form'
import { viperService } from '@/services/servicesInitializer'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
   const { formData }: { formData: SignUpFormValues } = await request.json()
   try {
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(formData.password, saltRounds)
      // need to check which function will fit this use case
      const viper = await viperService.findByEmail(formData.email)
      // we can modify the response on this, returning the viper?
      return NextResponse.json({ success: true }, { status: 200 })
   } catch (error) {
      return NextResponse.json({ error }, { status: 400 })
   }
}
