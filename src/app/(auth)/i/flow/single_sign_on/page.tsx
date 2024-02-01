import ProfileFirstFollowing from '../signup/_components/profile/profile-first-following'
import CreateAccountProvider from '../signup/_components/provider/create-account-provider'
import { getCurrentSession } from '@/app/_utils/get-current-viper'
import DialogViperHeader from '../_components/dialog-viper-header'
import Image from 'next/image'

const SingleSignOnPage = async () => {
   const session = await getCurrentSession()

   return (
      <>
         <DialogViperHeader className="self-center pt-3">
            <Image
               src={'/viper-small.png'}
               alt="Viper logo"
               width={40}
               height={40}
               loading="lazy"
               quality={100}
               className="invert-image"
            />
         </DialogViperHeader>
         <CreateAccountProvider viperFollowings={session.followingsCount}>
            <ProfileFirstFollowing />
         </CreateAccountProvider>
      </>
   )
}

export default SingleSignOnPage
