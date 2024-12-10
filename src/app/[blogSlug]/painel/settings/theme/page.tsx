import { ThemeForm } from './_sessions/theme-form'

const Page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-xl">Gerenciar Publicações</h3>
        <p className="text-muted-foreground text-sm">
          Gerencie as publicações do blog
        </p>
      </div>

      <ThemeForm />
    </div>
  )
}

export default Page
