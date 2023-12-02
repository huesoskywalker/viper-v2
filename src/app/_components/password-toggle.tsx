import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

interface PasswordToggleProps {
   showPassword: 'password' | 'text'
   onToggle: () => void
}

export const PasswordToggle: React.FC<PasswordToggleProps> = ({ showPassword, onToggle }) => {
   return (
      <Button
         className={cn(
            'absolute bottom-3 right-3 rounded-lg border-none data-[state=checked]:bg-viper-forest-green',
         )}
         variant={'link'}
         size={'link'}
         onClick={onToggle}
      >
         {showPassword === 'password' ? (
            // <EyeIcon className="text-white" />
            <EyeIcon fill="white" />
         ) : (
            // <EyeOffIcon className="text-white" />
            <EyeOffIcon color="white" />
         )}
      </Button>
   )
}
