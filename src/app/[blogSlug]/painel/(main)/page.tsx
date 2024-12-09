import { Header, HeaderTitle } from '@/components/ui/header'
import { SelectMonthDashboard } from './_sessions/select-month-dashboard'
import { redirect } from 'next/navigation'
import { isMatch, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { getDashboardData } from './actions'
import { SummaryCard } from './_sessions/summary-card'
import { Pen, User2, Users2 } from 'lucide-react'
import { auth } from '@/lib/auth'

type Props = {
  params: { blogSlug: string }
  searchParams: {
    month: string
  }
}

const Page = async ({
  params: { blogSlug },
  searchParams: { month },
}: Props) => {
  const monthIsInvalid = !month || !isMatch(month, 'MM')

  if (monthIsInvalid)
    redirect(`/${blogSlug}/painel?month=${new Date().getMonth() + 1}`)

  const currentDateFormated = format(
    new Date(),
    "EEEE, d 'de' MMMM 'de' yyyy",
    { locale: ptBR },
  )
  const currentUser = await auth()

  const {
    totalPostsCurrentBlogByMonth,
    totalPostsMadebyMeCurrentBlogByMonth,
    totalUsersCurrentBlog,
  } = await getDashboardData({
    month,
    blogSlug,
    userId: currentUser!.id,
  })

  return (
    <div>
      <Header>
        <HeaderTitle>Dashboard</HeaderTitle>
        <SelectMonthDashboard blogSlug={blogSlug} />
      </Header>

      <div className="space-y-6 p-6">
        <div>
          <h3 className="font-semibold text-xl capitalize">
            Olá👋,{currentUser?.name}
          </h3>
          <p className="text-muted-foreground text-sm">{currentDateFormated}</p>
        </div>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SummaryCard
            title="Usuarios cadastrados"
            count={totalUsersCurrentBlog}
            icon={<Users2 />}
          />
          <SummaryCard
            title="Posts feitos por mim"
            count={totalPostsMadebyMeCurrentBlogByMonth}
            icon={<User2 />}
          />
          <SummaryCard
            title="Total de publicações"
            count={totalPostsCurrentBlogByMonth}
            icon={<Pen />}
          />
        </section>
      </div>
    </div>
  )
}

export default Page
