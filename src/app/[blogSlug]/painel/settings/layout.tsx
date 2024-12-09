import { Header, HeaderTitle } from '@/components/ui/header'
import { SettingsSidebar } from './_sessions/settings-sidebar'

type Props = {
  children: React.ReactNode
  params: { blogSlug: string }
}

const SettingsLayout = ({ children, params: { blogSlug } }: Props) => {
  return (
    <>
      <Header>
        <HeaderTitle>Configurações</HeaderTitle>
      </Header>
      <div className="grid grid-cols-[20rem_1fr] h-full">
        <SettingsSidebar blogSlug={blogSlug} />
        <section className="p-4">{children}</section>
      </div>
    </>
  )
}

export default SettingsLayout
