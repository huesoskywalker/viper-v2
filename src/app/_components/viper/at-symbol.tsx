import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

const AtSymbol: React.FC<HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) => {
   return (
      <span className={cn(`align-top text-xs`, className)} {...props}>
         @
      </span>
   )
}

export default AtSymbol
