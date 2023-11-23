import { SignUpFormValues } from '@/app/(auth)/i/flow/signup/_hooks/use-sign-up-form'
import { viperService } from '@/services/servicesInitializer'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   const { data }: { data: SignUpFormValues } = await request.json()
   try {
      // need to check which function will fit this use case
      const viper = await viperService.findByEmail(data.email)
      // we can modify the response on this, returning the viper?
      return NextResponse.json({ success: true }, { status: 200 })
   } catch (error) {
      return NextResponse.json({ error }, { status: 400 })
   }
}
