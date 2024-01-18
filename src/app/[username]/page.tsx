import { Suspense } from 'react'
// import { preloadViperBlogs } from '../../lib/vipers'
// import Loading from './loading'
// import { ViperBlogs } from './_components/ViperBlogs'
import { Session } from 'next-auth/types'
import { getCurrentSession } from '../_utils/get-current-viper'

export default async function ProfilePage() {
   // const viperSession: Session = await getCurrentSession()

   // preloadViperBlogs(viperId)

   // * @ts-expect-error Server Component
   return (
      <div className="flex w-full flex-wrap space-y-4 ">
         {/* <Suspense fallback={<Loading />}> */}
         {/* <ViperBlogs viperId={viperId} /> */}
         {/* </Suspense> */}
      </div>
   )
}
