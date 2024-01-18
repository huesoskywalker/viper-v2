// import { BlogButton } from './_components/BlogButton'
import { Session } from 'next-auth'
// import { preloadViperService } from '@/services/servicesInitializer'
// import { ProfileNavTabs } from './_components/ProfileNavTabs'
import { PropsWithChildren } from 'react'
import { getCurrentSession } from '../_utils/get-current-viper'
import { Profile } from './_components/Profile'
import GlobalLayout from '../_components/layout/GlobalLayout'

export default async function Layout({ children }: PropsWithChildren) {
   const session: Session = await getCurrentSession()

   //    preloadViperService.preloadGetById(viper.user._id)
   return (
      <GlobalLayout>
         {/* {children} */}
         {/* <div className="m-auto w-full space-y-8 sm:px-6 lg:px-8"> */}
         <div className="flex flex-col justify-center lg:px-10">
            <Profile viperId={session.user.id} profile={true} />
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
         {/* </div> */}
      </GlobalLayout>
   )
}
