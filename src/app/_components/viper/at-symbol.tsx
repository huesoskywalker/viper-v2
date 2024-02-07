import { cn } from '@/lib/utils'
import React, { ComponentPropsWithoutRef } from 'react'

const AtSymbol: React.FC<ComponentPropsWithoutRef<'span'>> = ({ className, ...props }) => {
   return (
      <span className={cn(`align-text-top text-xs text-muted-foreground`, className)} {...props}>
         @
      </span>
   )
}

export default AtSymbol
