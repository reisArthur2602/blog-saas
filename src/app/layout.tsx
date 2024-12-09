import type { Metadata } from 'next'

import './globals.css'
import { ThemeProvider } from '@/providers/theme'

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
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
