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
      <Button variant="outline" type="submit" disabled={pending}>
         {pending ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : getIcon()} {provider}
      </Button>
   )
}

export default SubmitButton
