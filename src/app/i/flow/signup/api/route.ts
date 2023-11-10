import { viperService } from '@/services/servicesInitializer'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
   const param = request.nextUrl.searchParams
   const email = param.get('email')
   try {
      const data = await viperService.getAll()
      return NextResponse.json({ data }, { status: 200 })
   } catch (error) {
      return NextResponse.json({ error }, { status: 400 })
   }
   //    console.log(data)
}
