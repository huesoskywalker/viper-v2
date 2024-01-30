'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const RouterBackButton: React.FC<ButtonProps & { icon: 'x' | 'arrow' }> = ({
   className,
   icon,
   variant,
   size,
   ...props
}) => {
   const { back } = useRouter()

   return (
      <Button
         onClick={back}
         variant={variant}
         size={size}
         type="button"
         className={cn('rounded-full p-2', className)}
         {...props}
      >
         {icon === 'x' ? (
            <X strokeWidth={2} className="h-5 w-5 text-muted-foreground hover:text-foreground" />
         ) : (
            <ArrowLeft strokeWidth={2} className="h-5 w-5 rounded-full text-foreground " />
         )}
      </Button>
   )
}

export default RouterBackButton
