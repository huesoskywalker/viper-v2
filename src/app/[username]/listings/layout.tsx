import React, { PropsWithChildren } from 'react'

const ListingsLayout = ({ children }: PropsWithChildren) => {
   return (
      <div className="flex flex-col items-center  justify-center">
         <h1 className="mx-20 text-2xl text-foreground">
            You don&apos;t have any listings yet. Click below to kickstart your selling journey!
         </h1>
         {children}
      </div>
   )
}

export default ListingsLayout
