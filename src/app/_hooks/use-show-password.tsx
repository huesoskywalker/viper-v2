import React, { useState } from 'react'

const useShowPassword = () => {
   const [showPassword, setShowPassword] = useState<'text' | 'password'>('password')

   const handleShowPassword = () => {
      const typeMap: { password: 'text'; text: 'password' } = {
         password: 'text',
         text: 'password',
      }

      setShowPassword((prevState) => typeMap[prevState])
   }
   return { showPassword, handleShowPassword }
}

export default useShowPassword
