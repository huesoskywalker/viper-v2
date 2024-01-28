import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

type ViperUsernameProps = HTMLAttributes<HTMLSpanElement> & { username: string }

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
