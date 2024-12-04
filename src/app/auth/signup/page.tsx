import Link from 'next/link'
import { FormSignUp } from './_sessions/form-signup'

const Page = () => {
  return (
    <div className="space-y-4 p-4">
      <div>
        <h2 className="text-2xl font-semibold">Crie sua conta</h2>
        <p className="text-neutral-400">É GRÁTIS! Demora menos de um minuto.</p>
      </div>

      <FormSignUp />

      <div className="text-neutral-400">
        Não tem uma conta?
        <Link
          href={'/auth/signin'}
          className="ml-2 text-primary font-bold border-primary hover:border-b "
        >
          Crie uma nova conta agora.
        </Link>
      </div>
    </div>
  )
}

export default Page
