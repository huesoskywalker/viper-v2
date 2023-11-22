import FormInput from '@/app/_components/form-input'
import { Button } from '@/components/ui/button'
import { FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { DialogDescription } from '@radix-ui/react-dialog'
import React from 'react'
import { SignUpFomControl } from '../_hooks/use-sign-up-form'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const SignUpStepFour = ({ formControl }: { formControl: SignUpFomControl }) => {
   // console.log(`---step four`)
   // const pathname = usePathname()
   // console.log({ pathname })
   // const searchParams = useSearchParams()
   // const params = new URLSearchParams()
   // console.log({ params })

   // const { push } = useRouter()

   const email = formControl._formValues['email']
   // params.set('email', email)
   // params.set('email', 'agustinbigoni@gmail.com')
   // console.log(params)
   // pathname.concat()
   // push(pathname + '?' + params)

   //    const client = await clientPromise
   // const collection = client.db('viperDb').collection('verification_tokens')
   // const request = collection.findOne(
   //    {
   //       email: email,
   //    },
   //    {
   //       projection: {
   //          token: 1,
   //       },
   //    },
   // )
   return (
      <>
         <DialogDescription className="mt-3 text-3xl font-bold text-primary ">
            We sent you a code
         </DialogDescription>
         <FormDescription>Enter it below to verify {email}.</FormDescription>
         <FormField
            control={formControl}
            name="token"
            render={({ field }) => (
               <FormItem>
                  <FormInput
                     id={field.name}
                     type="string"
                     variant={'viper'}
                     label="Verification token"
                     {...field}
                  />
               </FormItem>
            )}
         />
         <FormMessage className="text-viper-dodger-blue">
            <Button type="button" variant={'link'} size={'link'} className="text-xs">
               Didn&apos;t receive email?
            </Button>
         </FormMessage>
      </>
   )
}

export default SignUpStepFour
