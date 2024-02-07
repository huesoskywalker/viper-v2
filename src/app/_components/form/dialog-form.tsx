import { Form } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import React, { BaseSyntheticEvent, ComponentPropsWithoutRef } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

type DialogFormProps<T extends FieldValues> = ComponentPropsWithoutRef<'form'> & {
   children: React.ReactNode
   formReturn: UseFormReturn<T>
   handleSubmit: (formData: T, e?: BaseSyntheticEvent) => Promise<void>
}

const DialogForm = <T extends FieldValues>({
   children,
   className,
   formReturn,
   handleSubmit,
   ...props
}: DialogFormProps<T>) => {
   return (
      <Form {...formReturn}>
         <form
            onSubmit={formReturn.handleSubmit(handleSubmit)}
            className={cn(
               'flex h-full w-full flex-col items-center justify-between overflow-hidden px-0.5',
               className,
            )}
            {...props}
         >
            {children}
         </form>
      </Form>
   )
}

export default DialogForm
