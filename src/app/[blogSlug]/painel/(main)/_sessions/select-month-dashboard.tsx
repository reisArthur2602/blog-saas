'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useRouter, useSearchParams } from 'next/navigation'

const MONTH_OPTIONS = [
  { value: '01', label: 'Janeiro' },
  { value: '02', label: 'Fevereiro' },
  { value: '03', label: 'Março' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Maio' },
  { value: '06', label: 'Junho' },
  { value: '07', label: 'Julho' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Setembro' },
  { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' },
  { value: '12', label: 'Dezembro' },
]

export const SelectMonthDashboard = ({ blogSlug }: { blogSlug: string }) => {
  const { push } = useRouter()

  const handleMonthChange = (month: string) =>
    push(`/${blogSlug}/painel?month=${month}`)

  const searchParams = useSearchParams()
  const month = searchParams.get('month')

  return (
    <Select
      onValueChange={(month) => handleMonthChange(month)}
      defaultValue={month ?? ''}
    >
      <SelectTrigger className="w-[150px] ">
        <SelectValue placeholder="Mês" />
      </SelectTrigger>
      <SelectContent>
        {MONTH_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
