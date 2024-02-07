import { cn } from '@/lib/utils'
import React, { ComponentPropsWithoutRef } from 'react'

type ViperUsernameProps = ComponentPropsWithoutRef<'span'> & { username: string }

const ViperUsername: React.FC<ViperUsernameProps> = ({
   className,
   children,
   username,
   ...props
}) => {
   return (
      <span className={cn('flex-1 truncate text-sm text-muted-foreground', className)} {...props}>
         {children}
         {username}
      </span>
   )
}

export default ViperUsername
