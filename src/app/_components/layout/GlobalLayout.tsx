import React, { HTMLAttributes } from 'react'

type GlobalLayoutProps = HTMLAttributes<HTMLDivElement>
const GlobalLayout: React.FC<GlobalLayoutProps> = ({ className, children, ...props }) => {
   return (
      <div className="mx-auto max-w-5xl space-y-8 px-2 py-4 lg:px-8">
         <div className="rounded-lg bg-vp-border-gradient p-px shadow-lg shadow-secondary/20">
            <div className="rounded-lg bg-background p-3.5 lg:p-6">{children}</div>
         </div>
      </div>
   )
}

export default GlobalLayout
