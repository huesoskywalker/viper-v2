'use client'

import useHandleDialog from '@/app/_hooks/use-handle-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

export default function GlobalError({
   error,
   reset,
}: {
   error: Error & { digest?: string }
   reset: () => void
}) {
   const { openDialog, closeDialog } = useHandleDialog()
   return (
      <html>
         <body>
            <Dialog open={openDialog} onOpenChange={() => closeDialog('/', 'error')}>
               <DialogContent className=" h-fit max-w-fit  px-16 py-6">
                  <div className="flex flex-col items-center justify-center space-y-6">
                     <h2 className="text-primary">{error.message}</h2>
                     <Button
                        variant={'destructive'}
                        size={'sm'}
                        className="text-primary"
                        onClick={() => reset()}
                     >
                        Try again
                     </Button>
                  </div>
               </DialogContent>
            </Dialog>
         </body>
      </html>
   )
}
