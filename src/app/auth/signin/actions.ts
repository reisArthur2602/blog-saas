'use server'

import { compare } from 'bcrypt'
import { UserSignin } from './_sessions/form-signin'
import { db } from '@/lib/prisma'
import { sign } from 'jsonwebtoken'
import { cookies } from 'next/headers'

export const signin = async (data: UserSignin) => {
  const user = await db.user.findUnique({
    where: { email: data.email },
  })

  if (!user) throw new Error('Email e/ou Senha incorreto(a)')

  const isPasswordValid = await compare(data.password, user.password)

  if (!isPasswordValid) throw new Error('Email e/ou Senha incorreto(a)')

  const token = sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.EXPIRES_IN },
  )

  cookies().set('token', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })
}
