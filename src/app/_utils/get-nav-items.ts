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

   return { navItems }
}

export default getNavItems
