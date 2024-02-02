import { auth } from '@/lib/auth'
import dynamic from 'next/dynamic'
import LoadingSpinner from '@/app/_components/loading/loading-spinner'

const CreateAccountAdmission = dynamic(
   () => import('./_components/admission/create-account-admission'),
   { ssr: false, loading: () => <LoadingSpinner className="h-full" /> },
)
const CreateAccountProfile = dynamic(
   () => import('./_components/profile/create-account-profile'),
   { ssr: false, loading: () => <LoadingSpinner className="h-full" /> },
)
const ProfileFirstFollowing = dynamic(
   () => import('./_components/profile/profile-first-following'),
)

export default async function SignUpPage() {
   const session = await auth()
   return (
      <>
         {!session ? (
            <>
               <CreateAccountAdmission />
            </>
         ) : (
            <>
               <CreateAccountProfile viperFollowings={session.user.followingsCount}>
                  <ProfileFirstFollowing />
               </CreateAccountProfile>
            </>
         )}
      </>
   )
}
