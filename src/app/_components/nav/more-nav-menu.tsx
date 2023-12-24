import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion'

import { Button } from '@/components/ui/button'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuPortal,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { BarChart3, Brush, CircleEllipsisIcon, Moon, Settings, Sun } from 'lucide-react'

export const MoreNavMenu = () => {
   const contentClass = 'flex flex-row justify-start gap-2 align-middle'
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               variant="ghost"
               size={'fit'}
               className="w-fit rounded-full  font-normal text-gray-300 hover:bg-accent md:block md:p-3"
            >
               <div className="flex flex-row items-center justify-center gap-3">
                  <CircleEllipsisIcon className="text-foreground" strokeWidth={1.5} size={30} />
                  <span className="hidden pr-3 text-xl text-foreground xl:block">More</span>
               </div>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className=" ml-4 w-72 border-none p-0 shadow-rounded">
            <Accordion type="single" collapsible className="w-full">
               <AccordionItem value="item-1">
                  <AccordionTrigger>Viper Studio</AccordionTrigger>
                  <AccordionContent className={contentClass}>
                     <BarChart3 /> Analytics
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-2">
                  <AccordionTrigger>Settings and Support</AccordionTrigger>
                  <AccordionContent className={contentClass}>
                     <Settings />
                     Settings and privacy
                  </AccordionContent>{' '}
                  <AccordionContent className={cn('px-0 py-0', contentClass)}>
                     <DropdownMenuSub>
                        <DropdownMenuSubTrigger
                           className={cn('w-full px-2 py-2 text-base font-medium', contentClass)}
                        >
                           <Brush />
                           <span>Display</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                           <DropdownMenuSubContent className="border-none p-0 shadow-rounded">
                              <DropdownMenuItem>
                                 <Sun />
                                 Default
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                 <Moon />
                                 Light&apos;s out
                              </DropdownMenuItem>
                           </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                     </DropdownMenuSub>
                  </AccordionContent>
               </AccordionItem>
            </Accordion>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
