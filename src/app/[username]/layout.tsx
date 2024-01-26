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
   params: { username: string }
}) {
   const username = params.username
   // TODO: preloadViperByUsername()
   return (
      <div className="flex min-h-screen flex-row gap-3 overflow-x-clip ">
         <div className="mt-14 w-full lg:w-2/3 lg:border-r lg:border-gray-700">
            <Viper username={username} />
            <ProfileNavTabs defaultValue="calendar" username={username}>
               {children}
            </ProfileNavTabs>
         </div>
         <div className="mt-2 hidden w-1/3 lg:flex">{searchViper}</div>
      </div>
   )
}
