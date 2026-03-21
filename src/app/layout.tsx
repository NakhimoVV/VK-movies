import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import '@vkontakte/vkui/dist/vkui.css'
import { VkuiProvider } from '@/shared/providers/vkui-provider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'VK Movies',
  description: 'Каталог фильмов на Next.js и VKUI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={geistSans.variable}>
      <body>
        <VkuiProvider>{children}</VkuiProvider>
      </body>
    </html>
  )
}
