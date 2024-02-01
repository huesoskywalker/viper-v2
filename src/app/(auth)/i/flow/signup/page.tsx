import { auth } from '@/lib/auth'
import { Toaster } from '@/components/ui/toaster'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const CreateAccountDialogHeader = dynamic(
   () => import('../_components/create-account-dialog-header'),
   { ssr: false },
)
const CreateAccountAdmission = dynamic(
   () => import('./_components/admission/create-account-admission'),
   { ssr: false },
)
const DialogViperHeader = dynamic(() => import('../_components/dialog-viper-header'))
const CreateAccountProfile = dynamic(
   () => import('./_components/profile/create-account-profile'),
   { ssr: false },
)
const ProfileFirstFollowing = dynamic(
   () => import('./_components/profile/profile-first-following'),
)

export default async function SignUpPage() {
   const session = await auth()
   return (
      <>
         {!session ? (
            <>
               <CreateAccountDialogHeader />
               <CreateAccountAdmission />
            </>
         ) : (
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
               <CreateAccountProfile viperFollowings={session.user.followingsCount}>
                  <ProfileFirstFollowing />
               </CreateAccountProfile>
            </>
         )}
         <Toaster />
      </>
   )
}
