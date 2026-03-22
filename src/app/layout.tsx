import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import type { ReactNode } from 'react'
import { VkuiProvider } from '@/shared/providers/vkui-provider'
import '@vkontakte/vkui/dist/cssm/styles/themes.css'
import '@/shared/styles'

const fontManrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'VK Movies',
  description: 'Каталог фильмов на Next.js',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body className={fontManrope.variable}>
        <VkuiProvider>{children}</VkuiProvider>
      </body>
    </html>
  )
}
