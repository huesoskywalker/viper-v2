'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Icons } from '@/components/ui/icons'
import { useFormStatus } from 'react-dom'

const iconMap: { [key: string]: (props: React.SVGProps<SVGSVGElement>) => JSX.Element } = {
   Google: Icons.google,
   Github: Icons.gitHub,
   // Email: Icons.email,
}

const ProviderButton = ({ label }: { label: string }) => {
   const { pending } = useFormStatus()

   const iconClass = 'mr-2 h-4 w-4'

   const IconComponent = iconMap[label]

   return (
      <Button
         variant="provider"
         type="submit"
         disabled={pending}
         className="w-[300px] h-[44px] font-semibold"
      >
         {pending ? (
            <Icons.spinner className={`${iconClass} animate-spin-slow`} />
         ) : (
            <IconComponent className={iconClass} />
         )}{' '}
         Sign up with {label}
      </Button>
   )
}

export default ProviderButton
