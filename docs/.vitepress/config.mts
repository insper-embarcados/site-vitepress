import { defineConfig, type DefaultTheme } from 'vitepress'
import {defineConfig} from '@lando/vitepress-theme-default-plus/config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Computação Embarcada",
  description: "Sistemas embarcados movem o mundo",
  base: '/docs/',
  base: "/site-vitepress/",
  themeConfig: {
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Labs', link: '/labs' },
      { text: 'Consulta', link: '/consulta/' },
      { text: 'Qualidade de código', link: '/qualidade' },
    ],
    sidebar: {
      '/labs/': [
        {
          text: 'Laboratórios',
          items: [
            { text: 'Sobre', link: '/labs/' },
            {
              items: [
                { text: 'Preparatório', link: '/labs/preparatorio' },
                { text: 'Prático', link: '/labs/pratico' },
              ]
            },
            { text: 'Lab 1 - GPIO', link: '/labs/gpio' }
          ]
        }
      ],
      '/consulta/': [
        {
          text: 'Qualidade de código',
          items: [
            { text: 'Index', link: '/qualidade/' },
            { text: 'Regras', link: '/qualidade/rules' },
            { text: '1 - Cppcheck', link: '/qualidade/cppcheck' },
            { text: '2 - Variáveis', link: '/qualidade/variables' },
            { text: '3 - ISR', link: '/qualidade/isr-handler' }
          ]
        }
      ],
      '/qualidade/': [
        {
          text: 'Qualidade de código',
          items: [
            { text: 'Index', link: '/qualidade/' },
            { text: 'Regras', link: '/qualidade/rules' },
            { text: '1 - Cppcheck', link: '/qualidade/cppcheck' },
            { text: '2 - Variáveis', link: '/qualidade/variables' },
            { text: '3 - ISR', link: '/qualidade/isr-handler' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
