import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const Dialog = dynamic(() => import('@/components/ui/dialog').then((mod) => mod.Dialog))
const DialogContent = dynamic(() =>
   import('@/components/ui/dialog').then((mod) => mod.DialogContent),
)

type DialogContentProps = {
   open: boolean
   onOpenChange: (() => void) | undefined
   onOpenAutoFocus?: (e: Event) => void
   stepIcon?: string | number
   children: ReactNode
}

const GlobalDialog = ({
   open,
   onOpenChange,
   onOpenAutoFocus,
   stepIcon,
   children,
}: DialogContentProps) => {
   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent
            onOpenAutoFocus={onOpenAutoFocus}
            steps={stepIcon}
            className={cn(
               'flex h-full max-w-sm flex-col items-start justify-center overflow-hidden rounded-lg border-none md:h-[575px] md:max-w-[600px] xl:h-[650px]',
            )}
         >
            {children}
         </DialogContent>
      </Dialog>
   )
}

export default GlobalDialog
