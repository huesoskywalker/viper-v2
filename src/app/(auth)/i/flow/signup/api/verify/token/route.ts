import { clientPromise } from '@/services/servicesInitializer'
import { NextRequest, NextResponse } from 'next/server'
import { isValidApiKey } from '../../../_utils/is-valid-api-key'
import { logError, logMongoError, winstonLogger } from '@/config/winstonLogger'
import { MongoError, ObjectId } from 'mongodb'

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
         return NextResponse.json(
            { error: 'Verification token not found for the provided email' },
            { status: 404 },
         )
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
   } catch (error: unknown) {
      if (error instanceof MongoError) {
         logMongoError({ action: 'Unable to retrieve verification token', email: email }, error)
         return NextResponse.json(
            {
               error: 'Internal server error: Unable to retrieve verification token. Please try again later.',
            },
            { status: 500 },
         )
      } else {
         logError({ action: 'Failed to retrieve verification token', email: email }, error)
         return NextResponse.json(
            { error: 'Failed to retrieve verification token. Please try again later.' },
            { status: 400 },
         )
      }
   }
}

export async function DELETE(request: NextRequest) {
   const params = request.nextUrl.searchParams
   const _id = params.get('_id')

   if (!_id)
      return NextResponse.json(
         { error: 'Verification token _id must be provided' },
         { status: 400 },
      )

   const headers = request.headers
   const apiKey = headers.get('API-Key')

   if (!isValidApiKey(apiKey)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

   try {
      const client = await clientPromise

      const verificationCol = client.db('viperDb').collection('verification_tokens')

      const data = await verificationCol.deleteOne({
         _id: new ObjectId(_id),
      })

      return NextResponse.json({ data }, { status: 204 })
   } catch (error) {
      if (error instanceof MongoError) {
         return NextResponse.json(
            { error: `Internal server error: Unable to delete verification token` },
            { status: 500 },
         )
      } else {
         return NextResponse.json(
            { error: `Failed to delete verification token` },
            { status: 400 },
         )
      }
   }
}
