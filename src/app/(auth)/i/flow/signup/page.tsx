import { auth } from '@/lib/auth'
import { CreateAccountDialog } from './_components/create-account-dialog'
import { Toaster } from '@/components/ui/toaster'
import CreateAccountStepOne from './_components/create-account-step-one'
import CreateAccountStepTwo from './_components/create-account-step-two'
import ProfileFirstFollowing from './_components/profile/profile-first-following'

export default async function SignUpPage() {
   const session = await auth()
   return (
      <>
         <CreateAccountDialog>
            {!session ? (
               <CreateAccountStepOne />
            ) : (
               <CreateAccountStepTwo viperFollowings={session.user.followings}>
                  <ProfileFirstFollowing />
               </CreateAccountStepTwo>
            )}
         </CreateAccountDialog>
         <Toaster />
      </>
   )
}
