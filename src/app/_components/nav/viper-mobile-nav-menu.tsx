import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetFooter,
   SheetHeader,
   SheetTrigger,
} from '@/components/ui/sheet'
import { useSession } from 'next-auth/react'
import ViperCard from '../viper/viper-card'
import { AccordionNavMenu } from './accordion-nav-menu'
import { Separator } from '@/components/ui/separator'
import { getMobileNavMenu } from '@/app/_utils/get-nav-items'
import { TopNavItem } from './top-nav-item'

export function ViperMobileNavMenu() {
   const { data: session } = useSession()
   const { mobileNavItems } = getMobileNavMenu()

   return (
      <Sheet>
         <SheetTrigger asChild className="flex sm:hidden">
            <Button variant="ghost" className="rounded-full p-0">
               <Avatar className="flex items-center justify-center">
                  <AvatarImage
                     width={35}
                     height={35}
                     className="h-7 w-7 rounded-full p-0"
                     src={session?.user.image}
                     alt="Profile preview"
                     loading="eager"
                  />
               </Avatar>
            </Button>
         </SheetTrigger>
         <SheetContent side={'left'} className="mr-0 w-4/6 p-0">
            <SheetHeader className="p-4">
               <ViperCard />
            </SheetHeader>
            {mobileNavItems.map((item) => (
               <SheetClose asChild key={item.name}>
                  <TopNavItem key={item.slug} item={item} />
               </SheetClose>
            ))}
            <Separator orientation="horizontal" />
            <SheetFooter>
               <AccordionNavMenu />
            </SheetFooter>
         </SheetContent>
      </Sheet>
   )
}
