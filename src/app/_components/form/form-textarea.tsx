'use client'
import React from 'react'
import { Textarea, TextareaProps } from '@/components/ui/textarea'
import { FormControl, FormLabel, FormMessage, useFormField } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import useFocusBlurState from '@/app/_hooks/use-focus-blur-states'
import useOnChangeState from '@/app/_hooks/use-on-change-state'

const FormTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps & { label: string }>(
   ({ className, label, ...props }, ref) => {
      const { error } = useFormField()

      const { isFocused, handleOnFocus, hasValue, handleOnBlur } = useFocusBlurState(
         props.value as string,
      )

      const { handleOnChange, isChanging } = useOnChangeState(props.onChange, props.name)

      const { onBlur, onFocus, onChange, ...restProps } = props

      return (
         <>
            <div
               className={cn(
                  'relative flex h-auto w-full justify-start rounded-[4px] ',
                  isFocused ? 'border-2 border-viper-dodger-blue' : 'border-[1px] border-input',
                  error && !isChanging && 'border-viper-red',
               )}
            >
               <FormLabel
                  htmlFor={props.id}
                  className={cn(
                     'text-md transition-transform absolute  transform px-2 pt-1 duration-200 ',
                     isFocused
                        ? 'translate-y-0 text-sm  text-viper-dodger-blue'
                        : 'text-md translate-y-2  text-muted-foreground',
                     hasValue && 'translate-y-0 text-sm',
                  )}
                  isChanging={isChanging}
               >
                  {label}
               </FormLabel>
               <span
                  className={cn('absolute right-2 top-1.5 text-xs text-muted-foreground', {
                     'text-viper-red': error,
                  })}
               >
                  {props.value?.toLocaleString().length}/160
               </span>
               <FormControl>
                  <Textarea
                     id={props.id}
                     ref={ref}
                     autoCapitalize="none"
                     autoCorrect="off"
                     className={cn('mt-5 py-1', className)}
                     onFocus={(e) => {
                        if (props.onFocus) {
                           props.onFocus(e)
                        }
                        handleOnFocus()
                     }}
                     onBlur={(e) => {
                        if (props.onBlur) {
                           props.onBlur(e)
                        }
                        handleOnBlur(e)
                     }}
                     onChange={(e) => {
                        if (e.currentTarget.textLength <= 160) {
                           if (props.onChange) {
                              props.onChange(e)
                           }
                           handleOnChange(e)
                        } else {
                           return
                        }
                     }}
                     {...restProps}
                  />
               </FormControl>
            </div>

            {!isChanging && <FormMessage />}
         </>
      )
   },
)
FormTextarea.displayName = 'FormTextarea'

export { FormTextarea }
