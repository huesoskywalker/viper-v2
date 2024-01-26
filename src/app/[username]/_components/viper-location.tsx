import { MapPin } from 'lucide-react'
import React from 'react'

const ViperLocation = ({ location }: { location: string }) => {
   return (
      <div className="flex flex-row gap-1 text-muted-foreground">
         <MapPin />
         <span>{location}</span>
      </div>
   )
}

export default ViperLocation
