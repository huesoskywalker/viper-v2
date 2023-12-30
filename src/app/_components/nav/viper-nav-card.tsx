import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/card'
import AtSymbol from '../viper/at-symbol'

const ViperNavCard = () => {
   const { data: session } = useSession()

   return (
      <Card className="rounded-full border-none p-3 hover:bg-accent">
         <CardContent className="flex flex-row justify-between p-0 sm:items-center xl:gap-2">
            <Avatar className="flex items-center justify-center">
               <AvatarImage
                  width={44}
                  height={44}
                  className="h-9 w-9 rounded-full p-0 xl:h-10 xl:w-10"
                  src={session?.user.image}
                  alt="Profile preview"
                  loading="eager"
               />
            </Avatar>
            <div className="flex flex-col items-start justify-start text-sm">
               <span className="hidden font-semibold text-foreground xl:block">
                  {session?.user.name}
               </span>
               <span className="hidden font-normal text-muted-foreground xl:block">
                  <AtSymbol />
                  {session?.user.username}
               </span>
            </div>
            <span className="hidden text-base font-semibold text-foreground xl:block">...</span>
         </CardContent>
      </Card>
   )
}

export default ViperNavCard
