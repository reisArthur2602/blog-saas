import { Header, HeaderTitle } from '@/components/ui/header'
import { SelectMonthDashboard } from './_sessions/select-month-dashboard'
import { redirect } from 'next/navigation'
import { isMatch } from 'date-fns'
import { getDashboardData } from './actions'

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

  const { totalPostsCurrentBlogByMonth } = await getDashboardData({
    month,
    blogSlug,
  })

  console.log(totalPostsCurrentBlogByMonth)

  return (
    <div>
      <Header>
        <HeaderTitle>Dashboard</HeaderTitle>
        <SelectMonthDashboard blogSlug={blogSlug} />
      </Header>
    </div>
  )
}

export default Page
