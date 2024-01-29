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
import ViperName from '../../_components/viper-name'
import ViperUsername from '../../_components/viper-username'
import AtSymbol from '@/app/_components/viper/at-symbol'
import ViperVerified from '../../_components/viper-verified'
import useOnValueChange from '../_hooks/use-on-value-change'
import ViperImage from '../../_components/viper-image'

export function SearchCommand() {
   const [open, setOpen] = useState(false)

   const { newValue, vipers, handleValueChange } = useOnValueChange()

   const { isFocused, handleOnFocus, handleOnBlur } = useFocusBlurState(newValue)

   const commandRef = useRef<HTMLDivElement | null>(null)
   const inputRef = useRef<HTMLInputElement | null>(null)

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
      <Command ref={commandRef} className="relative h-fit overflow-visible rounded-lg ">
         <div
            className={cn('z-50 flex items-center justify-start rounded-full bg-accent px-2 ', {
               'border border-viper-dodger-blue bg-background': isFocused,
            })}
         >
            <CommandInput
               ref={inputRef}
               onValueChange={handleValueChange}
               onBlur={handleOnBlur}
               onFocus={handleFocus}
               placeholder="Search"
               className=" h-9 self-start text-[17px]"
            />
         </div>
         {open && (
            <CommandList
               className={cn(
                  `absolute z-10 mx-4 mb-4 w-[90%] self-center rounded-lg bg-background shadow-rounded `,
               )}
               style={{
                  top: inputRef.current?.offsetHeight,
               }}
            >
               {!vipers.length && <CommandEmpty>No results found.</CommandEmpty>}
               {!newValue ? (
                  <CommandGroup
                     heading="Try searching for people"
                     className="flex items-center justify-center py-3"
                  />
               ) : (
                  <CommandGroup className="p-0">
                     {vipers.map((viper) => (
                        <CommandItem
                           key={viper.username}
                           value={viper.username && viper.name}
                           className="px-3 py-2.5 "
                        >
                           <Link
                              href={`/${viper.username}`}
                              className="flex flex-row"
                              scroll={false}
                           >
                              <div className="h-fit w-fit">
                                 <ViperImage
                                    image={viper.image}
                                    width={40}
                                    height={40}
                                    className="h-9 w-9"
                                 />
                              </div>
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
