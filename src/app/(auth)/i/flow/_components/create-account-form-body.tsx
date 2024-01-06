import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

type FormBody = HTMLAttributes<HTMLDivElement>

const CreateAccountFormBody: React.FC<FormBody> = ({ children, className, ...props }) => {
   return (
      <div
         className={cn(
            ` h-[470px] w-full space-y-6 overflow-y-auto scroll-smooth px-[35px] sm:px-[80px]`,
            className,
         )}
         {...props}
      >
         {children}
      </div>
   )
}

export default CreateAccountFormBody
