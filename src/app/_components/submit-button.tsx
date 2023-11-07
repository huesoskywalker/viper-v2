'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Icons } from '@/components/ui/icons'
import { useFormStatus } from 'react-dom'

const SubmitButton = ({ provider }: { provider: string }) => {
   const { pending } = useFormStatus()

   const iconClass = 'mr-2 h-5 w-5'
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
      <Button variant="signin" type="submit" disabled={pending}>
         {pending ? <Icons.spinner className={`${iconClass} animate-spin-slow`} /> : getIcon()}{' '}
         Sign up with {provider}
      </Button>
   )
}

export default SubmitButton
