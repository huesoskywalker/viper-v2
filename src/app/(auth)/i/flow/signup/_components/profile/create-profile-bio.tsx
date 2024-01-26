import React from 'react'
import { DialogDescription } from '@/components/ui/dialog'
import { FormDescription } from '@/components/ui/form'
import BioFormField from '@/app/_components/form/bio-form-field'

const CreateProfileBio = () => {
   return (
      <>
         <DialogDescription className="mt-3 text-2xl font-bold text-foreground sm:text-3xl ">
            Describe yourself
         </DialogDescription>
         <FormDescription>
            What makes you special? Don&apos;t think too hard, just have fun with it.
         </FormDescription>
         <BioFormField label="Your bio" />
      </>
   )
}

export default CreateProfileBio
