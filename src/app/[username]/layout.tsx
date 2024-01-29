import { ReactNode } from 'react'
import { Viper } from './_components/viper'
import ProfileNavTabs from './_components/profile-nav-tabs'
import { preloadViperService } from '@/services/servicesInitializer'

export default async function Layout({
   children,
   searchViper,
   editViper,
   params,
}: {
   children: ReactNode
   editViper: ReactNode
   searchViper: ReactNode
   params: { username: string }
}) {
   const username = params.username
   preloadViperService.getByUsername(username)

   return (
      <div className="flex min-h-screen w-full flex-row gap-5 overflow-x-clip ">
         <div className="w-full lg:w-2/3 lg:border-r lg:border-gray-700">
            <Viper username={username} />
            {editViper}
            <ProfileNavTabs defaultValue="calendar" username={username}>
               {children}
            </ProfileNavTabs>
         </div>
         <div className="mt-2 hidden w-1/3 pr-12 lg:flex">{searchViper}</div>
      </div>
   )
}
