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
import { useAdmin } from '@/providers/admin'
import { Blog } from '@prisma/client'
import { useEffect } from 'react'

type BlogSidebarProps = {
  blog: Blog
}

export const BlogSidebar = ({ blog }: BlogSidebarProps) => {
  const { user, setSelectedBlog } = useAdmin()

  const baseUrlBlog = `/admin/${blog.slug}`
  const pathname = usePathname()
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
      hasPermission: user?.role === 'OWNER',
    },
    {
      name: 'Configurações',
      href: baseUrlBlog + '/settings',
      icon: <Settings size={16} />,
      hasPermission: user?.role === 'OWNER',
    },
  ]

  useEffect(() => {
    setSelectedBlog(blog)
  }, [setSelectedBlog, blog])

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
        <UserDropdown slug={blog.slug} />
      </SidebarFooter>
    </Sidebar>
  )
}
