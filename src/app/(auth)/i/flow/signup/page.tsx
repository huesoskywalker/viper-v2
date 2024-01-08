import { auth } from '@/lib/auth'
import { Toaster } from '@/components/ui/toaster'
import CreateAccountAdmission from './_components/admission/create-account-admission'
import CreateAccountProfile from './_components/profile/create-account-profile'
import ProfileFirstFollowing from './_components/profile/profile-first-following'
import { CreateAccount } from '../_components/create-account'

export default async function SignUpPage() {
   const session = await auth()
   return (
      <>
         <CreateAccount>
            {!session ? (
               <CreateAccountAdmission />
            ) : (
               <CreateAccountProfile viperFollowings={session.user.followings}>
                  <ProfileFirstFollowing />
               </CreateAccountProfile>
            )}
         </CreateAccount>
         <Toaster />
      </>
   )
}
