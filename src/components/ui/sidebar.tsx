import { cn } from '@/lib/utils'
import Link from 'next/link'

export type ComponentGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
} & T

export const Sidebar = ({ className, children }: ComponentGenericProps) => {
  return (
    <aside className={cn(['border-r flex flex-col font-medium', className])}>
      {children}
    </aside>
  )
}
export const SidebarHeader = ({
  className,
  children,
}: ComponentGenericProps) => {
  return (
    <header
      className={cn(['px-6 h-16 flex items-center border-b ', className])}
    >
      {children}
    </header>
  )
}

export const SidebarContent = ({
  className,
  children,
}: ComponentGenericProps) => {
  return <div className={cn(['p-4 flex-1 ', className])}>{children}</div>
}
export const SidebarNav = ({ className, children }: ComponentGenericProps) => {
  return (
    <nav className={cn(['flex flex-col gap-2', className])}>{children}</nav>
  )
}

type SidebarNavLinkProps = {
  href: string
  active?: boolean
}

export const SidebarNavLink = ({
  className,
  children,
  href,
  active,
}: ComponentGenericProps<SidebarNavLinkProps>) => {
  return (
    <Link
      href={href}
      className={cn([
        'flex gap-3 items-center text-sm px-3 py-2 rounded-md hover:bg-secondary',
        active && 'bg-secondary',
        className,
      ])}
    >
      {children}
    </Link>
  )
}

export const SidebarFooter = ({
  className,
  children,
}: ComponentGenericProps) => {
  return (
    <footer className={cn(['p-6 border-t mt-auto', className])}>
      {children}
    </footer>
  )
}
