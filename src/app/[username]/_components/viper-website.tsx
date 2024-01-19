import { LinkIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ViperWebsite = ({ website }: { website: string }) => {
   return (
      <div className="flex flex-row gap-1 text-muted-foreground">
         <LinkIcon />
         <Link href={website} target="_blank" className="text-viper-dodger-blue">
            {new URL(website).hostname}
         </Link>
      </div>
   )
}

export default ViperWebsite
