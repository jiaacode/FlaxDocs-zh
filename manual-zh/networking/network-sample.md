# 网络示例

![网络示例主菜单](media/network-sample-menu.png)

[网络示例](https://github.com/FlaxEngine/NetworkSample) 是一个开源示例项目，包含多人游戏大厅实现，支持玩家同步和聊天功能。它可以用作使用 Flax **低级网络传输层** 的多人项目的基础。

## 指南

1. 从 [Github](https://github.com/FlaxEngine/NetworkSample) 下载项目（以 Zip 格式下载或使用 Git 克隆）
2. 打开项目
3. 打开 `Menu` 场景并运行！
4. 在主菜单中，你可以指定玩家昵称、服务器 IP 和端口
5. 使用 Host 按钮启动服务器，或使用 Connect 按钮连接正在运行的服务器

你也可以使用 Game Cooker 将游戏构建为独立应用程序，以运行多个客户端和服务端实例。

## 截图

![网络示例玩家](media/network-sample-players.jpg)

![网络示例玩家列表](media/network-sample-players-list.png)

## 概述

主要类型概述：
* **Player** - 玩家信息容器（名称、ID、Actor 等）
* **GameSession** - 包含玩家列表（包括本地玩家）的游戏服务
* **NetworkSession** - 处理数据包和网络连接的游戏服务
* **Game/Network/Packets...** - 示例使用的各种类型的网络数据包（`NetworkPacket` 的实现）

## 许可证

项目基于 **MIT 许可证** 发布。
