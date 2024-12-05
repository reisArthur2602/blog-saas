import { ComponentGenericProps } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export const Content = ({ className, children }: ComponentGenericProps) => {
  return <div className={cn(['p-6', className])}>{children}</div>
}

export const Header = ({ className, children }: ComponentGenericProps) => {
  return (
    <header
      className={cn([
        'px-6 h-16 flex items-center border-b justify-between',
        className,
      ])}
    >
      {children}
    </header>
  )
}

export const HeaderTitle = ({ className, children }: ComponentGenericProps) => {
  return (
    <h2 className={cn(['font-semibold text-muted-foreground ', className])}>
      {children}
    </h2>
  )
}
