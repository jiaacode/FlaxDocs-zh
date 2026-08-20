# 低级网络

低级网络层围绕 `NetworkPeer` 对象构建，该对象使用 `INetworkDriver` 接口来发送/接收 `NetworkMessage`。它允许声明自定义网络数据包类型，并在服务器和客户端对等端之间发送它们。

要了解如何创建自己的服务器/客户端逻辑，请参阅[操作指南：创建网络服务器和客户端](tutorials/network-client-server.md)教程。
