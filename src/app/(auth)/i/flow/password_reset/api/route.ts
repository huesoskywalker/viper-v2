import { mongoAdapter } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { isValidApiKey } from '../../signup/_utils/is-valid-api-key'
import { viperService } from '@/services/servicesInitializer'

export async function GET(request: NextRequest) {
   const headers = request.headers
   const apiKey = headers.get('Api-Key')

   if (!isValidApiKey(apiKey)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

   const params = request.nextUrl.searchParams
   const email = params.get('email')
   const username = params.get('username')

   if (!email || !username)
      return NextResponse.json({ error: 'Field and value must be provided ' }, { status: 400 })

   try {
      const data = await viperService.matchEmailAndUsername(email, username)

      if (!data) return NextResponse.json({ error: 'Email does not match' }, { status: 400 })

      return NextResponse.json({ data }, { status: 200 })
   } catch (error) {
      return NextResponse.json(
         { error: error instanceof Error ? error.message : 'Unknown error' },
         { status: 400 },
      )
   }
}
