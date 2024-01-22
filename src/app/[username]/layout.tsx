// import { preloadViperService } from '@/services/servicesInitializer'
import { ReactNode } from 'react'
import { Viper } from './_components/viper'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import DynamicTabsContent from './_components/dynamic-tabs-content'

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
      <div className="flex min-h-screen flex-row gap-3 overflow-x-clip bg-background">
         <div className="mt-10 w-full lg:w-2/3 lg:border-r lg:border-gray-700">
            <Viper username={username} />
            <Tabs defaultValue="calendar" className="mt-7 w-full">
               <TabsList className="flex items-center justify-evenly border-b border-gray-700 ">
                  <Link href={`/${username}`}>
                     <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  </Link>
                  <Link href={`/${username}/listings`}>
                     <TabsTrigger value="listings">Listings</TabsTrigger>
                  </Link>
                  <Link href={`/${username}/dashboard`}>
                     <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  </Link>
               </TabsList>
               <div className="mt-5">
                  <TabsContent value="calendar">{calendar}</TabsContent>
                  <DynamicTabsContent>{children}</DynamicTabsContent>
               </div>
            </Tabs>
         </div>
         <div className="mt-2 hidden w-1/3 lg:flex">{searchViper}</div>
      </div>
   )
}
