# 定制 CSS

如果主题编辑器提供的定制功能不能满足您的需求，您可以编写 CSS 实现精细控制。

::: warning
请勿修改卷轴的尺寸，否则卷轴模式可能无法按预期工作。
:::

小企鹅定义的所有 id 和 class 都带有 `fcitx-` 前缀，您编写的 CSS 规则可以引用它们。
如果您想通过 JavaScript 为元素添加自定义的 id 和 class，请避开此前缀。

多数 class 是固定的（表示结构），少数 class 由小企鹅在运行时动态设置（表示状态）。后文将使用 * 声明一个 class 是动态设置的。

您可以结合候选窗网页的[源代码](https://github.com/fcitx-contrib/fcitx5-webview)研究探索。
该项目提供了一个可以本地运行调试的 Web App。

您可以在 `主题编辑器` -> `高级` 中指定快捷键复制当前的 HTML。

## 外层结构
```html
<body>
  <div id="fcitx-theme" class="fcitx-macos fcitx-basic fcitx-blue fcitx-dark">
    <div class="fcitx-decoration">
      <div class="fcitx-panel-topleft"></div>
      <div class="fcitx-panel-top"></div>
      <div class="fcitx-panel-topright"></div>
      <div class="fcitx-panel-left"></div>
      <div class="fcitx-panel-center">
        <div class="fcitx-panel"></div>
      </div>
      <div class="fcitx-panel-right"></div>
      <div class="fcitx-panel-bottomleft"></div>
      <div class="fcitx-panel-bottom"></div>
      <div class="fcitx-panel-bottomright"></div>
    </div>
    <div class="fcitx-contextmenu">
      <div class="fcitx-menu-item">置顶</div>
      <div class="fcitx-menu-item">删词</div>
    </div>
  </div>
</body>
```
`body` 背景透明，使得内部的面板元素可以自行决定透明/模糊。

`fcitx-theme` 的各个 class 控制候选窗的主题。

`fcitx-macos`* 声明当前候选窗默认使用 macOS 的主题，该主题定义于 [macos.scss](https://github.com/fcitx-contrib/fcitx5-webview/blob/master/page/macos.scss)。
在 Webview 候选窗实现跨平台之前，该 class 将固定出现。

`fcitx-basic` 是供主题编辑器的定制规则覆盖默认规则的。定制规则由 [customize.ts](https://github.com/fcitx-contrib/fcitx5-webview/blob/master/page/customize.ts) 实现。

`fcitx-blue`* 表示系统当前的强调色是蓝色。在 macOS 中，可能的值有 `graphite` `red` `orange` `yellow` `green` `blue` `purple` `pink`。

`fcitx-dark`* 表示当前主题为深色，相应地 `fcitx-light` 表示浅色。仅当您在 `主题编辑器` -> `基础` -> `主题` 中选择 `System` 时，它才反映系统的主题。

`fcitx-decoration` 是 `topleft,top,topright` `left,center,right` `bottomleft,bottom,bottomright` 这 9 个元素的父元素，而这些子元素的主要作用是为异形窗口贴图。它相对父元素 `fcitx-theme` 有 (25px, 25px) 的偏移，目的是留出足够的空间给 `fcitx-panel` 显示阴影。

`fcitx-panel` 是候选词面板，它的结构在下一节介绍。

`fcitx-contextmenu` 是候选词的右键菜单，它拥有 `position: absolute` 以出现在鼠标点击位置。每个 `fcitx-menu-item` 子元素代表一个当前候选词支持的动作。

## 面板结构
```html
<div class="fcitx-panel fcitx-horizontal-tb">
  <div class="fcitx-panel-blur fcitx-blur">
    <div class="fcitx-header">
      <div class="fcitx-aux-up fcitx-hidden">拼</div>
      <div class="fcitx-preedit fcitx-hidden"></div>
    </div>
    <div class="fcitx-aux-down fcitx-hidden"></div>
    <div class="fcitx-hoverables fcitx-horizontal fcitx-horizontal-scroll fcitx-mousemoved">
      <div class="fcitx-candidate fcitx-hoverable"></div>
      <div class="fcitx-divider"></div>
      <div class="fcitx-candidate fcitx-hoverable"></div>
      <div class="fcitx-divider fcitx-divider-paging"></div>
      <div class="fcitx-paging"></div>
    </div>
  </div>
</div>
```
`fcitx-horizontal-tb`* 表示候选窗的书写模式是按行从上到下，其他可能的值有 `fcitx-vertical-rl` 和 `fcitx-vertical-lr`。

`fcitx-panel-blur` 的作用是为面板提供（可选的）毛玻璃效果。仅适用于小企鹅在线版（小企鹅 macOS 版的背景模糊不由 CSS 控制）。

`fcitx-blur`* 拥有 `backdrop-filter: blur(16px)`（半径可在 `主题编辑器` -> `背景` 调节）。仅适用于小企鹅在线版。

`fcitx-header` 是面板头部，它的子元素 `fcitx-aux-up` 和 `fcitx-preedit` 同一时刻至多一个处于显示状态。

`fcitx-hidden`* 用于隐藏元素。

`fcitx-preedit` 是面板内预编辑区（与应用内的预编辑相对），它的结构在后文介绍。

`fcitx-aux-up` 用于主要的提示信息，例如切换输入法时提示用户当前的输入法。

`fcitx-aux-down` 用于次要的提示信息，例如 `Ctrl+semicolon` 调出剪贴板时提示用户剪贴板为空。

`fcitx-hoverables` 是候选词、分隔线和翻页按钮的容器。

`fcitx-horizontal`* 表示候选词和翻页按钮水平排列，相应地 `fcitx-vertical` 表示垂直排列。它们和 `fcitx-horizontal-tb` 等书写模式可以产生 6 种组合，在 `主题编辑器` -> `版式` 中设置。

* `fcitx-horizontal-scroll`* 表示当前处于卷轴模式，仅在 `fcitx-horizontal-tb` 和 `fcitx-horizontal` 的组合下可能出现。

* `fcitx-mousemoved`* 表示本次界面更新后用户移动了鼠标。它的意义是：鼠标未移动时不应算作悬浮于候选词上，从而改变高亮。

`fcitx-hoverable` 表示其内部的 `fcitx-hoverable-inner` 元素可以在鼠标悬浮时产生高亮效果，用于候选词和翻页按钮。

`fcitx-candidate` 是候选词的容器，它的结构在后文介绍。

`fcitx-divider` 是分隔线的容器，它隔开各个 `fcitx-hoverable`。它的结构在后文介绍。

## 预编辑结构
```html
<div class="fcitx-preedit">
  <div class="fcitx-pre-caret">预bian</div>
  <div class="fcitx-caret fcitx-no-text"></div>
  <div class="fcitx-post-caret">ji</div>
</div>
```
`fcitx-pre-caret` 是光标前的预编辑文字。

`fcitx-caret` 是光标。

`fcitx-no-text`* 表示非文字形式。当它与 `fcitx-caret` 结合时，光标是一个（闪烁或静止的）竖条，否则光标是文字形式，如 `‸`。

`fcitx-post-caret` 是光标后的预编辑文字。

## 候选词结构
```html
<div class="fcitx-candidate fcitx-candidate-first fcitx-highlighted fcitx-highlighted-original fcitx-hoverable">
  <div class="fcitx-candidate-inner fcitx-hoverable-inner">
    <div class="fcitx-mark fcitx-no-text"></div>
    <div class="fcitx-label">1</div>
    <div class="fcitx-text">首选词</div>
    <div class="fcitx-comment">注释</div>
  </div>
</div>
```
`fcitx-candidate-first` 表示常规模式（与卷轴模式相对）下当前页的第一个候选词，相应地 `fcitx-candidate-last` 表示最后一个候选词。

`fcitx-highlighted`* 表示高亮状态。

`fcitx-highlighted-original`* 表示当前页初始高亮状态，因为鼠标悬浮在其他候选词时高亮可以移动（取决于设置的高亮行为），而鼠标离开面板时高亮应恢复初始位置。

`fcitx-candidate-inner` 是候选词内层。区分内外的主要原因是高亮和面板边缘之间可以有空隙（外边距）。

`fcitx-hoverable-inner` 是鼠标可悬浮元素的内层，用来统一候选词和翻页按钮的样式。

`fcitx-mark` 是高亮标记。在垂直排列或卷轴模式下，所有候选词都会包含这一元素，以避免高亮移动时候选词位置偏移；水平排列下仅高亮的候选词包含。与 `fcitx-no-text` 结合时，高亮标记为圆角竖条色块，否则为文字（通常是一个 emoji）。

`fcitx-label` 是候选词序号，仅当序号存在时才绘制这一元素。无论面板的书写模式如何，序号是一律正放的。

`fcitx-text` 是候选词文字。

`fcitx-comment` 是候选词注释，仅当注释存在时才绘制这一元素。

## 分隔线结构
```html
<div class="fcitx-divider">
  <div class="fcitx-divider-side"></div>
  <div class="fcitx-divider-middle"></div>
  <div class="fcitx-divider-side"></div>
</div>
```
* 在水平排列下，候选词间的分隔线隐藏，候选词和翻页按钮之间的垂直分隔线显示。
* 在垂直排列下，候选词间的分隔线若宽度为 0，则相邻的 `fcitx-candidate-inner` 相距 1 个外边距；若宽度大于 0，则相距 2 个外边距 + 宽度。`fcitx-divider-side` 隐藏，且长度等于外边距，使 `fcitx-divider-middle` 的长度等于 `fcitx-candidate-inner`。
* 在卷轴模式下，没有翻页按钮，分隔线和面板同色，用来填充候选词间的空隙（因为卷轴的宽度是固定的，不像水平排列下宽度由候选词控制而没有空隙）。

## 翻页按钮结构
当 `fcitx-paging` 伴随 `fcitx-arrow` 或 `fcitx-triangle` 时，将展示两个翻页按钮。

```html
<div class="fcitx-paging fcitx-arrow">
  <div class="fcitx-prev fcitx-hoverable">
    <div class="fcitx-paging-inner">
      <svg></svg>
    </div>
  </div>
  <div class="fcitx-next fcitx-hoverable">
    <div class="fcitx-paging-inner fcitx-hoverable-inner">
      <svg></svg>
    </div>
  </div>
</div>
```
`fcitx-arrow`* 表示内部的 svg （及其排列方式）是苹果风格的箭头，相应地 `fcitx-triangle` 表示微软风格的三角形。

`fcitx-prev` 是上一页，`fcitx-next` 是下一页。

`fcitx-paging-inner` 和 `fcitx-candidate-inner` 作用类似，与 `fcitx-hoverable-inner` 结合时该按钮可被点击（即当前页有上一页/下一页）。

当 `fcitx-paging` 伴随 `fcitx-scroll` 时，将展示一个卷轴展开按钮。

```html
<div class="fcitx-paging fcitx-scroll fcitx-hoverable">
  <div class="fcitx-expand fcitx-paging-inner fcitx-hoverable-inner">
    <svg></svg>
  </div>
</div>
```
`fcitx-scroll`* 表示内部的 svg 是可以展开卷轴的下箭头。注意当前处于普通模式，仅在展开后才会进入卷轴模式。

## 图片
CSS 引用图片（`background-img: url(...)`）有三种方式：
* HTTP
* base64
* 本地相对路径

使用本地相对路径时，需要注意 CSS 文件位于 `~/.local/share/fcitx5/www/css`，而只有 `www` 目录下的文件可以被引用。
因此为引用 `~/.local/share/fcitx5/www/img/foo.png`，您应写 `../img/foo.png`。
