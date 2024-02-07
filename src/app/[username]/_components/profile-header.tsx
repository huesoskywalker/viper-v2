import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'

type ProfileHeader = ComponentPropsWithoutRef<'div'>

const ProfileHeader: React.FC<ProfileHeader> = ({ className, children, ...props }) => {
   return (
      <div
         className={cn(
            'sticky inset-x-0 top-0 z-50 flex h-fit w-full flex-row items-center justify-between bg-background/80 px-3 backdrop-blur',
            className,
         )}
         {...props}
      >
         {children}
      </div>
   )
}

export default ProfileHeader
