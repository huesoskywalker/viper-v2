import { auth } from '@/lib/auth'
import { CreateAccountDialog } from './_components/create-account-dialog'
// TODO: remove from package if we pick Sooner
// import { Toaster } from '@/components/ui/toaster'
import { Toaster } from '@/components/ui/sonner'
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
         {/* TODO: Remove the Toaster if Sooner works cool*/}
         <Toaster />
      </>
   )
}
