'use client'

import useHandleDialog from '@/app/_hooks/use-handle-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useEffect } from 'react'

export default function Error({
   error,
   reset,
}: {
   error: Error & { digest?: string }
   reset: () => void
}) {
   const { openDialog, closeDialog } = useHandleDialog()

   useEffect(() => {
      // Log the error to an error reporting service
   }, [error])

   return (
      <Dialog open={openDialog} onOpenChange={() => closeDialog('/', 'error')}>
         <DialogContent className="h-fit max-w-md px-16 py-8">
            <div className="flex flex-col items-center justify-center space-y-6">
               {/* TODO, log error message, we are splitting in here */}
               <h2 className="text-primary">{error.message.split('Error')[0]}</h2>
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
   )
}
