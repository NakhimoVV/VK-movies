'use client'

import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui'

type VkuiProviderProps = {
  children: React.ReactNode
}

export function VkuiProvider({ children }: VkuiProviderProps) {
  return (
    <ConfigProvider appearance="light">
      <AdaptivityProvider>
        <AppRoot>{children}</AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}
