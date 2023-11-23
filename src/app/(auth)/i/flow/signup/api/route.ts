import { clientPromise, viperService } from '@/services/servicesInitializer'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
   const param = request.nextUrl.searchParams
   const email = param.get('email')

   if (!email) return NextResponse.json({ error: 'Email must be provided ' }, { status: 400 })

   try {
      const data = await viperService.checkEmailAvailability(email)
      return NextResponse.json({ data }, { status: 200 })
   } catch (error) {
      return NextResponse.json({ error }, { status: 400 })
   }
}

export async function POST(request: NextRequest) {
   const { email } = await request.json()

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
