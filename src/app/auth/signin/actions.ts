'use server'

import { compare } from 'bcrypt'

import { db } from '@/lib/prisma'
import { sign } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { UserSigninInput } from '@/schemas/User'

export const signin = async (data: UserSigninInput) => {
  const user = await db.user.findUnique({
    where: { email: data.email },
  })

  if (!user) return { error: 'Acesso negado' }

  const isPasswordValid = await compare(data.password, user.password)
  if (!isPasswordValid) return { error: 'Acesso negado' }

  const decoded = { id: user.id }

  const token = sign(decoded, process.env.JWT_SECRET!, {
    expiresIn: process.env.EXPIRES_IN!,
  })

  cookies().set('token', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })

  redirect('/admin')
}
