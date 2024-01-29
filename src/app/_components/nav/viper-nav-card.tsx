import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/card'
import AtSymbol from '../viper/at-symbol'
import { redirect } from 'next/navigation'
import ViperName from '@/app/[username]/_components/viper-name'
import ViperVerified from '@/app/[username]/_components/viper-verified'
import ViperUsername from '@/app/[username]/_components/viper-username'
import ViperImage from '@/app/[username]/_components/viper-image'

const ViperNavCard = () => {
   const { data: session } = useSession()
   if (!session) {
      redirect('/i/flow/login')
   }

   return (
      <Card className="rounded-full border-none p-3 hover:bg-accent">
         <CardContent className="flex flex-row justify-between p-0 sm:items-center xl:gap-2">
            <div className="flex items-center justify-center">
               <ViperImage width={44} height={44} image={session.user.image} className="h-9 w-9" />
            </div>
            <div className="flex flex-col items-start justify-start ">
               <ViperName name={session.user.name} className="hidden text-sm xl:block">
                  <ViperVerified isVerified={session.user.verified} className="hidden xl:block" />
               </ViperName>
               <ViperUsername
                  username={session.user.username}
                  className="hidden text-sm font-normal leading-none xl:block"
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
