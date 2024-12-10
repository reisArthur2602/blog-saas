'use client'

import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from 'next-themes'

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider {...props} attribute="class">
      {children}
    </NextThemesProvider>
  )
}
