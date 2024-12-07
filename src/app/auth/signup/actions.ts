'use server'

import { db } from '@/lib/prisma'
import { UserSignupInput } from '@/schemas/User'
import { hash } from 'bcrypt'
import { redirect } from 'next/navigation'

export const signup = async (data: UserSignupInput) => {
  const hasUserwithEmail = await db.user.findUnique({
    where: { email: data.email },
  })

  if (hasUserwithEmail) return { error: 'Erro ao cadastrar usuário' }

  const passwordHash = await hash(data.password, 8)

  await db.user.create({
    data: { ...data, password: passwordHash },
  })

  redirect('/auth/signin')
}
