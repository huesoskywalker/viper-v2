'use client'
import React from 'react'
import EditViperCloseButton from './edit-viper-close-button'
import SubmitButton from '@/app/_components/form/submit-button'
import { cn } from '@/lib/utils'

const EditViperFormHeader = () => {
   return (
      <>
         <div
            className={cn(
               'fixed inset-x-0 top-0 z-50 flex h-fit w-full flex-row items-center justify-between bg-background/80 px-3 py-2 backdrop-blur',
            )}
         >
            <div className="flex flex-row gap-5">
               <EditViperCloseButton variant={'ghost'} size={'fit'} />
               <span className="text-lg font-semibold text-foreground/80">Edit profile</span>
            </div>
            <SubmitButton label="Save" />
         </div>
      </>
   )
}

export default EditViperFormHeader
