'use client'

import {
  SidebarContent,
  SidebarNav,
  SidebarNavLink,
} from '@/components/ui/sidebar'

import { usePathname } from 'next/navigation'

export const SettingsSidebar = ({ blogSlug }: { blogSlug: string }) => {
  const pathname = usePathname()

  const baseUrlBlog = `/${blogSlug}/painel/settings`

  const isCurrentPath = (path: string) => pathname === path

  const menuLinks = [
    {
      name: 'Gerais',
      href: baseUrlBlog,
    },
    {
      name: 'Pagamento',
      href: baseUrlBlog + '/subscription',
    },
    {
      name: 'Aparência',
      href: baseUrlBlog + '/theme',
    },
  ]

  return (
    <SidebarContent>
      <SidebarNav>
        {menuLinks.map((link) => (
          <SidebarNavLink
            key={link.href}
            href={link.href}
            active={isCurrentPath(link.href)}
          >
            {link.name}
          </SidebarNavLink>
        ))}
      </SidebarNav>
    </SidebarContent>
  )
}
