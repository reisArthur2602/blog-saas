'use server'

import { UserRole } from '@prisma/client'
import { UserSignup } from './_sessions/form-signup'
import { db } from '@/lib/prisma'
import { hash } from 'bcrypt'

export const signup = async (data: UserSignup, role: UserRole) => {
  const hasUserwithEmail = await db.user.findUnique({
    where: { email: data.email },
  })

  if (hasUserwithEmail)
    throw new Error(
      'Erro ao cadastrar usuário, verifique os dados e tente novamente',
    )

  const passwordHash = await hash(data.password, 8)

  await db.user.create({
    data: { ...data, password: passwordHash, role },
  })
}
