import { Button } from '@/components/ui/button'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AccordionNavMenu } from './accordion-nav-menu'
import { CircleEllipsisIcon } from 'lucide-react'

export const MoreNavMenu = () => {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               variant="ghost"
               size={'fit'}
               className="hidden w-fit rounded-full font-normal text-gray-300 hover:bg-accent sm:block sm:p-3"
            >
               <div className="flex flex-row items-center justify-center gap-3">
                  <CircleEllipsisIcon className="text-foreground" strokeWidth={1.5} size={30} />
                  <span className="hidden pr-3 text-lg text-foreground xl:block">More</span>
               </div>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className=" ml-4 w-72 border-none p-0 shadow-rounded">
            <AccordionNavMenu />
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
