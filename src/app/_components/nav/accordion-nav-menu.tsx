import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { BarChart3, Settings } from 'lucide-react'
import ThemeSwitch from '../theme-switch'

export const AccordionNavMenu = () => {
   const triggerClass = 'p-3.5 text-sm sm:text-base'
   const contentClass =
      'flex font-medium flex-row text-sm justify-start sm:font-semibold gap-2 align-middle'

   return (
      <Accordion type="multiple" className="w-full text-foreground">
         <AccordionItem value="item-1">
            <AccordionTrigger className={triggerClass}>Viper Studio</AccordionTrigger>
            <AccordionContent className={contentClass}>
               <BarChart3 size={20} /> Analytics
            </AccordionContent>
         </AccordionItem>
         <AccordionItem value="item-2">
            <AccordionTrigger className={triggerClass}>Settings and Support</AccordionTrigger>
            <AccordionContent className={contentClass}>
               <Settings size={20} />
               Settings and privacy
            </AccordionContent>{' '}
            <AccordionContent className={cn('px-0 py-0', contentClass)}>
               <ThemeSwitch />
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   )
}
