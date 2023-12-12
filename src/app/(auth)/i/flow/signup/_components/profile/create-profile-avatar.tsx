import { DialogDescription } from '@/components/ui/dialog'
import { FormDescription, FormField, FormItem } from '@/components/ui/form'
import UpdateAvatar from '@/app/_components/update-avatar'
import { FormControlSteps } from '@/types/forms/steps'
import { CreateProfileFormControl } from '../../_hooks/profile/use-create-profile-form'

const CreateProfileAvatar: React.FC<FormControlSteps<CreateProfileFormControl>> = ({
   formControl,
}) => {
   return (
      <div className="relative flex flex-col justify-center space-y-14">
         <div className="space-y-2 self-start">
            <DialogDescription className=" text-3xl font-bold text-primary ">
               Pick a profile picture
            </DialogDescription>
            <FormDescription>Have a favorite selfie? Upload it now.</FormDescription>
         </div>
         <div className="self-center">
            <FormField
               control={formControl}
               name="image"
               render={({ field }) => <UpdateAvatar id={field.name} />}
            />
         </div>
      </div>
   )
}

export default CreateProfileAvatar
