'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { ReactNode } from 'react'

const ProfileNavTabs = ({
   username,
   defaultValue,
   children,
}: {
   username: string
   defaultValue: string
   children: ReactNode
}) => {
   const segment = useSelectedLayoutSegment('children')
   const value = segment ? segment : defaultValue

   return (
      <Tabs defaultValue={`${value}`} className="relative mt-7 w-full">
         <TabsList
            className="flex items-center justify-evenly border-b border-gray-700 "
            autoFocus={false}
         >
            <Link href={`/${username}`} scroll={false}>
               <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </Link>
            <Link href={`/${username}/listings`} scroll={false}>
               <TabsTrigger value="listings">Listings</TabsTrigger>
            </Link>
            <Link href={`/${username}/dashboard`} scroll={false}>
               <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            </Link>
         </TabsList>
         <div className="mt-5">{children}</div>
      </Tabs>
   )
}

export default ProfileNavTabs
