import { MapPin } from 'lucide-react'
import React from 'react'

const ViperLocation = ({ location }: { location: string }) => {
   return (
      <div className="flex flex-row gap-1 text-sm text-muted-foreground">
         <MapPin className="h-4 w-4" />
         <span>{location}</span>
      </div>
   )
}

export default ViperLocation
