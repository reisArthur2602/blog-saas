import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'


export const HeroSection = () => {
  return (
    <section
      className="flex items-center justify-center mt-20 mb-52 flex-col space-y-12 dark"
      id="hero"
    >
      <div className="space-y-8 max-w-4xl text-center">
        <h1 className="tracking-tighter text-6xl font-semibold text-secondary-foreground leading-[48px]">
          Transforme suas
          <span className="inline-block font-bold !bg-clip-text text-transparent gradient italic px-2 mx-2  transition-all cursor-pointer">
            ideias
          </span>
          em publicações profissionais.
        </h1>

        <p className="font-medium text-muted-foreground">
          Compartilhe conhecimentos, divulgue seu negócio ou construa sua
          audiência, oferecemos todas as <br /> ferramentas que você precisa
          para destacar sua voz na internet.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-[30%] mx-auto">
        <Button
          asChild
          className="gradient text-primary-foreground"
          size={'lg'}
        >
          <Link href="#plans">Ver Planos</Link>
        </Button>

        <Button
          asChild
          variant={'outline'}
          size={'lg'}
          className="border-secondary text-secondary"
        >
          <Link href="/auth/signin" className='group'>
            Começe Agora <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </Button>
      </div>

      <Image
        src="/hero.png"
        alt="banner image"
        width={1200}
        height={1200}
        quality={100}
        className="rounded-md lg:rounded-xl bg-dark/10 shadow-2xl"
      />

    </section>
  )
}
