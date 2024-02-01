import { DialogFooter } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

const GlobalDialogFooter = ({
   className,
   children,
   ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
   return (
      <DialogFooter
         className={cn('mb-6 flex w-full flex-col gap-2 px-8 sm:px-16', className)}
         {...props}
      >
         {children}
      </DialogFooter>
   )
}

export default GlobalDialogFooter
