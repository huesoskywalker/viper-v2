import { clientPromise } from '@/services/servicesInitializer'
import { NextRequest, NextResponse } from 'next/server'
import { isValidApiKey } from '../../../_utils/is-valid-api-key'
import { winstonLogger } from '@/config/winstonLogger'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
   const params = request.nextUrl.searchParams
   const email = params.get('email')

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
         return NextResponse.json({ data: null, toDeleteTokens: [] }, { status: 200 })
      }

      let data: { _id: ObjectId; token: string; expires: Date } | null = null
      let toDeleteTokens: Array<{ _id: ObjectId }> = []

      for await (const document of cursor) {
         if (!data) {
            data = document
         } else {
            toDeleteTokens.push({ _id: document._id })
         }
      }
      await cursor.close()

      return NextResponse.json({ data, toDeleteTokens }, { status: 200 })
   } catch (error: any) {
      winstonLogger.error('Get verification token', {
         error: error,
      })
      return NextResponse.json({ error: error.message }, { status: 400 })
   }
}

export async function DELETE(request: NextRequest) {
   const params = request.nextUrl.searchParams
   const _id = params.get('_id')

   if (!_id) return NextResponse.json({ error: '_id must be provided' }, { status: 400 })

   const headers = request.headers
   const apiKey = headers.get('API-Key')

   if (!isValidApiKey(apiKey)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

   try {
      const client = await clientPromise

      const verificationCol = client.db('viperDb').collection('verification_tokens')
      const data = await verificationCol.deleteOne({
         _id: new ObjectId(_id),
      })

      return NextResponse.json({ data }, { status: 200 })
   } catch (error) {
      winstonLogger.error('Delete verification token', {
         error: error,
      })
      return NextResponse.json({ error }, { status: 400 })
   }
}
