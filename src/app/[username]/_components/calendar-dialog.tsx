import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogHeader,
   DialogDescription,
   DialogTitle,
   DialogFooter,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { EventImpl } from '@fullcalendar/core/internal'
import React, { Dispatch, SetStateAction } from 'react'
import { format } from 'date-fns'
import { Calendar } from 'lucide-react'

const CalendarDialog = ({
   openDialog,
   closeDialog,
   calendarEvent,
}: {
   openDialog: boolean
   closeDialog: Dispatch<SetStateAction<boolean>>
   calendarEvent: EventImpl | undefined
}) => {
   // TODO: fix this
   if (!calendarEvent || !calendarEvent.start) return

   return (
      <Dialog open={openDialog} onOpenChange={closeDialog}>
         <DialogContent
            className={cn(
               'flex h-full max-w-sm flex-col items-start justify-center gap-0 overflow-hidden rounded-lg border-none px-6  md:max-w-[370px] xl:h-[220px]',
            )}
         >
            <DialogHeader className="flex flex-row items-center gap-2 text-sm text-muted-foreground/90">
               <Calendar className="h-3 w-3 text-viper-red" strokeWidth={3} />
               {format(calendarEvent.start, 'EEE, MMM dd, H:mm a')}
            </DialogHeader>
            <DialogTitle className="text-base font-medium text-foreground">
               {calendarEvent.title}
            </DialogTitle>
            <DialogDescription className="text-sm">
               {calendarEvent.extendedProps.direction}
            </DialogDescription>
            <DialogFooter className="mt-3 w-fit rounded-3xl bg-viper-dodger-blue/20 px-2 text-sm font-semibold text-viper-dodger-blue">
               {calendarEvent.extendedProps.status}
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}

export default CalendarDialog
