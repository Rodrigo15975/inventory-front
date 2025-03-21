'use client'

import AppSidebar from '@/components/app-sidebar/app-sidebar'
import { Navbar } from '@/components/navbar/navbar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { FC, PropsWithChildren } from 'react'

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">
          <div className="rounded-lg border border-dashed p-8 text-center">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
