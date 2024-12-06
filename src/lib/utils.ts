import { UserRole } from '@prisma/client'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatRole = (role: UserRole) => {
  switch (role) {
    case 'OWNER':
      return 'Criador'
    case 'AUTHOR':
      return 'Autor'
    case 'EDITOR':
      return 'Editor'
  }
}
