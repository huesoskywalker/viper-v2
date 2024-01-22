'use client'
import { PropsWithChildren } from 'react'

import { TabsContent } from '@/components/ui/tabs'
import { usePathname } from 'next/navigation'
const DynamicTabsContent = ({ children }: PropsWithChildren) => {
   const pathname = usePathname()
   const path = pathname.split('/').at(-1)
   return (
      <>
         <TabsContent value={`${path}`}>{children}</TabsContent>
      </>
   )
}

export default DynamicTabsContent
