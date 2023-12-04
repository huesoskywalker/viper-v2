import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Camera } from 'lucide-react'
import useUploadImages from '../_hooks/use-upload-images'

const UpdateAvatar = () => {
   const { objectURL, getRootProps, getInputProps, isDragActive } = useUploadImages({
      endpoint: 'profileAvatar',
      type: 'profile',
   })

   return (
      <>
         <div
            {...getRootProps()}
            className={cn(
               ` relative z-0 flex h-36 w-36 items-center justify-center  overflow-hidden rounded-full border-2 border-white`,
            )}
         >
            <div
               className={cn(
                  isDragActive &&
                     `absolute inset-0 z-30 h-full w-full rounded-full border-4 border-dashed border-viper-blue`,
               )}
            />
            <Avatar className="h-full w-full">
               <AvatarImage
                  width={150}
                  height={150}
                  className="object-cover"
                  src={objectURL ?? '/default-user.png'}
                  alt="Profile preview"
               />
               <AvatarFallback>Profile</AvatarFallback>
            </Avatar>
            <input {...getInputProps()} />
            <div className=" absolute z-10 flex cursor-pointer items-center justify-center rounded-full  bg-black/50 p-[1.35rem] duration-300 ease-in-out hover:bg-black/30">
               <Camera className="absolute z-20 text-gray-300" size={27} strokeWidth={1.5} />
            </div>
         </div>
      </>
   )
}

export default UpdateAvatar
