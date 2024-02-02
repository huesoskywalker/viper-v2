'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useBirthDate } from '@/app/(auth)/i/flow/signup/_hooks/admission/use-birth-date'
import dynamic from 'next/dynamic'
import LoadingSpinner from '@/app/_components/loading/loading-spinner'
const BirthDateFormField = dynamic(() => import('@/app/_components/form/birth-date-form-field'), {
   loading: () => <LoadingSpinner />,
})

const DisplayBirthDateField = () => {
   const [open, setOpen] = useState<boolean>(false)
   const { dateOfBirth } = useBirthDate({
      monthFormat: 'long',
      dayFormat: 'numeric',
      yearFormat: 'numeric',
   })
   return (
      <div>
         <span
            className={cn(
               'flex w-full flex-row items-center justify-start text-sm',
               open ? 'font-medium text-foreground' : 'font-normal text-muted-foreground',
            )}
         >
            Birth date ·
            <Button
               className="pl-1 font-normal"
               type="button"
               variant={'link'}
               size={'fit'}
               onClick={() => setOpen(!open)}
            >
               {open ? 'Close' : 'Edit'}
            </Button>
         </span>
         {open ? (
            <div className="space-y-2">
               <span className="text-sm text-muted-foreground">
                  This should be the date of birth of the person using the account.{' '}
               </span>
               <BirthDateFormField />
            </div>
         ) : (
            <div className="flex w-full text-base text-foreground">{dateOfBirth}</div>
         )}
      </div>
   )
}

export default DisplayBirthDateField
