import { cn } from '@/lib/utils'
import React, { ComponentPropsWithoutRef } from 'react'

type ViperBioProps = ComponentPropsWithoutRef<'p'> & { bio: string }

const ViperBio: React.FC<ViperBioProps> = ({ className, bio, ...props }) => {
   return (
      <p className={cn('w-full text-sm text-foreground', className)} {...props}>
         {bio}
      </p>
   )
}

export default ViperBio
