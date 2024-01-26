import { CalendarDays } from 'lucide-react'
import React from 'react'

const ViperJoinDate = ({ createdAt }: { createdAt: Date }) => {
   const joinedAt = new Date(createdAt).toLocaleDateString(undefined, {
      month: 'long',
      year: 'numeric',
   })

   return (
      <div className="flex flex-row gap-1 text-muted-foreground">
         <CalendarDays />
         <span>Joined {joinedAt}</span>
      </div>
   )
}

export default ViperJoinDate
