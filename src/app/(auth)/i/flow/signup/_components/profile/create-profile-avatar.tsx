import { DialogDescription } from '@/components/ui/dialog'
import { FormDescription } from '@/components/ui/form'
import AvatarImageFormField from '@/app/_components/form/avatar-image-form-field'

const CreateProfileAvatar = () => {
   return (
      <div className="relative flex flex-col justify-center space-y-14">
         <div className="space-y-2 self-start">
            <DialogDescription className="text-2xl font-bold text-foreground sm:text-3xl ">
               Pick a profile picture
            </DialogDescription>
            <FormDescription>Have a favorite selfie? Upload it now.</FormDescription>
         </div>
         <AvatarImageFormField className="h-36 w-36 self-center rounded-full border-2 border-white" />
      </div>
   )
}

export default CreateProfileAvatar
