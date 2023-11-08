'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { DialogDescription } from '@radix-ui/react-dialog'
import SignUpInput from './sign-up-input'

const SignUpForm = () => {
   const [open, setOpen] = useState(false)
   // check this signal, super interesting
   // const open = new Signal(false)
   const router = useRouter()

   useEffect(() => {
      setOpen(true)
   }, [])

   const handleClose = () => {
      setOpen(false)
      router.push('/')
   }

   return (
      <Dialog open={open} onOpenChange={handleClose}>
         <DialogContent className="flex justify-between flex-col items-start w-[600px] h-[575px] border-none rounded-lg py-4  px-16">
            <DialogHeader>
               <DialogTitle className=" text-primary text-base">Step 1 of 5</DialogTitle>
            </DialogHeader>
            <div className=" h-[350px] px-5 w-full space-y-6 overflow-y-auto">
               <DialogDescription className="text-primary text-3xl font-bold mb-8">
                  Create your account
               </DialogDescription>
               <SignUpInput id="name" type="text" label="Name" />
               <SignUpInput id="email" type="email" label="Email" />
            </div>
            <DialogFooter className=" w-full p-4">
               <Button type="submit">Next step</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}

export default SignUpForm
