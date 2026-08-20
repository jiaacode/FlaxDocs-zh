# 网络

<center>

![使用 Arizona 框架的网络示例](../samples-tutorials/samples/media/shooter-sample.gif)

</center>

Flax 支持可用于各种类型游戏的网络功能。你可以使用它来创建多人游戏，或通过互联网连接来扩展游戏玩法。

要将你的游戏集成到 Steam、Xbox Live 或 PlayStation Network 等各种在线平台中，请使用[在线](online/index.md)系统，该系统提供对玩家用户资料、好友列表、成就、在线状态、云存档等的访问。

## 低级和高级

Flax 包含三层网络：
* [套接字](network-api.md)带有原始 Berkeley 套接字（跨平台），用于 UDP/TCP 连接。
* [低级](low-level.md) API，包含 `NetworkPeer`、`INetworkDriver` 和 `NetworkMessage` API，支持通过消息网络进行低级网络数据包传输。
* [高级](high-level.md) API，包含 `NetworkManager`、`NetworkClient` 和 `NetworkStream` API，支持高级对象复制、生成、RPC 调用、对象权限和对象所有权。

高级 API 封装了低级 API，并为多人游戏提供了更多功能，在大多数情况下是首选。请参阅文档以了解更多信息。

## 本节内容

* [网络 API](network-api.md)
* [网络示例](network-sample.md)
* [低级网络](low-level.md)
* [高级网络](high-level.md)
* [在线](online/index.md)

## 教程

* [如何创建 TCP 客户端-服务器](tutorials/create-tcp-client-server.md)
* [如何创建网络服务器和客户端](tutorials/network-client-server.md)

## 示例项目

* [Arizona 框架示例](../samples-tutorials/samples/arizona.md)
* [网络示例](network-sample.md)
