import ProfileFirstFollowing from '../signup/_components/profile/profile-first-following'
import CreateAccountProvider from '../signup/_components/provider/create-account-provider'
import { CreateAccount } from '../_components/create-account'
import { getCurrentSession } from '@/app/_utils/get-current-viper'

const SingleSignOnPage = async () => {
   const session = await getCurrentSession()

   return (
      <>
         <CreateAccount>
            <CreateAccountProvider viperFollowings={session.followings}>
               <ProfileFirstFollowing />
            </CreateAccountProvider>
         </CreateAccount>
      </>
   )
}

export default SingleSignOnPage
