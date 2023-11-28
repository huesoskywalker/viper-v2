import { clientPromise } from '@/services/servicesInitializer'
import { NextRequest, NextResponse } from 'next/server'
import { isValidApiKey } from '../../../_utils/is-valid-api-key'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
   const param = request.nextUrl.searchParams
   const email = param.get('email')

   if (!email) return NextResponse.json({ error: 'Email must be provided' }, { status: 400 })

   const headers = request.headers
   const apiKey = headers.get('API-Key')

   if (!isValidApiKey(apiKey)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

   try {
      const client = await clientPromise
      const verificationCol = client.db('viperDb').collection('verification_tokens')

      const cursor = verificationCol
         .find<{ _id: ObjectId; token: string; expires: Date }>(
            {
               identifier: email,
            },
            {
               projection: {
                  _id: 1,
                  token: 1,
                  expires: 1,
               },
            },
         )
         .sort({ expires: -1 })

      const hasNext = await cursor.hasNext()

      if (!hasNext) {
         const data = await cursor.next()
         return NextResponse.json({ data }, { status: 200 })
      }

      let data: { _id: ObjectId; token: string; expires: Date } | null = null

      for await (const document of cursor) {
         if (!data) {
            data = document
         } else {
            await verificationCol.deleteOne({ _id: document._id })
         }
      }

      return NextResponse.json({ data }, { status: 200 })
   } catch (error) {
      return NextResponse.json({ error }, { status: 400 })
   }
}

export async function DELETE(request: NextRequest) {
   const params = request.nextUrl.searchParams
   const email = params.get('email')

   if (!email) return NextResponse.json({ error: 'Email must be provided' }, { status: 400 })

   const headers = request.headers
   const apiKey = headers.get('API-Key')

   if (!isValidApiKey(apiKey)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

   try {
      const client = await clientPromise

      const verificationCol = client.db('viperDb').collection('verification_tokens')
      const data = await verificationCol.deleteOne({
         identifier: email,
      })

      return NextResponse.json({ data }, { status: 200 })
   } catch (error) {
      return NextResponse.json({ error }, { status: 400 })
   }
}
