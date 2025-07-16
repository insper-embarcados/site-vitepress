import { defineConfig, type DefaultTheme } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Computação Embarcada",
  description: "Sistemas embarcados movem o mundo",
  base: '/docs/',
  themeConfig: {
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Labs', link: '/labs' },
      { text: 'Material', link: '/material' },
    ],
    sidebar: {
      '/labs/': [
        {
          text: 'Labs',
          items: [
            { text: 'Index', link: '/labs/' },
            { text: 'Preparatório', link: '/labs/preparatorio' },
            { text: 'Prático', link: '/labs/pratico' }
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
