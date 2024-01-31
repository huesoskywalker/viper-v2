import { auth } from '@/lib/auth'
import { Toaster } from '@/components/ui/toaster'
import dynamic from 'next/dynamic'

const CreateAccountDialogHeader = dynamic(
   () => import('../_components/create-account-dialog-header'),
   { ssr: false },
)
const CreateAccountAdmission = dynamic(
   () => import('./_components/admission/create-account-admission'),
   { ssr: false },
)
const DialogVHeader = dynamic(() => import('../_components/dialog-v-header'))
const CreateAccountProfile = dynamic(
   () => import('./_components/profile/create-account-profile'),
   { ssr: false },
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
               <CreateAccountDialogHeader />
               <CreateAccountAdmission />
            </>
         ) : (
            <>
               <DialogVHeader />
               <CreateAccountProfile viperFollowings={session.user.followingsCount}>
                  <ProfileFirstFollowing />
               </CreateAccountProfile>
            </>
         )}
         <Toaster />
      </>
   )
}
