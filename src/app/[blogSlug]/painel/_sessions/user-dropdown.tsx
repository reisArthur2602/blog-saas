'use client'

import { CreditCard, LogOut } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { logout } from '@/lib/auth'
import { UserRole } from '@prisma/client'

type UserDropdownProps = {
  data: {
    slug: string
    email: string
    name: string
    role: UserRole
  }
}

const getAvatarInitials = (name: string): string => {
  if (!name) return ''

  const words = name.trim().split(/\s+/)
  const firstNameInitial = words[0]?.[0]?.toUpperCase() || ''
  const lastNameInitial = words[1]?.[0]?.toUpperCase() || ''

  return firstNameInitial + lastNameInitial
}

export const UserDropdown = ({ data }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className="flex items-center justify-start w-full space-x-1 !px-0 focus-visible:ring-0"
          style={{ textDecoration: 'none' }}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>{getAvatarInitials(data.name)}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col space-y-1 text-left text-xs truncate">
            <p className=" font-medium flex-1 leading-none capitalize truncate">
              {data.name}
            </p>

            <p className="leading-none flex-1 text-muted-foreground truncate">
              {data.email}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none capitalize">
              {data.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {data.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href={`/${data.slug}/painel/settings/subscription`}
              className="flex items-center gap-2 cursor-pointer"
            >
              <CreditCard />
              <span>Upgrade</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
          <LogOut />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
