'use client'

// import { Input } from '@/components/ui/input'
import { SidebarTrigger } from '@/components/ui/sidebar'
import Profile from '@/modules/user/components/profile'
import { Search } from 'lucide-react'

export function Navbar() {
  return (
    <header className="flex h-14 items-center border-b px-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="relative  hidden md:flex">
          <Search className="absolute left-2.5 -top-1.5 h-4 w-4 text-muted-foreground" />
          {/* <Input
            type="search"
            placeholder="Buscar..."
            className="w-64 rounded-full bg-muted pl-8"
          /> */}
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Profile />
      </div>
    </header>
  )
}
