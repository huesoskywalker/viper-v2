'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, SunSnow } from 'lucide-react'

import {
   DropdownMenuItem,
   DropdownMenuPortal,
   DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'

export default function ThemeSwitch() {
   const [mounted, setMounted] = useState(false)
   const { setTheme, resolvedTheme } = useTheme()

   useEffect(() => setMounted(true), [])

   if (!mounted) return

   const itemClass = 'flex justify-between align-center gap-4'
   const spanClass = 'flex flex-grow gap-2'
   const checkboxClass =
      'rounded-lg border-none text-sm text-white data-[state=checked]:bg-viper-dodger-blue'

   return (
      <DropdownMenuPortal>
         <DropdownMenuSubContent className="border-none p-0 shadow-rounded">
            <DropdownMenuItem onClick={() => setTheme('light')} className={itemClass}>
               <span className={spanClass}>
                  <Sun />
                  Default
               </span>
               <Checkbox checked={resolvedTheme === 'light'} className={checkboxClass} />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dim')} className={itemClass}>
               <span className={spanClass}>
                  <SunSnow />
                  Dim
               </span>
               <Checkbox checked={resolvedTheme === 'dim'} className={checkboxClass} />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')} className={itemClass}>
               <span className={spanClass}>
                  <Moon />
                  Light&apos;s out
               </span>
               <Checkbox checked={resolvedTheme === 'dark'} className={checkboxClass} />
            </DropdownMenuItem>
         </DropdownMenuSubContent>
      </DropdownMenuPortal>
   )
}
