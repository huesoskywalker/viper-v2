'use client'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
   return (
      <NextThemeProvider
         attribute="class"
         themes={['light', 'dark', 'dim']}
         defaultTheme="system"
         enableSystem
         disableTransitionOnChange={true}
      >
         {children}
      </NextThemeProvider>
   )
}
