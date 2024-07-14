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
      { text: 'Android', link: 'https://fcitx5-android.github.io' }
    ],

    sidebar: [
      {
        text: '简介',
        link: '/docs/',
      },
      {
        text: '输入法',
        items: [
          { text: '拼音/双拼', link: '/docs/im/pinyin' },
          { text: '码表', link: '/docs/im/table' },
          { text: '中州韵（Rime）', link: '/docs/im/rime' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fcitx-contrib' }
    ]
  }
})
