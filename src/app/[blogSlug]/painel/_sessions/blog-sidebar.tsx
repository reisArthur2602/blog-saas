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

import { hasPermission } from '@/lib/permissions'
import { UserRole } from '@prisma/client'

type BlogSidebarProps = {
  data: {
    blog: {
      slug: string
      blogUser: {
        id: string
        role: UserRole
        user: {
          id: string
          email: string
          name: string
        }
      }
    }
  }
}

export const BlogSidebar = ({ data }: BlogSidebarProps) => {
  const pathname = usePathname()

  const baseUrlBlog = `/${data.blog.slug}/painel`

  const isCurrentPath = (path: string) => pathname === path

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
      hasPermission: hasPermission(data.blog.blogUser.role, ['OWNER']),
    },
    {
      name: 'Configurações',
      href: baseUrlBlog + '/settings',
      icon: <Settings size={16} />,
      hasPermission: hasPermission(data.blog.blogUser.role, ['OWNER']),
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
                  active={isCurrentPath(link.href)}
                >
                  {link.icon} {link.name}
                </SidebarNavLink>
              ),
          )}
        </SidebarNav>
      </SidebarContent>
      <SidebarFooter>
        <UserDropdown
          data={{
            slug: data.blog.slug,
            email: data.blog.blogUser.user.email,
            name: data.blog.blogUser.user.name,
            role: data.blog.blogUser.role,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
