'use client'
import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'

const ProfileCalendar = () => {
   const [date, setDate] = useState<Date | undefined>(new Date())
   return (
      <>
         <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg bg-overlay/20 "
         />
      </>
   )
}

export default ProfileCalendar
