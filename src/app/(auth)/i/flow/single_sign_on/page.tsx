import ProfileFirstFollowing from '../signup/_components/profile/profile-first-following'
import CreateAccountProvider from '../signup/_components/provider/create-account-provider'
import { getCurrentSession } from '@/app/_utils/get-current-viper'

const SingleSignOnPage = async () => {
   const session = await getCurrentSession()

   return (
      <>
         <CreateAccountProvider viperFollowings={session.followingsCount}>
            <ProfileFirstFollowing />
         </CreateAccountProvider>
      </>
   )
}

export default SingleSignOnPage
