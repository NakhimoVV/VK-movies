import type { NextConfig } from "next";

const sassOptions = {
  additionalData: `
    @use "@/shared/styles/helpers/media" as *;
    @use "@/shared/styles/helpers/mixins" as *;
  `,
}

const nextConfig: NextConfig = {
  sassOptions: {
    ...sassOptions,
  },
  // Включаем транспиляцию
  transpilePackages: ['@vkontakte/vkui'],

  // Трансформируем импорты
  modularizeImports: {
    '@vkontakte/vkui': {
      transform: '@vkontakte/vkui/dist/cssm',
      skipDefaultConversion: true,
    },
  },
  reactCompiler: true,
};

export default nextConfig;
