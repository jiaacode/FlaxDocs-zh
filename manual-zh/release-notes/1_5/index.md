# Flax 1.5 发布说明

## 亮点

### 高级网络

![Flax 引擎更新中的高级网络](/manual/media/title.png)

完整的 **多人游戏支持** 现已登陆 Flax！这是最受期待的功能之一，现在它已准备好在游戏中使用。在此更新中，我们实现了 *高级网络* 层，其中包括网络上的 **对象复制**、远程过程调用（**RPC**）、**对象所有权** 概念以及服务器权威模型。

新的网络组件允许在服务器-客户端架构中快速创建多人游戏（包括自托管游戏）。Flax 网络层将自动处理连接设置、数据复制以及网络上的对象生成（例如，将玩家预制体生成到所有客户端）。C++ 和 C# 脚本都支持新的 `NetworkReplicated` 特性（标记字段/属性以进行自动复制）、`NetworkRpc` 特性（将函数标记为 RPC）以及 `INetworkObject` 接口（用于自定义网络对象生命周期）。

要了解有关高级网络的更多信息，请参阅新的[文档](../../networking/high-level.md)。

### Arizona 框架

![Arizona 框架示例](/manual/media/arizona-sample.gif)

**Arizona 框架** 是一个即用型开源框架，用于在 Flax 中创建游戏，可在 [Github](https://github.com/FlaxEngine/ArizonaFramework) 上获取。它作为一个插件创建，可以添加到你的游戏项目中。Arizona 框架具有游戏开发中常用的核心游戏架构概念，例如 `Game Mode`、`Game State`、`Game System`、`Player State`、`Player Pawn`、`Player Controller`、`Player UI` 等。它易于扩展，并内置了对多人游戏的支持（包括高级网络和本地合作）。

为了展示此框架的示例用法，我们创建了一个示例第一人称射击游戏项目 [Arizona Framework Sample](https://github.com/FlaxEngine/ArizonaFrameworkSample)。如果你计划使用 Flax 创建多人游戏，可以将其用作新项目的基础。

### ImGui 插件

![Flax 引擎的 ImGui 插件](/manual/media/imgui-flax-engine.png)

[Dear ImGui](https://github.com/ocornut/imgui) 是一个无冗余的 C++ 图形用户界面库，常用于游戏开发中的工具和调试界面创建。我们创建并发布了一个用于 Flax 游戏的[官方插件](https://github.com/FlaxEngine/ImGui)，以集成 ImGui 并在 C++/C# 脚本中使用它。请参阅仓库自述文件，了解如何在你的游戏项目中使用它。

### 性能优化

![性能优化 Flax 引擎 CPU 性能作业系统](/manual/media/scene-drawing-cpu-job-system-optimize.png)

每次 Flax 更新都会带来各种性能改进。这次我们专注于游戏渲染的 CPU 优化。现在，渲染器使用 **多线程绘制调用** 收集（通过 *作业系统*），材质着色器常量被分离为 *每视图* 和 *每绘制* 数据，**阴影渲染与主视图批处理**，网格绘制更快，等等。这为大型场景（10k+ 网格）或具有许多阴影光源的关卡带来了巨大的性能提升。场景渲染完全多线程化，吞吐量更大。此外，现有的图形功能，如 [DDGI](../../graphics/lighting/gi/realtime.md) 或 [全局 SDF](../../graphics/models/sdf.md)，已针对更大的游戏制作进行了优化。

上面你可以看到来自 Tracy 性能分析器的示例视图，显示了 Library 演示（建筑可视化场景）的 CPU 帧时间，该场景有 30 多个完全阴影化的光源和 10k 个网格。

### 层级标签

![游戏开发的新层级标签](/manual/media/hierarchical-tags.png)

新游戏标签现已登陆 Flax！带有命名空间的 **层级标签** 可以增强游戏编程。现在，Actor 拥有这些标签的列表，使它们更易于使用。此外，新的编辑器支持简单的标签选择，可以在其他游戏系统中使用（例如，玩家武器、动画或能力设置）。标签是一种轻量级且可扩展的解决方案，适用于组织良好的游戏制作。

这个新系统的重要功能是新的 API，例如 `Tags.Get`、`Tags.HasTag`、`Tags.HasAnyExact`、`Tags.HasAll` 等，这些功能提高了代码中的可用性。

### DLSS 插件

[NVIDIA DLSS](https://www.nvidia.com/en-us/geforce/technologies/dlss/) 是人工智能驱动的图形升采样技术的革命性突破，可大幅提升性能。为了简化将此技术集成到 Flax 游戏中的过程，我们发布了一个包含 DLSS 集成的官方插件供开发者使用。[适用于 Flax 引擎的 DLSS](https://github.com/FlaxEngine/DLSS) 可在 Github 上获取，并支持 *DLSS 3.1*。

### 编辑器改进

![GPU 内存性能分析器](/manual/media/gpu-memory-profiler.png)

Flax 编辑器正在持续开发中，旨在成为最佳游戏编辑器，这次我们主要致力于：

* **GPU 内存** 性能分析器 - 允许检查每个资源的图形内存使用情况。双击打开相关资源（例如创建资源的纹理或模型），使用工具提示检查资源描述（例如缓冲区标志或纹理格式）。
* **资源性能分析器** - 显示所有已加载的资源，包括每个资源的内存使用情况（CPU 内存、估算值）、类型和引用计数。右键单击检查资源（例如，选择使用它的 Actor 或显示引用图），双击在编辑器中打开。这在分析性能和内存使用情况时非常有用。
* **改进的 Gizmo 工具** - 更大的可读性和带有 2 轴模式的缩放工具。
* **新的 Actor 图标** - 编辑器视口图标已重做，具有清晰一致的风格。
* **改进的属性面板组** - 现在编辑器中的组面板具有轮廓、更大的标题和展开状态图标，这提高了可用性并使 UI 更直观。
* **编辑器可用性** - 大量生活质量改进，以帮助开发者使用 Flax 编辑器（例如，重新组织的上下文菜单）。
* **自定义游戏视口大小** - 在开发跨平台游戏时，可用于测试移动显示器或固定游戏屏幕宽高比。

### 即将推出的 .NET 7

最近，我们[开始更新](https://github.com/FlaxEngine/FlaxEngine/pulls?q=is%3Apr+NET7)到最新的 [.NET 7](https://devblogs.microsoft.com/dotnet/announcing-dotnet-7/)，用于 C# 脚本。你可以在 [dotnet7](https://github.com/FlaxEngine/FlaxEngine/tree/dotnet7) 分支上测试它，并在[路线图](https://trello.com/c/xgS3TphU/351-net-7)上预览进度。希望它能在下一次 `1.6` 更新中准备就绪，这意味着：
* .Net Framework 支持现已弃用，我们将迁移到最新的 .Net 7
* Visual Studio 2017 和 2019 将不再受支持（由于 .Net 7 SDK 需要 VS 2022）
* 任何第三方 C# 库都需要使用 .Net Core/Standard 重新构建
* .Net 7 SDK 将成为编辑器的系统依赖项（烘焙游戏作为独立应用）

此更改的好处：
* 更好的性能（新的 GC、新的 JIT、优化的标准库）
* 最新 C# 11 支持
* 能够在 VS 2022 中使用混合原生/托管调试器
* 通过 `AssemblyLoadContext` 实现的新编辑器代码热重载（比当前的[自定义解决方案](https://github.com/FlaxEngine/mono)更安全）
* 未来对更新 .Net 版本的无缝支持

## 迁移指南

### PostProcessEffect 更改

在此更新中，我们添加了在 C++ 脚本中实现 `PostProcessEffect` 的支持——以前这是仅限 C# 的功能。为此，`PostProcessEffect` 和 `SceneRenderTask` API 都进行了轻微修改：
* `Location`/`UseSingleTarget`/`Order` getter 已更改为字段，可以从代码中调整（在构造函数或运行时）。
* `CanRender` getter 已更改为 `CanRender()` 虚方法，可以重写以提供自定义的后期处理效果渲染可用性检查。
* `RemoveCustomPostFx` 和 `GlobalCustomPostFx` 列表已移至 C++，因此使用 `AddCustomPostFx`/`RemoveCustomPostFx` 和 `AddGlobalCustomPostFx`/`RemoveGlobalCustomPostFx` 来使用自定义效果扩展渲染。附加到摄像机 Actor 的 `PostProcessEffect` 脚本将像以前一样继续工作。
我们更新了文档、代码示例和所有官方插件以反映这些更改。

### UWP 平台弃用

UWP（Windows 商店）平台已被弃用，并将很快被移除。作为替代，我们将引入 Windows GDK 平台（基于现有的通过 GDK 的 Xbox 平台支持），这将允许开发者为所有 Windows 设备（ARM、Hololens、Xbox 等）进行开发。我们做出这一决定是因为 UWP 支持不佳且未被广泛使用（部分原因是微软方面过于复杂的技术/设计决策）。

## 更新日志

### 版本 1.5.6339 - 2023年3月1日

贡献者：mafiesto4、GoaLitiuM、Tryibion

合并的 PR：4

* 为 C++ 脚本使用，向平台特定类添加了 `FLAXENGINE_API`
* 向工具箱添加了 *布娃娃* Actor
* 在 Linux 上添加了更好的 C++ 标准库版本检测
* 添加了 `LinuxFileSystem::ShowBrowseFolderDialog`
* 在非 Windows 平台上添加了对 `BC4`、`BC5` 和 `BC7` 格式解压缩的支持
* 添加了在 Linux 或 Mac 上构建 Android 应用的支持
* 修复了 `Tag` natvis 调试器打印
* 修复了带有 `Tag` 的 `Level::FindActors`
* 修复了交叉编译时使用系统中的 Vulkan SDK 头文件
* 修复了在 *SearchBox* 中悬停在取消按钮上时光标未从 `IBeam` 变为默认的问题
* 修复了全局表面图集的稳定性，以随时间平滑对象剔除缓冲区容量

### 版本 1.5.6338 - 2023年2月19日

贡献者：mafiesto4、realDLPS、mlavik1、iainmckay、Tryibion、Crawcik、cristhofermarques、RuanLucasGD、PrecisionRender、plemsoft、GoaLitiuM、Withaust、envision3d、Swiggies、pacyfist、W2Wizard

合并的 PR：111

* 在 Visject 曲面中添加了向鼠标位置的缩放
* 添加了在拖动 UI 控件时隐藏工具提示
* 为 VS Code 添加了 `FlaxEngine` 项目文件生成
* 向构建工具添加了 `DontCompress` 配置
* 添加了对脚本类型中已弃用属性反序列化的支持
* 使内容窗口搜索字段保持固定，以便搜索栏不会随内容项目滚动
* 添加了 **新的 Actor 编辑器图标**
* 添加了在删除 Actor 时执行布局，并在执行操作时滚动到复制的/粘贴的 Actor
* 在编辑器中添加了 **自定义游戏视口大小**
* 添加了场景面板，将树与搜索栏分开，并在重命名时使其不滚动
* 添加了 Actor 虚函数 `OnDebugDraw`/`OnDebugDrawSelected`/`OnEnable`/`OnDisable` 以在脚本中重写
* 添加了 `TypeNameEditor`，用于将类型名称引用编辑为软字符串值
* 添加了游戏设置资源加载（不仅仅是对象）
* 向 `Game` 菜单列表添加了 `Cook&Run` 和 `Run cooked game` 工具，用于多人游戏测试
* 添加了在运行时编辑 JsonAsset 数据的支持（例如，即时修改游戏设置）
* 在脚本绑定中添加了对自定义类型/成员特性解析的支持
* 在 TaskGraph 中添加了对自定义 Action Command 的支持
* 在脚本 API 绑定中添加了对 `DataContainer` 的支持
* 在 `ViewportIconsRenderer` 中添加了对 Actor 自定义图标的支持
* 在资源编辑器中为粒子预览添加了播放/暂停小部件和按键绑定
* 为脚本 API 类型添加了自定义标签，供插件使用
* 添加了在文本框中单击左键提交文本
* 向 C++ 脚本 API 添加了 `SceneReference`
* 向 `BuildSettings` 添加了 `AdditionalScenes`
* 添加了 `ViewFlags::Sky` 用于条件性天空/天空盒渲染
* 为脚本参数添加了 `DefaultValue` 支持
* 为自定义后期处理位置添加了 `AfterGBufferPass` 和 `AfterForwardPass`
* 添加了 `Renderer::DrawActors`，用于在自定义渲染通道中快速渲染 Actor
* 为内置基本网格添加了简化碰撞体
* 为编辑器中的拖放面板添加了新 UI（更大的标题、可展开的箭头图标和引导线）
* 添加了 `RenderBuffers::LinkedCustomBuffers`，以在子渲染视图中重用主游戏视口渲染状态（例如 GI）
* 添加了 `GPUContext::SetBlendFactor`
* 为透明度排序添加了可绘制对象类型的 **SortOrder** 覆盖
* 在脚本 API 中添加了对 `StringAnsi` 的支持
* 添加了 `NetworkTransform` 组件
* 为传输层添加了网络统计 API
* 向 C# 脚本添加了 GBuffer 纹理
* 添加了编辑器搜索字段在单个字符查询上的使用（而不是最少 2 个字符）
* 为低级网络传输层添加了用于延迟模拟的 `NetworkLagDriver`
* 添加了对脚本属性函数不同访问级别的支持
* 在预制体窗口中生成 Actor 后，从父 Actor 添加了 Layer 和 StaticFlags
* 在脚本 API 函数参数中添加了对带有转换的非 const 引用参数的支持（例如字符串或数组）
* 添加了 **带有作业系统的多线程场景渲染**
* 在绘制调用收集期间添加了绘制调用排序键生成（异步）
* 向后期处理材质场景纹理添加了 `WorldPosition`，用于在 UV 处采样世界空间位置
* 添加了 `GPUDevice::CreateConstantBuffer`，用于自定义常量缓冲区使用
* 添加了覆盖类型数组的自定义编辑器的选项
* 为新标签系统添加了 `Tag` 和 `Tags`
* 向 `Level` 添加了带有 `Tag` 的 `FindActor`/`FindActors`
* 向 `PhysicalMaterial` 添加了 `Tag`，用于物理表面标记
* 为脚本功能添加了单元测试
* 在构建工具检查的包含缓存中添加了第三方文件
* 为各种脚本绑定功能添加了更多测试用例
* 向 Visject Surface 添加了更大的输入值框
* 向编辑器选项添加了 `UseAssetImportPathRelative`，并默认使用它来存储相对于项目文件夹的导入资源路径
* 添加了 VS2022 支持以构建 UWP 平台
* 在地形雕刻撤销/重做时添加了导航网格更新
* 添加了 `this` 到 `API_PARAM`，用于类型的静态方法扩展
* 当雕刻操作结束时，添加了延迟导航网格更新以防止卡顿
* 在 `AssetRefEditor` 中添加了编辑资源路径的支持
* 添加了 **程序化纹理采样** 材质节点（随机）
* 在编辑器状态栏上添加了自动保存提醒弹出窗口
* 添加了 `Color.FromRGBA`
* 向 C# 添加了 `RandomStream`
* 向 C# 和可视化脚本添加了 `RandomUtil.Rand` 方法，用于快速生成 `[0;1]` 范围内的随机浮点数
* 在编辑器中的状态栏添加了脚本编译失败状态
* 向 `Flax.Build` 工具链添加了 `TargetCompiler`
* 使从 Actor 上的添加脚本按钮单击创建的上下文菜单居中
* 添加了 **C++ 文件包含缓存序列化，以改善增量构建时间**
* 在编辑器的搜索字段中添加了取消按钮
* 向按钮添加了悬停开始和结束事件
* 添加了防止生成抽象 Actor/Script 类型
* 添加了 `RenderSetup`，并允许游戏玩法和后期处理自定义它
* 添加了 `RenderingUpscaleLocation`，用于自定义渲染管线中升采样器的位置
* 向场景树添加了脚本拖放支持以重新设置父级
* 添加了带有索引缓冲区的 `Render2D.DrawTexturedTriangles`
* 添加了 `FlaxEngine.Object.FromUnmanagedPtr`，用于将原生对象原始指针转换为托管对象
* 为脚本绑定添加了 `ScriptingTypeHandle` 作为 `System.Type`
* 为 `NetworkMessage` 添加了 `WriteStructure`/`ReadStructure` 工具
* 为 C++ 类型中的 `NetworkReplicated` 字段添加了自动网络序列化器生成
* 将 Actor/文件夹树节点的重命名框位置改进为从标签开始，以获得更好的用户体验
* 添加了独立于项目的已保存窗口布局（全局存储）
* 改进了内容项目树组织，以获得更好的用户体验（游戏项目优先，结束项目最后）
* 向 `Flax.Build` 添加了 `Mono.Cecil`
* 为插件初始化/反初始化添加了性能分析事件
* 向编辑器添加了 **GPU 内存性能分析器**
* 添加了 `ViewFlags::Sky` 用于条件性天空/天空盒渲染
* 为池化渲染目标添加了命名，以便于 GPU 内存使用调试
* 向 `GPUContext` 添加了 `SetResourceState` 和 `ForceRebindDescriptors`，用于与外部渲染库集成
* 添加了对后期处理效果中 `CanRender` 依赖于特定渲染设置的支持
* 向 `GPUAdapter` 添加了 `GetNativePtr`
* 添加了在编辑文本框时将鼠标光标更改为 I 型光束
* 向 `Mouse` 和 `Gamepad` 添加了 `IsAnyButtonDown` 工具
* 向 `Float2` 和 `Vector2` 添加了 `Normalized`
* 在 Linux 上添加了对使用系统安装的 Vulkan SDK 的支持
* 向游戏代码定义添加了 `FLAX_X_Y_OR_NEWER`
* 向 C++ 游戏脚本添加了引擎版本定义
* 添加了用于独立于分辨率的 UI 的 **画布缩放器** 控件
* 为生成的粒子系统添加了仅开发名称
* 在 `GetScript` 中添加了对接口类型的支持
* 为动画资源添加了导入缩放跟踪选项
* 向 `BlurPanel` 添加了 `BlurScaleWithSize`，用于独立于分辨率的模糊
* 在属性窗口中为统一缩放添加了 Actor 缩放链接和取消链接（*右键单击*）
* 向 Asset 添加了 `MemoryUsage` 属性，用于估算 CPU 内存压力
* 为各种资源类型添加了内存使用查询
* 向编辑器添加了 **资源性能分析器**
* 在使用 Assimp 模型导入器时添加了对法线生成的支持
* 向内容窗口添加了侧鼠标按钮快捷键
* 添加了在编辑器中拖动最大化窗口的功能
* 向动画图添加了 **动画实例数据节点**，用于缓存每模型值
* 为地形块几何体添加了对 32 位索引的支持
* 添加了 `JsonAsset.Save`
* 在编辑器中添加了 **更新的变换 Gizmo**
* 在 Linux 上添加了对文件对话框的更好支持
* 在 Linux 上优先选择 LLVM 链接器而非其他链接器（更快的链接时间）
* 向 `PostProcessEffect` 字段添加了序列化，并在编辑器的子组中公开它们
* 在内容窗口中为新建资源添加了分组
* 添加了 `ContentContextMenu` 特性，用于自定义资源创建分组
* 添加了 `ActorContextMenu` 特性，用于自定义 Actor 创建分组
* 添加了 `ActorToolbox` 特性，用于在编辑器工具箱中对 Actor 进行分组
* 向材质/着色器源代码查看器添加了滚动条和可调整大小的窗口
* 为 Actor 上下文菜单创建添加了一种新方法（通过 `ActorContextMenu` 特性）
* 在编辑器中点击时不再关闭子上下文菜单
* 在骨骼遮罩编辑器中为 Shift 键添加了在点击时影响子骨骼的功能
* 向 `TextBoxBase` 添加了 `KeyDown` 和 `KeyUp` 事件
* 添加了值框隐藏光标并在完成后将其返回到其位置的功能
* 添加了缓存主编辑器视口的变换捕捉启用状态和值
* 添加了在滑动值框或调整停靠窗口大小时的视觉光标变化
* 添加了移动属性拆分器的光标变化
* 添加了对在 fmt 标头中包含额外格式字节的 WAV 文件的导入支持
* 在构建脚本中为预览版 Visual Studio 添加了对 MSBuild 的支持
* 改进了编辑器内容视图中的项目放置
* 添加了对使用 `_` 字符的导入 LOD 网格的支持（例如 `mesh LOD_1`）
* 向 Assimp 导入器添加了 `aiProcess_SortByPType`，以减少多几何类型导入的伪影
* 在编辑器重命名弹出窗口外部添加了左键单击重命名
* 向三平面纹理节点添加了 `float3` 缩放
* 改进了编辑器 Gizmo 绘制顺序
* 在 Github Actions CI 中在 Windows 上添加了运行测试
* 改进了拖放工具提示在操作开始时的隐藏
* 改进了导入 FBX 模型文件时的法线贴图检测
* 如果已压缩，改进了 DDS 文件导入时间
* 改进了滚动速度，使其在编辑器中感觉不那么迟钝
* 将 `GetNonTerminatedText` 重构为 `StringView` 中的 `GetText`
* 重构了原始数据 `ReadStream` 和 `WriteStream`，使其具有更易于使用的 API 和更多功能
* 将 **Actor 标签重构为层级可重用标签** 系统，以实现更好的游戏脚本
* 重构了材质着色器，以使用单独的常量缓冲区（槽位 1）存储共享的每视图常量
* 重构了场景渲染，以分离可绘制的 Actor
* 使用 `__underlying_type` 和新的 `EnumHasAnyFlags`/`EnumHasAllFlags`/`EnumHasNoneFlags` 重构了枚举标志
* 重构了场景渲染，以对主视图和阴影投影使用批处理剔除
* 由于问题和复杂性，重构了 `ObjectsRemovalService` 以跳过双缓冲
* 重构了 `PostProcessEffect` 以支持 C++ 脚本
* **UWP（Windows 商店）平台已被弃用**，并将很快被移除
* 移除了双击重命名内容项
* 移除了 `GPUResourcesCollection`，改用 `GPUDevice` 以简化代码
* 移除了旧的 `RT1_FloatRGB` 和 `RT2_FloatRGB`，改用池化渲染目标
* 将 C# `GPUBufferDescription` 中的属性 `GetElementsCount` 重命名为 `ElementsCount`
* 将图形 PSO 中的 `DepthTestEnable` 重命名为 `DepthEnable` 以匹配实际逻辑
* 降低了渲染目标池刷新频率以防止内存波动
* 更新了 DefaultLensDirt 和 DefaultLensStarburst 纹理以减少 GPU 内存使用
* 升级了 GPU 限制以支持 16k 纹理
* 将脚本成员顺序默认更改为声明顺序
* 优化了编辑器摄像机预览的更新性能
* 优化了景深效果的 GPU 内存使用
* 优化了 `BoundingFrustum::Intersects(BoundingSphere)`
* 优化了全局 SDF 级联更新间隔（每帧最多 1 个级联）
* 当场景大部分为静态时，优化了全局 SDF 在 CPU 上的性能
* 优化了 D3D11 上的 `GPUBuffer`，在读取暂存回读缓冲区时不会卡顿 CPU
* 优化了各种调试视图的性能
* 优化了 GPU 资源名称，防止频繁更改名称时的内存分配
* 修复了 Linux 上的上下文菜单和工具提示更稳定
* 修复了用鼠标光标拖动时间线结束边缘
* 修复了数学节点大小
* 修复了材质着色器常量包含无效数据的潜在罕见问题
* 修复了当帧 X 与 Y 不同时 `Flipbook` 材质节点的错误
* 修复了使用 `-skipCompile` 参数从 IDE 启动编辑器时缺失游戏脚本类型的问题
* 修复了编辑器中锚点下拉 UI 关闭的问题
* 修复了编辑结束时文本框失焦
* 修复了对象引用类型上的比较运算符
* 修复了当层和标签设置中的层少于 4 层时矩阵中的附加层
* 修复了 SSR 设置的后期处理效果体积中缺失的 `TraceMode` 混合
* 修复了子菜单箭头图像，以适应项目数量超过最大值时显示滚动条的情况
* 修复了 Linux 上来自 KDE Plasma 的 DPI 查询处理
* 修复了 Linux 上的进程创建，以防止在读取进程输出管道时死锁
* 修复了 Linux 上居中窗口和消息框位置（多显示器桌面）
* 修复了 `LinuxFileSystemWatcher` 在子目录中不工作的问题
* 修复了在 Linux 上使用 Rider 运行 VC++ 项目构建命令
* 修复了 Clang 15 或更高版本的编译器警告
* 修复了加入已退出线程时的错误
* 修复了 `Mesh` 数据下载以支持尚未流式传输的顶点/索引数据收集
* 修复了针对仅 C# 模块的链接
* 修复了使用自定义功能集渲染
* 修复了通过 C# API 在网络上的空字符串序列化
* 修复了编辑器属性面板中第一个属性名称首字母为大写
* 修复了时间抗锯齿以提供更好的质量输出
* 修复了 `OnSceneUnloaded` 事件包含有效的场景对象
* 修复了 Vulkan 上的 `GetNativePtr`
* 修复了 UI 控件在被禁用/隐藏/重新设置父级时残留的状态
* 修复了导入的着色器源最后一个字符值，以防止版本控制系统中的奇怪差异
* 修复了 Visual Studio Code 的 Intellisense 问题
* 修复了 Clang 平台上托管脚本中本地脚本接口方法重写
* 如果指针已经是有效对象，修复了 `ScriptingObject::FromInterface` 返回对象
* 修复了脚本中递归二进制模块的使用
* 修复了在绑定生成中读取类型继承时末尾带有注释的问题
* 修复了 Visject 曲面输入框颜色在缺少连接类型但具有类型提示时的显示
* 修复了音频源停止/播放配对以正确重新启动流式音频片段
* 修复了在 OpenFBX 中读取文本数组时缺失的输出清除
* 修复了在编辑器中必须向左打开时子上下文菜单位置
* 修复了图形设置中的拼写错误，从 'Uee HDR Probes' 改为 'Use HDR Probes'
* 修复了在编辑器中游戏和编辑器插件的批处理显示
* 修复了 C++ 中无效的 NetworkMessage 使用
* 修复了预制体编辑器窗口界面的各个方面
* 修复了当光标缓慢滑动到屏幕边缘时，鼠标翻转到另一屏幕边缘并再次返回的问题（仅限 Windows）
* 修复了鼠标翻转（一些使用鼠标跟踪的滑块也会更新鼠标翻转的帧，导致错误的滑动增量）
* 修复了在 C# 中使用嵌套引用构建中的依赖模块
* 修复了自定义动画片段帧范围导入以正确处理帧索引
* 修复了在脚本 `OnStart` 中设置 `Screen.CursorVisible` 的错误
* 修复了音频片段流式传输在音频源播放时的线程安全问题
* 修复了在 Windows 上使用大写路径启动编辑器时，如果缓存是小写路径，资源注册表的问题
* 修复了在编辑器中拖动最大化的停靠窗口以恢复大小
* 修复了未选择资源时 `ParticleEffect` 属性编辑器的问题
* 修复了生成的 Visual Studio Code 项目文件中的 cpp 包含路径
* 修复了在 Linux/Mac 上压缩时的问题（当未安装 `zip` 包时）
* 修复了 `FlaxEngine.CSharp` 库文件引用
* 修复了加载场景时的全局 SDF 光栅化
* 修复了不正确的天空盒立方体贴图缓存脏间隔
* 修复了 Visual Studio 解决方案中重叠的 VC++ 和 CSharp 项目
* 如果在游戏脚本模块加载之前加载，修复了游戏设置的自定义 json 资源使用
* 修复了 `Array` 和 `BitArray` 上的比较运算符
* 修复了 GPU 缓冲区映射的线程问题
* 修复了视口选项中的默认值
* 修复了 `Flax.Build` 中 Windows 上的 `xcopy` 路径
* 修复了脚本中 `SceneReference` 使用缺失的脚本和序列化扩展
* 如果粒子模块从其他模块重用图，修复了粒子模块初始化
* 修复了带状粒子三角形索引顺序以防止伪影
* 修复了 `DownloadMeshData` 中的错误，以在 `Finished` 事件期间正确访问数据
* 修复了属性面板中的编辑器值比较以匹配序列化器规则
* 修复了音频设置在编辑器运行模式启动时未应用多普勒因子的问题
* 修复了忽略因缺少 NDA 控制台包而发出的警告
* 修复了角色控制器的 `Up Direction` 默认值
* 修复了在角色控制器上使用 `Center` 属性
* 修复了 GPU 限制被钳制到编译时限制
* 修复了 UI 控件上的 `Set Type` 按钮居中
* 修复了当父上下文菜单被用户重新聚焦时，子上下文菜单子弹出窗口仍然打开的问题
* 如果 thunk 指向偏移量为 0 的 vtable 索引，修复了 C# 中缺失的虚拟 C++ 函数重写
* 修复了 `VisualStudioInstance.GetInstances()` 从最新到最旧排序
* 修复了在 Windows 上拖放结束时的辅助鼠标按钮弹起事件
* 修复了将引用类型从脚本事件传回原生代码
* 修复了注册表中线程双重释放的断言
* 修复了无效的 `Math::RoundUpToPowerOf2`
* 修复了通过新的单元测试时脚本绑定使用边缘情况的问题
* 修复了在重写的脚本方法中返回 `bool` 值时的崩溃
* 修复了使用非常低渲染分辨率时 SSAO 的崩溃
* 修复了通过生成的绑定从托管回调中拆箱整数值类型时的崩溃
* 修复了在 PostFx 全局图形设置中使用材质时（资源在 GPU 初始化之前加载）的崩溃
* 修复了由于自定义 JsonAsset C++ 实例导致的关闭时崩溃
* 如果源动画没有有效的根节点动画，修复了根运动提取的崩溃
* 修复了在调用期间从其他线程取消绑定 `Delegate` 时的崩溃
* 修复了着色器缓存文件为空时的崩溃
* 修复了由于文件查找操作失败导致的内容存储崩溃
* 修复了由于使用 `StringView` 导致的输入操作/轴查找中的缓存问题
* 修复了将空数据跨度复制到 `DataContainer` 时的崩溃
* 修复了在交换链未准备好时呈现任务时的崩溃
* 修复了由于剩余的 `DefaultInstance` 对象导致的退出时崩溃
