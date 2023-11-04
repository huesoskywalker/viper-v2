import { NavItem } from '@/types/nav-menu'

export const getNavMenu = (): NavItem[] => [
   {
      name: 'Events',
      slug: 'events',
      description: 'Show case of the events',
   },
   {
      name: 'Dashboard',
      slug: 'dashboard',
      description: 'Manage content',
   },
   {
      name: 'Profile',
      slug: 'profile',
      description: 'Profile & Blog',
   },
]
