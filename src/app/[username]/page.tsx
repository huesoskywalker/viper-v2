import { Suspense } from 'react'
// import { preloadViperBlogs } from '../../lib/vipers'
// import Loading from './loading'

export default async function ProfilePage() {
   // preloadViperBlogs(viperId)

   // * @ts-expect-error Server Component
   return (
      <div className="flex w-full flex-wrap space-y-4 ">
         {/* <Suspense fallback={<Loading />}> */}
         [username] page
         {/* </Suspense> */}
      </div>
   )
}
