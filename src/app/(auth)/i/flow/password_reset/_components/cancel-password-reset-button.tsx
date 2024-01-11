import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const CancelPasswordResetButton = () => {
   return (
      <Link href={'/'} className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
         Cancel
      </Link>
   )
}

export default CancelPasswordResetButton
