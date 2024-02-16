import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { LogOut, Settings } from 'lucide-react'
import ThemeSwitch from '../theme-switch'
import Link from 'next/link'

export const AccordionNavMenu = () => {
   const triggerClass = 'p-3.5 text-sm sm:text-base'
   const contentClass =
      'flex font-medium flex-row text-sm justify-start sm:font-semibold gap-2 align-middle'

   return (
      <Accordion type="multiple" className="w-full text-foreground">
         <AccordionItem value="item-2">
            <AccordionTrigger className={triggerClass}>Settings and Support</AccordionTrigger>
            <AccordionContent
               className={cn(contentClass, 'cursor-not-allowed text-muted-foreground')}
               aria-disabled
            >
               <Settings size={20} />
               Settings and privacy
            </AccordionContent>{' '}
            <AccordionContent className={cn('px-0 py-0', contentClass)}>
               <ThemeSwitch />
            </AccordionContent>
            <AccordionContent className="block sm:hidden">
               <Link href={'/i/flow/logout'} className={contentClass}>
                  <LogOut size={20} />
                  Log out
               </Link>
            </AccordionContent>{' '}
         </AccordionItem>
      </Accordion>
   )
}
