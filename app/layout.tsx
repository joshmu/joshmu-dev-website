import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.scss'
import '@/styles/cursor.scss'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Josh Mu - Developer Portfolio Website',
  description: 'The official portfolio website for web developer Josh Mu',
  keywords: 'josh mu, web dev, developer, coding, code, javascript, tech, dance, yoga, art, official',
  metadataBase: new URL('https://joshmu.dev'),
  openGraph: {
    title: 'Josh Mu - Developer Portfolio Website',
    description: 'The official portfolio website for web developer Josh Mu',
    url: 'https://joshmu.dev',
    siteName: 'Josh Mu Portfolio',
    images: [
      {
        url: 'https://joshmu.dev/assets/avatar.jpg',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Josh Mu - Developer Portfolio Website',
    description: 'The official portfolio website for web developer Josh Mu',
    images: ['https://joshmu.dev/assets/avatar.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' }
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" itemScope itemType="http://schema.org/WebPage">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}