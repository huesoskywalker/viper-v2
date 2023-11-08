'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Icons } from '@/components/ui/icons'
import { useFormStatus } from 'react-dom'

const SubmitButton = ({ provider }: { provider: string }) => {
   const { pending } = useFormStatus()

   const iconClass = 'mr-2 h-4 w-4'
   const getIcon = () => {
      switch (provider) {
         case 'Google':
            return <Icons.google className={iconClass} />
         case 'Github':
            return <Icons.gitHub className={iconClass} />
         case 'Email':
            return <Icons.email className={iconClass} />
      }
   }

   return (
      <Button
         variant="signin"
         type="submit"
         disabled={pending}
         className="w-[300px] h-[44px] font-semibold"
      >
         {pending ? <Icons.spinner className={`${iconClass} animate-spin-slow`} /> : getIcon()}{' '}
         Sign up with {provider}
      </Button>
   )
}

export default SubmitButton
