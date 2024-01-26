'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const EditViperCloseButton: React.FC<ButtonProps> = ({ className, variant, size, ...props }) => {
   const { back } = useRouter()

   return (
      <Button onClick={back} variant={variant} size={size} type="button" {...props}>
         <X strokeWidth={2} className="h-5 w-5 text-muted-foreground hover:text-foreground" />
      </Button>
   )
}

export default EditViperCloseButton
