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
import { cn } from '@/lib/utils'
import { menuItems } from './links-sidebar'
import ValleLogo from '../logo/logo'
import Link from 'next/link'

const AppSidebar = () => {
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
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.active}
                      className={cn(
                        item.active &&
                          'bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white'
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
export default AppSidebar
