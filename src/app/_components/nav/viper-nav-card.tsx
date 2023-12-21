import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

const ViperNavCard = () => {
   const { data: session } = useSession()

   return (
      <>
         <DropdownMenu>
            <DropdownMenuTrigger asChild className="hidden rounded-full px-3 py-7 sm:mb-3 sm:flex">
               <Button variant="ghost" className="hover:bg-accent">
                  <div className="flex flex-row justify-between md:items-center xl:gap-2">
                     <Avatar>
                        <AvatarImage
                           width={40}
                           height={40}
                           className="h-8 w-8 rounded-full p-0 xl:h-10 xl:w-10"
                           src={session?.user.image}
                           alt="Profile preview"
                        />
                     </Avatar>
                     <div className="flex flex-col items-start justify-start text-sm">
                        <span className="hidden text-secondary-foreground xl:block">
                           {session?.user.name}
                        </span>
                        <span className="hidden text-muted-foreground xl:block">
                           <span className="align-text-top text-xs">@</span>
                           {session?.user.username}
                        </span>
                     </div>
                     <span className="hidden text-base font-semibold text-secondary-foreground xl:block">
                        ...
                     </span>
                  </div>
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-4 box-border w-72 border-none px-0 py-3 shadow-rounded">
               <DropdownMenuItem className="py-2 pl-3">
                  <Link
                     href="/i/flow/logout"
                     className={'text-base font-semibold text-secondary-foreground'}
                  >
                     Log out <span className="align-text-top text-sm">@</span>
                     {session?.user.username}
                  </Link>
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   )
}

export default ViperNavCard
