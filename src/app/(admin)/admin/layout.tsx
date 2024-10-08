
import React from 'react'
import { Navbar } from './_components/navbar'
import { Sidebar } from './_components/sidebar'
 

export default function Adminlayout({children} : {children : React.ReactNode}) {
  return (
    <div className="bg-muted h-full">
      <Sidebar />
      <div className="lg:pl-[300px] flex flex-col h-full">
        <Navbar />
        <main className="bg-white flex-1 overflow-auto p-8 lg:rounded-tl-2xl">
          {children}
        </main>
      </div>
    </div>
  )
}
