import { viperService } from '@/services/servicesInitializer'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
   const param = request.nextUrl.searchParams
   const email = param.get('email')

   if (!email) return NextResponse.json({ error: 'Email must be provided ' }, { status: 400 })

   try {
      const data = await viperService.findByEmail(email)
      return NextResponse.json({ data }, { status: 200 })
   } catch (error) {
      return NextResponse.json({ error }, { status: 400 })
   }
}
