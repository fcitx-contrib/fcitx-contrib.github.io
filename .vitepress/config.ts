import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Fcitx5 macOS",
  description: "Fcitx5 ported to other platforms.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'macOS', link: '/docs' },
      { text: 'Linux', link: 'https://fcitx-im.org/wiki/Fcitx_5' },
      { text: 'Android', link: 'https://fcitx5-android.github.io' },
      { text: 'Online', link: '/online/index.html', target: '_blank' }
    ],

    sidebar: [
      {
        text: '简介',
        link: '/docs/',
      },
      {
        text: '常见问题',
        link: '/docs/faq'
      },
      {
        text: '输入法',
        items: [
          { text: '拼音/双拼', link: '/docs/im/pinyin' },
          { text: '码表', link: '/docs/im/table' },
          { text: '中州韵（Rime）', link: '/docs/im/rime' },
        ]
      },
      {
        text: '主题编辑器',
        link: '/docs/theme',
        items: [
          { text: '导入/导出', link: '/docs/theme/import' },
          { text: '调整主题', link: '/docs/theme/adjust' },
          { text: '定制 CSS', link: '/docs/theme/css' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fcitx-contrib' }
    ]
  }
})
