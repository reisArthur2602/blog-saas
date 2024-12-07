import { UserRole } from '@prisma/client'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatRole = (role: UserRole) => {
  switch (role) {
    case 'OWNER':
      return 'Proprietário'
    case 'AUTHOR':
      return 'Autor'
    case 'EDITOR':
      return 'Editor'
  }
}

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('pt-BR').format(date)
