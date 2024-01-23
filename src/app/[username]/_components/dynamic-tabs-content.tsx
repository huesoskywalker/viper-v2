'use client'
import { ReactNode } from 'react'
import { TabsContent } from '@/components/ui/tabs'
import { useSelectedLayoutSegment } from 'next/navigation'

const DynamicTabsContent = ({
   defaultValue,
   children,
}: {
   children: ReactNode
   defaultValue: string
}) => {
   const segment = useSelectedLayoutSegment('children')

   const value = segment ? segment : defaultValue

   return (
      <>
         <TabsContent value={`${value}`}>{children}</TabsContent>
      </>
   )
}

export default DynamicTabsContent
