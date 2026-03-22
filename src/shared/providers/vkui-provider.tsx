'use client'

import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui'
import type { ReactNode } from 'react'

type VkuiProviderProps = {
  children: ReactNode
}

export const VkuiProvider = ({ children }: VkuiProviderProps) => {
  return (
    <ConfigProvider colorScheme="dark">
      <AdaptivityProvider>
        <AppRoot>{children}</AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}
