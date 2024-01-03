import { Bell, Home, LucideIcon, Mail, Search, User2 } from 'lucide-react'

export type NavItem = {
   name: string
   slug: string
   description: string
   icon: LucideIcon
   hideOnMobile?: boolean
}

export const getNavItems = (): {
   navItems: ReadonlyArray<NavItem>
} => {
   const navItems: Array<NavItem> = [
      {
         name: 'Home',
         slug: 'home',
         description: 'Home page',
         icon: Home,
      },
      {
         name: 'Explore',
         slug: 'explore',
         description: 'Show case of the events',
         icon: Search,
      },
      {
         name: 'Notifications',
         slug: 'notifications',
         description: 'User notification',
         icon: Bell,
      },
      {
         name: 'Messages',
         slug: 'messages',
         description: 'User messages',
         icon: Mail,
      },
      {
         name: 'Profile',
         slug: 'profile',
         description: 'Profile & Blog',
         icon: User2,
         hideOnMobile: true,
      },
   ] as const

   return { navItems }
}

export const getMobileNavMenu = (): { mobileNavItems: ReadonlyArray<NavItem> } => {
   const mobileNavItems: Array<NavItem> = [
      {
         name: 'Profile',
         slug: 'profile',
         description: 'Profile & Blog',
         icon: User2,
      },
   ] as const
   return { mobileNavItems }
}
