'use client'

import { Blog, UserRole } from '@prisma/client'
import { createContext, useContext, useState } from 'react'

export type SessionUser = {
  id: string
  role: UserRole
  email: string
  name: string
}

type AdminContextData = {
  blogs: Blog[] | []
  user: SessionUser | null
  selectedBlog: Blog | null
  setSelectedBlog: (blog: Blog) => void
}

type AdminProviderProps = {
  children: React.ReactNode
  initialUser: SessionUser | null
  initialBlogs: Blog[] | []
}

const AdminContext = createContext({} as AdminContextData)

export const AdminProvider = ({
  children,
  initialBlogs,
  initialUser,
}: AdminProviderProps) => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  return (
    <AdminContext.Provider
      value={{
        user: initialUser,
        blogs: initialBlogs,
        selectedBlog,
        setSelectedBlog,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)
