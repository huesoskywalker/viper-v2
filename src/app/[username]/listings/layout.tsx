import React, { PropsWithChildren } from 'react'

const ListingsLayout = ({ children }: PropsWithChildren) => {
   return (
      <div>
         Listings Layout
         {children}
      </div>
   )
}

export default ListingsLayout
