# 常见问题

## 如何切换中英文
* 菜单切换；
* 快捷键切换，默认 `Ctrl+Shift_L`，可在 `全局配置` -> `快捷键` -> `切换启用/禁用输入法` 设置。

### 我想使用 CapsLock 切换中英文
可以，但先要使用 [Karabiner-Elements](https://github.com/pqrs-org/Karabiner-Elements) 将 `CapsLock` 映射为其他组合键：
* 在 `Complex Modifications` 中 `Add your own rule`，（以 `Ctrl+Shift_R` 为例）填入
```json
{
    "description": "change CapsLock to Ctrl+Shift_R",
    "manipulators": [{
        "from": {
            "key_code": "caps_lock",
            "modifiers": {
                "mandatory": [],
                "optional": []
            }
        },
        "to": [{
            "key_code": "right_shift",
            "modifiers": ["control"]
        }],
        "type": "basic"
    }]
}
```
然后根据您的需求，
* 若要在小企鹅内部切换中英文，在 `全局配置` -> `快捷键` -> `切换启用/禁用输入法` 中录制 `CapsLock`（注意此时会显示上一步设置的快捷键，而非 `CapsLock`）；
* 若要切换小企鹅和系统的 `ABC`，需要再借助 [Input Source Pro](https://github.com/runjuu/InputSourcePro)，在 `快捷键` 中将 `ABC` 和小企鹅加入同一个切换组，并录制 `CapsLock`。

## 如何在多个输入法间切换
* 菜单切换；
* 快捷键切换，默认按住 `Ctrl` 并连续按下 `Shift_L`。

## 为什么小企鹅注册为英语输入法
* 小企鹅尽可能实现完整的输入功能，包括适配用户删掉了系统 `ABC` 的特殊情况。
* 只有英语输入法才可以在密码输入框中使用。如果注册为其他语言的输入法，系统将在密码输入框自动切换为 `ABC`，但输入完毕后不会自动切换回来，给用户造成麻烦。
* 小企鹅作为输入法框架，支持多种语言的输入法（包括 Hallelujah 英语智能输入），但没有必要对所有支持的语言注册一次。

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
原因未知。缓解方法为：退出应用程序（确认在 Dock 中应用图标下方没有白点）再重新打开，重启输入法。

## 输入法状态提示经常不在光标位置
这是应用程序的问题，有些应用程序仅在有预编辑时才向输入法报告光标位置（因此候选窗乱飞的现象很少在输入过程中出现）。

## 如何报告问题或请求新特性
* [GitHub](https://github.com/fcitx-contrib/fcitx5-macos/issues)
* [Telegram](https://t.me/fcitx5macos)
* QQ：874450150

## 如何参与项目
感谢您考虑加入开发！为了节约您的时间，请在提交 PR 前先与开发者联系讨论。
