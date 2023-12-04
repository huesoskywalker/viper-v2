import { DialogDescription } from '@/components/ui/dialog'
import { FormDescription } from '@/components/ui/form'
import UpdateAvatar from '@/app/_components/update-avatar'
import { FormStepsControl } from '@/types/forms/steps'

const SignUpStepSix: React.FC<FormStepsControl> = ({ formControl }) => {
   return (
      <div className="relative flex flex-col justify-center space-y-14">
         <div className="space-y-2 self-start">
            <DialogDescription className=" text-3xl font-bold text-primary ">
               Pick a profile picture
            </DialogDescription>
            <FormDescription>Have a favorite selfie? Upload it now.</FormDescription>
         </div>
         <div className="self-center">
            <UpdateAvatar />
         </div>
      </div>
   )
}

export default SignUpStepSix
