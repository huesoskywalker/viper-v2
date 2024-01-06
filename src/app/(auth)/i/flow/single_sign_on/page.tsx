import { auth } from '@/lib/auth'
import { CreateAccountDialog } from '../_components/create-account-dialog'
import ProfileFirstFollowing from '../signup/_components/profile/profile-first-following'
import CreateAccountProviderForm from '../signup/_components/provider-admission/create-account-provider-form'

const SingleSignOnPage = async () => {
   const session = await auth()
   if (!session) throw new Error(`User session not found, Please log in or try again later.`)
   return (
      <>
         <CreateAccountDialog>
            <CreateAccountProviderForm viperFollowings={session.user.followings}>
               <ProfileFirstFollowing />
            </CreateAccountProviderForm>
         </CreateAccountDialog>
      </>
   )
}

export default SingleSignOnPage
