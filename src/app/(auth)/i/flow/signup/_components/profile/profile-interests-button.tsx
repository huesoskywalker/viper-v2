import { useCreateProfileStore } from '../../_stores/create-profile-store'
import NextStepButton from '../next-step-button'

const ProfileInterestsButton = () => {
   const { interests } = useCreateProfileStore()

   const disableBtn = interests < 3 ? true : false

   return (
      <>
         <div className="flex flex-row items-center justify-between">
            {interests < 3 ? (
               <span className="text-sm text-muted-foreground">{interests} of 3 selected</span>
            ) : (
               <span className="text-sm font-semibold text-secondary-foreground">
                  Great work 🎉
               </span>
            )}
            <NextStepButton variant={'default'} size={'md'} disabled={disableBtn} />
         </div>
      </>
   )
}

export default ProfileInterestsButton
