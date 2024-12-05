'use client'

import { Logo } from '@/components/ui/logo'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarNav,
  SidebarNavLink,
} from '@/components/ui/sidebar'
import { Home, Inbox, Settings } from 'lucide-react'
import { UserDropdown } from './user-dropdown'

export const BlogSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav>
          <SidebarNavLink href="#" active>
            <Home size={16} />
            Inicio
          </SidebarNavLink>
          <SidebarNavLink href="#">
            <Inbox size={16} />
            Publicações
          </SidebarNavLink>
          <SidebarNavLink href="#">
            <Settings size={16} />
            Configurações
          </SidebarNavLink>
        </SidebarNav>
      </SidebarContent>
      <SidebarFooter>
        <UserDropdown />
      </SidebarFooter>
    </Sidebar>
  )
}
