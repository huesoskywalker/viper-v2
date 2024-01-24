import { DialogDescription } from '@/components/ui/dialog'
import { FormDescription } from '@/components/ui/form'
import AtSymbol from '@/app/_components/viper/at-symbol'
import UsernameFormField from '@/app/_components/form/username-form-field'

const CreateProfileUsername = () => {
   return (
      <>
         <DialogDescription className="mt-3 text-2xl font-bold text-foreground sm:text-3xl ">
            What should we call you?
         </DialogDescription>
         <FormDescription>
            Your
            <AtSymbol />
            username is unique. You can always change it later.
         </FormDescription>
         <UsernameFormField checkbox={true} />
      </>
   )
}

export default CreateProfileUsername
