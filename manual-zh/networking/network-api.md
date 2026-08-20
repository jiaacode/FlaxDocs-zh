# 网络 API

Flax 提供了一个基于 Berkeley 套接字（跨平台）的低级网络接口。该接口已开放给脚本 API，可在 C++、C# 或可视化脚本中使用。

以下是一个使用低级网络的[服务器-客户端示例](tutorials/create-tcp-client-server.md)。

## API

* [Network](https://docs.flaxengine.com/api/FlaxEngine.Network.html) - 网络接口（平台相关实现）
* [NetworkSocket](https://docs.flaxengine.com/api/FlaxEngine.NetworkSocket.html) - 套接字对象（值类型）
* [NetworkEndPoint](https://docs.flaxengine.com/api/FlaxEngine.NetworkEndPoint.html) - 由地址、端口和协议创建的网络端点
* [NetworkSocketOption](https://docs.flaxengine.com/api/FlaxEngine.NetworkSocketOption.html) - 网络套接字选项
* [NetworkSocketGroup](https://docs.flaxengine.com/api/FlaxEngine.NetworkSocketGroup.html) - 用于批量操作的套接字对象组
