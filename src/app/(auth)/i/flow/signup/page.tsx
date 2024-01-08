import { auth } from '@/lib/auth'
import { Toaster } from '@/components/ui/toaster'
import CreateAccountAdmissionForm from './_components/admission/create-account-admission-form'
import CreateAccountProfileForm from './_components/profile/create-account-profile-form'
import ProfileFirstFollowing from './_components/profile/profile-first-following'
import { CreateAccount } from '../_components/create-account'

export default async function SignUpPage() {
   const session = await auth()
   return (
      <>
         <CreateAccount>
            {!session ? (
               <CreateAccountAdmissionForm />
            ) : (
               <CreateAccountProfileForm viperFollowings={session.user.followings}>
                  <ProfileFirstFollowing />
               </CreateAccountProfileForm>
            )}
         </CreateAccount>
         <Toaster />
      </>
   )
}
