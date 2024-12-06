'use server'

import { verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { db } from './prisma'
import { revalidatePath } from 'next/cache'

type Payload = {
  id: string
}

export const auth = async () => {
  const token = cookies().get('token')?.value
  if (!token) return null

  try {
    const { id } = verify(token, process.env.JWT_SECRET!) as Payload

    const session = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    })

    return session
  } catch {
    return null
  }
}

export const logout = () => {
  cookies().delete('token')
  revalidatePath('/admin')
}
