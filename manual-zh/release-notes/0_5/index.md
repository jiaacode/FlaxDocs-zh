# Flax 0.5 发布说明

## 亮点

### 粒子

![粒子](/manual/media/particles.gif)

本次更新的主要功能是 **粒子支持**。粒子是现代游戏最核心的组成部分之一。每当你看到火焰、烟雾、爆炸或灰尘时，可以肯定——那些都是粒子。然而，如今的玩家和游戏开发者要求更高，因此我们投入了大量精力来创建能够为游戏带来更多震撼效果的粒子系统。

![粒子](/manual/media/particle-parameters.gif)

为此，Flax 支持无缝的 **CPU 和 GPU 粒子模拟**、**高性能渲染**，并提供了 **一套优秀的内容创作工具**。我们知道视觉效果是每款游戏的一个重要方面，因此我们希望让游戏开发者能够轻松创建粒子发射器、定义模拟，并从简单效果到复杂粒子系统构建一切内容。

请参阅相关文档以了解更多信息[此处](../../particles/index.md)。

### Vulkan 支持

![Vulkan 图形](/manual/media/vulkan.jpg)

现在，Flax 支持使用 **Vulkan** 进行图形渲染。添加 Vulkan 后端使我们能够向跨平台游戏和更好的性能迈进。

当前的实现支持完整的图形管线和计算着色器（仅缺少流输出和计数器缓冲区）。我们使用描述符池管理器来重用描述符集布局，并使用优化的管线绑定来减少 API 调用。管线状态对象会根据请求进行缓存并在之后重用，从而减少内存使用。此外，使用环形缓冲区处理统一数据，通过更高效的动态偏移分配减少了描述符更改。

你可以在[博客](https://flaxengine.com/blog/flax-facts-25-vulkan/)上阅读更多信息。

### 曲线编辑

![曲线](/manual/media/curve1.png)

本次更新为脚本带来了许多新增功能。其中包括新的 **Curve<T>** 类型和相关编辑器工具。你可以轻松地将曲线对象添加到脚本中，并使用它来为对象制作动画或用于通用目的。这在游戏制作过程中非常方便，现在是引擎的内置功能。

### 新的脚本事件

我们的 C# 脚本持续演进。在此次更新中，我们重构了脚本事件并提高了其执行性能。首先，已弃用的 `OnTriggerEnter/Stay/Exit`、`OnCollisionEnter/Stay/Exit` 和 `OnJointBreak` 事件已被移除，因为使用 `Collider.TriggerEnter/Exit`、`Collider.CollisionEnter/Exit` 和 `Joint.JointBreak` 性能更好，并允许开发者在同一脚本中为多个碰撞体注册事件，而不是将脚本添加到碰撞体 Actor 上。其次，我们向 Script 基类添加了 **虚方法**，这使得在 IDE 中更容易重写正确的方法并获得正确的文档。注意：不需要调用 Script 类的基方法，可以跳过以节省性能。

此外，我们更新了 Flax 文档和 Flax Samples 以包含这些更改。为了帮助你升级现有代码，请查看关于脚本事件的改进文档[此处](../../scripting/events.md)。

### 内容查找器工具

![粒子](/manual/media/content-finder.gif)

添加到编辑器中最棒的功能之一是 **内容查找器工具**。这个小对话框允许你通过简单地按 **Ctrl+O** 并输入搜索查询，在项目中快速导航。它可以用于浏览内容资源，也可以用于场景 Actor，因此你可以找到任何内容。

此功能由 [JimiVacarians](https://github.com/JimiVacarians) 实现。感谢！

### 新的命令行选项

由于 Flax 经常在各种场景中使用，我们希望保持高度的灵活性，以下是添加到引擎中的新命令行选项列表：
* `-vulkan` - 使用 Vulkan 渲染后端
* `-skipcompile` - 在启动时跳过自动 C# 脚本编译
* `-mute` - 禁用音频系统（引擎将使用 Null Audio 后端）
* `-nvidia` - 提示使用 NVIDIA GPU（如果可用）
* `-amd` - 提示使用 AMD GPU（如果可用）
* `-intel` - 提示使用 Intel GPU（如果可用）
* `-monolog` - 启用 Mono 运行时的高级调试

此外，启动命令行参数通过 `Platform.CommandLine` 暴露给 C# API，供你的应用程序使用。

### 新的材质节点

![曲线](/manual/media/curve.png)

材质系统在每次更新中都在不断增长。这次我们通过添加新的有用节点扩展了标准节点集合，例如：
- Append - 追加向量和标量
- Sample Gradient - 线性颜色渐变采样，带有预览
- Curve - float/vector2,3,4 曲线编辑和采样
- Degrees/Radians - 角度单位转换工具（也适用于向量）
- Bitwise operations - 整数数学运算集
- Boolean math - 布尔数学运算集
- Comparison nodes - 更简单的值比较方式
- Branch - 根据条件选择值
- Flipbook - 采样精灵表单
- Depth fade - 实现软粒子和透明度

### 更多编辑器功能

![编辑器功能](/manual/media/input-values-parsing.gif)

Flax 编辑器已经是一个很棒的工具。然而，每次更新都使其更加出色。这次我们希望添加许多可用性功能，包括：**自动保存**（可通过选项配置）、**Visject 撤销**（材质、动画图、粒子图）、**解析输入字段**（只需输入 `2 + 2 * 2`，编辑器将计算结果）、**自定义编辑器选项**（编辑器插件可以将自己的设置添加到编辑器 UI）、**输入快捷键设置**（为键盘定义自己的绑定）。

许多这些更改将改善你的游戏开发和编辑器使用体验。要了解更多信息，只需查看完整的更新日志。

### Actor 类型序列化

场景对象（Actor 和脚本）现在具有完全统一的类型序列化和类元数据缓存，这提高了性能并标准化了设计。从现在开始，每个 Actor 将使用 *TypeName* 作为其类型信息，而不是旧的 *TypeID*（ `"TypeID": 1` -> `"TypeName": "FlaxEngine.StaticModel"`）。此更改将在使用最新版本保存的场景和预制体文件中可见。我们将在未来的引擎更新中至少一年内继续支持旧格式的场景。

### 第三方库更新

新的 Flax 版本是首个使用我们全新的 **构建系统** 发布的更新。我们投入了大量精力使其性能更好并适应我们的开发。这也是更新我们使用的大多数依赖第三方库的好机会。

* 更新 Mono 到 5.20.1
* 更新 Assimp 到 5.0 RC 1
* 更新 DirectXMesh 到 2019年4月26日
* 更新 DirectXTex 到 2019年4月26日
* 更新 UVAtlas 到 2019年4月26日
* 更新 freetype 到 2.10
* 更新 curl 到 7.64.1
* 更新 fmt 到 5.3
* 更新 OpenAL 到 1.19.1
* 更新 PhysX 到 4.1
* 在 Windows 上对 PhysX 使用静态链接
* 在 Windows 上对 Mono 使用静态链接
* 在 UWP 平台上对 C# 程序集使用 AOT

要了解有关 Flax.Build 的更多信息，请参阅[这篇博客文章](https://flaxengine.com/blog/flax-facts-26-build-system/)。

## 更新日志

### 版本 0.5.6187 - 2019年10月26日

* 修复并改进了动画循环播放和负速度因子的播放
* 修复了在缓存数据缺失时蒙皮网格更新绘制的崩溃
* 修复了 Blend Pose 崩溃

### 版本 0.5.6186 - 2019年9月27日

* 更新了 ofbx
* 修复了动画图和 CPU 粒子图中的 Lerp
* 修复了从 fbx 导入蒙皮模型（无效的偏移矩阵计算）

### 版本 0.5.6185 - 2019年9月5日

* 添加了使用 List<T> 的 Mesh 的 UpdateMesh 和 UpdateTriangles 方法
* 添加了 `Collider.ComputePenetration`
* 添加了从自定义几何体缓冲区的 `CollisionData.CookCollision`
* 为 Actor 属性添加了默认值特性
* 更新了 ofbx 库
* 移除了 SceneRenderTask.Flags 和 SceneRenderTask.Mode（使用 View 结构）
* 优化了 CollisionCooking 在某些情况下分配更少的内存
* 修复了从 FlaxAPI 使用 Assert 库
* 修复了 Sky 着色器将像素始终放置在最大深度
* 修复了编辑器中锁定光标模式下的鼠标位置问题
* 修复了游戏设置中的 FirstScene 设置
* 修复了使用物理重叠测试结果过多时的崩溃
* 修复了编辑材质实例参数时的错误
* 修复了在不同系统语言设置下解析值的问题

### 版本 0.5.6184 - 2019年8月19日

贡献者：JimiVacarians、stefnotch

* 添加了 **粒子**
* 添加了 *粒子发射器* 资源
* 添加了 *粒子系统* 资源
* 添加了 *粒子特效* Actor
* 添加了 **Vulkan** 支持
* 添加了 `-vulkan` 命令行以使用 Vulkan 渲染后端
* 为 Visject Surface 节点添加了显示文档工具提示
* 为 Visject Surface 元素添加了工具提示支持
* 为 Vector2/3/4 添加了显式编辑器，以修改输入框默认值的所有分量
* 添加了在材质中读取粒子属性的支持（粒子着色器类型）
* 在 Visject Surface 中添加了对无符号整数连接类型的支持
* 向材质添加了 Flipbook 节点
* 添加了对 **Visual Studio 2019** 的支持
* 向文本框控件添加了文本换行
* 为 UWP 添加了 DirectX 10 和 11 支持选项
* 添加了 UWP 构建在 Xbox One 上运行的支持
* 为 Windows 添加了 x86 构建支持
* 向脚本模板添加了 `OnEnable` 和 `OnDisable` 事件
* 向编辑器 API 中的 SelectionOutline 添加了更多可扩展性
* 添加了在 Windows 上的已烘焙游戏中支持 `-headless` 标志
* 添加了对 Windows Server 的支持
* 向 C# API 添加了 **Curve<T>** 类型
* 为启用/禁用脚本添加了撤销支持
* 添加了对原生脚本和 Actor 的支持（需要引擎源代码）
* 添加了按供应商选择 GPU 设备的命令行开关
* 添加了 `-skipcompile` 命令行以在启动时跳过自动脚本编译（从 IDE 启动引擎时很有用）
* 添加了 `-mute` 命令行以禁用音频
* 添加了在构建游戏中禁用音频的选项
* 向编辑器添加了 **内容查找器工具**（使用 **Ctrl+O**）
* 为 LightBuffer 视图模式添加了后期处理效果
* 向 CustomEditor 添加了 OnUnDirty
* 为所有 Visject 图添加了曲线编辑和采样
* 添加了 `Panel.AlwaysShowScrollbars`
* 向图形后端添加了只读深度缓冲区
* 如果材质想要采样场景深度缓冲区但无法采样，则回退到虚拟白色纹理
* 向材质添加了 **Depth Fade** 节点
* 添加了对在粒子和透明材质中采样场景深度的支持
* 添加了对编辑器 IUndoActions 序列化的支持
* 向 Visject 数学库添加了 Degrees 和 Radians 函数
* 向材质添加了按位运算、布尔数学和比较节点组
* 添加了对 VectorX 和 IntX 取模运算的支持
* 向 Image 控件添加了 DisabledTint 属性
* 向编辑器 UI 库添加了时间线控件
* 添加了如果没有要显示的着色器源代码时显示辅助弹出窗口
* 添加了对透明材质的天光支持
* 添加了在内容窗口中按资源 ID 搜索的选项
* 向所有 Visject 图添加了 Branch 节点
* 向所有 Visject Surface 类型添加了 Append 节点
* 为输入值字段添加了调度场算法**解析器**，以便更轻松地使用（例如输入 2 + 2 * 2 以设置 6）
* 为 Windows 平台添加了 `GameWindowMode` 选项以指定游戏窗口模式
* 如果游戏逻辑被禁用（例如没有焦点且游戏不应在后台运行），则暂停游戏时间推进
* 向所有 Visject 图（粒子、材质、动画）添加了 Sample Gradient 节点
* 向贴花、动画模型和静态模型 Actor 添加了 `CreateAndSetVirtualMaterialInstance()`
* 向编辑器添加了自动保存功能
* 在属性窗口中显示蒙皮模型边界
* 向 Label 添加了 AutoWidth
* 向调试日志窗口中的选定条目添加了垂直滚动
* 添加了对插件自定义编辑器选项的支持
* 在启动时记录 FlaxAPI 构建版本
* 添加了对插件自定义编辑器选项的支持
* 为未知类型对象添加了辅助 Json 序列化方法
* 添加了 **Visject Surface 撤销支持**
* 为材质编辑器添加了撤销支持
* 向弹出窗口添加了内容项重命名验证
* 添加了在移动注释时移动注释内的节点
* 添加了 `SurfaceNode.DepthFirstTraversal()`
* 添加了 VisjectSurfaceWindow 并重构了 Visject Surface 编辑窗口
* 向编辑器选项添加了强制脚本编译在启动时
* 向编辑器选项添加了鼠标灵敏度
* 为视口默认值添加了编辑器选项
* 向编辑器选项添加了 StartupSceneMode
* 向编辑器选项添加了 DebugLogTimestampsFormat
* 向编辑器选项添加了 HighlightColor
* 添加了自定义编辑器字体选项
* 将 Mono 更新到 5.20.1
* 将 Assimp 更新到 5.0 RC 1
* 将 DirectXMesh 更新到 2019年4月26日
* 将 DirectXTex 更新到 2019年4月26日
* 将 UVAtlas 更新到 2019年4月26日
* 将 freetype 更新到 2.10
* 将 curl 更新到 7.64.1
* 将 fmt 更新到 5.3
* 将 OpenAL 更新到 1.19.1
* 将 PhysX 更新到 4.1
* 在 Windows 上对 PhysX 使用静态链接
* 在 Windows 上对 Mono 使用静态链接
* 在 UWP 平台上对 C# 程序集使用 AOT
* 改进了 UWP 构建稳定性
* 对于不使用折射的透明材质，禁用了失真通道以优化性能
* 如果没有任何更改，则不写入 C# 项目文件
* 移除了 `Mathf.Clamp01` - 改用 `Mathf.Saturate`
* 将 `CustomRenderTask.OnRender` 重命名为 `CustomRenderTask.Render`
* 在 Debug 构建中为 AOT 程序集复制部署 pdb 文件
* 实现了正确的图形后端选择和 Windows 平台设置
* 改进了材质着色器填充成员的生成
* 从生成的材质着色器中移除了 Flax 版权声明
* 禁止将 Update/Draw/Physics fps 设置为 0
* 改进了 Visject Surface 风格和用户界面
* 改进了渲染性能
* 将 ContentDomain 枚举移至编辑器程序集
* 改进了 Visject Surface 渲染和输入处理
* 将 `Control.CanFocus` 重命名为 `AutoFocus`
* 在材质中使用未缩放的游戏时间
* 在材质图中禁用了 Rotation 节点（不支持）
* 将 `Object.id` 重命名为 `Object._internalId`，以防止脚本中的名称冲突
* 重构了 FlaxAPI 程序集位置（无需重建引擎即可从 Release 更改为 Debug 程序集）
* 重构了 Visject Surface 注释为节点
* 移除了左/右 Shift 和控制键（不支持）
* 改进了默认地形创建对话框选项
* 改进了资源和 Actor 类型注册
* 重构了序列化的 Actor/脚本类型 ID 为完整类型名称
* 重构了脚本事件
* 重构了材质属性
* 确保状态机和状态具有唯一的名称
* 优化了场景对象反序列化
* 优化了脚本类型缓存
* 优化了 UTF16 字符串到 Json 的序列化
* 优化了物理事件处理和发送
* 修复了在音频系统关闭后处置 AudioClip 时的崩溃
* 修复了为天空盒使用透明材质时的崩溃
* 修复了在正交摄像机模式下在编辑器中拾取对象
* 修复了使用正交投影时的场景渲染
* 修复了脚本中带有 SerializeAttribute 的受保护/私有属性的序列化
* 修复了 `ContentEditingModule.CloneAssetFile` 中的参数顺序
* 修复了空后端与着色器缓存预加载的使用
* 修复了罕见的窗口清理崩溃
* 修复了 Panel 处理带有缩放或旋转的子控件的正确滚动
* 修复了滚动条的负最小值范围
* 修复了各种情况下的面板滚动条
* 修复了为 Visject Surface 控件显示工具提示
* 修复了 VerticalPanel 和 HorizontalPanel 间距插入
* 修复了布尔值的 Visject 输入框初始状态
* 修复了罕见的动画图过渡崩溃
* 修复了第二次构建时 Game Cooker 线程崩溃
* 修复了 `Actor.Direction = Vector3.Up` 时的崩溃
* 修复了图形平台选项更改时的着色器资源构建
* 修复了在没有父控件的情况下将 AnchorStyle 设置为 Center 时更改控件大小的错误
* 修复了未使用常量缓冲区时的材质参数绑定
* 修复了 Skybox 中的拼写错误
* 修复了材质中的 Camera Depth Fade 节点，将结果钳制在 0 和 1 之间
* 修复了在自定义编辑器中编辑 null Version 类型值时的崩溃
* 修复了透明材质纹理槽的使用
* 修复了在后期处理效果体积 Actor 中设置后期处理材质
* 修复了 EditorViewport 忽略在视口控件外传递的鼠标事件
* 修复了使用 Alt+Tab 和全屏模式
* 修复了游戏构建编译中的引擎版本宏
* 修复了带有 4 种颜色和 Alpha 混合的 `Render2D.FillRectangle`
* 修复了 Bias 和 Scale 节点处理各种输入值类型
* 修复了编辑器类型的命名空间（GUI 大多从 Engine 程序集移出）
