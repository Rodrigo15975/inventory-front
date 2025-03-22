'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { useLogout } from '@/modules/login/services/mutation'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ValleLogo from '../logo/logo'
import { Button } from '../ui/button'
import { menuItems } from './links-sidebar'

const AppSidebar = () => {
  const path = usePathname()

  const { mutate: handleLogout, isPending } = useLogout()

  const isActive = (href: string) =>
    path === href
      ? 'bg-emerald-500 text-white transition hover:bg-emerald-600 hover:text-white'
      : ''

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b">
        <ValleLogo />
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((section) => (
          <SidebarGroup key={section.section}>
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground">
              {section.section}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map(({ href, title, icon: Icon }) => (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton
                      asChild
                      className={`${isActive(href)} h-[42px]`}
                    >
                      <Link className="p-4" href={href}>
                        <Icon className="h-4 w-4" />
                        <span>{title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <div className="p-4 border-t">
        <Button
          type="button"
          variant={'outline'}
          onClick={() => handleLogout()}
          disabled={isPending}
          className="flex items-center justify-center gap-2 p-2 w-full text-primary  bg-[#10B981]/5 rounded-md hover:bg-[#10B981] transition"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>

      <SidebarRail />
    </Sidebar>
  )
}
export default AppSidebar
