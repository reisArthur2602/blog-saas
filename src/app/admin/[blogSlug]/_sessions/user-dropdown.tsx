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
import { onLogout } from '../actions'

type UserDropdownProps = {
  slug: string
}

export const UserDropdown = ({ slug }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className="relative h-8 flex items-center justify-between w-full space-x-1 !px-0"
          style={{ textDecoration: 'none' }}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>

          <div className="flex flex-col space-y-1 text-left text-xs truncate">
            <p className="truncate font-medium flex-1 leading-none">
              Arthur Reis
            </p>

            <p className="truncate leading-none flex-1 text-muted-foreground">
              contato.arthurreis222@gmail.com
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Arthur Reis</p>
            <p className="text-xs leading-none text-muted-foreground">
              contato.arthurreis222@gmail.com
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href={`/admin/${slug}/settings/subscription`}
              className="flex items-center gap-2 cursor-pointer"
            >
              <CreditCard />
              <span>Upgrade</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" onClick={() => onLogout()}>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
