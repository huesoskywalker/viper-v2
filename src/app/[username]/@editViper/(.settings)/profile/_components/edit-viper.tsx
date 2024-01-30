'use client'
import React, { ReactNode } from 'react'
import useHandleDialog from '@/app/_hooks/use-handle-dialog'
import dynamic from 'next/dynamic'

const GlobalDialog = dynamic(() => import('@/app/_components/dialog/global-dialog'))

const EditViper = ({ children }: { children: ReactNode }) => {
   const { openDialog, closeDialog } = useHandleDialog()

   return (
      <GlobalDialog open={openDialog} onOpenChange={closeDialog} stepIcon={'disabled'}>
         {children}
      </GlobalDialog>
   )
}

export default EditViper
