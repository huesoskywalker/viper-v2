import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import React from 'react'

const SignLink = ({
   href,
   variant,
   label,
}: {
   href: string
   variant: VariantProps<typeof buttonVariants>['variant']
   label: string
}) => {
   return (
      <Link
         href={href}
         className={cn(buttonVariants({ variant: variant }), 'w-[300px] h-[44px] mb-2 ')}
      >
         {label}
      </Link>
   )
}

export default SignLink
