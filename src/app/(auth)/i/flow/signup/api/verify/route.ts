import { viperService } from '@/services/servicesInitializer'
import { NextResponse, type NextRequest } from 'next/server'
import { isValidApiKey } from '../../_utils/is-valid-api-key'
import bcrypt from 'bcrypt'
import { buildRandomUsername } from '../../../../../../../../utils/build-random-username'
import { AdmissionFormValues } from '../../_hooks/admission/use-admission-form'

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
      return NextResponse.json({ error }, { status: 400 })
   }
}

export async function PATCH(request: NextRequest) {
   const headers = request.headers
   const apiKey = headers.get('API-Key')

   if (!isValidApiKey(apiKey)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

   const { formData }: { formData: AdmissionFormValues } = await request.json()
   const { token, ...restForm } = formData

   try {
      const username = await buildRandomUsername(formData.name)

      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(restForm.password, saltRounds)
      restForm.password = hashedPassword

      const updateViper: Omit<AdmissionFormValues, 'token'> & { username: string } = {
         ...restForm,
         username,
      }

      const data = await viperService.update(
         { field: 'email', value: updateViper.email },
         updateViper,
      )

      return NextResponse.json({ data }, { status: 200 })
   } catch (error) {
      return NextResponse.json({ error }, { status: 400 })
   }
}
