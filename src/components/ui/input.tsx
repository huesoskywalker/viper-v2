import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
   'flex w-full px-3 rounded-md text-foreground bg-background text-sm placeholder:text-muted-foreground ',
   {
      variants: {
         variant: {
            default:
               ' h-10  py-2border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            file: 'h-10  py-2 border border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium',
            sign: 'h-5 border-none focus-visible:outline-none focus-visible:ring-0 ',
         },
      },
      defaultVariants: {
         variant: 'default',
      },
   },
)

export interface InputProps
   extends React.InputHTMLAttributes<HTMLInputElement>,
      VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
   ({ className, variant, type, ...props }, ref) => {
      return (
         <input
            type={type}
            className={cn(inputVariants({ variant, className }))}
            // className={cn(
            //    'flex h-10 w-full rounded-md border border-input text-foreground bg-background px-3 py-0 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            //    className,
            // )}
            ref={ref}
            {...props}
         />
      )
   },
)
Input.displayName = 'Input'

export { Input, inputVariants }
