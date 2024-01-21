'use client'
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
   CommandSeparator,
} from '@/components/ui/command'

import Link from 'next/link'
import useFocusBlurState from '@/app/_hooks/use-focus-blur-states'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ViperName from '../../_components/viper-name'
import ViperUsername from '../../_components/viper-username'
import AtSymbol from '@/app/_components/viper/at-symbol'
import ViperVerified from '../../_components/viper-verified'
import useOnValueChange from '../_hooks/use-on-value-change'

export function SearchCommand() {
   const [open, setOpen] = useState(false)

   const { newValue, vipers, handleValueChange } = useOnValueChange()

   const { isFocused, handleOnFocus, handleOnBlur } = useFocusBlurState(newValue)

   const commandRef = useRef<HTMLDivElement | null>(null)

   useEffect(() => {
      const mouseDown = (e: MouseEvent) => {
         if (open && !commandRef.current?.contains(e.target as Node)) {
            setOpen(false)
         }
      }

      document.addEventListener('mousedown', mouseDown)

      return () => {
         document.removeEventListener('mousedown', mouseDown)
      }
   }, [open])

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
               {!vipers.length && <CommandEmpty>No results found.</CommandEmpty>}
               {!newValue ? (
                  <CommandGroup
                     heading="Try searching for people"
                     className="flex items-center justify-center py-3"
                  />
               ) : (
                  <CommandGroup className="p-0">
                     {vipers.map((viper) => (
                        <CommandItem value={viper.username && viper.name} className="px-3 py-2.5 ">
                           <Link
                              href={`/${viper.username}`}
                              className="flex flex-row"
                              scroll={false}
                           >
                              <Avatar>
                                 <AvatarImage
                                    src={viper.image}
                                    alt="Viper profile"
                                    loading="lazy"
                                    width={40}
                                    height={40}
                                 />
                                 <AvatarFallback>Profile</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col pl-2">
                                 <ViperName name={viper.name} className="text-[17px] font-bold">
                                    <ViperVerified isVerified={viper.verified} />
                                 </ViperName>
                                 <ViperUsername username={viper.username}>
                                    <AtSymbol />
                                 </ViperUsername>
                              </div>
                           </Link>
                        </CommandItem>
                     ))}
                  </CommandGroup>
               )}
               <CommandSeparator />
            </CommandList>
         )}
      </Command>
   )
}
