// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    weatherApiKey: ''
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxtjs/color-mode',
    'dayjs-nuxt'
  ],
  colorMode: {
    preference: 'aqua',
    fallback: 'system',
    dataValue: 'theme',
    classSuffix: ''
  },
  typescript: {
    tsConfig: {
      include: [
        './../types/*.d.ts'
      ]
    }
  }
})
