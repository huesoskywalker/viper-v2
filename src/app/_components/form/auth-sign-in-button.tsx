'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Icons } from '@/components/ui/icons'
import { useFormStatus } from 'react-dom'

const iconMap = new Map<string, (props: React.SVGProps<SVGSVGElement>) => JSX.Element>([
   ['Google', Icons.google],
   ['Github', Icons.gitHub],
])

const AuthSignInButton = ({ label }: { label: string }) => {
   const { pending } = useFormStatus()

   const iconClass = 'mr-2 h-4 w-4'
   const IconComponent = iconMap.get(label)

   return (
      <Button
         variant={'provider'}
         size={'provider'}
         type="submit"
         disabled={pending}
         className="font-semibold"
      >
         {pending ? (
            <Icons.spinner className={`${iconClass} animate-spin`} />
         ) : (
            IconComponent && <IconComponent className={iconClass} />
         )}{' '}
         Sign up with {label}
      </Button>
   )
}

export default AuthSignInButton
