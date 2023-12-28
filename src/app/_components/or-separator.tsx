import React from 'react'

const OrSeparator = () => {
   return (
      <div className="relative my-[6px] w-[300px]">
         <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t-[1.5px] border-border" />
         </div>
         <div className="relative flex justify-center">
            <span className="bg-background px-2 text-sm text-foreground">or</span>
         </div>
      </div>
   )
}

export default OrSeparator
