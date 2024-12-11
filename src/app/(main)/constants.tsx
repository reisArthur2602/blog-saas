import { ChartBar, File, Lock, Palette, Users2, Zap } from 'lucide-react'

export const FEATURES_ITEMS = [
  {
    title: 'Criação de Conteúdo',
    description:
      'Edite e publique com facilidade através da nossa plataforma intuitiva e moderna.',
    icon: <File className="text-primary size-8 mb-2" />,
  },
  {
    title: 'Gestão de Equipe',
    description:
      'Defina permissões aos usuários do painel do blog e trabalhe de forma colaborativa.',
    icon: <Users2 className="text-primary size-8 mb-2" />,
  },
  {
    title: 'Dashboard Interativo',
    description:
      'Acompanhe as análises completas do seu blog com métricas claras e acessíveis.',
    icon: <ChartBar className="text-primary size-8 mb-2" />,
  },
  {
    title: 'Criação de Blog com IA',
    description:
      'Construa blogs de forma mais rápida e inteligente com o auxílio da inteligência artificial.',
    icon: <Zap className="text-primary size-8 mb-2" />,
  },
  {
    title: 'Personalização do Blog',
    description:
      'Deixe o blog com a sua cara! Ajuste cores, estilos e detalhes para refletir sua identidade.',
    icon: <Palette className="text-primary size-8 mb-2" />,
  },
  {
    title: 'Autenticação',
    description:
      'Faça login usando sua conta do Google ou seu e-mail de forma rápida e segura.',
    icon: <Lock className="text-primary size-8 mb-2" />,
  },
]

export const PLANS_ITEMS = [
  {
    name: 'Plano Básico',
    info: 'Ideal para quem está começando',
    price: 0,
    features: [
      {
        text: 'Criação de 1 blog',
      },
      {
        text: 'Personalização básica',
      },
      {
        text: 'Limite de usuários no blog',
      },
    ],
    btn: {
      text: 'Comece Gratuitamente',
      href: '/auth/signup',
    },
  },
  {
    name: 'Plano Avançado',
    info: 'Para blogueiros dedicados',
    price: 19.99,
    features: [
      {
        text: 'Personalização completa do blog',
      },
      {
        text: 'Ferramenta de IA para criação de blogs',
      },
      {
        text: 'Criação de blogs ilimitada',
      },
    ],
    btn: {
      text: 'Assine Agora',
      href: '/auth/signin',
    },
  },
]

export type Plans = (typeof PLANS_ITEMS)[0]
