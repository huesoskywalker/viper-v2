import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/card'
import AtSymbol from '../viper/at-symbol'
import { redirect } from 'next/navigation'
import ViperName from '@/app/[username]/_components/viper-name'
import ViperVerified from '@/app/[username]/_components/viper-verified'
import ViperUsername from '@/app/[username]/_components/viper-username'

const ViperNavCard = () => {
   const { data: session } = useSession()
   if (!session) {
      redirect('/i/flow/login')
   }

   return (
      <Card className="rounded-full border-none p-3 hover:bg-accent">
         <CardContent className="flex flex-row justify-between p-0 sm:items-center xl:gap-2">
            <Avatar className="flex items-center justify-center">
               <AvatarImage
                  width={44}
                  height={44}
                  className="h-9 w-9 rounded-full p-0 xl:h-10 xl:w-10"
                  src={session.user.image}
                  alt="Profile preview"
                  loading="eager"
               />
            </Avatar>
            <div className="flex flex-col items-start justify-start text-sm">
               <ViperName name={session.user.name} className="hidden text-base xl:block">
                  <ViperVerified isVerified={session.user.verified} className="hidden xl:block" />
               </ViperName>
               <ViperUsername
                  username={session.user.username}
                  className="hidden text-sm font-normal xl:block"
               >
                  <AtSymbol />
               </ViperUsername>
            </div>
            <span className="hidden text-base font-semibold text-foreground xl:block">...</span>
         </CardContent>
      </Card>
   )
}

export default ViperNavCard
