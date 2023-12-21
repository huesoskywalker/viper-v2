import { Bell, Home, LucideIcon, Mail, Search, User2 } from 'lucide-react'

export type NavItem = {
   name: string
   slug: string
   // what is this description for?
   description: string
}

const getNavItems = (): {
   navItems: NavItem[]
} => {
   const navItems: NavItem[] = [
      {
         name: 'Home',
         slug: 'home',
         description: 'Home page',
      },
      {
         name: 'Explore',
         slug: 'explore',
         description: 'Show case of the events',
      },
      {
         name: 'Notifications',
         slug: 'notifications',
         description: 'User notification',
      },
      {
         name: 'Messages',
         slug: 'messages',
         description: 'User messages',
      },
      {
         name: 'Profile',
         slug: 'profile',
         description: 'Profile & Blog',
      },
   ]

   return { navItems }
}

export default getNavItems

export const navIcon = new Map<string, LucideIcon>([
   ['Home', Home],
   ['Explore', Search],
   ['Notifications', Bell],
   ['Messages', Mail],
   ['Profile', User2],
])
