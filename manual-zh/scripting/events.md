# 脚本事件

Flax 中的脚本不像传统程序那样在循环中持续运行直到结束。
相反，Flax 会调用脚本中声明的函数来处理特定的游戏事件，例如更新或物理碰撞。
这些函数被称为 **事件函数**，因为它们是由 Flax 在执行游戏过程中响应发生的事件而调用的。使用这些函数可以实现游戏逻辑并处理游戏中的不同情况。

## 示例

# [C#](#tab/code-csharp)
[!code-csharp[示例1](code-examples/events.cs)]
# [C++](#tab/code-cpp)
[!code-cpp[示例2](code-examples/events.h)]
***

## 事件函数

下表列出了所有可从基类 **Script** 重写的可用事件函数。

> [!TIP]
> 如果你的脚本直接继承自 Script 类型，则无需调用基类方法。默认实现为空。

| 事件                           | 描述                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| **void OnAwake()**             | 在对象加载后调用以初始化它。在启用它或调用 start（包括任何其他场景对象）之前调用。 |
| **void OnEnable()**            | 当对象变为启用和活动状态时调用。                             |
| **void OnDisable()**           | 当对象变为禁用和非活动状态时调用。                           |
| **void OnDestroy()**           | 在对象被销毁之前调用。                                       |
| **void OnStart()**             | 在脚本启用时，在首次调用任何 Update 方法之前调用。           |
| **void OnUpdate()**            | 如果对象已启用，则每帧调用（C++ 脚本需要在构造函数中设置 `_tickUpdate=true`）。 |
| **void OnLateUpdate()**        | 如果对象已启用，则每帧（在 *Update* 之后）调用（C++ 脚本需要在构造函数中设置 `_tickLateUpdate=true`）。 |
| **void OnFixedUpdate()**       | 如果对象已启用，则在每个固定帧率帧调用（C++ 脚本需要在构造函数中设置 `_tickFixedUpdate=true`）。 |
| **void OnLateFixedUpdate()**   | 如果对象已启用，则在每个固定帧率帧（在 *FixedUpdate* 之后）调用（C++ 脚本需要在构造函数中设置 `_tickLateFixedUpdate=true`）。 |
| **void OnDebugDraw()**         | 在编辑器中绘制调试形状期间调用。使用 [DebugDraw](https://docs.flaxengine.com/api/FlaxEngine.DebugDraw.html)。 |
| **void OnDebugDrawSelected()** | 在编辑器中绘制调试形状期间，当对象被选中时调用。使用 [DebugDraw](https://docs.flaxengine.com/api/FlaxEngine.DebugDraw.html)。 |

## 事件函数的执行顺序

脚本事件按以下顺序调用：

![脚本事件顺序](media/script-events.png)

### 初始化

每个创建并添加到 *Actor* 的脚本都会收到 **OnAwake**。如果脚本及其父级在层级中处于活动状态，则 **OnStart** 和 **OnEnable** 将被调用（在游戏启动或对象生成时）。否则，此调用将被推迟，直到有人启用该脚本。

OnAwake 和 OnStart 事件在脚本上只能调用一次。OnStart 总是在第一次 OnEnable 之前调用。所有脚本首先接收 OnAwake，然后在开始启用脚本的 BeginPlay 阶段之前。通常，OnAwake 应用于初始化对象本身（例如设置游戏系统管理器或预分配内存）。然后 OnStart/OnEnable 应用于跨对象交互（例如注册到游戏管理器、缓存玩家脚本等）。

### 游戏逻辑

引擎主循环更新高度可配置，并支持以不同的帧速率执行游戏更新、物理更新和绘制。这意味着更新、固定更新和绘制可能不同步，并且不会以相同的顺序调用。**OnUpdate** 事件在游戏更新期间调用，随后是 **OnLateUpdate**。在物理更新期间，引擎调用 **OnFixedUpdate** 和 **OnLateFixedUpdate**。在渲染期间，引擎可以调用 **OnDebugDraw** 和 **OnDebugDrawSelected**（由编辑器使用）。

### 反初始化

游戏结束时，所有脚本被禁用，当从游戏逻辑中移除对象时，会调用 **OnDisable** 事件。然后在实际对象销毁期间，会调用 **OnDestroy**。此外，如果脚本变为非活动状态（例如有人禁用了它或其层级中的某个父级），则引擎会调用 **OnDisable**。被禁用的脚本可以再次被激活并接收 *OnEnable* 以开始参与游戏逻辑。

OnDestroy 事件在脚本上只能调用一次。在 OnDestroy 事件调用后，Flax 不再使用该脚本。

### 编辑器中的事件

Flax 在 `编辑时`（当场景加载且用户修改它时）不会调用任何脚本事件，除了 **OnDebugDraw** 和 **OnDebugDrawSelected**。只有当内置的运行模式启动时，实际的游戏逻辑才会被模拟。然而，如果游戏脚本希望在编辑期间接收事件，可以使用 `[ExecuteInEditMode]` 属性进行标记。然后所有事件将正常调用。

### 顺序

脚本事件的调用顺序取决于事件类型。游戏逻辑事件（更新、固定更新和调试绘制）以非稳定顺序调用，因此游戏逻辑不应依赖于此。初始化事件（awake、enable、start）和反初始化事件（disable、destroy）总是先为父对象调用，然后向下进入层级。这意味着父 Actor 中的脚本可以查询子 Actor 的对象和脚本，但它们可能尚未初始化。

但是，你仍然可以使用初始化事件来添加新的对象作为子 Actor/脚本，因为 Flax 会在需要时调用它们的初始化。

所有脚本事件在脚本已被反序列化并且有有效的就绪数据可用时调用（OnAwake 的例外情况是它依赖于单个对象的就绪状态——其他对象可能尚未初始化）。
