import { cn } from '@/lib/utils'
import React, { ComponentPropsWithoutRef } from 'react'

type FormBody = ComponentPropsWithoutRef<'div'>

const CreateAccountFormBody: React.FC<FormBody> = ({ children, className, ...props }) => {
   return (
      <div
         className={cn(
            ` h-[470px] w-full space-y-3 overflow-x-hidden scroll-smooth px-[35px] sm:px-[80px]`,
            className,
         )}
         {...props}
      >
         {children}
      </div>
   )
}

export default CreateAccountFormBody
