# 大世界

Flax 引擎包含多种用于创建大型且丰富世界的功能，例如：
* 内容异步加载
* 纹理动态质量流式传输
* 高度多线程化（物理、作业系统、动画、粒子等）
* 地形和植被工具
* 自动绘制调用批处理和实例化
* 关卡流式传输
* 相对于摄像机的渲染
* 物理模拟原点偏移
* 64 位世界坐标

## 世界坐标精度

Flax 引擎默认使用 `32 位` 精度（单精度，`float` 类型）来表示世界中的对象坐标。这为大多数游戏提供了足够的质量，并提供了稳定的性能。然而，对于具有更大世界的游戏，我们建议使用 `64 位` 精度（双精度，`double` 类型），并在引擎中启用大世界功能。这使得游戏场景可以像整个太阳系一样大，同时仍然保持良好的质量和精度。

### 启用大世界

使用[自定义引擎构建](../advanced/custom-engine.md)并修改 `Flax.flaxproj` 文件，设置 `"UseLargeWorlds": true`。然后构建引擎。它将所有 Vector2/3/4 组件从 `float` 覆盖为 `double`，并以更高的精度存储对象坐标。

引擎支持加载和保存启用了 `UseLargeWorlds` 和未启用的项目，没有任何兼容性问题。这意味着你仍然可以使用默认引擎版本打开你的项目，即使它是在启用大世界支持的情况下编辑的。

### Real 类型

当使用大世界时，各种内置类型会转换为更高精度的格式，例如：
* `Vector2`、`Vector3`、`Vector4`
* `BoundingBox`
* `BoundingSphere`
* `OrientedBoundingBox`
* `Plane`
* `Ray`
* `Triangle`
* `Transform`（仅位置，缩放保持为 Float3）

你可以通过使用 `USE_LARGE_WORLDS` 预处理器定义来检测你的代码是否使用 64 位支持编译。通过 `Real` 类型定义，你可以在代码中覆盖类型，以支持两种构建模式（启用或不启用大世界）。

# [C#](#tab/code-csharp)
```cs
#if USE_LARGE_WORLDS
using Real = System.Double;
#else
using Real = System.Single;
#endif

Real coordinate = Actor.Position.X;
```
***

# [C++](#tab/code-cpp)

```cpp
Real coordinate = GetActor()->GetPosition().X;
```
***

***

## 渲染视图原点

Flax 包含相对于摄像机的渲染功能，它允许在渲染时移动整个场景的 `Origin`。它在使用 `LargeWorlds.UpdateOrigin` 渲染场景时根据当前摄像机位置自动计算。可以通过 `LargeWorlds.Enable` 禁用它。

> [!TIP]
> 即使使用 64 位精度，整个渲染仍然使用 32 位，因为使用更大的数据会对性能产生较大影响。

## 物理原点

物理模拟系统支持调整模拟世界的原点。这可用于改善碰撞和力的模拟，因为底层的 PhysX 库使用 32 位精度，在大世界场景中无法实现高质量的模拟。

你可以轻松地将当前主游戏视图原点与物理原点同步（或使用 `LargeWorlds.UpdateOrigin` 手动计算）：

# [C#](#tab/code-csharp)
```cs
Physics.DefaultScene.Origin = MainRenderTask.Instance.View.Origin;
```
***

# [C++](#tab/code-cpp)

```cpp
Physics::DefaultScene->SetOrigin(MainRenderTask::Instance->View.Origin);
```
***

最后，你的游戏可以使用多个 PhysicsScene，并以不同的频率和不同的世界原点来模拟世界的不同部分。
