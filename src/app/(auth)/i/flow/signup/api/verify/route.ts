import { viperService } from '@/services/servicesInitializer'
import { NextResponse, type NextRequest } from 'next/server'
import { isValidApiKey } from '../../_utils/is-valid-api-key'
import bcrypt from 'bcrypt'
import { buildRandomUsername } from '../../../../../../../../utils/build-random-username'
import { logError, logMongoError } from '@/config/winstonLogger'
import { MongoError } from 'mongodb'
import { determineUpdateProfileSchema } from '@/app/_utils/determine-update-profile-schema'
import {
   isAdmissionFormValues,
   isPasswordResetFormValues,
} from '../../../_utils/is-form-type-values'

export async function GET(request: NextRequest) {
   const params = request.nextUrl.searchParams

   const queryField = params.get('field')
   const queryValue = params.get('value')

   if (!queryField || !queryValue)
      return NextResponse.json({ error: 'Field and value must be provided ' }, { status: 400 })

   if (queryField !== 'email' && queryField !== 'username')
      return NextResponse.json(
         { error: 'Query field does not match the criteria' },
         { status: 400 },
      )

   const headers = request.headers
   const apiKey = headers.get('API-Key')
   if (!isValidApiKey(apiKey)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

   try {
      const data = await viperService.isPropAvailable({
         field: queryField,
         value: queryValue,
      })

      return NextResponse.json({ data }, { status: 200 })
   } catch (error) {
      if (error instanceof MongoError) {
         logMongoError({ action: 'Is property available', [queryField]: queryValue }, error)

         return NextResponse.json(
            {
               error: `Internal server error: Failed to check property availability. Please try again later or contact support.`,
            },
            { status: 500 },
         )
      } else {
         logError({ action: 'Is property available', [queryField]: queryValue }, error)

         return NextResponse.json(
            {
               error: `Invalid request: The provided data is not valid. Please check your input and try again.`,
            },
            { status: 400 },
         )
      }
   }
}

export async function PATCH(request: NextRequest) {
   const headers = request.headers
   const apiKey = headers.get('API-Key')

   if (!isValidApiKey(apiKey)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

   const { restForm } = await request.json()

   const formSchema = determineUpdateProfileSchema(restForm)

   const isAdmissionSchema = isAdmissionFormValues(formSchema)

   if (!isPasswordResetFormValues(formSchema) && !isAdmissionSchema) {
      return NextResponse.json({ error: 'Unexpected form schema' }, { status: 400 })
   }

   try {
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(formSchema.password, saltRounds)
      formSchema.password = hashedPassword

      const updateViper: typeof formSchema & { username?: string } = {
         ...formSchema,
      }

      if (isAdmissionSchema) {
         const username = await buildRandomUsername(formSchema.name)
         updateViper.username = username
      }

      const data = await viperService.update(
         { field: 'email', value: updateViper.email },
         updateViper,
      )
      if (!data)
         return NextResponse.json({
            error: 'Invalid request: Unable to update user. Please check your input and try again.',
            status: 422,
         })

      return NextResponse.json({ data: { username: data.username } }, { status: 200 })
   } catch (error) {
      if (error instanceof MongoError) {
         logMongoError({ action: `Update user on create account`, email: restForm.email }, error)

         return NextResponse.json(
            {
               error: `Internal server error: Unable to update the user. Please try again later or contact support.`,
            },
            { status: 500 },
         )
      } else {
         logError({ action: `Update user on create account`, email: restForm.email }, error)

         return NextResponse.json(
            {
               error: `Invalid request: The provided data is not valid. Please check your input and try again.`,
            },
            { status: 400 },
         )
      }
   }
}
