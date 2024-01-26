import React from 'react'
import NameFormField from '@/app/_components/form/name-form-field'
import BirthDateFormField from '@/app/_components/form/birth-date-form-field'
import AvatarImageFormField from '@/app/_components/form/avatar-image-form-field'
import BackgroundImageFormField from './form/background-image-form-field'
import BioFormField from '@/app/_components/form/bio-form-field'
import LocationFormField from '@/app/_components/form/location-form-field'
import WebsiteFormField from '@/app/_components/form/website-form-field'

const EditViperFormBody = () => {
   return (
      <>
         <div className="mt-14 flex w-full flex-col">
            <BackgroundImageFormField />
            <div className="space-y-4 px-2 pb-14">
               {/* <div className="relative -mt-12 h-20 w-20 items-center justify-center overflow-hidden align-middle"> */}
               {/* <div className="relative -mt-12 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-[3px] border-solid border-primary-foreground align-middle sm:h-24 sm:w-24 sm:border-4 xl:h-28 xl:w-28"> */}
               <AvatarImageFormField className="relative -mt-12 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-[3px] border-solid border-primary-foreground align-middle sm:h-24 sm:w-24 sm:border-4 xl:h-28 xl:w-28" />
               {/* </div> */}

               <NameFormField />
               <BioFormField label="Bio" />
               <LocationFormField />
               <WebsiteFormField />
               <BirthDateFormField />
            </div>
         </div>
      </>
   )
}

export default EditViperFormBody
