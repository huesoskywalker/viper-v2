// import { BlogButton } from './_components/BlogButton'
// import { preloadViperService } from '@/services/servicesInitializer'
// import { ProfileNavTabs } from './_components/ProfileNavTabs'
import { ReactNode } from 'react'
import { Viper } from './_components/viper'
import GlobalLayout from '../_components/layout/GlobalLayout'

export default async function Layout({
   children,
   params,
}: {
   children: ReactNode
   params: { username: string }
}) {
   // TODO:
   // preloadViperByUsername()
   return (
      <GlobalLayout>
         <div className="flex flex-row gap-3 overflow-x-clip">
            <div className="w-full lg:w-2/3 lg:border-r-[1px] lg:border-muted-foreground lg:pr-6">
               <Viper username={params.username} />
               <div className="flex pb-3 lg:border-b lg:border-gray-800">
                  {/* <BlogButton
               viperId={session.user.id}
               viperName={session.user.name}
               viperImage={session.user.image}
            /> */}
                  <nav className="flex flex-grow justify-center">{/* <ProfileNavTabs /> */}</nav>
               </div>
               <div className="mt-3">{children}</div>
            </div>
            <div className="hidden w-1/3 lg:flex">
               <span className="text-foreground">Helloooooooooooooooooooooooooo</span>
            </div>
         </div>
      </GlobalLayout>
   )
}
