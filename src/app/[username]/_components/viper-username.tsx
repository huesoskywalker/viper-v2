import AtSymbol from '@/app/_components/viper/at-symbol'
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
      <span className={cn('flex-1 truncate text-muted-foreground', className)} {...props}>
         {children}
         {username}
      </span>
   )
}

export default ViperUsername
