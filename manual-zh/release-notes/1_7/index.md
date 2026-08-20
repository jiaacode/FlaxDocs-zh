# Flax 1.7 发布说明

## 亮点

### 更好的许可协议

Flax 引擎最终用户许可协议（**EULA**）已更新，在某些方面变得更加宽松。我们相信当前的收入分成模式运作良好，并且对于我们提供的工具和引擎来说是一个公平的价格（每个日历季度总收入超过 25 万美元的部分收取 4%）。然而，我们希望 **放宽许可条款，以造福我们的用户**。进行了以下更改：

* *删除了撤销或终止许可的权利。*

`期限和终止` 部分已被移除。我们将无法取消任何人的许可。

* *增加了每个日历季度最多修改一次许可的限制。*

`协议修订` 部分已更新，将可能的 EULA 修改限制为每个日历季度一次（与之前无限制的修订数量相反）。在过去的 3 年里，我们只更新了 EULA 两次：两次都是为了我们的用户。我们致力于提供稳定的许可条款，为我们的客户带来更多信任。

* *增加了在修订时继续使用先前 EULA 版本的能力。*

`协议修订` 部分已更新，允许用户继续使用先前的 EULA 版本，而无需接受新的版本，只要你继续使用许可更新之前的引擎和工具版本即可。例如，如果你使用当前 EULA 开始使用 Flax 1.7 开发游戏，并且在你的项目开发期间（例如，在接下来的 2 年内）许可被修改，那么你可以选择停留在许可更新之前的 Flax 最新版本，并跳过接受新的许可条款。这意味着许可不会追溯适用于引擎版本。我们相信这一更改将使开发者能够轻松地规划更长的游戏制作周期，而无需担心可能影响业务成本的许可变更。

* *增加了关于预付款的详细说明。*

`版税` 部分定义了哪些收入适用于 4% 的收入分成。它包括游戏的预付款收入，例如来自游戏发行商的付款。您为游戏的预付款收入（可由付款人（例如发行商）收回）支付的版税，可以抵扣您根据 EULA 为该游戏未来产生的版税。这意味着，例如，如果发行商向您支付 1,000,000 美元的预付款（直接用于游戏开发），则支付给 Flax 的版税为 30,000 美元（每个日历季度超过前 250,000 美元部分的 4%）。之后，一旦游戏产生收入，此预付款可以从未来的版税中收回。例如，如果该游戏收入为 1,500,000 美元，则由于收回了预付款，版税将为 20,000 美元，而不是 50,000 美元。

### 常规引擎更新

我们更新了[发布策略](../../contributing/release-policy.md)，以在主要版本之间提供更频繁的引擎更新。在过去的几年里，Flax 更新（例如 `1.4`、`1.5`）大约每 4 个月发生一次，我们将继续这样做。除此之外，我们将 **支持最新的 *稳定版本*，每月发布补丁更新**（例如 `1.7.1`、`1.7.2`）。到目前为止，我们只发布了关键的错误修复和安全更新，这在引擎路线图时间线上留下了很大的空白，大多数开发者使用无法保证稳定的每日 `master` 构建。

目前，**Flax 每天都在更快地增长**，我们拥有比以往更多的用户和贡献者。正因为如此，我们希望保持项目的敏捷性。最后，我们为长期规划设置了[里程碑计划](https://github.com/FlaxEngine/FlaxEngine/milestones)。这有助于构建日常操作，并跟踪哪些问题将被解决以及何时解决。

### 布料

![Flax 引擎中的布料](media/cloth.gif)

在此版本中，我们添加了带有工具的 **物理布料模拟**。新的 *Cloth* Actor 使用网格的顶点作为布料粒子，并使用物理属性、力、约束和碰撞来模拟它们。在底层，我们使用 `NvCloth` 库，并通过作业系统异步运行模拟，即使在主动模拟多种布料时也能带来出色的性能。

![Flax 编辑器中的布料绘制](media/cloth-paint.gif)

Flax 编辑器包含内置的布料绘制工具，带有逐顶点绘制笔刷。我们已将示例布料添加到 [Flax Samples](https://github.com/FlaxEngine/FlaxSamples) 中的 Physics Features Tour 项目中。要了解有关布料工具的更多信息，请参阅[此文档](../../physics/cloth.md)。

### 行为树

![Flax 引擎中的行为树](media/behavior-tree.jpg)

此版本中的另一个重要功能是用于游戏编程的行为树系统。**行为树** 是一种流行的 AI 技术，用于许多计算机游戏中，以设计和模拟智能角色、代理或对象。行为树是许多不同 AI 技术的组合：层级状态机、规划、调度和动作执行。行为树的主要优点是它们非常容易理解，并且可以使用可视化编辑工具而不是仅代码来创建。

行为树的设计使其非常易于通过游戏和插件进行扩展。你可以创建自定义节点类型，并通过黑板或目标（我们独特的行为数据概念）将任何数据包装到[行为知识](../../scripting/ai/behavior-trees/knowledge.md)中。最后，编辑器包含带有实时调试工具的行为树编辑器。

![Flax 编辑器中的行为树调试](media/bt-debug.gif)

要了解更多信息，请参阅[此文档](../../scripting/ai/behavior-trees/index.md)。

### 性能改进

![Flax 性能大规模物理](media/perf-boxes-falling-physics.gif)

我们一直致力于卓越的性能。这次我们专注于大规模项目（例如具有 40k 个对象的场景）并改进我们自定义的 .NET 绑定代码，该代码将 C# 和 C++ 运行时链接在一起。具有数千个活动体的物理模拟在新的物理碰撞事件报告和新的委托事件表存储下更加稳定。

![Flax 异步场景对象生成](media/async-scene-spawn.png)

我们已开始重构场景加载，以通过作业系统尽可能多地异步运行。现在，在 `1.7` 中，Actor 和脚本是通过作业系统创建的（如上图所示），这在大型世界或使用许多预制体的关卡中带来了巨大的性能优势。对于下一次更新（`1.8`），我们计划继续此工作，并通过作业系统实现异步场景对象反序列化。这将进一步提高性能。

### 编辑器改进

![Flax 编辑器](media/editor-ui.png)

每次更新都会带来许多大型功能，但也包含大量对编辑器重要的细节。以下是一些值得注意的列表：
* 编辑器中的新插件项目创建工具（*插件窗口*，见下图），
* 通过 `git clone` 添加插件的工具（例如，从 *Github* 添加插件，见下图），
* 内容浏览器改进 - 新外观，更多排序和项目显示功能，
* 新的样条线编辑工具，
* 带有对象复制和 RPC 统计信息的网络性能分析器，
* 缺失脚本工具，可快速重新添加编辑器中缺失的脚本（例如，在重命名类之后），
* 在编辑器中保存 json 文件时自动应用游戏设置。

![具有新功能的插件编辑器](media/plugins-window.png)

![样条线编辑工具](media/editor-splines.png)

### 适用于 macOS 的改进编辑器

![适用于 macOS 的编辑器](../1_6/media/mac-arm64.png)

Flax 在 macOS 上的用户群正在快速增长！为了在该平台上平滑可用性，我们修复了许多与 .NET SDK 检测、输入、可停靠窗口使用等相关的错误。从现在开始，**我们将提供适用于 macOS arm64 的代码签名 Flax 编辑器**（`.dmg` 二进制文件）。它将包括为 macOS 和 iOS 构建的引擎，以便轻松为这些平台烘焙游戏。

我们添加了文件监视器支持，以处理脚本和着色器的热重载。图形后端将使用最新的 Vulkan SDK 处理正确的 MoltenVK 运行时。

### 入门体验改进

由于最近 Flax 用户的快速增长，我们致力于改进入门体验。这包括：
* 改进编辑器中 .NET SDK 安装检测，
* 改进 Visual Studio、VS Code 和 Rider 代码编辑器的集成，
* 修复启动器从 Github Actions 下载每日 `master` 构建的稳定性，
* 发布适用于 macOS 编辑器的官方包，
* 大量错误修复。

## 迁移指南

### 脚本更改

* 脚本的 `OnDestroy` 方法现在在 `OnDisable` 之后但在 Actor 的子级 `EndPlay` 之前调用，以正确处理游戏代码中的脚本生命周期逻辑。
* 场景对象（Actor 和脚本）现在在加载场景时通过作业系统异步创建：
  * 这仅适用于对象生成——构造函数将在异步中运行，
  * 所有脚本/方法，如 `OnEnable`/`BeginPlay`，仍然在主线程上同步调用，
  * 大型关卡加载时间已显著减少，
  * 很快对象反序列化也将异步运行，以进一步提高性能。

### 重构

* C++ `Delegate` 已重构，使用 `HashSet` 和 `CriticalSection` 代替带有原子操作的表：
  * 所有事件现在都是唯一的（不能绑定相同的函数两次），
  * 事件顺序未定义，
  * 大型项目的性能已显著提高，
  * 可以通过在 `Delegate.h` 中设置 `DELEGATE_USE_ATOMIC 1` 在自定义引擎中禁用。
* C++ `ArrayExtensions` 已重构，使用 Flax `Function` 代替 `std::function`。
* 将 `GPUPipelineState::Description::PrimitiveTopologyType` 重命名为 `PrimitiveTopology`。
* 重构编辑器启动画面引用，使其不那么冒犯。
   * *告别一些恶劣/不恰当的笑话——随着 Flax 的成熟，它必须表现良好。*

### 其他

* `Release` 构建默认不使用断言来提高引擎性能，代价是未定义行为（UB）——C++ `CHECK` 宏仍将处于活动状态。
* 移除了未使用的 `TIsArithmetic` 模板。
* CPU 和 GPU 性能分析事件默认禁用，仅在编辑器中使用性能分析器时启用。
  * 使用 `ProfilerGPU.Enabled = true` 在运行时从游戏代码获取 GPU 帧时间。

## 更新日志

### 版本 1.7.6407.2 - 2023年12月20日

贡献者：mafiesto4、Tryibion、GoaLitiuM、Withaust、Menotdan、NoriteSC、mtszkarbowiak、Just-Feeshy、MineBill、nothingTVatYT

合并的 PR：29

* 向纹理工具添加了反转绿色通道选项
* 添加了各种 .NET 和 VSCode 智能感知修复
* 为 macOS 添加了新图标
* 添加了克隆插件项目时自动添加代码模块引用
* 向颜色选择器添加了 **保存的颜色**
* 向行为树 `Loop` 装饰器添加了无限循环
* 添加了 **将模型文件作为预制体导入的选项**
* 向导入的模型预制体添加了 `ModelPrefab`，用于重新导入功能
* 对模型导入代码进行了各种改进
* 添加了如果根被更改或删除，加载预制体实例的支持
* 在属性面板中添加了显示和将数组值恢复为预制体值的支持
* 添加了删除已删除资源的缩略图
* 向 `Vector2`/`Vector4` 添加了 `Half`
* 向 `ArrayExtensions` 添加了 `Where`、`Select` 和 `RemoveAll`
* 默认禁用 `SloppyOptimization` 并降低模型自动 LOD 的默认 `LOD Target Error` 值
* 在 Canvas Scaler 中改进了 `ScaleWithResolution` 的默认值
* 向动画事件添加了 `Async`（默认为 `false`），以将事件执行延迟到主线程，并默认防止多线程问题
* 添加了 `PixelFormatExtensions::ComputeBlockSize`
* 添加了更改默认 Android 屏幕方向的能力
* 改进了可视化脚本调试器工具提示的显示
* 在 Linux 上添加了鼠标跟踪
* 添加了快速加载附加场景的上下文菜单
* 添加了盒体碰撞体在添加到场景时的自动大小调整
* 将 `meshoptimizer` 更新到 `v0.20`
* 优化了时间服务更新数学代码
* 移除了关于无效模型实例缓冲区的旧警告
* 用 `ModelData` 替换了 `ImportedModelData` 以进行模型导入
* 重构了 `INetworkDriver::PopEvent`，使用网络事件作为输出参数而不是原始指针
* 重构了模型导入中的对象拆分，由 `ModelTool` 处理，而不是导入器代码本身
* 重构了预制体的 `objectsCache`，明确为 `SceneObject` 值
* 重构了内存分配器，在移动不可拷贝的集合数据时使用专用路径
* 重构了可视化脚本调试器 API，使用绑定生成器
* 重构了物理碰撞体，使用自动序列化
* 修复了编辑器中删除内容和源文件夹的能力
* 修复了工具提示在屏幕边缘换行时的位置检查
* 修复了 UI Dropdown 在字体较大时的大小问题
* 修复了当预制体对象已被选中时选择预制体对象的问题
* 修复了材质图中的常量值滑块因着色器编译而无法使用的问题
* 修复了当网络对等端返回无效事件类型时 `NetworkManager` 中的死锁
* 修复了铰链速度的零钳位，允许负值
* 修复了 MSVC 上的 `__cplusplus` 宏，并添加了编译期间使用的 C++ 版本记录
* 修复了材质 Scene Texture 节点中缺失的通道遮罩
* 修复了删除动画图状态转换后缺失的曲面图编辑标志
* 修复了在脚本中调用接口实现时缺失的输出参数转换
* 修复了具有高远平面时选择对象/Gizmo 的问题
* 修复了叠加动画混合
* 修复了 `MissingScript` 仅在对象类型存在时添加（跳过预制体实例）
* 修复了如果子控件处理了输入事件，不在 Visject 曲面上显示主上下文菜单
* 修复了向场景中的多个 Actor 添加脚本时编辑器布局更新的问题
* 修复了自动 LOD 生成后不正确的空网格/LOD 移除
* 修复了脚本接口方法中作为输出参数传递的数组引用的无效代码生成
* 修复了从 `Variant` 到托管运行时的不正确指针封送
* 修复了如果网格未围绕原点居中，模型资源缩略图的问题
* 修复了具有大型层级结构的预制体窗口性能
* 修复了不支持在窗口之间拖放预制体 Actor
* 修复了拖放到预制体窗口后生成的预制体名称
* 修复了移除后无效的 BT 节点装饰器链接
* 修复了当性能分析器在事件中间连接时，来自 C# 性能分析 API 的无效 Tracy 事件
* 修复了安装 .NET 8 SDK 时的 .NET 运行时打包
* 修复了当引擎路径包含空格时，C# 项目的 Visual Studio 构建问题
* 修复了热重载后的 Json 序列化器回归问题
* 修复了不可拷贝类型的 `Swap`
* 修复了交换核心集合
* 修复了如果项目已存在，使用 `-new` 的项目初始化
* 修复了从场景中移除 Actor 或脚本时调用脚本 `OnDestroy`
* 修复了几种 Actor 类型在从预制体生成时执行默认生成行为
* 修复了 Linux 上的停靠窗口
* 修复了导入 `.dds` 文件时，如果压缩图像对于引擎来说太小（块大小验证），则 `as-is` 导入
* 修复了屏幕空间反射 Alpha 混合区域周围的暗轮廓
* 修复了默认预制体实例不考虑根位置的问题
* 修复了插件克隆和加载，以正确等待 `git` 进程结束
* 修复了托管方法委托创建使其线程安全
* 修复了 `Tag` 比较函数中的拼写错误
* 修复了频繁更改渲染分辨率时渲染目标池的过度分配
* 修复了当加载任务在主线程同步的加载队列中挂起时 `Asset.WaitForLoaded` 中的死锁
* 修复了加载小于块大小的块压缩纹理时的死锁
* 修复了纹理流式传输失败时资源缩略图渲染队列中的死锁
* 修复了各种崩溃
* 修复了重新设置控件父级时应用 UI 预制体更改的崩溃
* 修复了将原生非 POD 结构装箱为托管格式时的崩溃
* 修复了从异步线程更新预制体时的崩溃
* 修复了从异步线程将 Actor 生成到 SceneObject 时的崩溃
* 修复了卸载具有活动流式传输任务的纹理时的崩溃
* 修复了为该导航网格创建了人群时调整导航网格容量大小的崩溃
* 修复了没有缓存的相邻块时绘制地形的崩溃
* 修复了如果生成的网格具有更多索引，网格 LOD 生成器中的崩溃
* 修复了当有人使用文件存储且无法释放访问权限时，内容存储异步作业中的崩溃

### 版本 1.7.6406.1 - 2023年11月25日

贡献者：mafiesto4、Tryibion、GoaLitiuM、mrunion、MineBill、RuanLucasGD、Tryibion、Chikinsupu、NoriteSC、Menotdan、SinnersSum、Radiangames、schmidt-florian、HydrogenC、nothingTVatYT

合并的 PR：43

* 为 Apple 平台添加了 SetThreadAffinityMask 和 SetThreadPriority 以及线程名称
* 添加了以紧凑格式存储着色器资源包含路径以实现可移植性
* 为 `HashSet` 和 `Dictionary` 集合类型添加了单元测试
* 为选中的碰撞体添加了调试绘制接触偏移
* 在材质预览中添加了 **自定义模型选择器**
* 添加了 `CustomScenes` 功能，以在 `SceneRenderTask` 中绘制一组固定的场景
* 对引用属性进行了微小的改进
* 向 Surface 节点添加了更多替代标题
* 向 Surface 图中的注释添加了顺序和排序选项
* 向 Visject 节点原型添加了 `SortScore`，并在可视化脚本中使用它来优先选择方法重写
* 为 Surface 常量节点添加了 **转换为参数**
* 添加了对无限窗口大小的支持，如果 `MaximumSize` 设置为零
* 添加了在添加新 UI 画布时生成 UI 画布缩放器
* 添加了在渲染 UI 画布时处理来自摄像机的 `ViewLayersMask`
* 添加了在更改类型时将旧 UI 控件数据复制到新 UI 控件
* 添加了限制 Dropdown 弹出窗口中项目数量的选项
* 向 Dropdown 弹出列表添加了可选的滚动条
* 在编辑器中更改宽高比后立即同步游戏视口
* 向编辑器 UI 添加了新的 **浅色主题**
* 改进了编辑器中来自 xml 注释的自动工具提示的格式化
* 添加了游戏窗口鼠标解锁和切换全屏的输入绑定
* 添加了通过编辑器菜单重新加载场景的按钮
* 在拖过标题时添加了短暂的延迟，然后自动选择编辑器选项卡
* 添加了在 Navigation 资源中应用更改后重建导航网格
* 在属性窗口中添加了将项目拖入列表和数组的支持
* 添加了 `CalculateBoneOffsetMatrices` 选项，以修复某些动画模型骨骼的渲染
* 向 C# `Quaternion` API 添加了 `GetRotationFromTo` 和 `FindBetween` 工具
* 添加了 `GetSplineSegmentLength` 以获取样条线段长度
* 添加了新的材质节点：`Rectangle Mask`、`FWidth` 和 `AA Step`
* 为材质 `Sphere Mask` 节点添加了默认值，以在 UV 中心周围创建斑点渐变
* 向动画模型添加了 `SetNodeTransform`
* 添加了在更改运动学状态时唤醒刚体
* 为 Android 主线程添加了名称
* 添加了对布料笔刷值的限制
* 添加了在引擎配置选项中包含全局配置的支持
* 添加了 .NET SDK 版本 `7` 作为在游戏烘焙期间强制使用的版本（编辑器可以使用 dotnet8）
* 在非发布构建中添加了清除 BT 内存，以使问题更容易发现
* 在出现问题的情况下，向 BT 节点添加了更好的错误记录
* 为拆箱添加了对空托管对象值的软检查
* 向 `FontAsset` 添加了 `Style` 属性获取器，以访问其样式标志
* 在编辑器主窗口标题中添加了引擎版本
* 为托管类型信息访问添加了安全锁
* 向 git 项目克隆添加了 git 子模块初始化
* 添加了对黑板选择器访问中仅获取属性的支持
* 在进入蒙皮模型编辑器中的骨骼选项卡时自动显示骨骼
* 为 Linux 添加了扩展按钮支持
* 在 Linux 上按照规范使用批准的默认 `XDG_DATA_HOME` 环境变量
* 在 Linux 上添加了 `GetStackFrames` 和 `IsDebuggerPresent`
* 在 Android 上添加了 `GetStackFrames`
* 在 Apple 平台上添加了解码堆栈跟踪函数名称
* 添加了始终记录未处理的 C# 异常
* 添加了对 .NET SDK 和 .NET 8 的更好支持
* 向 `Flax.Build` 添加了 `-dotnet=ver` 命令参数，以指定用于构建的 .NET SDK 版本
* 为 Rider 添加了更好的项目文件生成
* 优化了 `Control.UpdateTransform` 以实现更快的 UI 数学运算
* 改进了布料的使用
* 使用软资源引用指向图形设置
* 将 Tracy Profiler 更新到 `0.10`
* 继续重构 `Delegate`，使用单次内存分配和原子操作进行数据访问
* 移除了 `SHADOW_MAPS_FORMAT` 并支持阴影贴图的回退格式
* 在运行模式期间移除了通过消息框对话框自动应用 Actor 层
* 移除了不支持的材质参数类型 `Quaternion` 和 `Transform`
* 将 `LargeWorlds::ChunkSize` 减小到 `8192`
* 重构了 `GPUResourceProperty` 以清理代码
* 重构了主编辑器视口和预制体视口，以共享拖放处理代码
* 将 `Collider` 的默认 `ContactOffset` 重构为 `2`（为 `CharacterController` 保留 `10`）
* 重构了 `HashSet` 和 `Dictionary` 集合的容量，以处理删除太多元素时的重新哈希
* 修复了在不同运行时类型的对象上使用 `DeepClone()` 时的问题
* 修复了 CultureInfo 处理缺少国家代码并回退到外部语言代码
* 修复了文档中的各种拼写错误和措辞
* 修复了删除选项卡时的不正确选项卡选择处理
* 修复了在编辑器中使用停靠窗口时关闭窗口选项卡的各种情况
* 修复了颜色选择器对话框不保持在当前屏幕内的问题
* 修复了当自定义编辑器有更多编辑器在使用时，重建自定义编辑器布局的问题
* 修复了如果类缺少空构造函数，通过 `ContentContextMenu` 创建新 json 资源时的错误
* 修复了在编辑器中使用停靠窗口时关闭窗口选项卡的各种情况
* 修复了输出日志窗口在启动时正确滚动日志的问题
* 修复了 `CollectionEditor` 以正确支持编辑多个数组
* 修复了 Dropdown 弹出窗口在使用 Canvas Scaler 时正确缩放
* 修复了带有硬编码键绑定的常见编辑器工具提示
* 修复了颜色编辑控件以正确处理鼠标事件
* 修复了动画插槽根据速度播放动画超过 1 次的问题
* 修复了 `NetworkTransform` 在传入权威变换数据时正确拒绝本地模拟增量
* 修复了添加已存在的装饰器后 BehaviorTree 节点 UI 的问题
* 修复了当项目不是 `8` 的倍数时 `BitArray::SetAll()` 的问题
* 修复了某些中心几何体导入问题，并添加了能够将网格移动到局部原点的选项
* 修复了 C++ 绑定代码生成中包括递归的泛型类型
* 修复了使用相对路径的内容存储
* 修复了涉及 `FlaxEngine.Json` 动态类型解析中过时脚本程序集的问题
* 修复了方向光阴影对辅助渲染视图的不正确影响
* 修复了如果第一个点不在样条线原点，样条线长度计算不正确的问题
* 修复了 `Actor::FindScript` 中缺少的接口支持
* 修复了从预制体添加的场景对象缺少初始化
* 修复了从现有 Actor 创建预制体时标记场景为脏
* 修复了通过可视化脚本中的 Unpack 节点解包 `Float3` 和其他内置 `Variant` 类型
* 修复了重新导入文件时正确取消资源加载的问题
* 修复了在 Windows 上使用具有原生依赖项的项目插件时加载延迟加载 dll 的问题
* 修复了由于异步场景初始化的回归，在场景加载期间生成新预制体对象时的错误
* 修复了在使用调试绘制时进行拖放的内存泄漏
* 修复了可视化脚本参数设置器节点接受多个输入流
* 修复了场景重新加载功能，检查是否可以执行，在运行模式下正确使用异步，并在场景被修改时要求保存
* 修复了如果数据具有与当前父级不匹配的对象 ID，缺失脚本替换的问题
* 修复了将原生线程附加到托管运行时后，Mono GC 线程挂起不会死锁
* 修复了如果设置资源丢失，Steam AppId，并强制将其与 `steam_appid.txt` 文件保持同步（Steam 在线平台）
* 修复了图形设置中的后期处理效果设置仅在勾选为覆盖时使用
* 修复了启动/停止行为时的 BT 逻辑流
* 修复了在编辑器中保存可视化脚本且活动实例对象存在时的死锁回归
* 修复了在编辑器中使用具有空边界的 Actor 吸附到组时的死锁
* 修复了 `Win32CriticalSection` 使用 `4000` 的自旋计数，而不是仅仅 `100`
* 修复了由重复键引起的各种字典使用中的崩溃
* 修复了创建空布料时的崩溃
* 修复了尝试使用空场景构建导航网格时的崩溃
* 修复了由于 `int32` 最大值限制，负集合容量时的崩溃
* 修复了在热重载前未在编辑器中清除在线平台时的崩溃
* 修复了在物理碰撞期间删除刚体时的崩溃
* 修复了未选择代码编辑器时编辑器启动的崩溃
* 修复了由于 `ScriptingEvents::EventsTable` 中残留的脚本事件，编辑器热重载的崩溃
* 修复了当脏对象缺失时全局表面图集中的崩溃
* 修复了在动画图中使用单个动画在三角形上时 Multi Blend 2D 节点的崩溃
* 修复了当 2 个线程加载同一资源时，由于潜在线程问题导致的资源加载崩溃
* 修复了当树未运行时调试 BT 节点状态时的崩溃
* 修复了在 C# 中读取 `BehaviorKnowledgeSelector` 值时，类型不完全匹配时的崩溃

### 版本 1.7.6404 - 2023年10月31日

贡献者：mafiesto4、Tryibion、Withaust、GoaLitiuM、Rayumie、mtszkarbowiak、NoriteSC、envision3d、RuanLucasGD、wackoisgod、Walrusking16、eLeSTRaGo-Dev、FREEZX、M-3-H、MineBill、Crawcik、dector、Chikinsupu、Radiangames、stefnotch、solnem、AndrejStojkovic、Zode、davevanegdom、Arcnor、RedTheKitsune、Swiggies、Menotdan、nothingTVatYT、GasimoCodes、ontrigger、Muzz、meabefir、Vizepi

合并的 PR：233

* 添加了带有物理的 **布料** 模拟
* 向编辑器添加了布料绘制工具
* 通过作业系统添加了异步布料模拟
* 向布料添加了基于距离和基于视锥的剔除
* 向 `ModelInstanceActor` 添加了 `MeshReference`，以便于网格引用及其数据访问接口
* 添加了 `MeshDeformation` 工具，用于通用网格顶点变形（例如通过 Blend Shapes 或 Cloth）
* 添加了 `NvCloth` 依赖项
* 向 `Delegate` 添加了复制/移动构造函数/运算符
* 向脚本 API 添加了 `NavMeshRuntime`
* 向 Vector3 添加了 `MoveTowards`
* 向 `GPUPipelineState` 添加了 **模板缓冲区** 支持
* 向模板参考值添加了 `GPUContext::SetStencilRef`
* 添加了带有单独起始/结束颜色的 `DebugDraw::DrawLine`
* 添加了 `RenderTools::CalculateTangentFrame` 工具
* 向 `CustomEditorPresenter` 添加了 `ReadOnly`
* 添加了 `Variant::AsStructure()`，用于 `VariantType` 和 `ScriptingTypeHandle` 之间的比较运算符
* 添加了 `SerializableScriptingObject`，以便于在游戏或内容中序列化脚本对象
* 向编辑器自定义编辑器添加了 `IPresenterOwner`，以提供更多上下文和高级交互
* 向 Visject 节点生成查询检查添加了 `GroupArchetype`
* 向 Visject Surface 节点添加了 `SealedNodes` 功能
* 添加了 `SurfaceNodeActions`，用于更多上下文的曲面节点脚本
* 向 Visject Surface 节点添加了 `OnPasted`，用于自定义粘贴后逻辑
* 通过样式添加了 Visject 曲面框和连接绘制的自定义
* 仅当曲面类型允许时，才在 Visject 中使用绕行节点
* 向引擎添加了 `AI` 模块
* 添加了 **行为树** 编辑和模拟
* 添加了 `BehaviorKnowledgeSelector`，用于行为知识统一数据访问
* 向 BT 节点添加了 `GetDebugInfo` 以进行调试
* 向行为树添加了装饰器
* 向行为知识添加了目标的概念
* 向动画采样节点添加了动画资源输入框
* 向 GPU 设备限制添加了 `HasDepthClip`
* 向 `Span` 类型添加了 `foreach` 循环支持
* 添加了检查是否按下 `Alt` 键以展开/折叠层级中的所有 Actor
* 为 macOS 和 iOS 平台添加了 `IsDebuggerPresent`
* 改进了视口摄像机设置和控制
* 向 Vector 类型添加了 `GetHash`
* 添加了在项目版本中使用 `Revision` 编号的支持
* 添加了在不支持计算着色器的 GPU 上运行运行时的支持
* 添加了记录任何 XAudio2 后端错误
* 在音频片段窗口中添加了空格键以切换播放/暂停
* 向编辑器中的网络性能分析器添加了数据发送/接收速率图表
* 在编辑器中，当编译失败时，将着色器源代码输出到文本文件以进行调试
* 添加了使用 `Shift + Scroll` 更改地形笔刷大小
* 添加了默认字体捆绑（可选），并设置 UI 样式以匹配编辑器逻辑
* 添加了在编译脚本时防止项目文件重新生成运行
* 在编辑器中进行大型文件操作后，添加了编译器和项目生成的延迟
* 向模型导入选项添加了 `SubAssetFolder`，以重定向自动导入的材质和纹理的位置
* 在性能分析工具中，从 CPU 绘制时间中排除了 GPU 交换链呈现时间
* 在托管异常的错误消息框中添加了显示完整异常消息
* 在编辑器选项关闭时添加了弹出窗口，提醒用户保存
* 添加了更多编辑器输入绑定选项
* 向 Visject（曲面编辑器）添加了上下文相关的节点搜索
* 向可视化脚本图编辑器添加了自动转换设置
* 添加了对编辑器中使用较大字体时 UI 大小的几处修复（例如使用自定义字体时）
* 向编辑器主题添加了可自定义的状态栏颜色（将运行模式状态颜色更改为绿色）
* 向编辑器视口选项添加了 `View Layers` 选项以及 Reset/Disable/Copy/Paste 按钮
* 向 `Camera` Actor 属性添加了 `RenderFlags` 和 `RenderView`
* 添加了随鼠标光标移动的工具提示
* 通过内容窗口上下文菜单（在游戏 `Source` 文件夹中）添加了自动模块创建
* 在 macOS 上的编辑器中使用文本 `Show in Finder`
* 添加了将摄像机定位到编辑器视口视图的按钮
* 在 `CollisionDataWindow` 中添加了仅显示碰撞线框
* 通过 `Screen` 类向 C# 添加了主窗口
* 为 `Vector2` 和 `Vector3` 添加了 `SmoothDamp`
* 添加了 `BaseLinesGapScale` 可配置为 `Label`
* 改进了 UI 中的鼠标滚轮滚动行为
* 在 `CheckBox`、`Button`、`Dropdown` 和 `DropPanel` 控件中添加了处理双击
* 添加了 **将模型的材质作为项目中另一个材质的实例导入** 的选项
* 通过 `Assimp` 导入器添加了对导入嵌入式纹理的支持
* 在场景树窗口中添加新 Actor 时自动开始重命名
* 在编辑器中保存 json 文件时添加了 **自动应用游戏设置**
* 向模型导入器添加了碰撞类型
* 在 Visject 图编辑器中为节点周围的连接添加了弯曲
* 改进了 Clang 编译器检测
* 在重新生成脚本项目文件时，改进了 Visual Studio 项目 ID 的保留
* 添加了始终为所有平台生成额外的 Visual Studio 解决方案文件（改进了 VSCode 和 Rider 的使用）
* 添加了在生成引擎项目文件后构建 C# 绑定
* 添加了用于附加原生调试器的 VS Code 启动任务
* 将非原生编辑器 VS 构建配置重新映射到原生配置
* 添加了 Rider 特定的用户解决方案配置文件生成
* 向各种脚本方法添加了线程安全
* 在编辑器中添加了 **更好的缺失脚本处理**
* 向编辑菜单添加了游戏设置打开按钮
* 向 `InputEvent` 添加了输入状态，向 `InputAxis` 添加了 `AxisChanged` 事件
* 为 `VisjectSurface` 添加了 `SelectionChanged` 公共事件，并仅在选择实际更改时正确调用它
* 在编辑器中忽略了带有 `CompilerGeneratedAttribute` 的类型
* 向 msvc natvis 添加了 `ScriptingType`
* 向 `RigidBody` 添加了 `GetColliders` 工具
* 如果 setter 操作为 `null`，则允许使用 `CustomValueContainer` 作为只读
* 向 API 结构/类添加了 `MarshalAs` 标签，以通过隐式转换进行自定义封送
* 向脚本 API 成员（字段、属性和函数）添加了 `internal` 访问级别
* 添加了通过 `ManagedBinaryModule` 字段 API 访问脚本属性的支持
* 添加了对脚本函数参数的双重引用支持以移动值
* 添加了 `Random::RandRange`
* 添加了聚光灯内圆调试线
* 添加了灯光调试视图标志以绘制灯光形状
* 向编辑器视口设置添加了网格缩放
* 添加了快速 `Cook&Run` 按钮、编辑器内运行操作和可自定义的玩家数量设置
* 向编辑器添加了锁定焦点（`Shift+F`）
* 添加了 `AssetReferenceAttribute` 的通用版本
* 添加了 `NetworkReplicator::ResolveForeignObject`
* 添加了 `Object::DeleteObjectNow` 作为脚本中的 `Object.DestroyNow`
* 添加了 `ModelInstanceActor::GetMaterial`，用于获取用于渲染某些条目的实际材质
* 添加了 `ModelInstanceActor::GetMaterialSlots`
* 向模型条目添加了显示渲染材质
* 改进了编辑器中各种上下文菜单
* 添加了从场景树中多个选中的 Actor 批量创建预制体
* 在资源选择器选择菜单打开时，滚动到选中的资源/内容项
* 添加了在与选中的 Actor 父节点相同的级别粘贴，而不是在选中的节点下
* 添加了将相似的调试日志合并到带有计数的日志中的功能
* 向 `API_PARAM` 添加了 `params` 标签，以支持 C# 可变参数
* 在 `Flax.Build` 中添加了对用户定义分析器/源代码生成器的支持
* 添加了构建选项，以更改 C# 模块中的代码优化级别
* 在编辑器开发构建中添加了默认的 C# 代码优化
* 向 API 绑定中的虚函数添加了 `sealed` 标签，以阻止在 C#/VS 中的继承
* 添加了常见的 .NET SDK 预处理器定义
* 当色调映射和摄像机伪影被禁用时，跳过后期处理
* 向 `Button` 控件添加了 `HasBorder` 选项
* 添加了运行时的无边框窗口切换（目前仅限 Windows）
* 添加了清理地形图块缓存的能力
* 添加了带有按钮的 macOS 消息框
* 在 macOS 上对 VulkanSDK 选择添加了版本排序
* 在 macOS 上的内容中忽略了 `.DS_Store` 文件
* 为 macOS 添加了 `FileSystemWatcher`，以跟踪编辑器中的文件更改
* 向 macOS 编辑器包二进制文件添加了代码签名
* 在 macOS 上添加了对 control/command/option 键的处理
* 在 Json Asset 窗口的工具条上显示 Json Asset 类型
* 添加了时间线位置数字并添加到 GUI
* 添加了一种在编辑器中将 `IBrush` 重置为 `null` 以恢复默认功能的方法
* 向 `ProgressBar` 添加了 `Method` 和 `Origin`，用于自定义进度绘制
* 在编辑器中添加了 **自动化插件项目创建和 Git 克隆**
* 为窗口选项卡添加了选项卡换行
* 向内容项添加了 **新外观**
* 在内容树中添加了对插件项目进行排序
* 在内容树和视图中添加了显示/隐藏引擎/插件/杂项/生成的文件
* 向 UI 库添加了滑块控件
* 添加了带有选择器的 `InputEvent` 和 `InputAxis` 编辑器
* 为 `UICanvas` 导航操作添加了 `InputEvent`
* 在 UI 导航中添加了 shift + tab 支持
* 向文本框添加了 ctrl+backspace 支持
* 向多个控件添加了更多边框选项
* 向 Visject Surface 添加了 MMB 平移
* 添加了当鼠标悬停在滑块拇指上时高亮显示
* 为编辑器添加了 **新的样条线编辑工具**
* 当工具栏或主菜单控件获得焦点时，添加了编辑器快捷键的可用性
* 添加了在运行时编辑 `WheeledVehicle` 车轮配置而不完全重建物理状态的支持
* 添加了在运行时编辑 `WheeledVehicle` 引擎/差速器配置而不完全重建物理状态的支持
* 向 Actor 添加了移除标签方法
* 在编辑器中添加了条件性能分析（仅在运行 Profiler 窗口时运行）
* 添加了 `DebugDraw::DrawRay` 函数
* 添加了 `WindowBase::Resized` 委托
* 在重写的 thunk 方法回调中，使用精确的 C# 方法性能分析数据来获取性能分析事件
* 添加了多次取消订阅托管事件的支持
* 向粒子发射器图添加了缺失的 `Particle Scale` 获取器节点
* 在 Visject 曲面编辑器中，将钳位节点的大小增大以处理 vector4
* 向 PhysX 添加了 `PCM`（基于 GJK 的距离碰撞检测系统）
* 向物理设置添加了 `SolverType` 和 `BroadPhaseType`，用于模拟配置
* 在模型导入设置中为 LOD 添加了选择粗略网格简化或不选择的能力（更好的质量自动 LOD）
* 向 `DrawCall` 添加了 `ObjectRadius`，以在正向着色中正确剔除局部光源和环境探针
* 向网络性能分析器添加了对象复制和 RPC 统计表
* 为 BuildScripts 和 FlaxEngine 源文件添加了 VS 文件夹结构
* 在 macOS 上向编辑器添加了 Rider 支持
* 在编辑器中，当项目缓存被清除时，在启动时自动生成脚本项目文件
* 在设置 .NET 运行时失败时，添加了更好的 `hostfxr` 错误消息
* 添加了与 .NET 8 兼容性所需的缺失封送器方法
* 改进了 dotnet 位置搜索（在 macOS 和 Linux 上）
* 在 Linux 上使用 `xdg-open` 打开文件管理器
* 添加了在编辑器性能分析器选项卡中显示所有活动网络对等端统计信息的支持
* 将 `android_native_app_glue.h` 包含在引擎包中
* 优化了 C# 数学库中的 `UnwindRadians` 和 `UnwindDegrees`
* 优化了 `MClass::GetMethod` 方法迭代
* 优化了 C# `UnboxValue` 的性能、安全性和内存使用
* 优化了 C# 方法调用器的返回值封送
* 优化了原生互操作方法中 C# `MakeArrayType` 的结果
* 优化了具有大量 Actor 的 Actor 粘贴性能
* 优化了 `ManagedDictionary` 类型和辅助方法
* 优化了 `Delegate`，使用互斥锁和哈希表代替原子操作进行事件绑定
* 优化了 `PhysX` 碰撞事件处理和 `onContact` 回调
* 优化了在按文本搜索条目时 `CultureInfoEditor` 和 `TagEditor` 的性能
* 优化了各种渲染阶段，在效果禁用时跳过加载着色器
* 通过作业系统优化了 **场景加载**
* 优化了 `ScriptingObject` 托管初始化和封送
* 优化了托管脚本的值封送器和类型存储
* 优化了更新脚本 tick 数组
* 将 `recastnavigation` 库更新到 `1.6`
* 更新了 CSharp 脚本模板，使用非缩进的命名空间
* 将自定义 `pugixml` 更改更新为 `pugixml_extra`
* 将 `Debug` 更改为静态
* 更改了 `Input.ActionTriggered` 事件，以传递额外的 `InputActionState` 值
* 将鼠标轴输入中的默认死区更改为 `0`（在 Flax Samples 中）
* 在 `Release` 构建模式下禁用断言
* 将 `GPUPipelineState::Description::PrimitiveTopologyType` 重命名为 `PrimitiveTopology`
* 移除了未使用的 `TIsArithmetic`
* 重构了顶点着色器，使用 `GPUShaderProgramVS::InputElement` 作为输入布局数据
* 将 `FileMode`、`FileAccess`、`FileShare` 枚举重构为带有文档的普通枚举
* 重构了 Visject 曲面节点缓存，以在图之间重用
* 重构了编辑器 Gizmo 模式的所有权，以支持在预制体窗口中使用它们
* 重构了 `ManagedHandlePool`
* 重构了 `OnDestroy` 脚本位置，在 Actor 的 `OnEndPlay` 之前调用，以防止脚本出现问题
* 重构了启动画面引用
* 将 `ArrayExtensions` 中 `std::function` 的使用重构为 `Function`
* 重构了音频片段导入设置，通过 `AudioTool` 使用自动生成的绑定
* 重构了 macOS 启动进程的方式，使用 `NSTask`，它能够更好地处理转义和非转义路径
* 修复了 C# 数学库中 `UnwindRadians` 和 `UnwindDegrees` 的文档注释
* 修复了 macOS 上的各种键盘处理
* 修复了 macOS 上传入拖放位置的问题
* 修复了在 macOS 上的 Finder 中显示文件
* 修复了在 macOS 上的 Finder 中重命名时更新内容文件夹名称
* 修复了各种 macOS 问题，其中 BuildTool 无法正确运行和编译脚本
* 修复了在 macOS 上设置鼠标光标以正确处理屏幕缩放
* 修复了如果着色器资源在内容窗口中不可见，打开它时的错误
* 修复了已部署引擎包中缺失的头文件
* 修复了嵌套动画采样错误
* 修复了编辑器中动画模型预览的剔除伪影
* 修复了帧速率不同时嵌套动画的播放速率
* 修复了 CPU 代码路径中粒子图中 `Transform Position To Screen UV` 的不正确
* 修复了绑定代码中使用的字符串包装器方法的可见性
* 修复了各种核心类型作为适当的 POD 类型可平凡构造的问题
* 修复了使用可收集泛型类型释放不可收集类型的问题
* 修复了当自定义 Actor 列表为空时，`DrawSceneDepth` 正确绘制场景对象
* 修复了 `API_INJECT_CODE` 注入重复代码
* 修复了 `OnEnable`/`OnStart` 期间的导航重建
* 将一些 Actor 资源修复为软检查
* 修复了当属性面板之一抛出异常时的编辑器 UI
* 修复了 `Label` 在子级下方绘制文本
* 修复了如果类型缺失，来自 `TypeEditor` 的日志垃圾邮件
* 修复了在 Linux 上第二次启动项目后打开 FlaxEditor 窗口的问题
* 修复了脚本结构使用 `StringAnsi` 字段时的错误
* 修复了 Object 或 Asset 值缺少 `Variant` 类型名称，以正确传递类型检查
* 修复了用于原生库使用的托管程序集卸载和脚本 ALC 重新初始化
* 修复了带有池化的 `ManagedArray` C# 句柄
* 修复了如果 IsLooping 为 false，粒子效果无法再次调用播放的问题
* 修复了对值类型（例如 `Transform`）调用托管方法时正确处理实例值
* 修复了 Actor 层级，在设置/获取预制体的 Actor 扩展值时使用 `PrefabObjectID`
* 修复了 macOS 上编辑器中的文档面板窗口
* 修复了 Windows 上的消息框，以防止与编辑器和其他窗口交互
* 修复了 `UnitsToText`，以正确打印带有 2 位小数的字符串
* 修复了从 `ToString` FormatException 在编辑器中反序列化向量类型
* 修复了使用 `int` 时 CPU 粒子/脚本图中的 `Random Range` 节点
* 修复了如果 `NetworkManager::NetworkFPS` 小于 0，停止复制
* 修复了使用最新 Java 版本为 Android 构建（更新到 Gradle `8.3`）
* 修复了 `AbstractWrapper` 在新 AnimEvent 上下文菜单中显示
* 修复了原生脚本 API 中缺失的 C# 静态字段
* 修复了游戏绑定的某些内部 `NativeInterop` 方法的可见性
* 修复了当项目中的一个预制体损坏时，预制体应用的错误
* 修复了当 `EnableSimulation` 禁用时，轮式车辆驱动的问题
* 修复了当车轮处于自定义顺序时，`WheeledVehicle` 在 `Drive4W` 模式下驾驶的问题
* 修复了托管 UTF-8 字符串分配未使用正确编码
* 修复了 CharacterController 上的不正确焦点
* 修复了右键单击取消选择场景树节点
* 修复了上下文菜单中的白色窗口闪烁
* 修复了在编辑器中编辑最初为 `null` 的标签数组
* 修复了源文件缺少最后一个换行符时的 Vulkan 着色器编译
* 修复了使用 Visual Studio 2022 时可能删除脚本的罕见问题
* 修复了通过工具箱安装时（Windows 和 Linux）未检测到 Rider 2022 的问题
* 修复了 `Dictionary` 和 `HashSet` 迭代器，以防止不必要的数据复制
* 修复了 `ShaderGraphValue` 浮点数格式化的精度足够
* 修复了将预制体更改应用于嵌套预制体实例
* 修复了编辑器窗口在菜单按钮双击时最大化/最小化的问题
* 修复了使用空格键打开上下文菜单时的空白区域
* 修复了 `EditorModules` 在程序集查找路径中未正确包含
* 修复了能够从项目文件夹创建文件夹
* 修复了在编辑器中重命名带有点字符（`.`）的文件夹
* 修复了在文本框中输入 `DEL` 字符
* 修复了滑块裁剪最左侧像素
* 修复了右键单击源文件夹有时会选择不可见的子项
* 修复了在调试日志窗口中未捕获 `Debug.Log` 行
* 修复了在预制体编辑器中模型丢失时的错误
* 修复了构建 macOS 编辑器不需要 `iphonesdk`（并在 Mac 上检查 iOS 工具）
* 修复了 M1/2 Mac 上的 x64 编辑器/运行时
* 修复了在 macOS 上启动 Rider
* 修复了构建脚本仅检测支持版本的 `MSBuild`
* 修复了脚本结构绑定的 `Variant` 封送丢失
* 修复了非 Windows 平台的 `csproj` 文件
* 修复了在非 ASCII 路径上加载项目时的错误
* 修复了使用摄像机飞行时编辑器窗口关闭
* 修复了 `Actor.RotateAround` 旋转 Actor 的方向
* 修复了为 null 时的布尔编辑器
* 修复了模糊面板绘制自身
* 修复了模糊强度滑块的问题
* 修复了 HScroll 条覆盖场景和预制体树窗口中的节点
* 修复了初始编辑器窗口大小在启动时不覆盖任务栏
* 修复了鼠标离开时游戏窗口未将焦点返回给父级的问题
* 修复了嵌套性能分析事件的使用
* 修复了潜在的编辑器字体缺失错误
* 修复了视口大小奇特时编辑器视口摄像机漂移的问题
* 修复了直接从预制体对象创建预制体
* 修复了选择骨骼节点时调试形状绘制丢失
* 修复了模型资源预览等待材质加载
* 修复了 OpenFBX 的次要问题（向后移植了特定的修复）
* 修复了从 Blender 导入的 fbx 文件使用正确的向上轴
* 修复了模型导入器对骨骼模型骨骼使用预计算的偏移矩阵
* 修复了使用 Assimp 对导入模型应用缩放
* 修复了使用 `DefaultFrameRate` 用于使用 Assimp 导入的动画
* 修复了导入具有没有有效蒙皮的网格的蒙皮模型，以正确链接到节点的骨骼
* 修复了模型导入器对骨骼模型骨骼使用预计算的偏移矩阵
* 修复了场景对象在 Actor 变换和边界初始化之后创建
* 修复了 Development/Release 构建中由于不正确的绘制调用批处理（未初始化的内存）导致的性能错误
* 修复了多次加载共享托管程序集
* 修复了 AnimatedModel 盒体
* 修复了粒子效果在高帧速率下无法正常工作的问题
* 修复了顶点去重以尊重顶点颜色
* 修复了着色器编译跟踪检查目录是否存在
* 修复了 VisualScript 方法调用对值类型不起作用
* 修复了仅 C# 项目中 VS Code 缺少构建任务
* 修复了插件、依赖项和重复项的 VS Code 构建和启动任务
* 修复了构建规则程序集使用最新的 C# 版本
* 修复了可视化脚本参数项重复的错误
* 修复了 `FlaxEngine.Objects` 中潜在的不正确空检查
* 修复了 IES 配置文件光照计算公式
* 修复了在已烘焙游戏中 `Tag` 的反序列化
* 修复了在音频源启用后设置片段时的空间音频播放
* 修复了缓冲区开始时间差异具有舍入误差时的 `AudioClip` 加载错误
* 修复了音频片段数据缓冲区的各种问题，以减少伪影（尤其是使用 24 位数据时）
* 修复了 OpenAL 缓冲区播放的各种问题（进行正确的位转换）
* 修复了 `AssetsCache` 包含项目路径，并在项目被复制且带有缓存时拒绝缓存
* 修复了当滚动条可见时，编辑器选项卡控件标题的大小
* 修复了在保存布局中保留编辑器最小化浮动窗口
* 修复了一次在编辑器中删除大量资源
* 修复了销毁大量对象时更新时间剩余
* 修复了精灵阴影匹配精灵面向摄像机
* 修复了 `NavCrowd` 正确等待导航网格加载
* 修复了从引发异常错误的脚本中删除脚本时的脚本序列化失败
* 修复了来自源动画信息的动画图过渡数据
* 修复了编辑器中双重引擎程序集初始化
* 修复了在已烘焙游戏中正确卸载场景之前的插件初始化顺序
* 修复了编辑器视口摄像机变换在聚焦时损坏
* 修复了正交视口模式下编辑器 Gizmo 的大小
* 修复了在 Visual Studio 中打开插件项目文件
* 修复了多声道音频片段的音频预览
* 修复了使用 `XAudio2` 后端（Windows 和 Xbox）播放音频时的各种问题
* 修复了 Linux 上的颜色选择器
* 修复了 `Foliage::GetFoliageTypeInstancesCount` 中的死锁
* 修复了使用粒子发射器函数时缺失的粒子布局属性
* 修复了发射器函数内部无效的粒子属性访问
* 修复了 GPU 着色器生成的粒子发射器函数缓存清除
* 修复了 GPU 发射器函数中的粒子属性使用
* 修复了脚本在保存到 Json 期间抛出异常时的 C# 对象序列化错误
* 修复了非 Windows 平台上的日志记录性能和崩溃
* 修复了 `HandleObjectDeserializationError` 仅为编辑器或开发专用且线程安全
* 修复了为嵌套预制体设置预制体对象 ID 映射，以正确链接跨对象引用
* 修复了资源加载在互斥锁内触发加载任务，以防止同时从许多线程加载同一预制体时的竞态条件
* 修复了 Linux 上主菜单弹出窗口对齐问题
* 修复了 Linux 上的窗口放置提示
* 修复了 Linux 上 Alt 键的不正确映射
* 修复了 Arch Linux 下的构建项目生成
* 修复了 Linux 的 `GetVirtualDesktopBounds`
* 修复了 Linux 上的双击，使用点击之间的最大距离
* 由于最新的 Vulkan SDK 回归，修复了 macOS 上的 `Cannot find compatible metal driver`
* 修复了仅 C# 游戏项目引用 `precompiled DLLs` 而不是 `FlaxEngine.csproj`
* 修复了为 Win32 和引擎项目生成 VS 配置
* 修复了 Visual Studio 解决方案项目，确保主项目是第一个
* 修复了使用最新的 Visual Studio 2022 `17.7` 编译
* 修复了由于公开包含 `CommonValue` 导致的编译错误
* 修复了如果启用，Visject CM 组自动展开丢失
* 修复了 VC++ 项目智能感知选项中缺少 C++ 标准版本
* 修复了 `WindowsPlatform::LoadLibrary` 不修改字符串参数
* 修复了在已销毁对象上调用网络 RPC 时的错误
* 修复了使用 PostFxMaterialSettings Materials 封送数组时的 C# 崩溃
* 修复了在可视化脚本中使用 `Vector3` 软转换时的崩溃
* 修复了如果托管事件绑定目标对象的原生实例已消失，软返回的崩溃
* 修复了为缺少图块纹理的地形烘焙光照贴图时的崩溃
* 修复了 Linux 上使用未映射键盘时的崩溃
* 修复了使用自定义 Anim Graph 节点时的崩溃（.NET 7 回归）
* 修复了 macOS/iOS 上最大打开文件限制太小时的崩溃
* 修复了 `Variant` 中 ManagedObject 引用复制导致的崩溃
* 修复了编辑器中地形导出的崩溃
* 修复了在窗口更新循环期间移除窗口时的崩溃
* 修复了源播放时 `XAudio2` 后端的崩溃
* 修复了如果 `OpenAL` 内部设备名称全是空格的崩溃
* 修复了将带有引用的托管结构拆箱到 `Variant` 时的崩溃
* 修复了将原生数组装箱为托管值时的崩溃
* 修复了在同一文件夹中复制粘贴作为克隆时的崩溃
* 修复了切换 `WheeledVehicle` 活动状态时的崩溃
* 修复了泛型类跨越不同程序集时的崩溃
* 修复了从非 ANSI 路径加载 C# 程序集时的崩溃
* 修复了在材质实例基础材质加载之前设置它时的崩溃
* 修复了 Assimp 中由于无效消息导致的崩溃
* 修复了 C# `JobSystem.Dispatch` 中由于 GC 收集 Delegate 对象导致的崩溃
* 修复了启用 `Split Objects` 时导入带有材质的模型时的崩溃
* 修复了 D3D11 后端因驱动程序故障无法创建着色器时的崩溃
* 修复了通过分部分发送生成消息，一次性生成大量网络对象时的崩溃
* 修复了仅在 C# 中实现 `INetworkSerializable` 时的崩溃
* 修复了在没有分配视图缓冲区的情况下更新 GPU 粒子系统时的崩溃
* 修复了在编辑器中导入资源时的崩溃（来自内容导入器线程的竞态条件）
* 修复了在异步中使用可视化脚本运行时时的崩溃
* 修复了使用工具链设置生成项目文件失败时的崩溃
* 修复了在 Vulkan 上绘制着色器而没有绑定正确的常量缓冲区时的崩溃
* 修复了创建空粒子发射器时的崩溃
