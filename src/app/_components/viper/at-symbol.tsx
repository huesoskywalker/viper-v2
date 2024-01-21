import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

const AtSymbol: React.FC<HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) => {
   return (
      <span className={cn(`align-text-top text-xs text-muted-foreground`, className)} {...props}>
         @
      </span>
   )
}

export default AtSymbol
