import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

type FormFooter = HTMLAttributes<HTMLDivElement>
const CreateAccountFormFooter: React.FC<FormFooter> = ({ className, children, ...props }) => {
   return (
      <div className={cn('mb-6 flex w-full flex-col gap-2 px-8 sm:px-16', className)} {...props}>
         {children}
      </div>
   )
}

export default CreateAccountFormFooter
