'use server'

import { compare } from 'bcrypt'
import { db } from '@/lib/prisma'
import { sign } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { UserSigninInput } from './types'

const TOKEN_OPTIONS = {
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 dias
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
}

const generateToken = (payload: object): string => {
  return sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.EXPIRES_IN!,
  })
}
const setAuthCookie = (token: string) => {
  cookies().set('token', token, TOKEN_OPTIONS)
}

const validateUserCredentials = async (email: string, password: string) => {
  const user = await db.user.findUnique({ where: { email } })
  if (!user) throw new Error('Acesso negado')

  const isPasswordValid = await compare(password, user.password)
  if (!isPasswordValid) throw new Error('Acesso negado')

  return user
}

export const signin = async ({ email, password }: UserSigninInput) => {
  try {
    const user = await validateUserCredentials(email, password)

    const token = generateToken({ id: user.id })
    setAuthCookie(token)
  } catch {
    return { error: 'Acesso negado' }
  }
}
