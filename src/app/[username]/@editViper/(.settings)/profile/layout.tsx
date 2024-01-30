import { ReactNode } from 'react'
import EditViper from './_components/edit-viper'

const EditViperLayout = ({ children }: { children: ReactNode }) => {
   return (
      <>
         <EditViper>{children}</EditViper>
      </>
   )
}

export default EditViperLayout
