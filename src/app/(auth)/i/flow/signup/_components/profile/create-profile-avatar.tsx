import { DialogDescription } from '@/components/ui/dialog'
import { FormControl, FormDescription, FormField, FormItem } from '@/components/ui/form'
import UpdateAvatar from '@/app/_components/viper/update-avatar'
import { FormControlStep } from '@/types/forms/steps'
import { CreateProfileFormValues } from '../../_hooks/profile/use-create-profile-form'

const CreateProfileAvatar: React.FC<FormControlStep<CreateProfileFormValues>> = ({
   formControl,
}) => {
   return (
      <div className="relative flex flex-col justify-center space-y-14">
         <div className="space-y-2 self-start">
            <DialogDescription className="text-2xl font-bold text-foreground sm:text-3xl ">
               Pick a profile picture
            </DialogDescription>
            <FormDescription>Have a favorite selfie? Upload it now.</FormDescription>
         </div>
         <div className="self-center">
            <FormField
               control={formControl}
               name="image"
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <UpdateAvatar id={field.name} />
                     </FormControl>
                  </FormItem>
               )}
            />
         </div>
      </div>
   )
}

export default CreateProfileAvatar
