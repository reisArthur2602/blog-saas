'use client'

import { FormEvent, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetDescription,
  Sheet,
} from '@/components/ui/sheet'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { UserRole } from '@prisma/client'

import { formatRole } from '@/lib/utils'
import { editBlogUser } from '../actions'
import { Pen } from 'lucide-react'
import { Label } from '@/components/ui/label'

const USER_ROLES: { role: UserRole }[] = [
  { role: 'AUTHOR' },
  { role: 'EDITOR' },
  { role: 'OWNER' },
]

export const EditBlogUser = ({
  id,
  email,
  role,
}: {
  id: string
  email: string
  role: UserRole
}) => {
  const [isOpen, setOpen] = useState(false)
  const [selectedRole, setRole] = useState<UserRole>('AUTHOR')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await editBlogUser({ id, role: selectedRole })
    if (response?.error) return console.error(response.error)

    console.log('A permissão do usuário foi atualizada com sucesso!')
    setOpen(!open)
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setOpen(open)}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pen />
        </Button>
      </SheetTrigger>

      <SheetContent className="space-y-6 overflow-y-auto w-full">
        <SheetHeader>
          <SheetTitle>Editar cargo</SheetTitle>
          <SheetDescription>
            Preencha o formulário para editar o cargo do usuário no blog.
          </SheetDescription>
        </SheetHeader>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input placeholder="Email" disabled={true} defaultValue={email} />
          </div>

          <div className="space-y-2">
            <Label>Cargo</Label>

            <Select
              onValueChange={(e) => setRole(e as UserRole)}
              defaultValue={role || selectedRole}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma permissão" />
              </SelectTrigger>

              <SelectContent className="capitalize">
                {USER_ROLES.map(({ role }) => (
                  <SelectItem key={role} value={role}>
                    {formatRole(role)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <SheetFooter className="grid gap-3 sm:grid-cols-2 sm:gap-0">
            <Button>Salvar</Button>

            <SheetClose className="w-full" asChild>
              <Button variant="outline" className="w-full">
                Cancelar
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
