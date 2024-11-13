# 中州韵（Rime）

## 目录

Rime 的用户目录位于 `~/.local/share/fcitx5/rime`，与 Linux 上的 [fcitx5-rime](https://github.com/fcitx/fcitx5-rime) 保持一致。

Rime 的共享目录位于 `~/Library/fcitx5/share/rime-data`。您不应该更改此目录（或任何 `~/Library/fcitx5` 下）的内容。

::: warning
请勿将用户目录设置为指向鼠须管用户目录 `~/Library/Rime` 的符号链接，或让鼠须管反向链接至此。
因为LevelDB不支持并发访问，强行共享会破坏您的用户词库。
:::


您可以使用共享目录中的[朙月拼音](https://github.com/rime/rime-luna-pinyin)和[五笔画](https://github.com/rime/rime-stroke)方案，但 Rime 用户通常会导入自定义方案到用户目录。

一个方案至少会包括 `方案名.schema.yaml` 和 `字典名.dict.yaml`，schema 中需要引用 dict。

为了启用该方案，您至少需要在 `default.custom.yaml` 中写入
```yaml
patch:
  schema_list:
    - schema: 方案名
```
或者用一个完整的 `default.yaml` 覆盖共享目录的同名文件。

## 设置

### 预编辑模式
控制应用程序内的预编辑显示什么。

示例：当您输入 `y` `u` 时，
* 不显示：`yu` 位于候选窗内，占据一行；
* 编辑中文本：`yu` 位于应用程序中；
* 提交预览：假设首选为 `与` ，则 `与` 也出现在应用程序中。

### 共享输入状态
是否将当前程序的输入状态带到下一个程序。

示例：假设您在 Firefox 中正在使用简体，然后启动了 Telegram，并切换到繁体。再回到 Firefox 时，
* `全部`：Firefox 中会使用和 Telegram 相同的繁体；
* `程序` 或 `否`：Firefox 中会记住上次使用的简体。

### 将嵌入式预编辑文本的光标固定在开头
当您在 `主题编辑器` 中启用 `跟随光标` 时，您可能需要启用此选项避免候选窗频繁移动。

### 切换输入法时的行为
当您通过 `Ctrl+Shift_L` 或 `Shift_L` 从 Rime 切换到英文键盘时，如何处理当前输入。

示例：当您输入 `c` `d` 后按 `Shift_L`，
* `清空`：不上屏任何字符；
* `提交原始字符串`：上屏 `cd`；
* `提交编辑中文本`：上屏 `c d`；
* `提交预览`：假设首选为 `程度`，则上屏 `程度`。

如果您在 `全局配置` -> `快捷键` -> `临时在当前和第一个输入法之间切换` 中删除了 `Shift_L`，则该按键将由 Rime 处理，默认行为是切换至 Rime 内部的英文模式。

### 用户数据目录
点击将使用 Finder 打开 Rime 用户目录。

### 重新部署
可设置部署快捷键。默认为和鼠须管一致的 `Ctrl+Option+grave`。

### 同步
可设置同步快捷键。

小企鹅默认每 30 分钟自动同步，可在 `全局配置` -> `行为` -> `保存用户数据的时间间隔` 更改时长或设置为 0 以禁用。

## 云拼音

您需要按照 [librime-cloud](https://github.com/hchunhui/librime-cloud) 的文档自行启用。

::: warning
对于下载的 `simplehttp.so` 您需要执行 `xattr -dr com.apple.quarantine simplehttp.so` 以解锁，否则可能会导致死机。本地编译则无须解锁。
:::

::: info
由于该插件工作在 librime 中，受限于单线程同步架构，在网络请求返回前候选窗不会更新。
为了缓解卡顿，该插件默认需要 `Ctrl+T` 主动查询，且设置了0.5秒的超时时间。

您可以使用小企鹅拼音的多线程异步云拼音解决上述问题。
:::

## 东风破

当您使用 [plum](https://github.com/rime/plum) 管理输入方案时，请指定 `rime_frontend=fcitx5-rime` 或 `rime_dir=~/.local/share/fcitx5/rime`。

## 并击

并击方案依赖按键释放事件，但是 macOS 并不会通知输入法这一事件。
为此小企鹅实现了模拟按键释放，您需要在 `高级` -> `macOS Frontend` 中启用 `模拟按键释放`。

## 命令行接口

::: warning
若在 lua 脚本中执行命令，需要在末尾加上 `&` 放至后台执行，否则会导致主线程死锁。
:::

### 部署
```sh
/Library/Input\ Methods/Fcitx5.app/Contents/bin/fcitx5-curl /config/addon/rime/deploy -X POST -d '{}'
```

### 同步
```sh
/Library/Input\ Methods/Fcitx5.app/Contents/bin/fcitx5-curl /config/addon/rime/sync -X POST -d '{}'
```

## 常见问题
### 为什么总是进入 A 模式出不来，`Shift_L` 会在 en 和 A 之间反复切换
很可能是在 Rime 的中文状态下误触了 `Shift_R`，在 A 模式下再敲一次 `Shift_R` 即可恢复。
`Shift_R` 的切换行为是 Rime 默认提供的（请查阅共享目录的 `default.yaml`）。
若要禁用，请在用户目录的 `default.custom.yaml` 中打 patch，例如

```yaml
patch:
  ascii_composer:
    good_old_caps_lock: true
    switch_key:
      Shift_L: inline_ascii
      # Shift_R: commit_text
      Control_L: noop
      Control_R: noop
      Caps_Lock: clear
      Eisu_toggle: clear
```

## 友情链接
感谢以下方案对小企鹅 macOS 版的认可。
我们将继续加强与 Rime 社区的合作，为定制用户提供更好的输入体验。
* [声笔系列码](https://github.com/sbsrf/sbsrf)（首个声明支持小企鹅 macOS 版的方案）
* [魔然](https://github.com/ksqsf/rime-moran)（由小企鹅 macOS 版作者之一开发）
* [雾凇拼音](https://github.com/iDvel/rime-ice)（Rime 简体拼音的事实标准）
* [星猫键道](https://github.com/hugh7007/xmjd6-rere)
* [飞鹤快拼](https://github.com/boomker/rime-fast-xhup)
* [墨奇音形](https://github.com/gaboolic/rime-shuangpin-fuzhuma)（双拼辅助码） [白霜拼音](https://github.com/gaboolic/rime-frost)（词频智能的全拼词库）
* [oh-my-rime](https://github.com/Mintimate/oh-my-rime)（快速初始化 Rime 的模板方案，支持拼音和五笔）
