# 创建和销毁对象

场景对象的生命周期由 Flax 控制，但游戏也可以通过 **New/Destroy 方法** 在运行时管理场景。有些游戏在场景中保持恒定的对象数量，但角色、宝藏和其他对象在游戏过程中被创建和移除是非常常见的。

## 生成对象

### C#
生成新点光源的示例代码：

# [C#](#tab/code-csharp)
```cs
public override void OnStart()
{
    var light = new PointLight();
    light.Color = Color.Blue;
    light.Parent = Actor;
    // 对象将成为场景层级的一部分
    // 引擎将在场景卸载时销毁它
}
```
***

# [C++](#tab/code-cpp)

```cpp
void ExampleScript::OnStart()
{
    auto light = New<PointLight>();
    light->Color = Color::Blue;
    light->SetParent(GetActor());
    // 对象将成为场景层级的一部分
    // 引擎将在场景卸载时销毁它
}
```
***

***

你可以通过 [AddScript](https://docs.flaxengine.com/api/FlaxEngine.Actor.html#FlaxEngine_Actor_AddScript_FlaxEngine_Script_) 方法向任何对象添加新脚本：

# [C#](#tab/code-csharp)
```cs
public override void OnStart()
{
    var player = Actor.AddScript<Player>();
    player.HP = 100;
}
```
***

# [C++](#tab/code-cpp)

```cpp
void ExampleScript::OnStart()
{
    auto script = New<Player>();
    script->SetParent(GetActor());
    script->HP = 100;
    // 对象将成为场景层级的一部分
    // 引擎将在场景卸载时销毁它
}
```
***

***

> [!Note]
> 场景对象（Actor、脚本）除了初始化自身（默认值）之外，**不应使用构造函数**。

## 移除对象

Flax 支持即时和延迟的对象移除系统。这有助于清理场景中已死亡玩家或未使用的 Actor。

# [C#](#tab/code-csharp)
[!code-csharp[示例1](code-examples/objects-lifetime.cs)]

# [C++](#tab/code-cpp)
[!code-cpp[示例3](code-examples/objects-lifetime.h)]

***

以下是一个在指定超时时间（以秒为单位）后移除对象的示例脚本：

# [C#](#tab/code-csharp)
[!code-csharp[示例2](code-examples/objects-lifetime-2.cs)]

# [C++](#tab/code-cpp)
[!code-cpp[示例4](code-examples/objects-lifetime-2.h)]

***

同样，你也可以移除脚本：

# [C#](#tab/code-csharp)
```cs
Destroy(Actor.GetScript<Player>());
```
***

# [C++](#tab/code-cpp)

```cpp
GetActor()->GetScript<ExampleScript>()->DeleteObject();
```
***

## 语言特定

### C#

各种特定于 C# 语言的组件和 API 使用 `Dispose()` 模式，并为方便起见实现 `IDisposable` 接口。例如：
* `Control` - GUI 控件使用 `Dispose` 方法来销毁 UI 元素，
* `InputAxis`/`InputEvent` - 虚拟输入读取工具需要通过 `Dispose` 释放，

### C++

* 使用工具宏：`SAFE_DISPOSE`、`SAFE_RELEASE`、`SAFE_DELETE` 来清理对象，具体取决于要调用的方法。
* 图形对象，如 `GPUTexture` 或 `GPUBuffer`，可以通过 `SAFE_DELETE_GPU_RESOURCE` 宏进行清理。这些是普通的脚本对象，但预先调用 `ReleaseGPU` 有助于在未使用时减少内存压力。
* `Task` 系统使用已过去任务的自动自动销毁。使用后无需手动销毁对象。
