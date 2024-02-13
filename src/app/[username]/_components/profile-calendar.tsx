'use client'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { EventClickArg } from '@fullcalendar/core/index.js'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import LoadingSpinner from '@/app/_components/loading/loading-spinner'

const CalendarDialog = dynamic(() => import('../_components/calendar-dialog'), {
   loading: () => <LoadingSpinner className="h-full" />,
})

const ProfileCalendar = () => {
   const [openDialog, setOpenDialog] = useState<boolean>(false)
   const [clickedEvent, setClickedEvent] = useState<EventClickArg | null>(null)

   const handleEventClick = (arg: EventClickArg) => {
      setOpenDialog(true)
      setClickedEvent(arg)
   }

   return (
      <div className="mb-10 w-full text-xs text-foreground sm:text-sm">
         <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            headerToolbar={{
               left: 'prev,next today',
               center: 'title',
               right: 'dayGridMonth,timeGridWeek',
            }}
            initialView="dayGridMonth"
            dayHeaderClassNames={'bg-accent text-foreground'}
            dayCellClassNames={'bg-background text-foreground'}
            eventTimeFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
            eventClassNames={(arg) => {
               const eventClass =
                  arg.event.extendedProps.status === 'GOING'
                     ? 'bg-viper-forest-green'
                     : ' bg-viper-yellow'
               return `${eventClass} border-none hover:bg-muted-foreground`
            }}
            allDayClassNames={'text-foreground bg-background'}
            slotLabelClassNames={'text-foreground bg-background'}
            eventClick={(arg) => {
               handleEventClick(arg)
            }}
            nowIndicator={true}
            editable={true}
            selectable={true}
            events={[
               {
                  title: 'event 1',
                  start: new Date('2024-02-11T09:00:00'),
                  direction: 'Poble nou 187, Barcelona',
                  end: new Date('2024-02-11T13:30:00'),
                  status: 'GOING',
               },
               {
                  title: 'event 2',
                  date: new Date('2024-02-12T21:30:00'),
                  direction: 'Los Algarrobos, Cordoba',
                  status: 'INTERESTED',
                  allDay: false,
               },
               {
                  title: 'today',
                  date: new Date('2024-02-10T22:00:00'),
                  direction: 'Music on, Eivissa',
                  status: 'INTERESTED',
                  // allDay: false,
               },
            ]}
         />
         <CalendarDialog
            openDialog={openDialog}
            closeDialog={setOpenDialog}
            calendarEvent={clickedEvent?.event}
         />
      </div>
   )
}

export default ProfileCalendar
