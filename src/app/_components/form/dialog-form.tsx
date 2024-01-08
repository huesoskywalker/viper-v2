import { Form } from '@/components/ui/form'
import React, { HTMLAttributes } from 'react'
import { UseFormReturn } from 'react-hook-form'

type DialogFormProps<T extends FormData> = HTMLAttributes<HTMLFormElement> & {
   formReturn: UseFormReturn<T>
   onSubmit: () => Promise<void>
}

const DialogForm = <T extends FormData>({
   children,
   className,
   formReturn,
   onSubmit,
   ...props
}: DialogFormProps<T>) => {
   return (
      <Form {...formReturn}>
         <form
            onSubmit={formReturn.handleSubmit(onSubmit)}
            className="flex h-full w-full flex-col items-center justify-between overflow-hidden px-1"
            {...props}
         >
            {children}
         </form>
      </Form>
   )
}

export default DialogForm
