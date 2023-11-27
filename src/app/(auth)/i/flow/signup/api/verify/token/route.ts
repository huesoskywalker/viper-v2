import { clientPromise } from '@/services/servicesInitializer'
import { NextRequest, NextResponse } from 'next/server'
import { isValidApiKey } from '../../../_utils/is-valid-api-key'

export async function GET(request: NextRequest) {
   const param = request.nextUrl.searchParams
   const email = param.get('email')

   const headers = request.headers
   const apiKey = headers.get('API-Key')

   if (!isValidApiKey(apiKey)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

   if (!email) return NextResponse.json({ error: 'Email must be provided' }, { status: 400 })

   try {
      const client = await clientPromise
      const collection = client.db('viperDb').collection('verification_tokens')

      const data: { token: string; expires: Date } | null = await collection.findOne<{
         token: string
         expires: Date
      }>(
         {
            identifier: email,
         },
         {
            projection: {
               _id: 0,
               token: 1,
               expires: 1,
            },
         },
      )
      return NextResponse.json({ data }, { status: 200 })
   } catch (error) {
      return NextResponse.json({ error }, { status: 400 })
   }
}
