import ProfileHeader from '@/app/[username]/_components/profile-header'
import EditViperForm from './_components/edit-viper-form'
import EditViperFormBody from './_components/edit-viper-form-body'
import RouterBackButton from '@/app/_components/dialog/router-back-button'
import SubmitButton from '@/app/_components/form/submit-button'

const EditViperPage = () => {
   return (
      <>
         <EditViperForm>
            <ProfileHeader className="fixed rounded-t-lg">
               <div className="flex flex-row items-center gap-5  py-2">
                  <RouterBackButton variant={'ghost'} size={'fit'} icon="x" />
                  <span className="text-lg font-semibold text-foreground/80">Edit profile</span>
               </div>
               <SubmitButton
                  variant={'default'}
                  size={'sm'}
                  className={'h-7 rounded-3xl'}
                  label="Save"
               />
            </ProfileHeader>
            <div className="relative flex h-full w-full flex-col items-center justify-start overflow-y-scroll">
               <EditViperFormBody />
            </div>
         </EditViperForm>
      </>
   )
}

export default EditViperPage
