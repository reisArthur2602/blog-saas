'use client'

import { Blog } from '@prisma/client'
import { createContext, useContext } from 'react'

type User = { id: string; role: string }

type AdminContextData = {
  blogs: Blog[] | []
  user: User | null
}
type AdminProviderProps = {
  children: React.ReactNode
  initialUser: User | null
  initialBlogs: Blog[] | []
}

const AdminContext = createContext({} as AdminContextData)

export const AdminProvider = ({
  children,
  initialBlogs,
  initialUser,
}: AdminProviderProps) => {
  return (
    <AdminContext.Provider value={{ user: initialUser, blogs: initialBlogs }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)
