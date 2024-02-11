'use client'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

const ProfileCalendar = () => {
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
               const eventClass = arg.event.extendedProps.going
                  ? 'bg-viper-forest-green'
                  : ' bg-viper-yellow'
               return `${eventClass} border-none hover:bg-muted-foreground`
            }}
            allDayClassNames={'text-foreground bg-background'}
            slotLabelClassNames={'text-foreground bg-background'}
            eventClick={(arg) => {
               console.log(arg.event.title)
            }}
            nowIndicator={true}
            editable={true}
            selectable={true}
            events={[
               {
                  title: 'event 1',
                  start: new Date('2024-02-11T09:00:00'),
                  end: new Date('2024-02-11T13:30:00'),
                  going: false,
               },
               {
                  title: 'event 2',
                  date: new Date('2024-02-12T21:30:00'),
                  going: true,
                  allDay: false,
               },
               {
                  title: 'today',
                  date: new Date('2024-02-10T22:00:00'),
                  going: true,
                  allDay: false,
               },
            ]}
         />
      </div>
   )
}

export default ProfileCalendar
