import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/providers/theme'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = { title: 'Blog' }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster expand />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
