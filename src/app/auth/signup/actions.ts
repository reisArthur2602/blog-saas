'use server'

import { db } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { UserSignupInput } from './types'

const ERROR_MESSAGES = {
  USER_EXISTS: 'Erro ao cadastrar usuário',
}

const checkIfUserExists = async (email: string) => {
  return await db.user.findUnique({ where: { email } })
}

const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 8)
}

const createUser = async (data: UserSignupInput, hashedPassword: string) => {
  await db.user.create({
    data: { ...data, password: hashedPassword },
  })
}

export const signup = async ({ email, password, name }: UserSignupInput) => {
  try {
    const existingUser = await checkIfUserExists(email)

    if (existingUser) {
      return { error: ERROR_MESSAGES.USER_EXISTS }
    }

    const hashedPassword = await hashPassword(password)

    await createUser({ email, password, name }, hashedPassword)
  } catch (error) {
    console.error('Erro no cadastro de usuário:', error)
    return { error: 'Ocorreu um erro ao processar o cadastro.' }
  }
}
