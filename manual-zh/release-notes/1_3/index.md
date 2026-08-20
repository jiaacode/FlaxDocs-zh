# Flax 1.3 发布说明

## 亮点

### macOS 支持

![macOS 上的 Flax 编辑器](media/flax-editor-on-mac.png)

此版本增加了对 **macOS** 的初始支持，包括编辑器和游戏发布！现在，你可以在 macOS 10.14 或更高版本上运行 Flax。所有引擎功能都已实现，包括通过 MoltenVK 在 Metal 之上运行 Vulkan 图形。

我们准备了关于如何使用 [Flax on Mac](../../get-started/mac.md) 的文档和教程。

> [!Warning]
> 我们刚刚开始支持 macOS，因此可能包含一些错误。欢迎在我们的 [Github](https://github.com/FlaxEngine/FlaxEngine/issues) 上报告它们。

已知问题：

* 多显示器支持不完整
* 鼠标光标定位问题
* 窗口内拖放

![macOS 上的 Flax 编辑器](media/flax-editor-macos.png)

### 布娃娃系统

![带有布娃娃模拟的 Flax 物理](media/knight-ragdolls.gif)

布娃娃系统是游戏中常用的功能，用于生成角色的程序化死亡动画，或模拟骨骼中应表现得更程序化的部分（例如尾巴）。此更新包含了对大量布娃娃模拟的运行时支持，以及编辑器中用于快速生成角色布娃娃的内置工具。
编辑器现在拥有布娃娃生成器和编辑工具。布娃娃可以在预制体中使用以创建角色。

![Flax 布娃娃编辑器](media/ragdoll-editor.png)

### 动画功能

我们不断改进动画系统的工作流程、工具和功能。在此版本中，我们添加了动画插槽、动画事件轨道和实例化场景动画。

#### 动画插槽

![动画图中的动画插槽播放](media/animation-slot.png)

**动画插槽** 可用于从代码在动画图中播放动画。插槽可以放置在图的任何位置，甚至在图函数中，然后通过游戏脚本使用 `PlaySlotAnimation(...)` 触发。在[文档](../../animation/anim-graph/animation-slots.md)中了解更多信息。

#### 动画事件

![播放 VFX 的动画事件](media/anim-event-vfx.gif)

**动画事件** 可以添加到动画资源的单独轨道上，在动画播放期间触发，以播放 VFX、SFX 或实现与动画相关的自定义游戏逻辑（例如播放脚步声或在雪地上行走时生成脚印贴花）。在[文档](../../animation/animation/anim-events.md)中了解更多信息。

#### 预制体中的实例化场景动画

编辑器支持从预制体窗口为对象制作动画。以这种方式创建的场景动画可以在关卡中的预制体对象上播放，使其易于重用。在此[此处](../../ui/tutorials/ui-prefab-animation.md)了解更多信息。

### C++ 脚本功能

#### C++ API 文档

![Flax 引擎文档中的 C++ API 脚本文档](media/cpp-api-docs.png)

**C++ API 文档** 现已上线！完整的引擎和编辑器脚本 API 参考，像 C# API 一样可浏览和搜索。它包含一些很棒的功能：用于快速导航到 Github 上实际引擎源代码的工具按钮、用于复制/粘贴的文件头路径，以及带有继承成员列表的类继承层次结构。此外，Flax 文档在选项卡中显示 C++/C#/VS 代码示例，便于你专注于所选的脚本语言。

在此查看[此处](../../../api-cpp/index.md)。

#### 接口

`API_INTERFACE` 现在在 C# 和可视化脚本中完全支持。这允许你在 C++ 中声明接口，并在游戏脚本中使用它，以实现代码中更大的可扩展性。它的美妙之处在于接口可以在 C++ 或 C# 中实现，并跨语言使用（例如，C++ 可以调用 C# 接口方法——反之亦然，包括在 C# 中覆盖 C++ 接口实现）。在此[此处](../../scripting/cpp/interfaces.md)了解更多信息。

```cpp
#pragma once
#include "Engine/Scripting/ScriptingType.h"

API_INTERFACE() class GAME_API IMyInterface
{
DECLARE_SCRIPTING_TYPE_MINIMAL(IMyInterface);

    // 接口虚方法
    API_FUNCTION() virtual float GetSpeed(const Vector3& v) = 0;
};
```

***

#### 枚举

`ScriptingEnum` 是 C++ 脚本的一个新的小型工具，用于轻松地将枚举转换为字符串并返回：

```cpp
API_ENUM()
enum class PlayerStates { Idle, Running, Swimming, };

#include "Engine/Core/Log.h"
#include "Engine/Scripting/Enums.h"

String stateName = ScriptingEnum::ToString(PlayerStates::Running);
PlayerStates state = ScriptingEnum::FromString<PlayerStates>(stateName);
LOG(Info, "Player state: {0} = {1}", stateName, state);
```

***

#### Lambda 表达式

**C++ lambda 表达式** 现在可以与 Flax 委托和函数一起使用。你可以使用它们通过将局部或成员变量捕获到 lambda 作用域中来简化游戏代码：

```cpp
int32 myVariable = 10;
Engine::Update.Bind([&myVariable]
{
    LOG(Info, "Counter: {}", myVariable++);
});
```

***

### 可视化脚本改进

除了 C# 和 C++，我们还为可视化脚本添加了许多新功能！现在，你可以在 VS 中使用 **数组**、更改参数类型，并且 **图执行性能** 得到了显著提升。

![可视化脚本数组迭代](media/array-for-each.png)

关于[可视化脚本中的数组](../../scripting/visual/arrays.md)的文档。

### UI 导航

![Flax 用户界面 UI 导航](media/ui-navigation.gif)

Flax UI 系统获得了 **UI 导航**，以通过键盘方向键或游戏手柄按键等输入操作在用户界面中执行焦点导航。此功能对于主机游戏或其他支持游戏手柄的游戏至关重要，这些游戏旨在无需鼠标输入或用户触摸输入即可提供完整的 UI 可用性。这也在编辑器中实现，以提供 `Tab` 键导航。在此[此处](../../ui/ui-navigation.md)了解更多信息。

### 在线平台

最新 1.3 更新的主要新功能之一是 **在线平台支持**。这标志着使你的游戏与在线服务更加互联方面迈出了显著的一步。在引擎内部，我们添加了一个新的 `IOnlinePlatform` 接口，专为在线平台提供商设计，用于与各种多人服务通信，例如 **玩家信息、成就、游戏大厅或游戏内商店**。每个在线平台都实现此接口，并通过插件提供，你的游戏项目可以使用：
* [Steam](https://github.com/FlaxEngine/OnlinePlatformSteam)
* [Xbox Live](https://github.com/FlaxEngine/OnlinePlatformXboxLive)
* 特定平台（PlayStation、Switch）供注册开发者使用

在此[此处](../../networking/online/index.md)了解更多信息。

### 多个物理场景

物理系统在底层进行了重大重构，并添加了一个新的 `PhysicsScene` 功能，允许 **创建多个物理场景并单独模拟它们**，如[此 Pull Request](https://github.com/FlaxEngine/FlaxEngine/pull/673) 中提交。现在，PhysX 实现隐藏在 `PhysicsBackend` 接口后面，因此可以轻松地插入另一个物理引擎（例如 Havok 或 JoltPhysics）。

### 编辑器工具

实际上，每次更新都会为 Flax 编辑器带来大量改进。这一次再次发生。

#### 资源引用

![Flax 资源引用查看器内容配置文件](media/asset-references-graph.png)

**资源引用查看器** 窗口（通过 *内容窗口* 中的上下文菜单）显示引用此资源的资源及其自身依赖结构的图。可用于分析项目中的内容使用情况（例如，检查给定模型使用了哪些纹理，或场景中使用了哪些模型）。

#### 调试视图

![Flax 调试视图模式四边形过度绘制](media/quuad-overdraw-debug.png)

新的 **四边形过度绘制** 调试视图模式（如上所示）根据 GPU 上使用 2x2 四边形渲染的三角形的过度绘制为像素着色。另一种新模式 **材质复杂度** 根据近似的渲染成本（着色器大小、纹理使用、细分或深度使用等）为屏幕像素着色。这两种视图模式都可用于性能分析和优化场景。

#### Visual Studio 2022

在 Microsoft 发布 Visual Studio 2022 后，我们添加了在 Flax 编辑器和我们的构建系统中使用它的支持。请继续使用它进行游戏开发。请记住，由于与先前版本相比的重大更改，我们还无法为 VS2022 提供 [Flax.VS](https://marketplace.visualstudio.com/items?itemName=Flax.FlaxVS) 插件用于 C# 调试（最新版本适用于 VS17 和 VS19）。

#### 时间线和曲线编辑器改进

我们进行了大量改进，以提高时间线和曲线编辑器的可用性和稳定性。现在，创建过场动画和动画变得更加容易和快速。你可以一次从多个轨道中选择关键帧，并轻松处理嵌套曲线。

### 平台更新

Flax 1.3 增加了 **对 PlayStation 5 的初始支持**（非官方，私有移植）。我们也为其他平台添加了许多改进。例如：

* **Linux 上的游戏手柄支持**，
* Switch 上的用户配置文件 API，
* 带有 GDK 的登录 API（Xbox One 和 Series X/S），
* Xbox Scarlett 和 Xbox One 更新到版本 GDK 2021.04 QFE5，
* Github 每日构建中的 Vulkan，
* 使用 Github Actions 运行的自动化单元测试（push 或 PR）。

## 更新日志

### 版本 1.3.6228 - 2022年3月2日

贡献者：mafiesto4、jb-perrier、Zbyl、ScottLongley、stefnotch、honzapatCZ、nove1398、intolerantape、Vittek1978、ricochhet、GoaLitiuM、Erdroy、nothingTVatYT、stefnotch、xKamuna、iainmckay

合并的 PR：46

* 为游戏和编辑器添加了 **macOS 支持**
* 改进了带有调试形状的关节编辑
* 在编辑器属性面板中添加了 D6 关节运动编辑
* 向编辑器启动画面添加了 Gordon Ramsay 名言（非常重要的功能）
* 在脚本 API 中添加了对 **接口的支持**（跨语言支持 C++/C#/VS）
* 添加了在使用鼠标滚轮缩放时保留时间线位置
* 添加了使用 Shift+滚轮水平滚动时间线
* 添加了即使鼠标悬停在关键帧编辑器或曲线编辑器上，也可使用鼠标右键平移时间线视图
* 向时间线曲线轨道添加了调整大小功能
* 为所有时间线轨道添加了共享矩形选择以选择关键帧
* 为时间线轨道添加了共享选中的关键帧移动能力
* 向关键帧和曲线编辑器添加了复制/粘贴功能
* 添加了关键帧编辑器，用于代理对象轨道上子轨道的关键帧
* 为在时间线中添加关键帧添加了 epsilon 钳位
* 为编辑场景动画添加了实时预览选项
* 添加了时间线轨道复制选项
* 添加了时间线轨道排序选项
* 添加了通过时间线背景选择时间线关键帧
* 添加了更改场景动画 Actor 轨道目标 Actor 的支持
* 在场景动画中为音频、后期处理和摄像机轨道添加了对多个媒体事件的支持
* 添加了曲线/关键帧选择或复制所有关键帧选项
* 添加了时间线撤销操作批处理
* 添加了从时间线删除媒体的选项
* 为 `Function<>` 和 `Delegate<>` 添加了 **C++ lambda 支持**
* 添加了在 Linux 上为 Windows 烘焙时编译仅 C# 脚本的选项
* 向内容菜单添加了选项 *选择使用此资源的 Actor*
* 添加了 `ContentItem.OnContextMenu`
* 添加了使 `AssetPicker` 只读的选项
* 为 Color32 到 Int4 添加了显式运算符
* 添加了 `Level::ScriptsReloaded` 事件
* 添加了 `CollisionMeshesPrefix` 选项，用于从模型资源导入碰撞数据
* 为 `GPUTexture` 更新添加了额外的 `UploadMipMapAsync`，支持自定义行/切片间距
* 向 GPUContext 添加了 `ClearUA`，用于使用浮点值清除纹理
* 添加了 `Content.GetAllAssets` 以获取项目中的所有资源 ID
* 向 `Control.Center` 添加了设置器
* 向 Unix 平台添加了缺失的内存性能分析事件
* 向动画模型上下文菜单添加了 **布娃娃支持** 和布娃娃生成工具
* 在 TextureTool 中添加了对某些格式的缺失支持
* 为 Linux 上的 BC7 纹理压缩添加了 `bc7enc16` 编码器
* 添加了 `Platform.Users` 以按平台处理用户
* 对数学类型进行了小幅调整
* 添加了 `Joint.SetJointLocation` 以便于关节设置
* 添加了 `Joint.SetJointOrientation` 工具
* 在 `PhysicsColliders` 调试视图中添加了物理碰撞体选择
* 添加了 **动画插槽** 节点，用于从代码在动画图中播放动画
* 向 Joint 添加了 `EnableAutoAnchor`，用于自动目标锚点设置
* 向 C++ 添加了 `Quaternion::FromDirection`
* 向模型预览添加了副切线向量调试
* 向 `MeshDataCache` 添加了 `Finished` 事件
* 添加了 `SoftAssetReference` 类型
* 向物理示例项目添加了布娃娃示例
* 添加了 **PS5 平台支持**（非官方）
* 向导航网格图块添加问题添加了错误代码记录
* 添加了双击以编辑时间线媒体属性
* 向编辑器状态栏添加了资源加载进度
* 添加了 Vulkan 管线缓存序列化
* 添加了 **动画事件**
* 添加了用于从原始字节保存/加载对象的 Json 序列化工具
* 添加了 `ScriptingObject::NewObject` 工具，用于在 C++ 中生成脚本对象
* 为粒子系统和动画时间线添加了加载文本信息
* 添加了时间线媒体选择和编辑，以与关键帧编辑器全局同步
* 添加了 `Level::ScriptsReloadRegisterObject`，以便在代码热重载期间更轻松地刷新脚本对象
* 为轮式车辆添加了轮胎摩擦缩放参数
* 通过 `SettingsBase` 简化了游戏或插件设置资源的使用
* 添加了 GameCooker 事件，用于游戏文件部署和打包
* 添加了 `StringAnsi` 序列化
* 添加了对自定义设置资源创建的支持
* 添加了 **在线系统**，支持 Steam、Xbox Live、PlayStation Network 和 Switch 的在线后端
* 改进了编辑器中对象生成和捕捉的功能，包括对象边界
* 在编辑器中为拖放添加了贴花生成
* 添加了在构建工具进程工具中抛出异常的选项
* 添加了对覆盖动画模型动画图输出的支持
* 添加了将对象引用作为脚本函数输出结果传递的支持
* 为某些打包向量类型添加了 ToString
* 如果使用此视图模式，在属性弹出窗口中添加了时间线媒体 `Start` 时间编辑（以秒为单位）
* 添加了用户禁用时间线媒体调整大小的选项
* 为碰撞烘焙添加了 `SuppressFaceRemapTable` 选项
* 添加了 `CollisionData.GetModelTriangle`，用于从射线投射命中信息中检索源几何体三角形索引
* 向 `RayCastHit` 添加了 `FaceIndex`
* 添加了对 `PrefabObject` 轨道的支持，以及在启用 `UsePrefabObjects` 时的自动化动画实例化
* 向 C# API 添加了 `Mathf.Frac`
* 添加了 **对 Visual Studio 2022 的支持**
* 向 String 索引运算符添加了断言，以防止无效内存访问
* 向 NetworkPeer 创建和 INetworkDriver 初始化添加了软失败
* 向 NetworkConfig 添加了 NetworkDriver 对象指针，以用作自定义接口实现
* 添加了在没有 C# 脚本的情况下编译和运行引擎的支持
* 为 C# 脚本中的 GPU 纹理添加了 `ResidentMipLevels` 的设置器
* 添加了在脚本 API 预处理中解析否定的支持
* 添加了 `ScriptingTypeHandle::IsSubclassOf`
* 添加了在编辑器中转换类型时自动保留基本关节属性
* 添加了 DotNet 目标构建
* 添加了在 Github Action 上作为 CI 运行的测试
* 向自动化的 Github CD 构建添加了 Vulkan
* 向 Github 上自动化的每日 `master` 构建添加了 macOS
* 添加了为从代码创建的纹理自动生成 Mip 的选项
* 向 `TextureBase` 添加了 `GetPixels` 和 `SetPixels`，以便于纹理数据编辑
* 为 Visject 曲面节点添加了箭头导航
* 向脚本字段/属性/方法/事件添加了 `Hidden` 特性
* 为 `ItemsListContextMenu`（由编辑器中的选择器使用）添加了键盘导航
* 添加了将单个本地化字符串表导出为 .pot 文件的选项
* 保存后向编辑器状态栏添加了通知文本，以提高用户意识
* 添加了将单个本地化字符串表导出为 .pot 文件的选项
* 为本地化字符串表添加了 `FallbackTable`，以将缺失文本重定向到其他语言
* 添加了对不支持 `R11G11B10` 纹理格式的旧 Android 设备的支持
* 为自定义编辑器演示添加了功能标志
* 为编辑器视口添加了游戏手柄摄像机控制
* 添加了 `Rectangle.Distance`，用于计算矩形与点之间的距离
* 向 Visject 曲面 API 添加了 `NodesConnected` 和 `NodesDisconnected` 事件
* 向 Visject 曲面参数 API 添加了 `OnParamEdited` 回调
* 添加了可视化脚本参数访问编辑（公共或私有）
* 添加了更改可视化脚本参数类型的选项
* 向可视化脚本添加了 **数组**
* 改进了 C# 脚本中 Variant 对数组的支持
* 向可视化脚本和动画图添加了数组常量节点
* 如果启用了调试数据，添加了为 D3D12 着色器导出 pdb 文件的支持
* 向在线 Flax 文档添加了 **C++ 脚本 API 文档**
* 将脚本枚举添加为 ScriptingType
* 添加了 `ScriptingEnum` 工具，为 C++ 脚本提供了有用的功能
* 添加了将枚举的 Variant 转换为字符串，以使用脚本枚举项名称
* 添加了对数组初始化器作为脚本字段默认值的支持
* 向空地形添加补丁时添加了自动设置
* 添加了 **UI 导航** 系统
* 为编辑器 UI 添加了 **Tab 导航**
* 在编辑器的运行模式中，添加了 `F11` 快捷键以最大化游戏窗口
* 添加了在内容窗口中保留创建的新文件夹的选择
* 添加了通过将 Actor 拖到 Actor 层级窗口的空区域来创建 Actor 的功能
* 向预制体层级面板添加了拖放功能，以便于使用
* 在文件导入对话框中为重命名项目添加了 `F2` 快捷键
* 添加了 `Split Objects` 对象，以将导入的网格/动画拆分为单独的资源
* 在动画图中添加了批处理相同函数输入的功能，以提高可用性
* 在 Variant 中添加了从向量类型到单类型的隐式转换
* 添加了粒子发射器和动画图函数文档
* 改进了本地化质量
* 向本地化设置添加了 `DefaultFallbackLanguage`
* 在文档中为 C++/C# 代码片段添加了拆分视图
* 添加了通过引用将值传递回 C# 脚本事件的支持
* 在内容查找器工具中为资源项添加了上下文菜单和工具提示
* 为 lambda 添加了 Function 构造函数
* 为编辑器工具提示添加了 Code Docs 模块
* 在编辑器中添加了 **托管程序集 xml 文档解析以用于工具提示**
* 在工具箱窗口中为 Actor 类型添加了文档工具提示
* 向场景树中的 Actor 和属性常规面板标题添加了工具提示
* 向 Dictionary 添加了对无可复制构造函数的可移动值类型的支持
* 添加了 `Math::SinCos`
* 为编辑器模块事件和启动添加了性能分析事件
* 添加了 `Task::StartNew()` 的重载，以支持返回 `void` 的成员函数
* 添加了以时间偏移绘制音频片段预览的选项
* 改进了 Android NDK 检测并防止异常
* 向 TilesPanel 的瓷砖添加了边距
* 向 Panel 添加了 `ScrollBarsSize`
* 添加了 `ScriptingTypeHandle::IsAssignableFrom`
* 添加了 `JsonAsset::GetInstance<T>`，以便于访问 C++ json 资源数据
* 添加了带有顶点颜色的 `Render2D::DrawTexturedTriangles` 变体
* 在曲线和时间线编辑器中为基于范围的选择添加了 Shift 键支持
* 添加了双精度向量（`Double2`、`Double3` 和 `Double4`）
* 向内容窗口添加了方向选项
* 添加了 `DebugDraw.DrawCone` 和 `DebugDraw.DrawWireCone`
* 添加了 `DebugDraw.DrawArc` 和 `DebugDraw.DrawWireArc`
* 添加了 `ScriptingObject::ToInterface` 和 `ScriptingObject::FromInterface`
* 在属性编辑器中为组面板添加了用于重置值的上下文菜单
* 在编辑器中聚焦或单击输入字段时添加了值自动选择
* 在脚本中添加了检查以防止从静态或密封类继承
* 当标题有过滤器匹配时，添加了显示 Visject 上下文菜单组
* 添加了 GDK 平台支持（通过 GDK 实现 Windows 支持的潜力，Xbox 主机的基础）
* 为 `MicrosoftGame.config` 添加了更多选项
* 添加了缺失的 flaxengine api 标签
* 为 Linux 实现了文件系统监视器
* 添加了 `PROFILE_CPU_ASSET`，用于资源相关的性能分析作用域区域
* 向构建平台添加了 `TryGetToolchain`
* 添加了 `Utilities::CountBits`
* 为粒子/动画作业事件添加了更多性能分析事件和命名
* 添加了记录内容数据库初始化开始时间
* 为 AA 和阴影质量添加了钳位，以防止无效使用导致崩溃
* 添加了 LOD 预览调试视图模式
* 添加了 **材质复杂度调试视图** 模型
* 为具有 `uint` 格式的缓冲区和纹理添加了 `GPUContext.ClearUA`
* 为 Development 配置添加了部署 `FlaxEditor.pdb`，以改进崩溃报告
* 添加了 **四边形过度绘制调试视图** 模式
* 向着色器编译器添加了性能分析事件
* 添加了使用 `DEPRECATED` 将脚本 API 标记为已弃用的支持
* 向 C++ 添加了 `PRAGMA_DISABLE_DEPRECATION_WARNINGS` 和 `PRAGMA_ENABLE_DEPRECATION_WARNINGS` 宏
* 为嵌套多个自定义编辑器的组面板添加了复制/粘贴功能
* 在编辑器中添加了将十六进制颜色值粘贴到 Color 属性的支持
* 向 C++ 添加了 `Vector::Angle` 函数
* 添加了 `ManagedBinaryModule::FindModule` 工具，用于 C# 类型类查找
* 改进了原生接口的使用
* 添加了对创建直接继承自 `FlaxEngine.Object` 的 C# 脚本对象的支持
* 添加了 **Linux 游戏手柄支持**
* 添加了支持 workingDir、env vars 和日志记录的 LinuxProcess
* 在 Linux 和 Android 上添加了内联的当前线程 ID
* 向 `HandleObjectDeserializationError` 添加了缺失对象的辅助父 Actor 记录
* 在游戏窗口中添加了 ShowGUI 和 ShowDebugDraw 的缓存
* 向碰撞数据添加了 `CookCollision`，支持 `int32` 类型的三角形索引
* 为网格更新 API 添加了对 `uint` 作为三角形索引的支持
* 添加了双精度数学库
* 向输出日志上下文菜单添加了 `Show in explorer`
* 向脚本面板工具提示添加了类型名称，并且不继承工具提示
* 向 Actor 添加了 `LookingAt`
* 添加了运行原生单元测试
* 将 Xbox Scarlett 和 Xbox One 支持更新到版本 GDK 2021.04 QFE5
* 优化了 Object 中的 `FindObject` 和 `TryFindObject`
* 优化了从 C# 调用 `Object.FindObject`
* 优化了单个撤销编辑操作，不再使用包装器
* 优化了内容查找器弹出窗口
* 优化了缩放非常高时的时间线背景渲染
* 优化了缩放非常高时的音频预览渲染
* 通过移除大小检查优化了 ThreadLocal
* 优化了 `AnimationUtils` 中的工具
* 如果长度不变，优化了 `String::ReserveSpace`
* 优化了 CPU 粒子实现部分
* 如果事件未使用，优化了 `Asset::onAssetLoaded`
* 通过内联优化了 Win32（Windows 和 Xbox）上的原子和互锁内存操作
* 优化了 `StringView` 比较运算符
* 优化了动画图状态机过渡规则评估，使其在状态评估之前进行，以便提前拒绝
* 优化了编辑器中 `PhysicsColliders` 模式的渲染
* 优化了调试绘制中的顶点缓冲区写入
* 通过使用碰撞体剔除，优化了大型场景的物理形状调试绘制
* 优化了 `Math.NearEqual`
* 优化了编辑器中的 UI
* 优化了 Linux 上的文件复制
* 优化了 `Vector3` 方法，使其更频繁地内联
* 优化了模型导入期间的模型数据访问
* 优化了工具箱中脚本类型的工具提示，使其在需要时解析
* 在移除工具提示后，将 `FlaxEngine.CSharp.dll` 大小优化了 300kB（将使用 xml 文档）
* 将引擎代码中的 C# 绑定优化为原生 ABI 与托管签名匹配的静态函数
* 调整了曲线和关键帧 UI，使其更易于使用鼠标操作
* 调整了时间线的曲线背景绘制
* 改进了刚体警告消息
* 将默认 UAV 槽位限制增加到 `4`
* 在 Linux 上禁用了光照贴图的压缩（由于 Alpha 编码质量低）
* 将内容加载线程数改为取决于逻辑核心数而非物理核心数（限制为 12）
* 将 NUnit 改为使用来自仓库的自定义构建，而不是 nuget 包
* 重构了刚体自动质量计算，以包含物理材质密度
* 重构了控件自动聚焦，由控件类型处理，而不是作为 `base.OnMouseDown` 的一部分
* 重构了 SoftObjectReference 以改进其使用
* 重构了时间线 UI 以使用轨道标志
* 将 Actor 中的 GetChildByPrefabObjectId/GetScriptByPrefabObjectId 重构为私有
* 重构了原生核心对象，以简化新用户的使用（`PersistentScriptingObject` 现在是 `ScriptingObject`）
* 重构了 **通过 GDK 而非 UWP 的 Xbox One 平台支持**
* 将 D6Joint 的默认 `D6JointMotion` 重构为 `Locked`
* 重构了从 PS 渲染到 UAV 时的 UAV 槽位绑定
* 重构了 `DownloadIndexBuffer` 以返回无符号数据
* 重构了预制体实例加载，以改进预制体对象之间的引用加载
* 重构了 `ContextMenuChildMenu` 以继承自 `ContextMenuButton`
* 在 Tracy 中重新启用了编辑器中的内存分配性能分析
* 从场景加载中移除了不安全的 `autoInitialize` 选项
* 修复了 `SIMD.h`
* 修复了 Windows 上 x86 的编译
* 修复了应用更改时，新预制体对象在其他预制体对象内部缺少引用的问题
* 修复了字符串函数中的各种错误
* 修复了 C# Json 序列化中空值的处理
* 修复了在需要空终止字符串的地方无效使用 `StringView::GetText()` 的问题
* 修复了嵌套场景动画播放的崩溃
* 修复了编辑器中环境探针烘焙
* 修复了在 Visject 中双击节点创建连接器节点
* 修复了编辑器中 Actor 属性差异或默认值还原的回归问题
* 修复了从 fbx 文件导入材质
* 修复了关节属性范围验证
* 修复了 D6Joint 序列化
* 修复了物理场景中只有非活动车辆时的崩溃
* 通过使用 OnDemand 模式，修复了 Tracy 性能分析器客户端分配内存的问题
* 修复了如果使用 `I` 作为接口名称前缀的限制
* 修复了 Flax.Build 控制台命令中的阴影空字符
* 修复了编辑器中默认代码编辑器的检测，以优先选择 VSCode 和 Rider 而非系统默认
* 修复了包围盒大小设置器
* 修复了自动属性序列化错误
* 修复了从每个网格具有多个材质的 FBX 文件导入的混合形状偏移
* 修复了两个控制器碰撞时物理层过滤器被忽略的问题
* 修复了在 Windows 上从用户原生程序集捕获堆栈跟踪
* 修复了 readme 中的拼写错误和措辞
* 修复了将材质拖到 CSG 笔刷表面时编辑器崩溃
* 修复了 PVS-Studio 检测到的代码质量问题
* 修复了由于在着色器函数可见性条件上使用了未知宏而导致的着色器解析错误
* 修复了在导入时调整带有 Alpha 的纹理大小以保留透明颜色（而不是黑色）
* 修复了混合形状脏顶点范围
* 如果特性具有不同的值 HasInvalidPathChar，修复了使用默认字段值的结构初始化
* 修复了 `CollisionsHelper::ClosestPointPointTriangle`（C++ 版本）
* 修复了 D3D11 上体积纹理 `UpdateTexture` 中的深度间距
* 修复了编辑器中 PluginManager 释放时可能出现的异常
* 修复了 Linux 上多个屏幕的 DPI 计算
* 修复了 Linux 上的 `MoveFile`
* 修复了 Linux 上路径中包含空格的文件的拖放
* 修复了 Linux 上如果消息框找不到请求的字体时的崩溃
* 修复了一些要暴露给 C++ 脚本的引擎 API
* 修复了游戏窗口中调试绘制的罕见崩溃
* 修复了来自嵌套 `SyncPointEditor` 的撤销修改通知
* 修复了在无图形后端的情况下烘焙游戏时导出应用图标
* 修复了在非 Windows 平台上调整大小时导出压缩纹理
* 修复了 GDK 平台上 Xbox Live 服务缺失的包含
* 修复了在生成的绑定代码中将 `Span<byte>` 传递给 C# 方法 thunk
* 修复了小窗口上游戏烘焙器平台选择器的布局
* 修复了材质中使用 Gameplay Global 并出现材质实例错误的问题
* 通过使用共享互斥锁，修复了广播中条件变量的使用
* 修复了模块化构建模式中的模块库链接
* 修复了材质、粒子或着色器格式更改时的游戏烘焙器缓存
* 修复了在编辑器中加载带有相对路径的项目引用
* 修复了文本框中的 `TargetViewOffset` 被隐藏
* 修复了着色器函数可见性解析，并向材质着色器添加了 `USE_EDITOR` 定义
* 修复了 Visject 曲面上下文菜单以聚焦选定项目的属性
* 修复了本地化仪表板
* 修复了 D3D12 上的聚光灯渲染
* 修复了 CPU 粒子缺失的 `Particle Position (world space)` 节点
* 修复了 Linux 上 Window 构建的编辑器 C# 绑定
* 修复了带有无边框窗口的 Windows Snap
* 修复了场景加载期间加载缺失预制体对象时缺少对象链接的问题
* 修复了从 fbx 文件导入的混合形状数据上的错误变换
* 修复了树节点使用方向键导航，使其对深层层级更可用
* 修复了上边缘和左边缘的景深模糊伪影
* 修复了 XAudio 后端在某些情况下的音频播放问题
* 修复了 XAudio 后端上的音频音量和立体声
* 修复了在编辑器中为树节点显示工具提示
* 修复了添加/移除导航网格边界体积时的导航网格更新
* 修复了引擎更新在落后时更快地追赶
* 修复了颜色选择器中 HSV 值调整不超过 1
* 修复了蒙皮模型的导入变换
* 修复了动画预览面板中缺失的根运动预览（带有禁用的选项）
* 修复了带混合的多重混合 1D/2D 根运动提取
* 修复了解析包含无效多行注释的脚本头时构建工具冻结
* 修复了模型数据导入时缺失的混合形状数据变换
* 修复了带撤销的颜色轨迹球使用
* 修复了在脚本 API 中将指针作为输出指针或引用传递
* 修复了蒙皮模型窗口预览中缺失的混合形状刷新
* 修复了多重混合 2D 节点的各种问题
* 修复了预制体更改应用崩溃
* 修复了材质窗口中 GUI 材质预览定位
* 修复了脚本绑定生成的 TypeInfo 中对指针的引用
* 修复了在 Unix 上如果长度为空，`StringUtils::ConvertANSI2UTF16` 中的无效内存写入
* 修复了在脚本 API 中使用 `PersistentScriptingObject` 的对象引用
* 修复了如果数据已有效，上传每个实例的顶点颜色
* 修复了 Linux 上带有自定义工作目录的 `RunProcess`
* 修复了由于缺失对象而导致的场景动画警告，每个轨道触发一次，避免垃圾消息
* 修复了对无代码游戏项目的支持
* 修复了将刚体吸附到地面
* 修复了使用字符串键在 Dictionary 中移除键
* 修复了粘贴 Visject 节点时类型与原型相比被修改的一个错误
* 修复了预制体窗口的自定义 Actor 选项
* 修复了生成的 `DefaultValue` 特性以匹配字段值类型
* 修复了 `Plane.Normalize` 中可能的除以零
* 修复了在编辑器中使用暂停模式启动进入运行模式
* 修复了 `Input::GetGamepadAxis` 与 `InputGamepadIndex::All`
* 修复了如果 AnimatedModel 尚未初始化，缺少姿态访问
* 修复了为关节限制使用超过 180 度角度时的错误
* 通过使用 `MikkTSpace`，修复了使用 OpenFBX 后端的网格切线和副切线向量生成
* 修复了 D3D11 上动态缓冲区更新中缺少的复制目标偏移
* 修复了 Visject 参数节点获取器在参数更改为相同类型时断开连接
* 修复了可视化脚本中的 Get/Set 字段节点，以相应地更新静态字段的 Instance 框
* 修复了被引用插件使用的原生代码模块的整体式目标构建
* 修复了 `BoundingFrustum::GetCorners` 中可能的除以零
* 修复了时间线背景的鼠标焦点问题
* 修复了自定义编辑器中无符号整数的 `DefaultValue` 特性支持
* 修复了无符号整数类型的编辑器撤销
* 修复了平台设置中的纹理引用为 SoftObjectReferences 而不是原始 Guid
* 修复了在多个线程上同时为原生对象创建 C# 对象时的崩溃
* 修复了应用包含已移除和已添加对象的预制体时的崩溃
* 修复了流式传输 GPU 驱动程序不支持的格式的纹理时的崩溃
* 修复了在 RingBuffer 已满时从中读取的崩溃
* 修复了在异步中为未模拟的 Actor 更改网格碰撞体时的崩溃
* 修复了如果纹理流式传输在 Vulkan 上因回退使用而使用不同纹理格式失败时的崩溃
* 修复了在已分离的原生线程上生成托管对象时的崩溃
* 修复了在调试期间尝试从局部作用域读取无效可视化脚本参数时的崩溃
* 修复了模型或蒙皮模型加载失败时的崩溃
* 修复了 Vulkan 交换链调整大小时如果之前大小为 0（例如由于 Windows 11 上的窗口动画）的崩溃
* 修复了将带有 lambda 的函数传递给作业系统时的崩溃
* 修复了使用 Mono 运行时的线程结束时的崩溃
* 修复了预制体窗口中地形的崩溃
* 修复了由于编辑器中脚本热重载导致的 JsonAsset 中原生类型的崩溃
