import React, { HTMLAttributes } from 'react'

type GlobalLayoutProps = HTMLAttributes<HTMLDivElement>
const GlobalLayout: React.FC<GlobalLayoutProps> = ({ className, children, ...props }) => {
   return (
      <div className="mx-auto max-w-full space-y-8 pt-14 sm:px-2 sm:py-4 lg:px-6 xl:px-8">
         <div className="border-none sm:rounded-lg sm:bg-vp-border-gradient sm:p-px sm:shadow-lg sm:shadow-secondary/20">
            <div className="border-none bg-background sm:rounded-lg sm:p-3.5 lg:p-6">
               {children}
            </div>
         </div>
      </div>
   )
}

export default GlobalLayout
