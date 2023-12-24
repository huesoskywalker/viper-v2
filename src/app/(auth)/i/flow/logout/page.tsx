'use client'

import useHandleDialog from '@/app/_hooks/use-handle-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { DialogTitle } from '@radix-ui/react-dialog'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const LogOutPage = () => {
   const { openDialog } = useHandleDialog()
   const { back } = useRouter()

   const redirectBack = () => {
      back()
   }
   return (
      <>
         <Dialog open={openDialog} onOpenChange={redirectBack}>
            <DialogContent
               steps={'disabled'}
               className="flex h-[420px] max-w-[330px] flex-col items-start justify-center gap-0 rounded-lg border-none p-6"
            >
               <DialogHeader className={cn('mb-4 self-center')}>
                  <Image
                     src={'/viper.png'}
                     alt="Viper logo"
                     width={40}
                     height={50}
                     loading="lazy"
                     quality={100}
                     className="invert-image"
                  />
               </DialogHeader>
               <DialogTitle className="mb-2 font-bold text-foreground">
                  Log out of Viper?
               </DialogTitle>
               <DialogDescription className="mb-6 leading-tight">
                  You can always log back in at any time. If you just want to switch accounts, you
                  can do that by adding an existing account.{' '}
               </DialogDescription>
               <div className="flex w-full flex-col gap-2.5">
                  <Button
                     onClick={() => signOut({ callbackUrl: '/' })}
                     variant={'default'}
                     size={'lg'}
                     className="h-10"
                  >
                     Log out
                  </Button>
                  <Button onClick={redirectBack} variant={'outline'} size={'lg'} className="h-10">
                     Cancel
                  </Button>
               </div>
            </DialogContent>
         </Dialog>
      </>
   )
}

export default LogOutPage
