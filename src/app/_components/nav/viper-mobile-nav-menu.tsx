import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetDescription,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/components/ui/sheet'
import { useSession } from 'next-auth/react'
import ViperCard from '../viper/viper-card'

export function ViperMobileNavMenu() {
   const { data: session } = useSession()
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
         <SheetContent side={'left'}>
            <SheetHeader>
               <ViperCard />
               {/* <SheetTitle>Edit profile</SheetTitle>
               <SheetDescription>
                  Make changes to your profile here. Click save when you're done.
               </SheetDescription> */}
            </SheetHeader>
            {/* <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                     Name
                  </Label>
                  <Input id="name" value="Pedro Duarte" className="col-span-3" />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                     Username
                  </Label>
                  <Input id="username" value="@peduarte" className="col-span-3" />
               </div>
            </div> */}
            <SheetFooter>
               <SheetClose asChild>{/* <Button type="submit">Save changes</Button> */}</SheetClose>
            </SheetFooter>
         </SheetContent>
      </Sheet>
   )
}
