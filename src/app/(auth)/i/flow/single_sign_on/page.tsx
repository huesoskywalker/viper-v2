import { auth } from '@/lib/auth'
import ProfileFirstFollowing from '../signup/_components/profile/profile-first-following'
import CreateAccountProviderForm from '../signup/_components/provider-admission/create-account-provider-form'
import { CreateAccount } from '../_components/create-account'

const SingleSignOnPage = async () => {
   const session = await auth()
   if (!session) throw new Error(`User session not found, Please log in or try again later.`)
   return (
      <>
         <CreateAccount>
            <CreateAccountProviderForm viperFollowings={session.user.followings}>
               <ProfileFirstFollowing />
            </CreateAccountProviderForm>
         </CreateAccount>
      </>
   )
}

export default SingleSignOnPage
