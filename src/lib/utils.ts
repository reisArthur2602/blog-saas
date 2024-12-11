import { PostCategory, UserRole } from '@prisma/client'
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

export const formatCategoryPost = (category: PostCategory): string => {
  switch (category) {
    case PostCategory.TECHNOLOGY:
      return 'Tecnologia'
    case PostCategory.EDUCATION:
      return 'Educação'
    case PostCategory.HEALTH_AND_WELLNESS:
      return 'Saúde e Bem-Estar'
    case PostCategory.TRAVEL:
      return 'Viagens'
    case PostCategory.BUSINESS_AND_ENTREPRENEURSHIP:
      return 'Negócios e Empreendedorismo'
    case PostCategory.CULTURE_AND_ENTERTAINMENT:
      return 'Cultura e Entretenimento'
    case PostCategory.CULINARY_AND_GASTRONOMY:
      return 'Culinária e Gastronomia'
    case PostCategory.LIFESTYLE:
      return 'Estilo de Vida'
    case PostCategory.SCIENCE_AND_INNOVATION:
      return 'Ciência e Inovação'
    case PostCategory.SUSTAINABILITY_AND_ENVIRONMENT:
      return 'Sustentabilidade e Meio Ambiente'
    default:
      return 'Categoria desconhecida'
  }
}

export const formatPrice = (price: number) =>
  price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
