import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

type CardDataProps = {
  title: string
  count: number
  icon: React.ReactNode
}

export const SummaryCard = ({ count, title, icon }: CardDataProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium capitalize">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
      </CardContent>
    </Card>
  )
}
