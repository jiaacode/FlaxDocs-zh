# 高级网络

高级网络层支持创建功能完整的多人游戏。其特性包括：
* 高级网络抽象和实现
  * 单例服务（每个运行的游戏一个）
  * 从游戏设置中配置
  * 能够在运行时调整配置（例如服务器 IP/端口）
* 允许轻松创建多人游戏
  * 射击游戏
  * 策略游戏
  * 合作游戏
  * 竞技游戏
* 可以集成到现有的游戏项目中
* 默认情况下未启用
  * 减少此功能在引擎中的冗余
* 通过网络同步游戏对象
  * 游戏会话状态
  * 玩家数据
  * 场景对象
    * Actor
    * 脚本
    * 子对象
* 提供自动数据复制
  * 能够优先处理要同步的对象
  * 同步放置在关卡地图上的对象（已在关卡中）
  * 同步在关卡地图上生成的对象
    * 同步对象/预制体生成
    * 权威式或弱式
* 远程过程调用（RPC）
  * 能够在服务器或远程客户端上调用游戏方法
  * 自动参数序列化
  * 可自定义的 `NetworkChannelType`
* 构建在现有的[低级网络](low-level.md)之上
  * 提供交换 `INetworkDriver` 后端的能力
  * 跨平台网络
* 支持跨平台联机
* 仅限客户端-服务器连接（客户端之间无法直接通信）
* 可扩展至 100 名玩家
* 提供网络性能分析器
  * 分析每帧的数据传输使用情况

## 脚本集成

如果你想使用自动对象网络复制或 RPC 代码生成，请修改你的游戏代码模块构建脚本，添加 `Network` 标签——这将触发额外的处理和代码生成以优化网络。

```cs
// Game.Build.cs

public override void Setup(BuildOptions options)
{
    base.Setup(options);

    Tags["Network"] = string.Empty;
    options.PublicDependencies.Add("Networking");
}
```

## 网络管理器

高级网络系统的主要管理器是 `NetworkManager`，它提供 `StartServer()`/`StartClient()`/`StartHost()`/`Stop()` 等 API。它会创建 `NetworkManager.Peer` 以作为服务器或客户端运行。

### 客户端

作为服务器或主机运行的网络管理器会接收新的客户端连接，这些连接可以通过 `NetworkManager.ClientConnecting` 事件进行验证/拒绝。例如，游戏客户端可以发送版本、玩家信息或本地游戏文件校验和，以对竞技多人游戏执行服务器端验证。

在与新客户端执行初始握手后，它会被添加到 `NetworkManager.Clients` 列表中，并触发 `NetworkManager.ClientConnected` 事件（与连接结束或超时时触发的 `NetworkManager.ClientDisconnected` 事件相反）。网络状态可以通过 `State` 属性（`NetworkConnectionState` 枚举）检查，并通过 `NetworkManager.StateChanged` 事件对更改做出响应。

每个客户端都有自己唯一的 `uint32 ClientId`，用于在网络会话中标识它。服务器或主机模式下的网络管理器始终使用 `NetworkManager.ServerClientId = 0` 来区别于其他对等端。

## 网络设置

要控制网络系统，请使用 **网络设置** 资源（链接到[游戏设置](../editor/game-settings/index.md)）。你可以使用以下代码在运行时从代码中调整这些选项（例如设置服务器地址或端口）：

```cs
// 设置网络连接设置
var networkSettings = GameSettings.Load<NetworkSettings>();
networkSettings.Address = "23.145.242.343";
networkSettings.Port = 2137;
GameSettings.LoadAsset<NetworkSettings>().SetInstance(networkSettings);
```

***

| 属性             | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| **最大客户端数** | 游戏会话中活跃网络客户端的最大数量。由服务器或主机用于限制玩家和观战者的数量。 |
| **协议版本**     | 游戏的网络协议版本。网络客户端和服务器只能使用相同的协议版本（在客户端加入时验证）。 |
| **网络 FPS**     | 网络系统每秒更新的目标次数。较高的值提供更好的网络同步（例如射击游戏使用 *60*），较低的值减少网络使用和性能影响（例如策略游戏使用 *30*）。可用于调整网络性能对游戏的影响。不能高于 UpdateFPS（来自[时间设置](../editor/game-settings/time-settings.md)）。使用 0 表示每次游戏更新都运行。如果希望禁用自动字段复制，请使用小于 0 的值。 |
|                  |                                                              |
| **地址**         | 服务器的地址（服务器/主机始终在 *localhost* 上运行）。仅支持 `IPv4`。 |
| **端口**         | 网络对等端的端口。                                           |
| **网络驱动**     | 网络驱动的类型（实现 `INetworkDriver`），将用于通过网络创建、管理、发送和接收消息。 |

## 网络复制器

`NetworkReplicator` 是负责复制网络对象以及发送/接收 RPC 的系统。它支持对象的网络角色和所有权概念，但也包含在运行时生成/销毁对象的 API。

要注册对象（脚本或 Actor）进行网络调用，请在 `OnEnable` 方法中调用 `NetworkReplicator.AddObject`。它将自动添加到复制中，并能够调用或执行 RPC。如果你想注册动态生成的场景对象（例如玩家预制体），请调用 `NetworkReplicator.SpawnObject`（`DespawnObject` 用于移除它）。

静态放置在关卡中的对象（例如门 Actor）可以自行注册（例如在 `OnEnable`/`BeginPlay` 方法中），这样当网络在线时，这些对象将正确复制并支持 RPC，因为它们存在于服务器和客户端上（假设它们都加载了该关卡）。

> [!Tip]
> 当 `NetworkManager` 离线时，`NetworkReplicator` API 将被忽略。

```cs
public class MyPlayer : Script
{
    /// <inheritdoc />
    public override void OnEnable()
    {
        // 注册复制
        NetworkReplicator.AddObject(this);
    }

    /// <inheritdoc />
    public override void OnDisable()
    {
        // 取消注册复制
        NetworkReplicator.RemoveObject(this);
    }
}

public class MyGameManager : Script
{
    public Prefab PlayerPrefab;

    public void SpawnPlayer()
    {
        // 通过网络生成预制体对象（默认情况下，所有对象始终由服务器拥有）
        var player = PrefabManager.SpawnPrefab(PlayerPrefab);  
        NetworkReplicator.SpawnObject(player);
    }
}
```

***

每个对象可以通过 `GetObjectRole`/`GetObjectOwnerClientId` 查询自己的角色和所有权，包括 `IsObjectOwned`/`IsObjectSimulated`/`IsObjectReplicated` 等实用工具。对象所有者还可以通过 `SetObjectOwnership` 更新其所有权。

## 复制层次结构

`NetworkReplicationHierarchy` 是一项功能，允许游戏配置对象的复制机制。它是 `NetworkReplicator` 的可选扩展，可通过 `Hierarchy` 属性访问，游戏可以将其设置为自定义节点层次结构。它用于在更优化的结构（例如网格或层次树）中存储要复制的对象，并且可以用于单独控制每个对象的复制速率和目标客户端。

`NetworkReplicationHierarchy` 在服务器和客户端上运行，但只包含 *本地拥有* 的对象——无需管理不应由远程客户端复制的对象。

例如，当大型游戏关卡包含 1 万个网络对象（例如兴趣点）时，将所有对象复制到所有已连接的客户端会牺牲性能。为了解决这个问题，可以创建一个简单的复制层次结构，控制每个对象的复制 FPS，并为距离太远的客户端跳过不必要的复制。以下是示例代码：

> [!Tip]
> 使用 `NetworkReplicator.DirtyObject(obj)` 将对象标记为已修改，以进行立即复制（例如，当对象的复制 FPS 较低但需要快速复制状态时）。如果你只希望对象在生成时被复制，还可以将对象的 `ReplicationFPS` 设置为小于 `0`。

# [C#](#tab/code-csharp)
```cs
// 自定义复制层次结构类型
public class MyReplicationHierarchy : NetworkReplicationHierarchy
{
    private NetworkReplicationGridNode _grid = new NetworkReplicationGridNode();

    ~MyReplicationHierarchy()
    {
        // 清理内存
        Destroy(_grid);
    }

    // 由 NetworkReplicator 调用，将对象插入层次结构
    public override void AddObject(NetworkReplicationHierarchyObject obj)
    {
        // 降低更新速率（可以根据每个对象类型或通过对象接口方法设置）
        obj.ReplicationFPS = 30;

        var actor = obj.Actor;
        if (actor != null && actor.HasStaticFlag(StaticFlags.Transform))
        {
            // 将静态对象插入网格以实现更快的复制
            _grid.AddObject(obj);
            return;
        }

        base.AddObject(obj);
    }

    // 由 NetworkReplicator 调用，从层次结构中移除对象
    public override bool RemoveObject(Object obj)
    {
        if (_grid.RemoveObject(obj))
            return true;
        return base.RemoveObject(obj);
    }

    // 每次网络更新时调用，收集要复制的对象
    public override void Update(NetworkReplicationHierarchyUpdateResult result)
    {
        // 设置玩家位置以进行距离剔除
        var clients = NetworkManager.Clients;
        for (var i = 0; i < clients.Length; i++)
        {
            var client = clients[i];
            // TODO: 使用玩家的实际位置
            result.SetClientLocation(i, Vector3.Zero);
        }

        // 更新层次结构
        _grid.Update(result);
        base.Update(result);
    }
}

// 然后在启动多人游戏之前的游戏代码中：
NetworkReplicator.Hierarchy = new MyReplicationHierarchy();
```
***

# [C++](#tab/code-cpp)

```cpp
#include "Engine/Networking/NetworkReplicationHierarchy.h"
#include "Engine/Networking/NetworkManager.h"
#include "Engine/Level/Actor.h"

// 自定义复制层次结构类型
API_CLASS() class GAME_API MyReplicationHierarchy : public NetworkReplicationHierarchy
{
    DECLARE_SCRIPTING_TYPE_WITH_CONSTRUCTOR_IMPL(MyReplicationHierarchy, NetworkReplicationHierarchy);
private:
    NetworkReplicationGridNode _grid;

public:
    // 由 NetworkReplicator 调用，将对象插入层次结构
    void AddObject(NetworkReplicationHierarchyObject obj) override
    {
        // 降低更新速率（可以根据每个对象类型或通过对象接口方法设置）
        obj.ReplicationFPS = 30;

        const Actor* actor = obj.GetActor();
        if (actor && actor->HasStaticFlag(StaticFlags::Transform))
        {
            // 将静态对象插入网格以实现更快的复制
            _grid.AddObject(obj);
            return;
        }

        NetworkReplicationHierarchy::AddObject(obj);
    }

    // 由 NetworkReplicator 调用，从层次结构中移除对象
    bool RemoveObject(ScriptingObject* obj) override
    {
        if (_grid.RemoveObject(obj))
            return true;
        return NetworkReplicationHierarchy::RemoveObject(obj);
    }

    // 每次网络更新时调用，收集要复制的对象
    void Update(NetworkReplicationHierarchyUpdateResult* result) override
    {
        // 设置玩家位置以进行距离剔除
        const auto& clients = NetworkManager::Clients;
        for (int32 i = 0; i < clients.Count(); i++)
        {
            NetworkClient* client = clients[i];
            // TODO: 使用玩家的实际位置
            result->SetClientLocation(i, Vector3::Zero);
        }

        // 更新层次结构
        _grid.Update(result);
        NetworkReplicationHierarchy::Update(result);
    }
};

// 然后在启动多人游戏之前的游戏代码中：
NetworkReplicator::SetHierarchy(New<MyReplicationHierarchy>());
```
***

## 对象所有权

在完全权威的设置中，服务器拥有所有通过网络复制的游戏对象，因此客户端无法直接对其他客户端强制执行属性更改。然而，游戏可能希望保留本地客户端棋子/角色的所有权，并让服务器仅执行同步或验证。这可能简化玩家输入的游戏模拟（玩家控制本地棋子），但仍然允许服务器在将状态复制到其他客户端之前验证状态。

对象可能依赖于所有权，因此可以分为：
* **仅服务器** - 对象仅存在于服务器上，
  * *游戏模式* - 控制全局游戏逻辑（例如获胜条件），
* **服务器和客户端** - 对象存在于服务器和所有客户端上，
  * *游戏状态* - 包含全局游戏数据，
  * *玩家状态* - 包含玩家数据，
  * *玩家棋子* - 表示场景中的玩家棋子，
* **服务器和拥有客户端** - 对象仅存在于服务器和拥有客户端上，
  * *玩家控制器* - 控制玩家逻辑，
* **仅拥有客户端** - 对象仅存在于拥有客户端上，
  * *UI 和 HUD* - 显示玩家和游戏状态，

拥有客户端是拥有该对象的玩家/客户端（以权威方式生成它——例如玩家棋子预制体）。

网络对象角色：
* **无** - 非复制对象，
* **拥有权威** - 服务器/客户端拥有该对象并将其复制给其他人，
* **已复制** - 服务器/客户端从其他服务器/客户端接收复制对象，
* **已复制模拟** - 客户端从服务器接收复制对象，但也可以本地自主模拟它（例如使用真实人类输入控制本地棋子，但与服务器同步+验证——玩家可以平滑移动，但由于服务器执行验证，不会穿过墙壁）。

## 对象序列化

游戏对象和类型可以通过 `INetworkSerializable` 接口或通过 `NetworkReplicator::AddSerializer` 注册来定义自己的序列化/反序列化方法，以自定义数据通过网络传递的方式。序列化方法使用 `NetworkStream`，它支持流式传输原始字节、结构、内置类型、集合和自定义类型。当发送较大的对象数据（大于 `INetworkDriver` 的默认消息大小，通常为 1500 字节）时，网络系统会将消息拆分为多个部分。

带有 `NetworkReplicated` 属性标记的字段/属性的网络对象数据序列化示例：

# [C#](#tab/code-csharp)
```cs
// 自定义结构的自动复制
public struct CustomStruct
{
    [NetworkReplicated] public int MyVar;
};

// 对象属性的自动复制
public class MyScript :  Script
{
    [NetworkReplicated] public float MyFloat = 0.0f;
    [NetworkReplicated] public CustomStruct MyStruct;
    [NetworkReplicated] public PlatformType MyEnum = PlatformType.Windows;
    [NetworkReplicated] public string MyString = "text";
    [NetworkReplicated] public int[] MyArray = new []{ 1, 2, 3 };
    [NetworkReplicated] public Dictionary<int, string> MyMap;
};

// 自定义结构的自定义网络序列化
public struct CustomStructManual : INetworkSerializable
{
    public float MyVar;

    public void Serialize(NetworkStream stream)
    {
        // 自定义数据复制
        stream.WriteSingle(Val);
    }

    public void Deserialize(NetworkStream stream)
    {
        // 自定义数据复制
        Val = stream.ReadSingle();
    }
};
```
***

# [C++](#tab/code-cpp)

```cpp
// 自定义结构的自动复制
API_STRUCT() struct GAME_API CustomStruct
{
    DECLARE_SCRIPTING_TYPE_STRUCTURE(CustomStruct);

    API_FIELD(NetworkReplicated) int32 MyVar = 0.0f;
};

// 对象属性的自动复制
API_CLASS() class GAME_API MyScript : public Script
{
    API_AUTO_SERIALIZATION();
    DECLARE_SCRIPTING_TYPE(MyScript);

    API_FIELD(NetworkReplicated) float MyFloat = 0.0f;
    API_FIELD(NetworkReplicated) CustomStruct MyStruct;
    API_FIELD(NetworkReplicated) PlatformType MyEnum = PlatformType::Windows;
    API_FIELD(NetworkReplicated) String MyString = TEXT("text");
    API_FIELD(NetworkReplicated) Array<int32> MyArray = { 1, 2, 3 };
    API_FIELD(NetworkReplicated) Dictionary<int32, String> MyMap;
};

#include "Engine/Networking/INetworkSerializable.h"
#include "Engine/Networking/NetworkStream.h"

// 自定义结构的自定义网络序列化
API_STRUCT() struct GAME_API CustomStructManual : INetworkSerializable
{
    DECLARE_SCRIPTING_TYPE_STRUCTURE(CustomStructManual);

    API_FIELD() float Val;

    void Serialize(NetworkStream* stream) override
    {
        // 自定义数据复制
        stream->Write(Val);
    }

    void Deserialize(NetworkStream* stream) override
    {
        // 自定义数据复制
        stream->Read(Val);
    }
};
```
***

## RPC

**远程过程调用**（缩写为 RPC）用于在其他网络客户端上调用代码。例如，从客户端调用服务器方法，反之亦然：从服务器调用所有客户端上的方法。这对于同步状态或在网络上调用某些操作（例如玩家攻击、聊天消息等）非常有用。RPC 方法可以通常从游戏代码中调用，但内部逻辑可能仅在其他客户端上执行。

要声明 RPC，请在函数上使用 `NetworkRpc` 特性，并设置 `Server` 或 `Client` 值。每个 RPC 还可以指定要使用的传输通道（`Unreliable`、`UnreliableOrdered`、`Reliable`、`ReliableOrdered`）。[Flax.Build](../editor/flax-build/index.md) 代码生成将在方法体之前注入自定义代码，该方法将在远程客户端上正确调用该方法。RPC 示例：

> [!Tip]
> RPC 只能在网络对象（通过 `NetworkReplicator.AddObject` 注册）以及代码模块标记有 `Network` 标签的类型中使用。

#### RPC 概念

* 客户端 RPC
  * 只能由服务器或主机调用
  * 发送给所有已注册该 RPC 对象实例且匹配自定义 `TargetIds`（如果通过 `NetworkRpcParams` 提供）的已连接客户端
  * 可以在主机上本地发送和执行（服务器和客户端均可）
* 服务器 RPC
  * 只能由客户端或主机调用
  * 仅发送给服务器
  * 你可以使用 `NetworkRpcParams` 中的 `SenderId` 字段来检测哪个客户端发送了该 RPC

#### RPC 示例

# [C#](#tab/code-csharp)
```cs
// 仅在服务器上调用的 RPC 示例
[NetworkRpc(Server = true)]
public void SetSequenceIndex(ushort value)
{
    _currentSequence = value;
}

// 在客户端上调用的 RPC 示例，使用不可靠通道（消息可能不会到达，但延迟更小）
[NetworkRpc(Client = true, Channel = NetworkChannelType.Unreliable)]
public void CallClientRPC(string text, uint[] ids)
{
    Debug.Log("Got msg from server: " + text);
}
```
***

# [C++](#tab/code-cpp)

```cpp
// .h
API_CLASS() class GAME_API MyScript : public Script
{
    API_AUTO_SERIALIZATION();
    DECLARE_SCRIPTING_TYPE(MyScript);

    // 仅在服务器上调用的 RPC 示例
    API_FUNCTION(NetworkRpc=Server)
    void SetSequenceIndex(ushort value);

    // 在客户端上调用的 RPC 示例，使用不可靠通道（消息可能不会到达，但延迟更小）
    API_FUNCTION(NetworkRpc="Client, Unreliable")
    void CallClientRPC(const String& text, Array<uint32>& ids);
};

// .cpp

// 确保包含 RPC 实现的工具头文件
#include "Engine/Networking/NetworkRpc.h"

void MyScript::SetSequenceIndex(ushort value)
{
    // 宏 `NETWORK_RPC_IMPL` 用于注入 RPC 调用/执行代码
    // 用法：NETWORK_RPC_IMPL(<type>, <rpcName>, <arguments>)
    NETWORK_RPC_IMPL(MyScript, SetSequenceIndex, value);

    // 然后方法体..
    _currentSequence = value;
}

void MyScript::CallClientRPC(const String& text, Array<uint32>& ids)
{
    NETWORK_RPC_IMPL(MyScript, CallClientRPC, text, ids);

    LOG(Info, "Got msg from server: {0}", text);
}

// 如果你重写了虚 RPC 方法，则在调用基类方法或重写的方法体之前使用 `NETWORK_RPC_OVERRIDE_IMPL` 宏。
```
***

#### RPC 上下文参数

网络 RPC 可以使用上下文参数作为输入来检测谁发送了消息，或作为输出来将消息发送给特定的客户端集合。这些标识符基于 `NetworkClient.ClientId`，你可以使用 `NetworkManager.GetClient` 来获取特定 ID 的客户端。使用 `NetworkRpcParams` 结构参数，如下所示：

# [C#](#tab/code-csharp)
```cs
// 在服务器上调用的 RPC 示例，记录发送此消息的客户端
[NetworkRpc(Server = true)]
public void SetSequenceIndex(ushort value, NetworkRpcParams rpc = new NetworkRpcParams())
{
    Debug.Log("Got msg on server from clientId: " + rpc.SenderId);
}

// 在客户端上调用的 RPC 示例
[NetworkRpc(Client = true)]
public void CallClientRPC(string text, NetworkRpcParams rpc = new NetworkRpcParams())
{
    Debug.Log("Got msg from server: " + text);
}

// 仅在特定客户端列表上调用 CallClientRPC 的服务器方法
public void CallSpecificClients()
{
    var rpc = new NetworkRpcParams
    {
        TargetIds = new uint[] { 1, 3 }, // NetworkClient.ClientId
    };
    CallClientRPC("hello", rpc);
}
```
***

# [C++](#tab/code-cpp)

```cpp
// .h
#include "Engine/Networking/NetworkRpc.h"
API_CLASS() class GAME_API MyScript : public Script
{
    API_AUTO_SERIALIZATION();
    DECLARE_SCRIPTING_TYPE(MyScript);

    // 在服务器上调用的 RPC 示例，记录发送此消息的客户端
    API_FUNCTION(NetworkRpc=Server)
    void SetSequenceIndex(ushort value, NetworkRpcParams rpc = NetworkRpcParams());

    // 在客户端上调用的 RPC 示例
    API_FUNCTION(NetworkRpc=Client)
    void CallClientRPC(const String& text, NetworkRpcParams rpc = NetworkRpcParams());

    // 仅在特定客户端列表上调用 CallClientRPC 的服务器方法
    API_FUNCTION()
    void CallSpecificClients();
};

// .cpp
void MyScript::SetSequenceIndex(ushort value, NetworkRpcParams rpc)
{
    NETWORK_RPC_IMPL(MyScript, SetSequenceIndex, value, rpc);

    // 然后方法体..
    LOG(Info, "Got msg on server from clientId: {0}", rpc.SenderId);
}

void MyScript::CallClientRPC(const String& text, NetworkRpcParams rpc)
{
    NETWORK_RPC_IMPL(MyScript, CallClientRPC, text, rpc);

    LOG(Info, "Got msg from server: {0}", text);
}

void MyScript::CallSpecificClients()
{
    NetworkRpcParams rpc;
    uint32 ids[2] = { 1, 3 }; // NetworkClient::ClientId
    rpc.TargetIds = ToSpan(ids, ARRAY_COUNT(ids));
    CallClientRPC(TEXT("hello"), rpc);
}
```
***

### 扩展网络对象

为了在更多自定义情况下扩展网络功能，你可以在网络对象上使用 `INetworkObject` 接口：
* `INetworkObject` - 允许在对象的生命周期中某些点上使用自定义事件来扩展网络对象的生命周期（例如生成/销毁或在复制期间）。
* `INetworkSerializable` - 允许通过使用自定义序列化/反序列化方法覆盖默认复制逻辑，这些方法使用 `NetworkStream` 对象通过网络发送对象状态。

### 性能分析和调试

要分析网络传输，请在编辑器中使用[性能分析器窗口](../editor/profiling/profiler.md)中的网络选项卡。
要使用延迟模拟（例如由于网络连接不良）快速分析网络性能，你可以使用 `NetworkLagDriver`（在 `Network Settings` 中设置），它可以延迟网络消息的发送，以模拟服务器和客户端之间的延迟。

要访问对象的**复制日志**，请使用：

# [C#](#tab/code-csharp)
```cs
NetworkReplicator.EnableLog = true;
```
***

# [C++](#tab/code-cpp)

```cpp
NetworkReplicator::EnableLog = true;
```
***
