import { viperService } from '@/services/servicesInitializer'
import React from 'react'

const DashboardPage = async () => {
   await viperService.getAll()

   return (
      <>
         <div className=" text-2xl text-foreground">Dashboard Page</div>
         <div className=" text-2xl text-foreground">Dashboard Page</div>
         <div className=" text-2xl text-foreground">Dashboard Page</div>
         <div className=" text-2xl text-foreground">Dashboard Page</div>
         <div className=" text-2xl text-foreground">Dashboard Page</div>
         <div className=" text-2xl text-foreground">Dashboard Page</div>
         <div className=" text-2xl text-foreground">Dashboard Page</div>
         <div className=" text-2xl text-foreground">Dashboard Page</div>
         <div className=" text-2xl text-foreground">Dashboard Page</div>
         <div className=" text-2xl text-foreground">Dashboard Page</div>
         <div className=" text-2xl text-foreground">Dashboard Page</div>
         <div className=" text-2xl text-foreground">Dashboard Page</div>
         <div className=" text-2xl text-foreground">Dashboard Page</div>
         <div className=" text-2xl text-foreground">Dashboard Page</div>
         <div className=" text-2xl text-foreground">Dashboard Page</div>
         <div className=" text-2xl text-foreground">Dashboard Page</div>
         <div className=" text-2xl text-foreground">Dashboard Page</div>
         <div className=" text-2xl text-foreground">Dashboard Page</div>
         <div className=" text-2xl text-foreground">Dashboard Page</div>
      </>
   )
}

export default DashboardPage
