// import { preloadViperService } from '@/services/servicesInitializer'
import { ReactNode, Suspense } from 'react'
import { Viper } from './_components/viper'
import { TabsContent } from '@/components/ui/tabs'
import DynamicTabsContent from './_components/dynamic-tabs-content'
import ProfileNavTabs from './_components/profile-nav-tabs'
import { useSelectedLayoutSegment } from 'next/navigation'
// import ProfileSpinLoading from './loading'

export default async function Layout({
   children,
   searchViper,
   calendar,
   params,
}: {
   children: ReactNode
   searchViper: ReactNode
   calendar: ReactNode
   params: { username: string }
}) {
   const username = params.username
   // TODO: preloadViperByUsername()
   return (
      <div className="flex min-h-screen flex-row gap-3 overflow-x-clip ">
         <div className="mt-10 w-full lg:w-2/3 lg:border-r lg:border-gray-700">
            <Viper username={username} />
            <ProfileNavTabs defaultValue="calendar" username={username}>
               <TabsContent value="calendar">{calendar}</TabsContent>
               <DynamicTabsContent defaultValue="calendar">{children}</DynamicTabsContent>
            </ProfileNavTabs>
         </div>
         <div className="mt-2 hidden w-1/3 lg:flex">{searchViper}</div>
      </div>
   )
}
