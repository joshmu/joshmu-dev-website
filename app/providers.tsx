'use client'

import { AnimatePresence } from 'framer-motion'
import { GlobalProvider } from '@/context/globalContext'
import { ThemeProvider } from '@/context/themeContext'
import { Cursor, CursorProvider } from '@/components/Cursor/Cursor'
import { ScrollToTop } from './scroll-to-top'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GlobalProvider>
      <ThemeProvider>
        <CursorProvider>
          <ScrollToTop />
          <AnimatePresence mode="wait">
            <>
              <Cursor />
              {children}
            </>
          </AnimatePresence>
        </CursorProvider>
      </ThemeProvider>
    </GlobalProvider>
  )
}