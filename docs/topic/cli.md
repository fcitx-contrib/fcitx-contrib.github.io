# 命令行工具

## fcitx5-remote
位于 `/Library/Input Methods/Fcitx5.app/Contents/bin/fcitx5-remote`。

实现了 Linux 原版 fcitx5-remote 的一个子集，可用于 Vim 自动切换中英文。

`fcitx5-remote -h` 查看用法。

一个使用 Vim 插件 [fcitx.vim](https://github.com/lilydjwg/fcitx.vim) 的例子：

1. 在 `~/.vim/pack/plugins/start` clone fcitx.vim；
2. 在 `~/.vimrc` 添加

```vim
let g:fcitx5_remote = '"/Library/Input Methods/Fcitx5.app/Contents/bin/fcitx5-remote"'
set ttimeoutlen=100
```

3. 启动 Vim，在插入模式下切换到中文；
4. `Esc` 进入普通模式时自动切换到英文，重新进入插入模式时自动切换到中文。
