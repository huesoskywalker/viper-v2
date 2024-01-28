// import { preloadViperService } from '@/services/servicesInitializer'
import { ReactNode } from 'react'
import { Viper } from './_components/viper'
import ProfileNavTabs from './_components/profile-nav-tabs'

export default async function Layout({
   children,
   searchViper,
   params,
}: {
   children: ReactNode
   searchViper: ReactNode
   testing: ReactNode
   params: { username: string }
}) {
   const username = params.username
   // TODO: preloadViperByUsername()
   return (
      <div className="flex min-h-screen w-full flex-row gap-5 overflow-x-clip ">
         <div className="w-full lg:w-2/3 lg:border-r lg:border-gray-700">
            <Viper username={username} />
            <ProfileNavTabs defaultValue="calendar" username={username}>
               {children}
            </ProfileNavTabs>
         </div>
         <div className="mt-2 hidden w-1/3 pr-12 lg:flex">{searchViper}</div>
      </div>
   )
}
