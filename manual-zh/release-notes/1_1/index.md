# Flax 1.1 发布说明

## 亮点

### Linux 版编辑器

![在 Linux 上使用 Vulkan 的 Flax 编辑器](media/flax-editor-linux-vulkan.png)

此版本的主要功能之一是对 **Linux 版 Flax 编辑器** 的完全支持！它在 Ubuntu 上运行良好，并包含所有功能，例如使用 C++/C# 热重载的实时脚本、Visual Code 集成、场景编辑器、游戏烘焙、地形编辑、植被编辑等。它与 Windows 版编辑器在功能上持平，使 Linux 上的游戏开发者能够使用 Flax 创建出色的项目！

![在 Linux 上使用 Vulkan 的 Flax 编辑器运行模式](media/editor-playing-on-linux-vulkan.gif)

要了解如何使用它，请参阅[入门](../../get-started/linux.md)部分。我们使用 **Vulkan** 进行渲染（旧的 *OpenGL* GPU 将无法工作）。

*已在 *Ubuntu 18* 和 *Ubuntu 20*（均为 *LTS* 版本）上测试。

### 样条线

![样条线编辑](media/splines-editing.gif)

在创建游戏时，程序员、关卡设计师和美术师通常需要更强大的工具来进行对象放置和场景布置。这正是新的 **样条线工具** 发挥作用的好例子。样条线是由带有切线的 3D 点组成的贝塞尔曲线，在编辑器中非常容易创建和设置。这些可以用于创建沿路径移动的对象（如上所示）、在样条曲线上绘制模型、构建道路和河流，或创建动态游戏组件（如下所示的链条）。

![样条线链](media/spline-chain.gif)

要了解有关样条线的更多信息，请参阅专门的[文档及教程](../../graphics/splines/index.md)。

### 低级网络

我们今年想要重点开发的最重要的功能之一是 Flax 中对 **网络** 的支持，用于多人游戏。我们已经通过 .NET 库在 C# API 中支持了网络功能。现在我们正在添加一个跨平台的低级套接字实现，它将作为 Flax 内置的低级和高级网络解决方案的基础。

目标是在今年内在引擎中实现功能完整的多人游戏支持。现在你已经可以使用新的 `Network` API（来自 `Engine/Platform/Network.h`）在 Flax 中创建客户端/服务器，该 API 提供了创建和管理套接字以及通过网络发送或接收数据的方法。

### 导航功能

![导航功能 NavMesh](media/dynamic-navmesh.gif)

随着我们看到越来越多的项目使用 Flax，我们努力改进引擎的各个领域。这次我们为导航系统添加了许多新功能，例如：
* 多导航网格支持
* 导航修改器体积
* 导航代理属性和查询
* 旋转的导航网格
* 更多导航网格查询类型（`TestPath`、`FindRandomPoint`、`FindRandomPointAroundCircle`）
* 导航代理遮罩（例如用于导航边界体积）
* 运行时的动态导航网格更新

### 可视化脚本功能

在引入 Flax 可视化脚本工具的 1.0 版本更新之后，我们看到它被大规模采用。这导致在 Flax 的可视化脚本中添加了更多新功能。

现在，你可以在可视化脚本中绑定 **事件** 来处理触发体积或碰撞事件，如下所示（参见[教程](../../scripting/visual/events.md)）。

![可视化脚本事件处理](media/visual-script-event-trigger-handler.png)

其他功能包括 **自动节点格式化**，它可以排列节点使其更有条理（使用上下文菜单中的 *Format node(s)* 按钮）和用于连接组织的 **绕行节点**（双击连接以插入它）。

![Visject 中的绕行节点](media/reroute-node-visject.gif)

### 第三人称射击示例

![Flax 示例中的第三人称射击](media/third-person-shooter.gif)

[Flax 示例](../../samples-tutorials/samples/index.md) 是一个很好的项目集合，可以在开始使用 Flax 时参考。最近我们添加了一个带有第三人称摄像机的射击项目（社区贡献）。可以用作你未来游戏项目的基础。试试看！

### 编辑器改进

![Flax 编辑器中的实时粒子](media/particles-in-editor.gif)

在 1.0 和 1.1 更新之间的大部分时间里，我们致力于 **提高质量** 和 **可用性** 编辑器。这包括修复了大量问题（超过 140 个 bug），改进了稳定性、更好的 Gizmo、更好的 UI 编辑、更好的预制体工具、更好的所有功能。
需要强调的重要事项是：
* **Rider IDE** 集成
* **预制体** 编辑器中的 **UI 编辑** 支持
* 调试日志中的完整堆栈跟踪（双击导航）
* **新的 UI 变换编辑器**
* 基于声明顺序的脚本成员显示（参见编辑器选项）
* 场景视口中的 **实时粒子预览**
* 将现有 Actor 转换为不同类型
* **所有脚本属性的复制/粘贴**
* 选项中的构建按钮配置
* 优化的 C#/C++ 代码热重载性能（通过缓存脚本 API 反射数据）

![Flax 编辑器中的堆栈跟踪调试日志](media/stack-trace-debug-log.png)

### 精灵渲染器

![精灵渲染器](media/sprite-render.png)

新的内置 Actor，可以在 3D 或 2D 中绘制精灵。高度可定制，即开即用。请参阅文档[此处](../../ui/sprite-render/index.md)。

### 体积雾粒子

![体积雾粒子渲染](media/volumetric-fog-particles.gif)

体积雾的一个重要方面是能够在场景的局部区域调整其密度和颜色。为了实现这一点，我们向粒子添加了一个新的绘制模块，称为：体积雾渲染。它将粒子绘制到体积雾中，它们可以修改雾的反照率、密度和自发光。请参阅文档[此处](../../graphics/fog-effects/volumetric-fog.md)了解更多信息。

## 更新日志

### 版本 1.1.6218 - 2021年4月23日

贡献者：mafiesto4、stefnotch、jb-perrier、W2Wizard、GoaLitiuM、TaylerMauk

合并的 PR：15

* 在 Windows 上为 SaveDialog 添加了覆盖提示
* 为胶囊体形状添加了扫掠和重叠物理查询
* 添加了更多 C++ 文档和示例
* 改进了随机字节生成代码
* 添加了 `BoxBrush::SetMaterial`
* 为 Linux 添加了拖放支持
* 向角色控制器添加了 `UpDirection`
* 在保存 Json 资源时自动创建目标文件夹
* 添加了支持 StringView 的路径工具
* 在编辑器选项保存错误时添加了错误消息框
* 添加了对 Json 序列化的 C# 类型的 OnSerializing、OnSerialized、OnDeserializing 和 OnDeserialized 回调的支持
* 添加了对脚本中固定大小数组字段的支持
* 优化了 `WriteStream::WriteText`
* 修复了由于调试符号搜索路径无效导致的 Win32 堆栈跟踪问题
* 修复了 C# 列表的差异序列化
* 修复了 C# 列表的反序列化
* 修复了 UWP 游戏构建
* 修复了当 EditorTarget 不是 SetupTargetEnvironment 时选择游戏二进制目标的问题
* 修复了在 C++ 游戏项目中使用跨模块引用
* 修复了使用主项目之外的项目引用
* 修复了选择样条线点
* 修复了高 DPI 屏幕上的初始停靠窗口大小
* 修复了添加模型材质槽的回归问题
* 修复了下拉菜单控件
* 修复了复制样条线
* 修复了 `AutoFocus` 保存在控件数据中
* 修复了移除 Gameplay Globals
* 修复了在游戏代码中使用 `AssetsCache`
* 修复了阴影渲染的渲染层遮罩使用
* 修复了 XAudio2 和 OpenAL 的 3D 音频放置
* 修复了 BitArray 中重定位的崩溃
* 修复了在 C++ 游戏代码中使用排序
* 修复了文档注释
* 修复了 StringBuilder 的 natvis
* 修复了工具提示闪烁
* 修复了工具提示跨越多个显示器导致难以阅读的问题
* 修复了脚本列表中的 `PrefabSpritesRenderer`
* 修复了使用摄像机引用
* 修复了 `ContainerControl.GetChildAt` 以反向迭代以尊重 z 顺序
* 修复了使用无效索引的 Actor GetScript 或 GetChild 时的崩溃
* 修复了在某些情况下使用 `API_EVENT` 的绑定代码编译
* 修复了使用继承自 C++ 脚本的 C# 脚本时的崩溃
* 修复了 d3d12 上景深散景的崩溃（NVIDIA 驱动程序问题回归）
* 修复了进度条绘制精度和稳定性
* 修复了在构建期间加载脚本 API 绑定缓存时处理崩溃
* 修复了样条线模型几何变形精度问题
* 修复了 DPI 回归（使用可覆盖的 `RootWindow` 而不是 `_root`）

### 版本 1.1.6217 - 2021年3月28日

贡献者：mafiesto4、VNNCC、DaruBrub、jb-perrier、stefnotch、honzapatCZ、iliyalesani、SilentCLD、intolerantape、Evildea、Vizepi、GoaLitiuM、MinhCT、W2Wizard、Down-s、Erdroy

合并的 PR：68

* 向脚本 API 绑定添加了 `API_INTERFACE` 以实现接口
* 添加了对加载 JsonAsset 实例对象的支持（如果它们实现了 ISerializable 接口）
* 添加了 **导航修改器体积** Actor 类型
* 添加了 `NavAgentProperties`
* 添加了 `NavMeshProperties`
* 添加了 `NavAreaProperties`
* 添加了 `NavAgentMask`
* 添加了对场景中 **多个导航网格** 的支持
* 为更好地调试，在日志中添加了导航网格名称
* 添加了在 NavMeshBoundsVolume 中对导航网格代理进行遮罩的支持
* 添加了对脚本 API 中字段自动生成 DefaultValue 特性的支持
* 添加了对 **旋转的导航网格** 的支持
* 添加了移动 NavModifierVolume 时动态更新导航网格的支持
* 向导航系统添加了 `TestPath` 工具
* 为 CollectionEditor 添加了默认间距 10，以便在编辑器中处理数组和列表时获得更清晰的 UI
* 添加了在变换更改后调用 `BoxVolume::OnBoundsChanged`
* 添加了调整大小时为结构和新的数组条目初始化默认值
* 向 flax.natvis 添加了 `ScriptingTypeHandle` 调试器视图
* 向 ScriptingObject 添加了更多对象类型检查和转换工具
* 添加了对使用 `ObsoleteAttribute` 在重构后升级旧 C# 资源/脚本数据格式的支持
* 添加了 `Actor.HasStaticFlag`
* 添加了在编辑器调试视图中隐藏导航网格的选项
* 添加了 **低级网络**（跨平台套接字实现）
* 添加了对贴花的剔除（通过 DrawMinScreenSize 属性）
* 在可视化脚本中添加了脚本 API **事件**
* 在编辑器中添加了对脚本 API 反射中事件的支持
* 为 Visject 节点添加了 `IFunctionDependantNode`
* 添加了 **样条线** Actor
* 添加了 **样条线模型** Actor（在样条线上绘制模型）
* 添加了 **样条线碰撞体** Actor（在样条线上创建碰撞）
* 添加了用于绳索、链条和缆绳物理的 **样条线绳索体** Actor
* 添加了可变形材质领域（用于样条线模型）
* 为样条线添加了默认的可变形材质
* 为关卡中生成的 Actor 添加了自动选择
* 向 Transform 添加了 Add/Subtract 方法
* 添加了对自定义编辑器中组（例如数组编辑器）的复制/粘贴/恢复值的支持
* 添加了 `Transform.LocalToWorldVector` 和 `Transform.WorldToLocalVector`
* 为 Curve 添加了一阶导数计算工具
* 向编辑器设置添加了构建操作选项，用于构建按钮配置
* 添加了 `DebugDraw.DrawWireTriangles` 用于线框几何体调试绘制
* 添加了 `SoftObjectReference` 用于资源和对象的延迟引用
* 添加了通过 `Flax.Build` 命令行对构建系统自定义定义的支持
* 添加了对自定义 SceneGraphNode 的支持，以处理带有撤销的删除
* 添加了对 SceneGraphNode 自定义复制的支持
* 添加了对 Window 使用其他 VC++ 工具集的支持，并添加了用于手动选择编译器的命令行参数
* 在运行模式中为选中的刚体添加了信息组（显示速度、线速度、角速度等）
* 添加了在 SceneAnimationPlayer 中映射对象以便在不同对象上重用的支持
* 添加了对复制/粘贴脚本属性的支持
* 向 SceneReference 添加了更多工具
* 向 LayersMask 添加了更多工具
* 添加了 **体积雾粒子** 以修改局部雾
* 如果文本框没有选择，则跳过滚动
* 为自定义对象差异序列化添加了 JsonConverter 的 WriteJsonDiff 支持
* 改进了更多文档注释
* 在资源预览中添加了 `F` 以聚焦摄像机视图
* 向 UICanvas 添加了 `WorldSpaceFaceCamera` 模式
* 如果初始位置离边缘太近，在编辑器视口中居中鼠标
* 在 ContainerControl 中为自身/子级绘制代码添加了分离
* 添加了 ContainerControl 作为通用 GUI 控件（边框、按钮、进度条、文本框）的基础
* 为 UICanvas 添加了剔除（用于 3D 渲染）
* 添加了在视口拖放中生成碰撞数据作为网格碰撞体的支持
* 改进了编辑器视口中对象生成
* 在预制体编辑器窗口中添加了对调试形状预览的支持
* 在预制体编辑器窗口中添加了对视口图标渲染的支持
* 向静态模型上下文菜单添加了 `Add mesh collider` 选项
* 当 UI 请求时，重用为模型创建的碰撞数据
* 添加了层和标签更新
* 在 Windows 上添加了对支持系统停靠和 Aero 阴影的无边框窗口样式的支持
* 添加了编辑器窗口轮廓颜色以匹配状态栏颜色
* 为 Linux 上的平台实现添加了更多功能
* 在 Linux（X11）中为窗口系统功能添加了更多支持
* 在不支持链接共享库时引用可执行文件的平台上，添加了对 C++ 脚本的支持（例如 Linux）
* 在 Linux 上添加了对 C++ 脚本的支持
* 在为 Linux 构建时添加了对 Clang 8、9 和 10 的支持
* 在 Linux 上添加了剪贴板支持
* 添加了在 TextureTool 中使用 stb 调整纹理大小的支持
* 添加了在 TextureTool 中使用 stb 导入纹理选项的支持
* 添加了单独的 `Platform::GetStackTrace` 和 `Platform::GetStackFrames`
* 添加了从 C++ 捕获已调用 DebugLog 的堆栈跟踪的支持
* 添加了最新的 `dbghelp.dll` 库
* 添加了使用 `Level.SpawnActor` 从代码添加场景的支持
* 与 **Rider IDE** 集成
* 向导航工具添加了 `FindRandomPoint` 和 `FindRandomPointAroundCircle`
* 添加了 `BoundingSphere::Transform` 方法
* 在游戏构建中，添加了通过 C# API 访问游戏设置和相关资源的支持
* 向 C# API 中的 Vector3 添加了 Absolute 和 Negative
* 添加了用于精灵绘制的 **精灵渲染** Actor
* 向 Camera 和 Render View 添加了渲染层，用于在渲染期间遮罩对象
* 添加了 `DebugDraw::DrawText` 用于在屏幕上绘制 2D 调试文本
* 添加了 `DebugDraw::DrawText` 用于在世界中绘制 3D 调试文本
* 添加了在编辑时更新编辑器视图中粒子效果的支持
* 向所有 Visject 曲面添加了 `Mask ZW` 节点
* 向内置粒子属性添加了粒子半径
* 添加了 `EditorScene` 用于在编辑器预览窗口中使用游戏逻辑
* 在编辑器窗口中添加了音频片段播放预览的支持
* 添加了 `SceneGraphNode.OnContextMenu` 用于自定义
* 在 `Flax.Build` 中为 LocalExecutor 线程工作器添加了性能分析事件
* 为编辑器的着色器调试添加了 `-shaderdebug` 命令行开关
* 添加了对 `API_FIELD` 上 `mutable` 关键字的支持
* 添加了在构建期间缓存脚本 API 绑定的支持
* 为 Flax.Build 命令行添加了 MaxConcurrency 和 ConcurrencyProcessorScale 选项
* 添加了 `SceneRenderTask.PreRender`
* 为 C++ 绑定生成器添加了检查，以确保属性 getter 和 setter 方法的值类型匹配
* 为自定义摄像机向 Camera GetMatrices 添加了 virtual
* 在输入字段中添加了对解析指数（科学计数法）数字的支持
* 向材质添加了 Any 节点
* 向材质添加了 All 节点
* 向材质添加了 Sign 节点
* 向材质添加了 Blackbody 节点
* 添加了在聚焦时将编辑器窗口置于前台
* 为粒子数据添加了安全检查，以防止除以 0
* 在预制体视口中添加了对 UICanvas 预览的支持
* 在预制体窗口中添加了 UIControl 轮廓绘制
* 添加了虚拟内存分配工具
* 当使用 `DebugDraw.DrawLines` 线条数量不均时，添加异常而不是崩溃
* 向类 `JsonAsset` 添加了 `FLAXENGINE_API` 宏
* 添加了 `Level.GetActors` 和 `Level.GetScripts`
* 为 `Quaternion` 辅助工具添加了一些默认值
* 为 Random 添加并重构了几个扩展方法
* 添加了 `Render2D.DrawTexturedTriangles`、`Render2D.FillTriangles` 和 `Render2D.FillTriangle`
* 向 `flax.natvis` 添加了 `ScriptingTypeHandle` 调试器视图
* 在编辑器场景树上下文菜单中为 Actor 添加了 `Convert` 功能
* 向材质图添加了 RGB 和 HSV 转换节点
* 向 `TextBoxBase` 添加了更多分隔符
* 允许覆盖 `TextBoxBase` 中的大多数方法
* 在 C++ 脚本模板中默认启用了自动序列化
* 向 `DockWindow` 添加了可选图标
* 为内容窗口添加了图标
* 为调试日志窗口添加了图标（基于最后未查看日志的严重性）
* 向 Flax.Build 日志记录器添加了 WarningOnce、ErrorOnce、InfoOnce、VerboseOnce
* 为调试日志条目添加了彩色图标（并调整了条目高度）
* 添加了 Render2D 色调颜色分层支持
* 向 Visject 添加了 **绕行节点**
* 向 Visject 添加了箭头键导航
* 添加了对仅包含原生代码的二进制模块的支持
* 在构建二进制模块时，改进了 dll 导入/导出属性的注入
* 添加了在游戏/项目脚本中使用 ThirdPartyModule 的支持
* 添加了 `StringBuilder::ToStringView()`
* 在绑定胶水代码中为 Mono GC 添加了写入屏障
* 添加了对覆盖 `TextBoxBase` 中大多数方法的支持
* 向 Vector2/3/4 添加了 `ClampLength`
* 添加了 `StringUtils::ConvertUTF162UTF8`
* 添加了在部署中对二进制文件使用自动化代码签名的支持
* 在部署期间调用子 Flax.Build 进程时，添加了传递自定义编译器开关
* 向 DebugDraw 添加了 DrawCylinder 和 DrawWireCylinder
* 向文本框添加了 *Shift+Home* 快捷键
* 添加了对垂直和水平面板根据子级锚点排列子级的支持
* 添加了每个显示器/每个窗口的 DPI 支持
* 添加了 **新的 UI 控件变换编辑器**
* 添加了更多描述性的“无场景”消息
* 添加了对 UIControl 的自动重命名
* 为单点空盒构造向 BoundingBox 添加了构造函数
* 向编辑器添加了鼠标滚轮灵敏度选项
* 添加了在编辑器中首先选择预制体根对象
* 添加了错误检查，以防止更改场景 Actor 的父级
* 在编辑器视口中添加了使用 `F` 键聚焦 Actor（改进）
* 在编辑器视口控件中更好地支持正交投影
* 添加了基于声明顺序在编辑器 UI 中排序脚本字段/属性的选项（编辑器选项）
* 添加了启动画面引用
* 在 Game Cooker 中为构建脚本配置添加了自定义定义支持
* 添加了通过 `Flax.Build` 命令行对构建系统自定义定义的支持
* 优化并改进了 ActorChildNodes 处理
* 优化了构建工具
* 通过汇编映像提前退出优化了 `MAssembly::GetClass(MonoClass* monoClass)` 搜索
* 优化了编辑器中仅针对导航相关 Actor 的自动导航网格重建
* 优化了 Serialization.h，将 SerializationFwd.h 分离出来，用于更轻量级的类型序列化实现
* 优化了 DebugLog 堆栈跟踪格式化
* 优化了暂存纹理的 `Texture::DownloadData`
* 优化了混合法线节点
* 优化了 Windows 上的编译时间
* 如果从有效缓存加载 API，优化了脚本 API 绑定生成
* 优化了 DrawCall，使用联合打包间接绘制参数和图形绘制数据
* 重构了导航系统，以支持具有更多选项和 API 的多个导航网格
* 重构了 UI 中的大量逻辑，以修复各种报告的问题（例如，垂直和水平面板的使用已大大改进，可能比以前表现不同）
* 重构了游戏设置以支持使用 API 绑定
* 重构了 PhysicalMaterial 以使用 API 绑定
* 重构了绘制调用和实例化逻辑，使其更加模块化
* 重构了材质着色器生成器，使用模块化功能作为扩展
* 重构了 Collider 基类，以改善跨碰撞体形状类型的代码共享
* 将曲线数据序列化为二进制格式移至 `CurveSerialization.h`
* 将 ScreenToGameViewport 从 Engine 移至 Screen（更新文档注释）
* 从资源引用中移除了 Unlink
* 移除了已弃用且未使用的 `ISceneObject` 和 `ITransformable`
* 改进了脚本 API 头文件的标记预处理器
* 改进了 C# 项目的 Visual Studio Code 解决方案生成
* 清理并优化了 `StringUtils::ConvertUTF82UTF16`
* 将 Actor 静态标志辅助方法移至手动实现（更少的绑定）
* 更新了 stb 库
* 更新了 Recast 导航库到 `e75adf86f91eb3082220085e42dda62679f9a3ea`
* 修复了 UI 控件同步的问题
* 修复了编辑器布局元素容器的问题
* 修复了脚本对象的问题
* 修复并清理了 Flax Storage 类型的代码
* 修复了 `PathRemoveRelativeParts` 对于根路径的问题
* 修复了 C# 程序集 Guid 使用跨平台哈希以获得稳定值
* 修复了为具有 Modular 链接的目标收集二进制模块
* 修复了在编辑器中收集调试日志堆栈跟踪
* 修复了使用自定义 UnitScaleFactor 导入模型
* 修复了加载存储文件失败时退出时的崩溃
* 修复了编辑器中材质预览的一些小问题
* 修复了运行模式后在编辑器中调试形状残留更新的问题
* 修复了在异步中使用脚本
* 修复了在使用 Vulkan/D3D12 渲染后端且异步任务被取消时关闭时的崩溃
* 修复了如果半径指定为整数，材质 Sphere Mask 节点的问题
* 修复了在局部空间模拟的发射器的材质中采样粒子位置/速度
* 修复了 GenericEditor 中新实例创建按钮的放置和使用
* 修复了泛型类的 `MAssembly::GetClass(MonoClass* monoClass)`
* 修复了在已烘焙构建中通过相对于项目文件夹的路径加载游戏资源
* 修复了当游戏窗口未使用时，编辑器中粒子视图信息的问题
* 修复了 Detour 库中的 `findRandomPointAroundCircle` 以返回圆内的点
* 修复了如果元素类型是引用（例如类），在数组/列表编辑器中添加项目的问题
* 修复了 `Color` 结构文档注释
* 修复了在编辑器中不强制使用硬编码顺序显示 Actor 主要属性
* 修复了具有脚本类型的 json 资源的已加载资源验证错误
* 修复了使用缺失实例的物理材质时的崩溃
* 修复了跳过空白字符的默认字段值解析
* 如果计算队列使用图形队列，修复了 GPUDeviceVulkan 释放时的崩溃
* 修复了在 Linux 上解析动态库路径
* 修复了在可视化脚本中显示的一些编辑器 UI 控件
* 修复了 MAssembly 类字典缓存分配在程序集加载期间进行
* 修复了 Dictionary 在需要时调用 Buckets 的构造函数/析构函数
* 修复了 Visject 节点的右键单击上下文菜单
* 修复了在空 String 上使用 Find/FindLast 时的崩溃
* 修复了在 Actor 加载中调用 OnParentChanged
* 修复了编译警告
* 修复了在调用窗口上方显示着色器源代码窗口
* 修复了 Quaternion 比较 epsilon 以降低错误率
* 修复了使用贝塞尔曲线进行变换（缩放切线问题）
* 修复了自定义结构的序列化问题
* 修复了在脚本 API 中使用嵌套类型
* 修复了导航网格图块集调整大小的问题
* 修复了保存包含无效斜杠路径的资源
* 修复了垂直/水平面板与锚定子控件的问题
* 修复了使用自动大小时字体更改后更新 Label 布局
* 修复了未加载场景时的脚本重载
* 修复了更改子控件锚点时，使用特定面板时 UI 不更新的问题
* 修复了场景查询以锁定场景访问
* 修复了 DebugDraw DrawTriangles 崩溃
* 修复了公共 API 中的 *PhysX* 头文件使用
* 修复了预制体预览中 UICanvas 链接缺失
* 如果渲染模式为 ScreenSpace，修复了跳过 Size 属性的 UICanvas 差异序列化
* 修复了使用预制体和锚点时 UIControl 位置反序列化
* 修复了控件偏移边距差异反序列化
* 修复了预制体应用时可能被删除的默认值对象的预制体引用值问题
* 修复了编辑器视口摄像机轨道问题
* 修复了 CustomEditorPresenter 中缺失的选择类型
* 修复了由于罕见的无效存储对象引用计数导致的引擎关闭断言
* 修复了使用缩放模式 Gizmo
* 修复了靠近屏幕边缘的重命名弹出窗口方向
* 修复了由于无效引用值处理导致的自定义编辑器 UI 异常
* 修复了使用世界/摄像机空间时更新 UICanvas
* 修复了更改锚点时控件偏移量更新以用于控件边界
* 修复了动画图中向量参数的 Bug
* 修复了如果 parentId 缺失但 Actor 已有父级，Actor 反序列化时的崩溃
* 修复了应用预制体更改后，将 ActiveInTreeChanged 属性与事件同步
* 修复了当对象缺少虚表时 Mono GC 期间的崩溃
* 修复了在非活动对象上绘制植被
* 修复了 InputText 长度重置
* 修复了在世界空间中缩放旋转对象
* 修复了 HorizontalPanel 子级布局
* 如果子控件使用锚点，修复了 HorizontalPanel 和 VerticalPanel 的自动大小调整
* 修复了 Vector3.Angle 中的度数转换
* 修复了在游戏窗口中绘制 UI 控件轮廓
* 修复了 BlurPanel 渲染
* 修复了如果任务已被取消，启动任务继续时的错误
* 修复了带有行间距的字体字符和命中位置计算
* 修复了本地属性的工具提示生成，以反映 getter 和 setter 文档
* 修复了更改预制体根对象时的崩溃
* 修复了从编辑器删除不存在的文件夹的问题
* 修复了 Level 中的 FindActor 和 FindScript
* 修复了使用两个字符单词的 UI 属性名称格式化
* 修复了一些预制体编辑问题
* 修复了 C# 代码中的代码风格
* 修复了在可视化脚本中从 UIControl 使用 `get_Control` getter 方法
* 修复了使用刚体生成预制体时的错误
* 修复了编辑器 UI 中的层矩阵顺序
* 修复了双击鼠标事件未设置鼠标按钮按下的问题
* 将 fbx 导入片段的默认帧率修复为 14
* 修复了 Graphics 模块警告仅发送一次
* 修复了在预制体编辑器中应用后更新预制体对象引用值
* 修复了添加控件时更新 UI 布局
* 修复了在可视化脚本中可见的编辑器时间线编辑器控件 API
* 修复了在位于主显示器左侧的辅助显示器上使用值滑块时的问题（虚拟桌面）
* 修复了 UWP 构建设置干扰 FlaxGame 目标输出类型
* 修复了自动工具提示生成错误
* 修复了在编辑器中使用自定义主题颜色时的工具提示背景
* 修复了树节点鼠标悬停逻辑
* 修复了当屏幕尺寸非常小时运动模糊代码中的崩溃
* 修复了由于程序集重载时 *rgctx* 蹦床缓存未清除导致的罕见崩溃
* 修复了从模型文件自动导入材质和纹理时，名称中包含无效路径字符的问题
* 修复了在 json 中加载非字符串的字符串属性时的崩溃
* 修复了修改地形后地形边界未更新的问题
* 修复了在无更改的编辑结束时更新输入字段
* 修复了控制器缺失时 CharacterController 边界缺失
* 修复了 MaterialParams 同步错误
* 修复了 CSG 构建崩溃
* 修复了自定义 DPI 下 TextBox 光标和选择大小
* 修复了当文本溢出并换行时 Label 自动高度和自动宽度
* 修复了 Label 中负边距文本未被裁剪的问题
* 修复了 Json 资源中 UTF-8 和 UTF-16 编码支持的使用
* 修复了 C# 对象属性的 UTF-8 字符串反序列化
* 修复了同时按下两个鼠标按钮时鼠标抖动的问题
* 修复了编辑器停靠面板始终在单击时聚焦选项卡
* 修复了使用嵌套预制体在预制体窗口中错误显示 UIControl
* 修复了文本渲染中空文本的崩溃
* 修复了 Actor 编辑器边界获取器中可能的异常
* 修复了 Mono 图像引用的内存泄漏
* 修复了退出时的各种内存泄漏
* 修复了 ParticleSystemWindow 文本重叠错误
* 修复了打开时间线数据时无效的时间线布局 UI
* 修复了在具有缺失对象的实例上预制体同步的崩溃
* 修复了自动大小文本中的 Label 文本对齐
* 修复了添加新的 `ObjectsLookupIdMapping` 时同步嵌套预制体
* 修复了 Actor 层编辑器设置
* 修复了在处理预制体时 UICanvas 状态同步
* 修复了 D3D11 和 D3D12 上的全屏模式
* 修复了在导航网格图块变脏后场景卸载时导航网格构建器的崩溃
* 修复了应用时预制体实例中对象的顺序保留（基于预制体）
* 修复了更改控件顺序后更新 UI 布局
* 修复了在没有初始化字体图集的字体中使用空格字符时的崩溃
* 修复了编辑器中 Unicode 字符串的 `IncrementNameNumber`（错误的反转方法）
* 修复了在动画图中使用 Multi Blend 节点位置时标记资源已编辑
* 修复了在导航网格初始化之前调用导航系统时的崩溃（例如在构建中）
* 修复了加载带有无效版本文件夹的 Android NDK 时的异常
* 修复了在没有鼠标按下点击控件的情况下 AssetPicker 按钮的使用
* 修复了低级 `WindowsPlatform::Log` 不打印无效字符
* 修复了 Dictionary 和 HashSet 的 VS 调试器配置，仅显示 Occupied 存储桶
* 修复了 SurfaceNode 中的 ResizeAuto 包含自定义控件
* 修复了使用跨平台哈希代码实现生成 C# 程序集 ID
* 修复了使用动态链接时暴露 Mono API
