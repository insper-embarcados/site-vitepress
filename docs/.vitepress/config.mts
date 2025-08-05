import { defineConfig, type DefaultTheme } from 'vitepress'
import {defineConfig} from '@lando/vitepress-theme-default-plus/config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Computação Embarcada",
  description: "Sistemas embarcados movem o mundo",
  base: "/site-vitepress/",
  themeConfig: {
    logo: '/logo_2.png',
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
          text: 'Material de consulta',
          items: [
            { text: 'Pico 2', link: 'https://www.raspberrypi.com/products/raspberry-pi-pico-2/' },
            { text: 'RP2350', link: 'https://datasheets.raspberrypi.com/rp2350/rp2350-datasheet.pdf'},
            { text: 'SDK', link: 'https://www.raspberrypi.com/documentation/pico-sdk/index_doxygen.html' },
            { text: 'Delay', link: '/consulta/delay' },
            { text: 'GPIO', link: '/consulta/gpio' },
            { text: 'GPIO IRQ', link: '/consulta/gpio-irq' }
          ]
        }
      ],
      '/qualidade/': [
        {
          text: 'Qualidade de código',
          items: [
            { text: 'Sobre', link: '/qualidade/' },
            { text: 'Regras', link: '/qualidade/rules' },
            { text: '1 - Cppcheck', link: '/qualidade/cppcheck' },
            { text: '2 - Variáveis', link: '/qualidade/variables' },
            { text: '3 - ISR', link: '/qualidade/isr-handler' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/insper-embarcados' }
    ]
  }
})
