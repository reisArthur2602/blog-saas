import { ThemeForm } from './_sessions/theme-form'

const Page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-xl">Selecione o Tema</h3>
        <p className="text-muted-foreground text-sm">Altere o tema do blog</p>
      </div>

      <ThemeForm />
    </div>
  )
}

export default Page
