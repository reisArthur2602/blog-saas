import { Logo } from '@/components/ui/logo'
import { PropsWithChildren } from 'react'

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen grid lg:grid-cols-[1fr_800px]">
      <div className="hidden lg:flex bg-custom-gradient items-center justify-center flex-col gap-6 text-white font-medium text-center">
        <div>
          <div className="text-7xl font-bold">Bem-vindo ao</div>
          <div className="text-7xl font-bold">Blogora!👋</div>
        </div>

        <div className="text-xl text-left">Dê voz aos seus pensamentos.</div>
      </div>

      <div className="flex items-center justify-center flex-col">
        <div className="mb-20">
          <Logo />
        </div>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
