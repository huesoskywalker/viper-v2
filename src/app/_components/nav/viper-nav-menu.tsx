import { Button } from '@/components/ui/button'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import ViperNavCard from './viper-nav-card'
import AtSymbol from '../viper/at-symbol'

const ViperNavMenu = () => {
   const { data: session } = useSession()

   return (
      <>
         <DropdownMenu>
            <DropdownMenuTrigger
               asChild
               className="hidden rounded-full p-1 sm:relative sm:mb-3 sm:flex"
            >
               <Button variant="ghost" size={'fit'} className="p-0">
                  <ViperNavCard />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-4 box-border w-72 border-none px-0 py-3 shadow-rounded">
               <DropdownMenuItem className="py-2 pl-3">
                  <Link
                     href="/i/flow/logout"
                     className={'text-base font-semibold text-foreground'}
                  >
                     Log out
                     <AtSymbol className="text-sm" />
                     {session?.user.username}
                  </Link>
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   )
}

export default ViperNavMenu
