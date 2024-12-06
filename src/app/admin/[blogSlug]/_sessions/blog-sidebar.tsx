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
import { Home, Inbox, Settings, Users } from 'lucide-react'
import { UserDropdown } from './user-dropdown'
import { usePathname } from 'next/navigation'

import { Blog, UserRole } from '@prisma/client'
import { hasPermission } from '@/lib/permissions'

type BlogSidebarProps = {
  blog: Blog
  user: {
    email: string
    name: string
    role: UserRole
  }
}

export const BlogSidebar = ({ blog, user }: BlogSidebarProps) => {
  const pathname = usePathname()
  const baseUrlBlog = `/admin/${blog.slug}`
  const isActive = (path: string) => pathname === path

  const menuLinks = [
    {
      name: 'Inicio',
      href: baseUrlBlog,
      icon: <Home size={16} />,
      hasPermission: true,
    },
    {
      name: 'Publicações',
      href: baseUrlBlog + '/posts',
      icon: <Inbox size={16} />,
      hasPermission: true,
    },
    {
      name: 'Usuários',
      href: baseUrlBlog + '/users',
      icon: <Users size={16} />,
      hasPermission: hasPermission(user.role, ['OWNER']),
    },
    {
      name: 'Configurações',
      href: baseUrlBlog + '/settings',
      icon: <Settings size={16} />,
      hasPermission: hasPermission(user.role, ['OWNER']),
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav>
          {menuLinks.map(
            (link) =>
              link.hasPermission && (
                <SidebarNavLink
                  key={link.href}
                  href={link.href}
                  active={isActive(link.href)}
                >
                  {link.icon} {link.name}
                </SidebarNavLink>
              ),
          )}
        </SidebarNav>
      </SidebarContent>
      <SidebarFooter>
        <UserDropdown
          slug={blog.slug}
          user={{ email: user.email, name: user.name }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
