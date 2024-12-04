import Link from 'next/link'
import { FormSignin } from './_sessions/form-signin'

const Page = () => {
  return (
    <div className="space-y-4 p-4 max-w-[25rem] w-full">
      <div>
        <h2 className="text-2xl font-semibold">Bem-vindo de volta!</h2>
        <p className="text-neutral-400">
          Preencha o formulário para acessar sua conta
        </p>
      </div>

      <FormSignin />

      <div className="text-neutral-400 text-sm text-center">
        Não tem uma conta?
        <Link
          href={'/auth/signup'}
          className="ml-2 text-primary font-bold border-primary hover:border-b "
        >
          Crie uma nova conta agora.
        </Link>
      </div>
    </div>
  )
}

export default Page
