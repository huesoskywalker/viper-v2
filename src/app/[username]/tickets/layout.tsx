import React, { PropsWithChildren } from 'react'

const DashboardLayout = ({ children }: PropsWithChildren) => {
   return (
      <div>
         <h1>Dashboard layout</h1>
         {children}
      </div>
   )
}

export default DashboardLayout
