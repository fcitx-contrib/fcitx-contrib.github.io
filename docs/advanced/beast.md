# Web 服务器
您可以通过基于 [Boost.Beast](https://github.com/boostorg/beast) 的 Web 服务器与小企鹅交互。

目前提供的功能有 [Rime 部署与同步](../im/rime#命令行接口) 和 [切换输入法状态](../topic/cli#fcitx5-remote)。

## 设置

### 通信
可选 `Unix Socket`（更安全）或 `TCP`（更方便调试）。

### Unix Socket 路径
Socket 文件地址，默认 `/tmp/fcitx5.sock`。

### TCP 端口
TCP 监听端口，默认 `32489`。目前仅在 `127.0.0.1` 监听。
