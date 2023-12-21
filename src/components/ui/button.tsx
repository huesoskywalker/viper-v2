import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
   'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
   {
      variants: {
         variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
            outline:
               'border border-input text-primary bg-background hover:bg-accent hover:text-accent-foreground',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: 'em-0 justify-start p-0 text-viper-dodger-blue underline-offset-4 hover:underline focus-visible:ring-0',
            viper: ' border-none focus-visible:outline-none focus-visible:ring-0 ',
            provider:
               'border rounded-3xl border-input text-secondary hover:text-accent-foreground bg-foreground hover:bg-accent',
            sky: 'border rounded-3xl border-input text-primary hover:text-accent-foreground bg-viper-dodger-blue hover:bg-viper-dodger-blue/90 ',
            'midnight-blue':
               'border-[1px] rounded-3xl border-border text-viper-dodger-blue bg-black hover:bg-viper-dodger-blue/20',
         },
         size: {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 rounded-md px-3',
            md: 'h-11 rounded-3xl px-8',
            lg: 'h-11 rounded-3xl w-full',
            icon: 'h-10 w-10',
            sign: 'h-[44px] w-[300px]',
            fit: 'w-fit',
         },
      },
      defaultVariants: {
         variant: 'default',
         size: 'default',
      },
   },
)

export interface ButtonProps
   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
   asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
   ({ className, variant, size, asChild = false, ...props }, ref) => {
      const Comp = asChild ? Slot : 'button'
      return (
         <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
      )
   },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
