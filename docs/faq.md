# 常见问题

## 将小企鹅添加到英语还是简体/繁体中文
* 如果您不想在输入密码时被系统切换为 `ABC`，或您通过特殊方式删掉了系统的 `ABC`，则在英语添加。
* 如果您想通过简单设置实现 `CapsLock` 切换 `ABC` 和小企鹅/其他中文输入法，或者您删掉了小企鹅的英语键盘，则在简体/繁体中文添加。

请不要重复添加。

## 如何切换中英文

### 如果您使用小企鹅的英语键盘
* 菜单切换；
* 快捷键切换，默认 `Ctrl+Shift_L`，可在 `全局配置` -> `快捷键` -> `切换启用/禁用输入法` 设置。

### 如果您使用系统的 ABC
* 菜单切换；
* 快捷键切换，默认 `Ctrl+space`；
* `CapsLock` 切换，见下文。

## 我想短按 CapsLock 切换中英文，长按 CapsLock 切换大小写

### 如果小企鹅添加到了简体/繁体中文
`打开键盘设置` -> `所有输入法`，开启 `使用大写锁定键切换 “ABC” 输入法`。

### 如果小企鹅添加到了英语
先要 `打开键盘设置` -> `所有输入法`，关闭 `使用大写锁定键切换 “ABC” 输入法`。

然后使用 [Karabiner-Elements](https://github.com/pqrs-org/Karabiner-Elements) 将短按 `CapsLock` 映射为其他组合键，并保留长按：
* 在 `Complex Modifications` 中 `Add your own rule`，（以 `Ctrl+Alt+slash` 为例）填入
```json
{
    "description": "Short press CapsLock → Ctrl+Alt+slash, Long press → CapsLock",
    "manipulators": [{
        "from": { "key_code": "caps_lock" },
        "parameters": { "basic.to_if_alone_timeout_milliseconds": 250 },
        "to_if_alone": [{
            "key_code": "slash",
            "modifiers": ["control", "option"]
        }],
        "to_if_held_down": [{ "key_code": "caps_lock" }],
        "type": "basic"
    }]
}
```
最后根据您的需求，
* 若要在小企鹅内部切换中英文，在 `全局配置` -> `快捷键` -> `切换启用/禁用输入法` 中录制 `CapsLock`（注意此时会显示上一步设置的快捷键，而非 `CapsLock`）；
* 若要切换小企鹅和系统的 `ABC`，需要再借助 [Input Source Pro](https://github.com/runjuu/InputSourcePro)，在 `快捷键` 中将 `ABC` 和小企鹅加入同一个切换组，并录制 `CapsLock`。

## 如何在多个输入法间切换
* 菜单切换；
* 快捷键切换，默认按住 `Ctrl` 并连续按下 `Shift_L`。

## 为什么小企鹅可以被注册为英语输入法
* 小企鹅尽可能实现完整的输入功能，包括适配用户删掉了系统 `ABC` 的特殊情况。
* 只有英语输入法才可以在密码输入框中使用。如果注册为其他语言的输入法，系统将在密码输入框自动切换为 `ABC`，但输入完毕后不会自动切换回来，给用户造成麻烦。
* 小企鹅作为输入法框架，支持多种语言的输入法（包括 Hallelujah 英语智能输入）。没有必要对所有支持的语言注册一次，但有必要提供一个中立语言供用户选择。

## 如何单独设置小企鹅的界面语言
假设系统语言是英语，希望设置小企鹅为简体中文：打开 `System Settings` -> `General` -> `Language & Region`，在 `Applications` 中点击 `+`，滚动 `Application` 下拉菜单到最底部并点击 `Other...`，导航至系统根目录（`Macintosh HD`），进入 `Library/Input Methods`，选择 `Fcitx5`。

## 如何切换繁简

### 拼音/码表
* 菜单切换；
* 快捷键切换，默认 `Ctrl+Shift+F`，可在 `高级` -> `繁简转换` 中设置。

### 中州韵
* 菜单切换；
* 方案选单切换，默认 `F4` 或 `Ctrl+grave` 调出；
* 快捷键切换，见方案配置。

## 如何为不同应用指定输入法
`高级` -> `macOS Frontend` -> `应用默认输入法`。

## 如何在切换应用时保留前一个应用的输入法
首先确定没有为新应用设置默认的输入法，然后在 `全局配置` -> `行为` 中设置 `共享输入状态` 为 `所有`。
对于中州韵，它的 `共享输入状态` 设置优先于全局。 

## 如何导入原生自定义短语

### 拼音
`输入法` -> `拼音` -> `管理自定义词组` -> `导入原生自定义短语`。

### 中州韵
执行上述操作（需要安装 `chinese-addons` 插件）后，`在编辑器打开`，将内容复制给您的 Rime 方案识别的文件（如朙月拼音的 `custom_phrase.txt`）并调整为正确格式。

## 如何启用笔画筛选

### 拼音
默认为 `grave`（数字1左侧），可在 `输入法` -> `拼音` -> `按笔画过滤` 设置。
进入笔画过滤模式后，按 `h` `s` `p` `n` `z` （横竖撇捺折）即可过滤首字的笔顺。

### 中州韵
请咨询方案作者。

## 如何启用剪贴板
`高级` -> `macOS Frontend` -> `监视剪贴板`。

## 候选窗中有些字不显示
系统字体不支持全字集。可以安装[遍黑体](https://github.com/Fitzgerald-Porthmouth-Koenigsegg/Plangothic_Project/releases)：
1. 解压 `Plangothic-OTF-*.7z`；
2. 把 `PlangothicP1-Regular.otf` 和 `PlangothicP2-Regular.otf` 放入用户字体目录 `~/Library/Fonts`（此目录也可以在 `主题编辑器` -> `字体` 中打开）；
3. 重启输入法。

## 如何切换主题
1. 从[中央仓库](https://github.com/fcitx-contrib/fcitx5-theme-collection/tree/master/theme)或其他渠道获取主题文件；
2. `主题编辑器` -> `基础` -> `选择/导入主题`。

## 如何更新
* `关于 Fcitx5 macOS`，会同时更新主程和所有插件；
* 若主程已是最新，可在 `插件管理器` 单独更新插件。

## 如何卸载
`关于 Fcitx5 macOS`。

## 如何备份/恢复
1. `高级` -> `数据管理`，向 `小企鹅 Android/macOS 版` 导出数据；
2. 从 `小企鹅 macOS 版` 导入数据。

## 如何查看日志
日志文件位于 `/tmp/Fcitx5.log`。

## 全屏应用不显示候选窗
首次安装小企鹅需要注销并重新登录（或者重启）。后续升级时无需注销。

## 输入法状态提示经常不在光标位置
这是应用程序的问题，有些应用程序仅在有预编辑时才向输入法报告光标位置（因此候选窗乱飞的现象很少在输入过程中出现）。

## 如何报告问题或请求新特性
* [GitHub](https://github.com/fcitx-contrib/fcitx5-macos/issues)
* [Telegram](https://t.me/fcitx5macos)
* QQ：874450150

## 如何参与项目
感谢您考虑加入开发！为了节约您的时间，请在提交 PR 前先与开发者联系讨论。
