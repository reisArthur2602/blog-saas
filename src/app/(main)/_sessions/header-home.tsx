import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import Link from 'next/link'

export const HeaderHome = () => {
  return (
    <header className="flex items-center justify-between py-6 dark">
      <Logo />
      <nav className="flex items-center gap-6">
        <Link
          className="text-muted-foreground hover:text-primary transition-all"
          href={'#hero'}
        >
          Início
        </Link>
        <Link
          className="text-muted-foreground hover:text-primary transition-all"
          href={'#features'}
        >
          Funcionalidades
        </Link>
        <Link
          className="text-muted-foreground hover:text-primary transition-all"
          href={'#plans'}
        >
          Planos
        </Link>
      </nav>
      <Button asChild className="rounded-full gradient">
        <Link href="/auth/signin">Começe Agora</Link>
      </Button>
    </header>
  )
}
