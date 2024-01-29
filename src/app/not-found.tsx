import { buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function NotFound() {
   return (
      <Dialog defaultOpen>
         <DialogContent steps={'disabled'} className="h-fit max-w-md px-16 py-8">
            <div className="flex flex-col items-center justify-center space-y-6">
               <div className="flex flex-col items-center justify-center space-y-2">
                  <h2 className="text-sm text-foreground">Not Found</h2>
                  <p className="text-sm text-foreground">Could not find requested resource</p>
               </div>
               <Link
                  href={'/'}
                  className={cn(
                     buttonVariants({ variant: 'destructive', size: 'sm' }),
                     'text-sm text-primary',
                  )}
               >
                  Return home
               </Link>
            </div>
         </DialogContent>
      </Dialog>
   )
}
