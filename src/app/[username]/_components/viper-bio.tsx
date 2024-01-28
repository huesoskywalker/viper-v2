import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

type ViperBioProps = HTMLAttributes<HTMLParagraphElement> & { bio: string }

const ViperBio: React.FC<ViperBioProps> = ({ className, bio, ...props }) => {
   return (
      <p className={cn('w-full text-sm text-foreground', className)} {...props}>
         {bio}
      </p>
   )
}

export default ViperBio
