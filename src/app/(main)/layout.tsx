import { PropsWithChildren } from 'react'
import { HeaderHome } from './_sessions/header-home'
import { FooterHome } from './_sessions/footer-home'

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen overflow-y-auto scrollbar-hidden bg-gradient">
      <main className="mx-auto max-w-6xl">
        <HeaderHome />
        {children}
        <FooterHome />
      </main>
    </div>
  )
}

export default HomeLayout
