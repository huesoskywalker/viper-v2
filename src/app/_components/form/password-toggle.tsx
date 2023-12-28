import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

interface PasswordToggleProps {
   showPassword: 'password' | 'text'
   onToggle: () => void
}

export const PasswordToggle: React.FC<PasswordToggleProps> = ({ showPassword, onToggle }) => {
   const [displaySpan, setDisplaySpan] = useState<boolean>(false)

   const handleMouseEnter = () => {
      if (displaySpan === false) setDisplaySpan(true)
   }

   const handleMouseLeave = () => {
      if (displaySpan === true) setDisplaySpan(false)
   }

   return (
      <>
         <Button
            className={cn('absolute bottom-3 right-3 rounded-lg border-none hover:bg-overlay/60 ')}
            type={'button'}
            variant={'link'}
            size={'fit'}
            onClick={onToggle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
         >
            {showPassword === 'password' ? (
               <EyeIcon color="white" />
            ) : (
               <EyeOffIcon color="white" />
            )}
         </Button>
         <span
            className={cn(
               'absolute -bottom-4 -right-5 rounded-sm bg-overlay/60 px-1.5 py-1 text-xs text-foreground',
               {
                  hidden: !displaySpan,
                  'animate-delay-visibility': displaySpan,
               },
            )}
         >
            {showPassword === 'password' ? 'Reveal password' : 'Hide password'}
         </span>
      </>
   )
}
