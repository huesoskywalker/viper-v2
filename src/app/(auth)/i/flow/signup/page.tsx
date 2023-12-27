import { auth } from '@/lib/auth'
import { CreateAccountDialog } from './_components/create-account-dialog'
import { Toaster } from '@/components/ui/toaster'
import CreateAccountAdmissionForm from './_components/admission/create-account-admission-form'
import CreateAccountProfileForm from './_components/profile/create-account-profile-form'
import ProfileFirstFollowing from './_components/profile/profile-first-following'

export default async function SignUpPage() {
   const session = await auth()
   return (
      <>
         <CreateAccountDialog>
            {!session ? (
               <CreateAccountAdmissionForm />
            ) : (
               <CreateAccountProfileForm viperFollowings={session.user.followings}>
                  <ProfileFirstFollowing />
               </CreateAccountProfileForm>
            )}
         </CreateAccountDialog>
         <Toaster />
      </>
   )
}
