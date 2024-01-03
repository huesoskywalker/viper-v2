import React from 'react'
import {
   Menubar,
   MenubarContent,
   MenubarItem,
   MenubarMenu,
   MenubarTrigger,
} from '@/components/ui/menubar'
import { Brush, Moon, Sun, SunSnow } from 'lucide-react'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Checkbox } from '@/components/ui/checkbox'

const ThemeSwitch = () => {
   const [mounted, setMounted] = useState(false)
   const { setTheme, resolvedTheme } = useTheme()

   useEffect(() => setMounted(true), [])

   if (!mounted) return

   const itemClass = 'flex justify-between align-center gap-4 cursor-pointer'
   const spanClass = 'flex flex-grow gap-2 font-normal sm:font-medium'
   const checkboxClass =
      'rounded-lg border-none text-sm text-white data-[state=checked]:bg-viper-dodger-blue'

   const handleTheme = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault()
      setTheme(e.currentTarget.id)
   }
   return (
      <>
         <Menubar className="h-fit w-full border-none p-0 hover:bg-accent">
            <MenubarMenu>
               <MenubarTrigger
                  className={
                     'flex w-full cursor-pointer flex-row justify-start gap-2 p-3 align-middle text-sm font-medium focus:bg-transparent sm:font-semibold'
                  }
               >
                  <Brush size={20} />
                  Display
               </MenubarTrigger>
               <MenubarContent
                  align="center"
                  className=" ml-4 w-fit border-none p-0 shadow-rounded"
               >
                  <MenubarItem id="light" onClick={handleTheme} className={itemClass}>
                     <span className={spanClass}>
                        <Sun size={20} />
                        Default
                     </span>
                     <Checkbox checked={resolvedTheme === 'light'} className={checkboxClass} />
                  </MenubarItem>
                  <MenubarItem id="dim" onClick={handleTheme} className={itemClass}>
                     <span className={spanClass}>
                        <SunSnow size={20} />
                        Dim
                     </span>
                     <Checkbox checked={resolvedTheme === 'dim'} className={checkboxClass} />
                  </MenubarItem>
                  <MenubarItem id="dark" onClick={handleTheme} className={itemClass}>
                     <span className={spanClass}>
                        <Moon size={20} />
                        Light&apos;s out
                     </span>
                     <Checkbox checked={resolvedTheme === 'dark'} className={checkboxClass} />
                  </MenubarItem>
               </MenubarContent>
            </MenubarMenu>
         </Menubar>
      </>
   )
}

export default ThemeSwitch
