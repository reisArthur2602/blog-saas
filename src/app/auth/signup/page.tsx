import Link from 'next/link'
import { FormSignUp } from './_sessions/form-signup'

const Page = () => {
  return (
    <div className="space-y-4 p-4 max-w-[25rem] w-full">
      <div>
        <h2 className="text-2xl font-semibold">Crie sua conta</h2>
        <p className="text-muted-foreground ">
          É GRÁTIS! Demora menos de um minuto.
        </p>
      </div>

      <FormSignUp />

      <div className="text-muted-foreground  text-sm text-center">
        Já tem uma conta?
        <Link
          href={'/auth/signin'}
          className="ml-2 text-primary font-bold border-primary hover:border-b text-sm"
        >
          Faça login agora.
        </Link>
      </div>
    </div>
  )
}

export default Page
