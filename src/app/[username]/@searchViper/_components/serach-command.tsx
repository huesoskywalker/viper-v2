'use client'

import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react'

import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
   CommandSeparator,
   CommandShortcut,
} from '@/components/ui/command'

import Link from 'next/link'
import FormInput from '@/app/_components/form/form-input'
import useFocusBlurState from '@/app/_hooks/use-focus-blur-states'
import { FocusEvent, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export function SearchCommand() {
   const [open, setOpen] = useState(false)

   const commandRef = useRef<HTMLDivElement | null>(null)

   useEffect(() => {
      const mouseDown = (e: MouseEvent) => {
         if (open) {
            if (!commandRef.current?.contains(e.target as Node)) {
               setOpen(false)
            }
         }
      }
      document.addEventListener('mousedown', mouseDown)
      return () => {
         document.removeEventListener('mousedown', mouseDown)
      }
   }, [open])

   const [value, setValue] = useState<string>()
   const { isFocused, handleOnFocus, handleOnBlur } = useFocusBlurState(value)

   const handleValueChange = (e: string) => {
      setValue(e)
   }
   const handleFocus = () => {
      handleOnFocus()
      setOpen(true)
   }

   return (
      <Command ref={commandRef} className="relative mx-8 rounded-lg shadow-md">
         <div
            className={cn('flex items-center justify-center rounded-full bg-accent px-2 ', {
               'border border-viper-dodger-blue bg-background': isFocused,
            })}
         >
            <CommandInput
               onValueChange={handleValueChange}
               onBlur={handleOnBlur}
               onFocus={handleFocus}
               placeholder="Search"
               className="text-[17px]"
            />
         </div>
         {open && (
            <CommandList className="z-50 mx-1 rounded-lg shadow-rounded">
               <CommandEmpty>No results found.</CommandEmpty>
               <CommandGroup
                  heading="Try searching for people"
                  className="flex items-center justify-center"
               />
               <CommandGroup heading="Suggestions">
                  <CommandItem>
                     <Calendar className="mr-2 h-4 w-4" />
                     <span>Calendar</span>
                  </CommandItem>
                  <CommandItem>
                     <Smile className="mr-2 h-4 w-4" />
                     <span>Search Emoji</span>
                  </CommandItem>
                  <CommandItem>
                     <Link href={'/home'}>
                        <Calculator className="mr-2 h-4 w-4" />
                        <span>Calculator</span>
                     </Link>
                  </CommandItem>
               </CommandGroup>
               <CommandSeparator />
               <CommandGroup heading="Settings">
                  <CommandItem>
                     <User className="mr-2 h-4 w-4" />
                     <span>Profile</span>
                     <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                     <CreditCard className="mr-2 h-4 w-4" />
                     <span>Billing</span>
                     <CommandShortcut>⌘B</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                     <Settings className="mr-2 h-4 w-4" />
                     <span>Settings</span>
                     <CommandShortcut>⌘S</CommandShortcut>
                  </CommandItem>
               </CommandGroup>
            </CommandList>
         )}
      </Command>
   )
}
