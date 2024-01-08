import { auth } from '@/lib/auth'
import ProfileFirstFollowing from '../signup/_components/profile/profile-first-following'
import CreateAccountProvider from '../signup/_components/provider/create-account-provider'
import { CreateAccount } from '../_components/create-account'

const SingleSignOnPage = async () => {
   const session = await auth()
   if (!session) throw new Error(`User session not found, Please log in or try again later.`)
   return (
      <>
         <CreateAccount>
            <CreateAccountProvider viperFollowings={session.user.followings}>
               <ProfileFirstFollowing />
            </CreateAccountProvider>
         </CreateAccount>
      </>
   )
}

export default SingleSignOnPage
