'use client'

import { useState } from 'react'

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

export const CreatePosts = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setOpen(open)}>
      <SheetTrigger asChild>
        <Button className="w-fit" size={'sm'}>
          Nova publicação
        </Button>
      </SheetTrigger>

      <SheetContent className="space-y-6 overflow-y-auto w-full">
        <SheetHeader>
          <SheetTitle>Criar publicação</SheetTitle>
          <SheetDescription>
            Preencha o formulário para adicionar uma nova publicação ao blog
          </SheetDescription>
        </SheetHeader>

        <SheetFooter className="grid gap-3 sm:grid-cols-2 sm:gap-0">
          <Button>Salvar</Button>

          <SheetClose className="w-full" asChild>
            <Button variant="outline" className="w-full">
              Cancelar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
