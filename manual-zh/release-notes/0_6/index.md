# Flax 0.6 发布说明

## 亮点

### 场景动画

![场景动画](/manual/media/scene-anims-cut-scenes.gif)

我们在本次更新中为 Flax 带来的主要功能之一是 **场景动画**。它是一个内置工具，用于在场景中为对象制作动画。例如，创建过场动画、游戏对象动画、UI 动画等。Flax 提供了各种工具，用于在游戏项目中开发和使用场景动画。这使开发者能够轻松地为场景中的任何对象（Actor、脚本）及其所有属性制作动画，包括创建摄像机镜头和音频播放以及事件轨道。这可以扩展到实现基于时间的各种游戏机制，例如 Boss 战。

你可以在[博客](https://flaxengine.com/blog/flax-facts-28-scene-animations/)上阅读更多信息。

### Linux 支持

![Flax on Linux Ubuntu](/manual/media/flax-on-linux.gif)

从本次更新开始，我们将支持 Linux 平台，并为游戏开发者分发 Flax 二进制文件，以将他们的游戏部署到 Linux 桌面端，或使用特殊的构建选项在云端运行游戏，用于多人和流媒体目的。

要了解更多信息，请参阅[公告](https://flaxengine.com/blog/flax-for-linux/)。

### 材质工作流改进

![材质实例工作流改进](/manual/media/material-instance.png)

每次引擎更新都会为内容创作者带来新功能和改进。这次我们希望改进材质工作流。具体来说，我们添加了按参数覆盖材质的支持，以及使用其他材质实例作为继承基础的能力。这使得使用超级材质着色器更加容易，并改善了技术美术的整体工作流。编辑器还会高亮显示修改过的参数（使用右键单击以复制或恢复默认值）。

### DirectX 12

Flax 自 2015 年以来就支持 DirectX 12，但它仅用于 Xbox One 构建。现在你可以在编辑器和 Windows 构建中尝试它。只需传递 `-d3d12` 命令行参数，即可使用 DirectX 12 渲染后端（如果可用，需要 Windows 10）。此外，在为给定平台构建游戏时，你可以指定支持的渲染后端（例如 Windows 支持 DirectX 10、DirectX 11、DirectX 12 和 Vulkan）。

### 抗锯齿线条渲染

![抗锯齿线条渲染](/manual/media/line-aa.png)

Flax 0.6 为文本渲染质量提供了更多改进。我们还希望通过为线条渲染添加抗锯齿滤镜来增强编辑器 UI 的视觉效果。现在，使用 Visject Surface（动画图、材质、粒子图）在视觉上更具吸引力。此外，使用 `Render2D` 绘制子系统的游戏 UI 将获得更平滑的线条，而不会像以前那样出现块状伪影。

### 编辑器功能

发布说明中的编辑器功能亮点开始成为一个常规部分，因为每次更新都会带来许多酷炫的功能。这次我们添加了许多很棒的功能，例如：

* 高 DPI 支持
* 输出日志窗口
* 导出地形高度图
* 驾驶 Actor 模式
* 自定义编辑器标题
* 改进的编辑器文本质量。更好的字体光栅化选项。

### 输出日志窗口

![输出日志控制台窗口](/manual/media/output-log-console.png)

对于高级 Flax 开发者，我们在编辑器中添加了一个新的专用窗口，以便更轻松地调试游戏：**输出日志**。它显示当前引擎日志内容，带有颜色编码的消息、搜索支持、过滤支持和自定义选项（可在编辑器界面设置中调整）。此外，你可以加载以前的日志文件，或从分布式构建或开发期间的控制台收集的日志。

为了实现这一点，我们大幅改进了文本渲染性能，包括在 C# 中提供更多字体 API。你还可以使用新的控件 *RichTextBox*/*RichTextBoxBase* 在游戏 UI 中实现精美的样式化文本渲染。

### 粒子参数编辑

![粒子参数编辑](/manual/media/particle-params-override.png)

为了使粒子系统编辑更加容易，我们添加了粒子发射器参数覆盖，这些覆盖保存在系统中。这使开发者能够在同一个系统中使用多个不同的粒子发射器，并为每个发射器调整自定义属性。

## 更新日志

### 版本 0.6.6192 - 2020年2月4日

贡献者：stefnotch

* 向材质和粒子添加了 **Channel Mask** 参数类型
* 在属性窗口中添加了对场景操作快捷键的支持
* 添加了带有材质颜色和环境光遮蔽的无光照视图模式
* 在资源编辑器窗口标题栏中添加了复制名称选项
* 添加了在拾取时对带有 HideFlags.DontSelect 的 Actor 选择父级的支持
* 向游戏窗口添加了视口亮度、视口分辨率和截取屏幕截图选项
* 为性能分析器窗口更新添加了性能分析事件
* 添加了对枚举工具提示的支持
* 为常见的引擎枚举添加了 **工具提示**
* 添加了当未分配播放器时在场景动画时间线中查找的支持
* 向 Color 添加了 Min/Max/Clamp
* 添加了自定义编辑器 FPS 的编辑器选项
* 向颜色选择器添加了 **HDR 支持**
* 向 CharacterController 添加了 NonWalkableModes
* 添加了在移动鼠标时自动弹出主菜单选项
* 添加了在编辑器中使用自定义图形质量的支持（本地）
* 添加了对编辑具有相同脚本集合的多个 Actor 脚本的支持
* 向 Render2D 添加了 **顶点捕捉支持**（通过 Render2D.Features 标志可选）
* 添加了对变换选定的植被实例时撤销的支持
* 通过内容窗口上下文菜单为文件夹添加了复制功能
* 添加了对复制植被实例时撤销的支持
* 添加了对拾取植被实例时撤销的支持
* 添加了对编辑和移除选定植被实例时撤销的支持
* 向纹理导入添加了 **保留 Alpha 覆盖** 支持
* 添加了 'if' 作为分支节点的替代标题
* 添加了在将 Actor 变换更改为 nan/inf 时记录错误
* 添加了对将 0 用作更新/绘制 FPS 作为无限的支持
* 在时间线中添加了 PageUp/PageDown 快捷键，用于快速关键帧导航
* 为游戏设置添加了默认值
* 为 EditGameWindow 添加了视图标志缓存
* 向编辑器启动画面添加了随机引用
* 添加了对使用相对项目路径运行编辑器的支持
* 优化了调试绘制顶点以使用 32 位颜色
* 改进了颜色选择器默认放置
* 改进了复制资源和文件夹的命名
* 改进了移动和重命名资源（当存储更改时不重新加载资源）
* 重构了 Skeleton Mask 资源以包含骨骼节点名称列表（而不是骨骼索引）
* 重构了 Bone Socket Actor 以使用骨骼作为参考
* 重构了 Content API
* 重构并优化了 Function 类以提高速度
* 改进了使用树节点箭头导航
* 改进了 Windows 上的无边框窗口支持
* 从 RenderView 任务中禁用了地形的 ModelLOD bias/scale
* 修复了绘制指向下方的调试圆
* 修复了对 project.xml 文件使用 utf8
* 修复了使用原生窗口标题栏时的错误
* 修复了使用自定义视图模式时绘制编辑器精灵的问题
* 修复了新材质渲染问题
* 修复了带有点的文件夹路径的短名称
* 修复了使用自定义视图模式时绘制选择轮廓的问题
* 修复了性能分析器计时
* 修复了带有细分的材质层使用
* 修复了材质的常量缓冲区对齐
* 修复了聚光灯调试形状渲染
* 修复了物理层遮罩编辑器层名称标签定位
* 修复了从输入设置加载 Snap
* 修复了 CPU 的性能分析器计时
* 修复了通过拖放到编辑器导入文件夹
* 修复了选择轮廓以绘制选中的子 Actor
* 修复了材质实例颜色选择器使用取消
* 修复了如果稍后添加隐藏子节点，树节点的问题
* 修复了 Quaternion.LookRotation 的边缘情况
* 修复了停靠窗口窃取用户焦点
* 修复了当角度环绕时 Quaternion 的贝塞尔插值
* 修复了具有负缩放的几何体反向剔除回归问题
* 修复了当窗口已最大化时，将窗口布局恢复为最大化的问题

### 版本 0.6.6191 - 2019年12月23日

* 添加了对 `FlaxEngine.Object.New<GPUTexture>()` 的支持
* 在编辑器中为内容加载添加了异步调用
* 添加了带有缺失自定义节点类型名称的警告
* 添加了游戏构建失败时输出日志窗口自动聚焦
* 添加了 `Actor.Children` 获取器
* 为停靠面板选项卡添加了 ctrl+tab 导航
* 为关闭选定的停靠窗口添加了 ctrl+w 快捷键
* 改进了后期处理效果强度选项的最大范围
* 改进了 Asset.WaitForLoaded
* 更改了预制体编辑器的实时重载默认禁用
* 修复了在项目中没有任何自定义节点时在 Visject 中加载自定义节点的问题
* 修复了当资源加载任务失败时 Asset::WaitForLoaded 中的死锁
* 修复了源长度非零的区域光的高光
* 修复了 `AutomaticAverageLuminance` 的崩溃
* 修复了在 Windows 上 DirectInput 游戏手柄扫描线程退出时罕见的崩溃
* 修复了 RichTextBoxBase 中的文本剔除
* 修复了在预制体编辑器中复制 Actor
* 修复了在预制体编辑器中移动 Actor 时的异常
* 修复了高 DPI 显示器上的自定义编辑器窗口标题栏
* 修复了 Desaturation 节点元素定位
* 修复了 Border 控件绘制

### 版本 0.6.6190 - 2019年12月17日

贡献者：stefnotch、JimiVacarians

* 添加了 **场景动画**
* 向 Actor 引用选择器添加了 Actor 搜索弹出窗口
* 添加了 `Control.PointFromParent(ContainerControl parent, Vector2 location)`
* 添加了屏幕淡入淡出颜色，通过后期处理设置淡出屏幕
* 向 Label 添加了 AutoFitText 选项
* 添加了 **Linux** 支持
* 向编辑器视口添加了分辨率缩放滑块
* 添加了 **高 DPI** 屏幕支持
* 添加了 `-lowdpi` 命令行以使用默认 DPI
* 为高 DPI 显示器添加了字体放大
* 向 FlaxEngine 添加了 PerlinNoise
* 向 PerlinNoise 添加了 Octaves
* 向 Assimp DLL 添加了延迟加载以改善编辑器启动时间
* 添加了对使用 `ShowInEditor` 特性显示仅获取属性的支持
* 添加了对 UWP 和 XboxOne 上 DirecxtTex 库的支持
* 向编辑器添加了 **输出日志窗口**
* 添加了对 Visject 节点值枚举编辑的支持
* 添加了没有布局格式化的 Render2D.DrawText
* 向 UI 库添加了富文本框
* 为 Font 和 Render2D 添加了使用 TextRange 处理文本子字符串的 C# API
* 向粒子系统添加了发射器参数覆盖支持
* 添加了 `Time.StartupTime`
* 添加了缓存 FPS 和导航显示小部件选项
* 添加了 `Texture.FromFile` 和 `Texture.LoadFile` 用于在游戏中从文件加载图像
* 向内容窗口上下文菜单添加了复制资源 ID 选项
* 向引擎纹理添加了 Flax 图标
* 添加了原生内存分配性能分析
* 向默认窗口布局添加了输出日志窗口
* 添加了 **地形导出** 功能
* 添加了编辑地形时导航网格更新支持
* 向编辑器添加了高 DPI 支持
* 添加了阻止在其他线程上编辑场景层级的保护
* 添加了对 Font 的字距调整表缓存支持
* 添加了对 **字体提示和标志** 的支持
* 为 Render2D 添加了索引缓冲区支持
* 为 ParticleSystemTimeline 添加了拖放支持
* 向 PostFxVolume 添加了 AddPostFxMaterial 和 RemovePostFxMaterial 方法
* 添加了 `GPUContext.CopyTextureRegion`
* 添加了基于直方图的 **眼睛适应** 效果
* 向 Bloom 设置添加了 Limit 参数
* 添加了 ToneMappingMode 并使用优化的 ACES 近似代替曲线的可自定义选项
* 在编辑器场景视口中添加了 **驾驶 Actor** 功能
* 添加了 **DirectX 12 支持**（使用 `-d3d12` 命令行开关）
* 在 Vulkan 上添加了 GPU 内存记录
* 添加了 `Font.ProcessText`
* 添加了 ViewFlags.DebugDraw
* 向 Render2D 添加了 **抗锯齿线条渲染支持**
* 添加了带有单独起始/结束颜色的 Render2D.DrawLine
* 向游戏脚本项目添加了 `FLAX` 定义
* 为编辑器插件添加了 `Editor.CustomData`，用于在会话期间缓存持久数据
* 为材质属性添加了默认值
* 向 SSR 添加了淡出距离参数
* 通过工具箱实现了更简单的地形创建
* 从 .Net Framework 添加了缺失的系统库
* 添加了 `Actor.HasTag`
* 添加了在场景加载时打印无效 Actor/脚本类型的对象 ID
* 添加了在构建游戏中截取屏幕截图的支持
* 添加了对透明和粒子材质接收方向光阴影的支持
* 添加了资源依赖收集 C# API（`Asset.GetReferences`）
* 添加了材质参数覆盖支持
* 向编辑器窗口添加了自定义标题栏
* 添加了 GPUResource 和 GPUTexture
* 添加了 GPUResourceMapMode
* 添加了 GPUResourceUsage
* 添加了 GPUTextureDescription
* 添加了 GPUTexture.Description 获取器
* 向 Vector2 和 Vector4 添加了 Half 常量
* 向预制体编辑器添加了 *Set Root* 操作
* 添加了对加载缺失 Visject 节点的支持
* 添加了对烘焙地形光照贴图的支持
* 添加了对烘焙植被光照贴图的支持
* 添加了 Visject Surface 编辑改进，支持键盘 *快速输入*
* 向透明和粒子材质添加了指数高度雾
* 向透明和粒子材质添加了对局部光源（点/聚光灯）的支持
* 添加了对材质实例用作另一个实例基础的支持
* 在主性能分析数据访问 API 中添加了 GPU 绘制时间和绘制统计信息
* 添加了对粒子和透明度阴影的支持
* 为 D3D12 添加了 MSAA 支持
* 为粒子添加了固定轴朝向模式
* 添加了 `DrawPass` 遮罩支持，以实现更好的渲染可配置性
* 添加了对用于枚举项的 HideInEditor 特性的支持
* 添加了对用于枚举项的 EditorDisplay 特性的支持
* 在隐藏时添加了最后一个模型 LOD 的淡出
* 在编辑器启动时，如果缓存中没有保存任何内容，则回退到默认项目场景
* 向 C# 添加了 FontTextureAtlas 类型
* 将每个对象的最大嵌套预制体嵌套级别降低到 8
* **将游戏脚本程序集重命名为 Game**（以及 Assembly.Editor 重命名为 Game.Editor）
* 重构并优化了脚本后端
* 重构了 PostProcessSettings
* 重构了眼睛适应
* 重构了引擎原生内存分配器
* 重构了脚本系统（来自原生模块的 C++ 脚本支持）
* 重构了托管类型缓存（多线程支持）
* 重构了引擎工作区
* 重构了光照贴图条目，每个 StaticModel 存储一个（而不是每个网格一个）
* 重构了一些引擎日志，使用 logger 而不是 DebugLog
* 将 FontReference 重构为结构体
* 重构了 LogType
* 重构了日志启动时间，从实际游戏开始计时，而不是日志开始
* 重构了 ScrollBar，使其更易于其他 UI 重用
* 重构了渲染目标池（为 C++ 和 C# 脚本使用共享池）
* 将 Application 重命名为 Platform（与 C++ API 匹配）
* 将 GraphicsQuality 重命名为 GraphicsSettings
* 将 GraphicsDevice 重命名为 GPUDevice
* 将 TextureFlags 重命名为 GPUTextureFlags
* 改进了指数高度雾并修复了体积雾密度
* 改进了 Visual Studio 2019 检测
* 改进了几何实例化性能
* 改进了绘制调用排序性能
* 改进了模型和蒙皮模型窗口预览
* 改进了视口 Gizmo 更新（使用更新委托）
* 通过为精灵使用索引缓冲区，改进了粒子顶点处理性能
* 调整了模型的默认 MinScreenSize 降低（更不积极的剔除）
* 移除了 `StaticModel.HiddenShadow`（使用绘制模式选项）
* 移除了 ContainerControl.OnChildControlResized
* 移除了 `RenderTask.Create<>`，使用 `Object.New<>`
* 移除了 `Mathf.Deg2Rad`/`Mathf.Rad2Deg`，使用 `Mathf.DegreesToRadians`/`Mathf.RadiansToDegrees`
* 从脚本中移除了 FlaxEngine.Rendering 命名空间
* 移除了 RenderTarget（使用 GPUTexture）
* 从粒子的默认值中移除了 Depth、GBuffer 和 MotionVectors 通道
* 移除了带有中心和半径的 `DebugDraw.DrawSphere`（使用带有 BoundingSphere 的方法）
* 在引擎错误消息上禁用了错误消息框
* 当不使用阴影光源时优化了 GPU 内存使用
* 优化了光照缓冲区格式
* 更新了 C# API 程序集版本以匹配引擎版本
* 使用 OnDestroy 而不是 Dispose 进行控件清理
* 在将 InitData 传递给 TextureBase.Init 时使用引用
* 更改了 CPUInfo 以包含 CPU 缓存大小（而不是缓存计数）
* 将默认盒体笔刷大小更改为 100
* 将默认 SunDiscScale 更改为 3
* 将点光源、聚光灯和方向光的默认亮度更改为 8
* 更改了编辑器精灵渲染，使其不受场景光照和后期处理的影响
* 将 RestoreMaterialsOnReimport 的默认值更改为 true
* 将默认近平面更改为 10，远平面更改为 40k
* 更改了 Vector3.NearEqual epsilon 参数为 float，并为其添加了默认值
* 修复了编辑 UIControl 控件属性时的撤销
* 修复了使用撤更改 UIControl 类型时的错误
* 修复了音频播放和定位
* 修复了当所有子项隐藏时 Actor 场景树节点展开
* 修复了 AudioSource.GetTime 对流式传输音频片段
* 修复了流式传输音频的使用
* 修复了缺失的 MonoPosixHelper 库
* 修复了面板滚动条更改
* 修复了选择 CSG 笔刷
* 修复了使用 Face Camera Position 时的粒子旋转
* 修复了材质 Opacity 输入启用状态
* 修复了重建后的 CSG 选择
* 修复了编辑器高亮材质
* 修复了调整 UI 控件时处理锚点样式
* 修复了使用 16 位音频时 ExtractDataFloat 的崩溃
* 修复了 `EnumElement.EnumTypeValue` 获取器
* 修复了在已禁用的 AudioSource 上调用停止时的崩溃
* 修复了时间线轨道重新排序
* 修复了在材质中使用场景纹理参数时的错误
* 修复了场景图事件取消注册
* 修复了在同步前取消 GPUTask 时的死锁
* 修复了 ShadowsDistance 根据点/聚光灯边界而不是位置计算
* 修复了后期处理效果体积排序
* 修复了使用 MinScreenSize 剔除最后一个模型 LOD
* 修复了使用 MinScreenSize 剔除蒙皮模型
* 修复了 D3D12 上的计时器查询和 GPU 性能分析
* 修复了脚本重载后罕见的崩溃
* 修复了长描述文本的工具提示（换行）
* 修复了 `Scripting.InvokeOnUpdate` 使其线程安全
* 修复了当没有碰撞体时更新刚体边界
* 修复了 D3D12 支持，提高了性能和稳定性
* 修复了如果不使用动画图，AnimatedModel 在游戏构建中不可见的问题
* 修复了自定义 RigidBody 质量序列化和预制体中的覆盖质量标志
* 修复了在自定义动画图节点中使用 Guid 值
* 修复了在使用颜色拾取对话框后关闭材质窗口时的错误
* 修复了自定义编辑器选项对象反序列化失败时的崩溃
* 修复了 Vulkan 上的地形渲染（并改进了缓冲区上传）
* 修复了天光烘焙（无天空裁剪，不在其烘焙期间使用天光）
* 修复了 Render2D.DrawLine 在线条端点应用厚度，并将其应用于当前变换缩放
* 修复了托管类缓存使其线程安全
* 修复了在 DirectX 后端上报告 GPU 内存
* 修复了从多个线程发送原生代码的 DebugLog
* 修复了长项目名称的编辑器启动画面标题
* 修复了 RenderOnlyWithWindow Brightness 应用不使用 Alpha
* 修复了在编辑器重新打开时选择缺少图块的地形时的错误
* 修复了 _dirtyNodes 锁以防止竞态条件
* 修复了使用地形的导航网格构建
* 修复了 RootNodeName 默认值
