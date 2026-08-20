# Flax 1.8 发布说明

## 亮点

### 新 UI 编辑器

![新 UI 编辑器小部件](media/ui_editor_resizing_widget.gif)

我们终于做到了！新的编辑工具即将登陆 Flax。现在你可以在 **预制体或游戏窗口中轻松查看和修改用户界面布局**。这将改善 UI 开发的迭代时间。

### .NET 8 支持

![Flax 引擎中的 .NET 8 支持](media/dotnet8.jpg)

**.NET SDK 8 现在作为基础版本**（取代 `7`），支持 **C# 12** 和最新的性能改进。这是一个长期支持版本（`LTS`），意味着微软将维护它直到 `2026 年 11 月`。我们计划使用[官方的 .NET 发布周期](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core)，并在 Flax 工具生态系统中维护活跃的 .NET 版本。编辑器和启动器都将在启动编辑器时检查系统上是否有正确的 .NET 版本。在构建游戏时，请确保已[安装最新的 .NET SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)（尤其是在为 Android 或 iOS 烘焙游戏时）。

### ASTC 纹理压缩

每次更新都会为移动平台带来新的改进。这次我们为 iOS 和 Android 设备添加了 **ASTC 纹理压缩** 支持。这导致 **纹理内存使用量最多减少 80%**。纹理压缩提高了渲染性能，因为在纹理对象时，从 GPU 内存读取的纹理数据更少。此外，游戏加载时间也更快，因为从设备内存读取到 GPU 的数据更少。

Flax 支持 ASTC `4x4`、`6x6` 和 `8x8` 块压缩格式，可以在平台构建设置中设置（`AndroidPlatformSettings`/`iOSPlatformSettings` 中的 `TexturesQuality` 属性）。

### 将模型文件导入预制体

![将模型文件导入预制体](media/model-prefab.png)

现在，在导入模型文件（例如 `.fbx`）时，你可以选择 `预制体` 选项。它将从源文件（导入到子目录）中导入所有网格、材质、纹理和动画，并创建一个包含源文件整个结构的预制体资源。这个工作流程的补充允许处理包含多个子对象的更大资源，并通过重新导入功能（新的 *Model Prefab* 脚本）缩短了迭代时间。

我们计划继续改进此功能，增加对导入灯光、摄像机和对象动画的支持，以及简化工作流程。

### 新的车辆功能

![卡车车辆](media/truck-vehicle.gif)

物理模拟一直是 Flax 开发过程中的一个重要主题。这次我们添加了许多新选项，以实现更好的车辆驾驶控制，例如 `转向与速度`/`防侧倾杆` 配置和 **坦克车辆支持**。（[GH-2192](https://github.com/FlaxEngine/FlaxEngine/pull/2192)）

![坦克车辆](media/tank-vehicle.gif)

### 动画图调试

![动画图调试](media/anim-graph-debug-playback.gif)

动画图编辑器将展示 **动画的当前播放位置和状态机洞察**，以增强调试体验。此外，新的 `AnimatedModel.GetTraceEvents` 允许在游戏代码中收集动画播放信息。

新的 **根运动功能** 允许指定应将运动的哪些分量应用于对象的移动（位置 XZ、位置 Y、旋转）——这修复了 Mixamo 角色的根运动。此外，还有一个新选项，可以根据骨骼的质心运动来计算根运动。

|                                                |                                        |
| ---------------------------------------------- | -------------------------------------- |
| ![根运动 Mixamo](media/root-motion-mixamo.gif) | ![根运动](media/root-motion-fixed.gif) |

### 样条线改进

![样条线改进](media/spline.gif)

样条线编辑器允许在按住 `Ctrl` 并单击鼠标右键时，根据鼠标屏幕位置添加新点。在按住 `Shift` 键移动点时，它还可以将样条线点吸附到其他样条线点（包括附近的其他样条线）。（[GH-1482](https://github.com/FlaxEngine/FlaxEngine/pull/1482)）

### 回退字体渲染

![回退字体渲染](media/fallback-font.png)

我们为文本渲染添加了字体回退功能，以 **更好地支持 CJK 字符**（中文/日文/韩文字符）。它通过从包含这些字符的回退字体（例如 CJK 字体）中获取字符，来处理用于渲染的字体中任何缺失的字符。此功能在编辑器和游戏中都有效，因此有助于 Flax 项目的本地化和国际化。（[GH-2019](https://github.com/FlaxEngine/FlaxEngine/pull/2019)）

### 编辑器功能

![世界单位](media/world-units.gif)

每次更新都会为编辑器带来更多功能和改进。这次我们添加了以下功能：
* 保存属性面板中子组的面板折叠状态，
* 顶点捕捉（按下 V 键移动 Gizmo），
* 刷新了集合编辑器界面，使其更加精简（[GH-2208](https://github.com/FlaxEngine/FlaxEngine/pull/2208)），
* 输入字段中的 SI 单位，例如米、千克，用于显示和解析（[GH-2213](https://github.com/FlaxEngine/FlaxEngine/pull/2213)），
* 直接从 *添加脚本* 按钮快速创建脚本（[GH-1827](https://github.com/FlaxEngine/FlaxEngine/pull/1827)）。

![新集合编辑器 UI](media/new-collection-editor-ui.png)

## 迁移指南

* **.NET SDK 8 现在作为基础版本**（取代 `7`）。这是一个长期支持（`LTS`）版本，意味着微软将维护它直到 `2026 年 11 月 10 日`。我们计划使用[官方的 .NET 发布周期](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core)，并在 Flax 工具生态系统中维护活跃的 .NET 版本。编辑器和启动器都将在启动编辑器时检查系统上是否有正确的 .NET 版本。
* 对象渲染矩阵现在使用父变换的正确传播，而不是单一的 `TRS` 样式变换，这正确处理了嵌套变换。现有场景可能有视觉差异。
* 更改了 `DebugDraw.DrawWireArrow` 和 `DEBUG_DRAW_WIRE_ARROW`，接受额外的 `capScale` 参数，用于控制箭头帽的大小。
* 添加了带有 `Ray` 结构的 `DebugDraw::DrawRay`，`DEBUG_DRAW_RAY` 改为使用 `Ray` 结构。

## 更新日志

### 版本 1.8.6512.2 - 2024年5月22日

贡献者：mafiesto4、GoaLitiuM、Tryibion、Harloys、tecnessino

合并的 PR：35

* 添加了水印特性，用于在编辑器中为字符串字段添加水印
* 添加了使用 `Delete` 键删除选中的混合空间点
* 向工具箱中的项目树添加了边距
* 为面板和文本框添加了 shift 滚动
* 将控件变换添加到 `General` 组以提高可用性
* 添加了在重命名时修剪内容项名称和 Actor 名称，以防止多余的空白
* 向 Actor 工具箱添加了拖放控件
* 向 Label 和 Textbox 添加了字体和大小写选项
* 向面板的滚动条添加了颜色属性
* 为工具提示文本添加了宽度内边距
* 为编辑器层级添加了树节点引导线
* 向颜色选择器对话框颜色添加了棋盘背景
* 添加了通过拖放到 Actor 上来添加脚本的支持
* 对 UI 编辑器小部件绘制进行了微小的改进
* 为 `NetworkReplicator::SetObjectOwnership` 的错误使用添加了更好的错误消息
* 为 `PostFxVolume` 添加了针对摄像机 `RenderLayersMask` 的层遮罩
* 向 Actor 添加了 `OnStaticFlagsChanged`
* 将 Gameplay Global 组合框默认设置为最后的变量类型
* 在 `Release` 构建中默认启用 `For Distribution`
* 为 PhysX 和 NvCloth 库添加了 Windows on Arm 构建支持
* 添加了脚本中嵌套类型的测试用例
* 添加了在按住 `Shift` 键的同时移动所有选中的 UI 控件的选项
* 优化了导航网格构建并减少了场景锁定时间
* 将 `Options` 重命名为 `Editor Options`，并移到 `Edit` 菜单下
* 重构了 `Color.FromRGBA`，并添加了匹配旧逻辑的 `Color.FromARGB`
* 修复了循环根运动
* 修复了移除 Multi Blend 节点后使用撤销时的错误
* 修复了第一个属性和属性标签之间的奇数偏移
* 修复了 LayerMask 编辑器忽略空层的问题
* 修复了 TreeNode 在有不可见子节点时无法正确渲染所有节点的问题
* 修复了编辑器在项目生成时聚焦预制体窗口
* 修复了文本框在空字符串上不显示插入符号的问题
* 修复了无文本的文本框上的插入符号位置
* 修复了使用 `Render2D.DrawText` 绘制额外字符的问题
* 修复了 Actor 类型拖放生成时正确分配父级的问题
* 修复了光标不可见时的编辑器游戏窗口焦点
* 修复了 smooth step visject 节点宽度
* 修复了颜色选择器对话框
* 修复了在选择预制体时清除项目搜索
* 修复了将 `async` 方法用作 RPC 的错误（现在不支持）
* 修复了集合编辑器中 `ReadOnly` 特性的处理
* 修复了使用多个画布时的 UI 导航
* 修复了编辑器调试视图模式中的 TAA
* 修复了使用 64 位坐标时的编译警告
* 修复了使用非强类型枚举作为默认值时的编译问题
* 修复了如果缺少自定义界面字体，编辑器无法启动的问题
* 修复了为不在游戏中的 Actor 创建虚拟地形碰撞的问题
* 修复了预制体视口中缺少的摄像机模型预览
* 修复了从 json 加载时缺少的曲线初始化
* 修复了根据光标隐藏值强制显示或隐藏 Windows 光标
* 修复了嵌套类型的绑定代码生成
* 修复了内容存储和在加载期间正在更新的资源之间的死锁
* 修复了当在编辑器中显示的对象属性中使用脚本对象作为接口实现时的崩溃
* 修复了拆箱数组类型 Variant 时的崩溃
* 修复了可视化脚本事件绑定实例无效时的崩溃

### 版本 1.8.6511.1 - 2024年4月27日

贡献者：mafiesto4、GoaLitiuM、Tryibion、rkrahn、Zode、xxSeys1、Menotdan、Muzz、duarteroso

合并的 PR：25

* 添加了对导入 `.exr` 纹理的支持
* 添加了在编辑器运行模式后记录和清理泄漏的场景对象
* 在 MSVC Development 构建中进行了微小的优化权衡，以提高编译速度
* 添加了在重新导入动画资源时自动恢复动画事件轨道
* 添加了 `ShowDebugDrawSkeleton`，通过 Debug Draw 预览动画模型骨骼
* 添加了切换正交视图的热键（`Numpad Decimal`）
* 在属性和预制体窗口中添加了锁定 Actor 选择
* 添加了在没有应用过滤器时，在 Actor 工具箱搜索选项卡中显示所有 Actor
* 改进了时间线编辑器中动画事件的视觉效果
* 添加了对搜索 Actor 工具箱进行排序
* 添加了 `Tags.Find` 工具
* 在 macOS/iOS 上静态禁用了细分
* 在移动设备上静态禁用了几何着色器
* 为 UI 绘制添加了 CPU 性能分析事件
* 为 crword 代理位置和速度添加了设置器
* 添加了使用 Address 和 Thread 消毒剂的选项
* 如果 TAA 未启用，隐藏 TAA 设置
* 添加了 `Time.Synchronize` 以稳定引擎循环
* 添加了 `Engine::UpdateCount`，将游戏逻辑更新与游戏循环同步，而不是与绘制帧同步
* 改进了 Multi Blend 节点的大小
* 为 Multi Blend 点移动添加了撤销
* 向 Multi Blend 节点点添加了上下文菜单
* 向 Multi Blend 点添加了工具提示
* 添加了 `Ctrl` 键在 Multi Blend 编辑器中将点吸附到网格
* 改进了 Multi Blend 中点的视觉效果
* 在 Multi Blend 中添加了网格标签绘制
* 在 Multi Blend 中添加了混合位置的实时调试
* 向 Multi Blend 添加了添加/移除按钮
* 改进了 `Mesh` 和 `SkinnedMesh` API 中的 `const` 正确性
* 向 C# API 中的 `NetworkStream` 添加了 `Write`/`Read` 方法，用于发送 `INetworkSerializable`
* 为 Android 添加了更多有用的方向设置
* 在 `AndroidManifest.xml` 模板中向 activity 元素添加了 exported 属性
* 向编辑器添加了基本的 Android 版本设置
* 优化了 `DrawBatch` 以实现更快的排序
* 优化了不透明通道中的绘制调用排序
* 优化了 TreeNode 渲染
* 当它未折叠但其中一个父级折叠时，优化了 ActorTreeNode 重新设置父级
* 优化了动画图节点大小，并移除了最大 `64` 个状态转换的限制
* 重构了引擎循环，以在游戏更新、物理和绘制之间实现更好的同步
* 重构了 `UpdateGraph`，使其在引擎服务和游戏脚本之后运行
* 重构了 Visject 图节点数据，支持无限大小
* 重构了 Multi Blend 节点，支持最多 `255` 个混合点
* 将 `DirectXTex` 更新到 `mar2024`
* 将默认碰撞类型从 `TriangleMesh` 更改为 `ConvexMesh`
* 修复了导入材质时的默认漫反射颜色值
* 修复了从摄像机鼠标移动中移除的编辑器视口宽高比缩放
* 修复了 Linux 上的数字键盘回车为普通回车
* 修复了 Two Bone IK 具有正确的骨骼滚动
* 修复了混合形状变换的应用
* 修复了混合形状法线的使用
* 修复了混合嵌套动画以正确处理每个节点
* 修复了嵌套动画采样
* 修复了动画模型蒙皮精度问题
* 修复了在预制体窗口中使用样条线编辑器时的错误
* 修复了应用带有样条线的预制体更改时的错误
* 修复了在视口中使用摄像机轨道并在释放 LMB 且 Alt 抬起时取消选择 Actor
* 修复了在不同 DPI 下文本下划线位置错误的问题
* 修复了从模板创建粒子发射器
* 修复了使用地址/线程消毒剂检测到的代码中的各种错误
* 修复了 `EyeAdaptation` 在编辑器运行模式启动时时间重置导致闪烁的错误
* 修复了在使用物理材质编辑地形泼溅贴图时未保存高度场的问题
* 通过将游戏烘焙和构建移动到右侧以减少误点击，修复了编辑器工具条
* 修复了使用鼠标中键平移 Visject Surface（右键执行此操作），以防止意外移除连接
* 修复了同时添加许多条目时调试日志的滚动
* 修复了对象引用的克隆值工具
* 修复了更改 UI Widget 类型时缺少 UI 控件预览
* 修复了曲面节点上下文菜单在移动曲面时不显示
* 修复了上下文菜单中的边距问题
* 修复了 `FindRandomPointAroundCircle` 始终在半径内的导航网格上找到有效点
* 修复了导航网格提前初始化，以防止场景中人群代理的问题
* 修复了每日运行时构建中的 .NET 运行时有效性检查
* 修复了 `CachedAttributeGetter` 持有对可收集类型的引用
* 修复了在卸载脚本服务时释放预制体资源
* 修复了选择引用已移除资源的 ModelPrefab 时冻结
* 修复了地形高度图在解压缩时使用更高范围格式
* 修复了 `ValueContainer.HasDifferentTypes` 中的错误，导致不正确的编辑器设置
* 修复了模型工具导入仅为 Assimp 使用临时文件
* 修复了在 `RichTextBox` 中解析无效 HTML 文本时的死锁
* 修复了使用光照贴图的预制体预览崩溃
* 修复了在 `OnLateFixedUpdate` 中访问物理对象状态时的崩溃
* 修复了在 Vulkan 上调整窗口大小时的崩溃
* 修复了移除在打开的动画时间线中使用的动画事件可视化脚本时的崩溃
* 修复了在动画图中使用旧的 `Blend with Mask` 节点时的崩溃
* 修复了播放未初始化的音频源时的崩溃
* 修复了在设置了平移的情况下重新导入动画时的崩溃

### 版本 1.8.6510.0 - 2024年3月29日

贡献者：mafiesto4、Tryibion、stefnotch、abrasivetroop、Withaust、MineBill、z1dev、GoaLitiuM、NoriteSC、Menotdan、nothingTVatYT、plemsoft、GasimoCodes、whocares77、RuanLucasGD、envision3d、Tesla-J、Chikinsupu、rkrahn、dustytrailsdev、cNori、lifeformed

合并的 PR：108

* 根据事件持续时间，为 CPU 性能分析器表条目添加了红色高亮
* 添加了在预制体窗口中选择生成的 Actor
* 向 `ColorTrackBall` 添加了颜色框
* 向动画模型添加了事件跟踪功能，用于动画播放洞察
* 在动画图窗口中显示动画的播放位置
* 在动画图的状态机中断模式中添加了 SourceState 和 DestinationState 模式
* 添加了 **新的集合编辑 UI**
* 添加了在布料绘制调试预览上启用深度测试的选项（默认启用）
* 在属性窗口中添加了子组展开状态恢复
* 向 Slider 控件添加了方向
* 向 Array 添加了 `IsValidIndex`
* 添加了 **车辆物理改进**（新选项、坦克车辆）
* 添加了 `为选中的 Actor 创建父级` 上下文菜单按钮
* 为 `UIControl` Actor 添加了隐藏 Actor 变换
* 向 UI 控件添加了 RayCast 工具
* 向 `Collection` 特性添加了 `MinCount` 和 `MaxCount`
* 添加了需要脚本和 Actor 特性
* 在上下文菜单中添加了切换运行模式时聚焦游戏窗口的选项
* 添加了重新加载项目菜单按钮
* 添加了在地形中支持 **多种物理材质** - 每个绘制层一种
* 向 `RayCastHit` 添加了 `Material`，用于表面检测逻辑
* 添加了运行时地形编辑的 API，并将地形图块和块暴露给 API
* 添加了对 `JsonAsset` 中结构和脚本类型的支持
* 改进了 Visject 上下文菜单项搜索
* 添加了 **顶点捕捉**（按下 `V` 键的 Gizmo）
* 添加了从 `fbx` 文件导入材质自发光和粗糙度的支持
* 添加了在脚本类型中使用 `MarshalAs` 中的指针的支持
* 通过 Actor 上的 `* 添加脚本` 按钮快速创建脚本
* 添加了 `ScriptingEnum::ToStringFlags`，用于将标志枚举打印为可读文本
* 为文本渲染添加了 **字体回退**
* 改进了样条线编辑
* 向场景树窗口添加了焦点选择锁定输入
* 向向量添加了 `SnapToGrid`
* 添加了 `NextUnitCircleVector2` 扩展方法
* 添加了在编辑器中取消全选的选项
* 在内容视图中添加了橡皮筋式选择
* 添加了快速更改游戏窗口模式的能力
* 改进了类别拖放面板，使其看起来与脚本添加弹出窗口中的其他面板相似
* 添加了用于更改调试绘制箭头帽大小的参数
* 为调试绘制添加了 `DrawAxisFromDirection` 和带有 `Ray` 结构的 `DrawRay`
* 添加了 `Actor.GetPrefabRoot()`
* 添加了预制体链接断开，以保留嵌套预制体链接
* 添加了跳过通过 Level 显示和应用更改到预制体根 Actor 变换
* 向 `Level::GetActors` 添加了 `activeOnly` 参数
* 添加了仅从场景中查找活动 Actor 的参数
* 添加了使用鼠标中键单击断开鼠标下的节点连接
* 在 Linux 上添加了 `MoveFileToRecycleBin`
* 添加了对 VS 2022 v17.10 / MSVC 14.4x 工具集的支持
* 添加了检查以防止不正确的 `NavCrowd::RemoveAgent` 使用
* 添加了将多混合值钳位到设置的范围
* 为方向光阴影添加了分区模式和级联间距
* 添加了为自定义编辑器窗口保存停靠状态
* 添加了支持资源引用的 Guid 选择器
* 添加了 `AnimationRootMotionFlags` 以配置 **根运动分量提取**
* 添加了 `RootMotionMode` 以支持 **从动画骨骼姿态质心提取根运动**
* 向带遮罩混合动画节点添加了骨骼遮罩资源参数
* 为 Apple 和 Unix 工具链添加了剩余的 clang 选项
* 添加了初始 ASTC 像素格式支持
* 添加了 `astc` 编码器库
* 添加了 `BehaviorTreeKnowledgeBooleanDecorator`
* 在上下文菜单中添加了自动删除最后一个悬空分隔符
* 在编辑器视口中添加了更好的网格 Gizmo 渲染
* 在编辑器选项中添加了保存输入和撤销重做
* 添加了在场景动画中动画化 `LocalizedString` 值的支持
* 添加了用于编辑 UI 的 **UI 控件 Gizmo**（在预制体和游戏窗口中）
* 添加了通过小部件调整 UI 控件大小
* 添加了光标更改，并在移动时显示时间线边缘持续时间
* 向新资源创建添加了 `UI Widget`，以快速设置 UI
* 在编辑器中为输入字段添加了 **物理单位支持**
* 添加了 `InputAxis` 和 `InputEvent` 与标准库功能的集成
* 在内容流式传输将块刷新掉的情况下，在二进制资源加载之前添加了手动块加载
* 更改了默认后期处理设置
* 添加了聚焦内容视图和输出文本框中的搜索栏
* 为 deps 构建子命令添加了正常日志
* 添加了在 Game Cooker 缓存中存储自定义平台工具数据的支持
* 添加了当未在编辑器窗口内单击时自动聚焦
* 在 MSVC 编译中添加了对预编译头文件（PCH）的初始支持
* 添加了在所有平台上将引擎目标构建为共享库的支持
* 添加了用于精确持续时间测量的 `Stopwatch`
* 向构建设置添加了 `OutputName`，用于 **游戏输出 exe/包重命名**
* 改进了在链接器调用期间注入 win32 资源文件
* 添加了即使不使用日志文件也打印堆栈跟踪
* 改进了在非 Windows 平台上运行时的崩溃堆栈跟踪报告
* 添加了在 Switch 上使用 Tracy 性能分析器的支持
* 当 AOT 缓存被清除时，为迭代重建移除了 dotnet 库
* 为按钮添加了自定义编辑器，允许在编辑器内监听它们
* 添加了对多个 `VisibleIf` 特性的支持
* 在树中按住箭头键以连续滚动 Actor
* 为 Actor 脚本项添加了拖放到场景和预制体的功能
* 添加了在编辑器插件中为文件类型使用自定义文件代理的能力
* 添加了在重新导入时跳过现有材质的选项
* 为音频源 Actor 添加了 `Start Time` 选项
* 添加了手动标记使用 `ReplicationFPS < 0` 的对象为脏的支持，仅用于手动复制
* 添加了健全性检查，以防止动画模型在骨骼姿态中包含 NaN 时崩溃
* 添加了对 Vulkan 和 D3D11/D3D12 上模板缓冲区的支持
* 在构建工具中添加了可点击的解析错误
* 优化了 `Matrix` 分解，使用 `Matrix3x3` 进行旋转
* 优化了游戏开始时渲染目标的释放
* 优化了 UI 控件序列化
* 将 Nintendo Switch 支持更新到最新的 .NET 8 与 Mono SGen
* 将 `dotnet` 分支更新到最新的 .NET `8.0.1`
* 重构了 win32 exe 图标更新
* 重构了在硬件核心数超过 `PLATFORM_THREADS_LIMIT` 时的 `ThreadLocal`
* 通过 `Visible` 属性在 UI 中镜像 UI 控件 Actor 活动状态，而不是从父级取消链接
* 重构了预制体预览中的 UI 控件链接以防止错误
* 重构了编辑器中 Actor 重新设置父级的撤销逻辑
* 重构了选择和拖放交互的编辑器 UI 样式
* 将碰撞体形状射线投射工具重构到 `PhysicsColliderActor` 类
* 重构了 `PhysicalMaterial` 的使用，利用 `JsonAssetReference` 结构
* 重构了 XAudio2 后端中的 3D 音频实现，以匹配 OpenAL
* 重构了 Visject Surface 属性数据存储，使用 `JsonSerializer` 代替已弃用的 `BinaryFormatter`
* 重构了引擎系统，使用平台时间秒而不是日期时间
* 从 `Scene` 中移除了未使用的 `SaveTime`/`LoadTime`
* 移除了未使用的 `PixelFormatExtensions::ComputeScanlineCount`
* 将 `Navigation.ProjectPoint` 重命名为 `Navigation.FindClosestPoint`，以保持 API 命名一致
* 修复了动画模型插槽动画在开始时清除
* 修复了雾可用于透明材质（如果启用）
* 修复了当系统 DPI 缩放不是 `1` 时，打开时自动停靠窗口
* 修复了当依赖资源在编辑器中被保存时，资源未更新
* 修复了 Unix 系统上 `unlink` 的使用，以正确使用返回值
* 修复了重复条目的后期处理材质混合
* 修复了停止插槽动画并在同一帧播放
* 修复了如果输入值是标量，解包 `Variant` 结构
* 修复了如果方法使用 Vector 参数，新 Visject 方法参数缺少默认值
* 修复了编辑器中的着色器源代码预览
* 修复了 `FileSystem::CopyDirectory` 在源文件夹缺失时不失败
* 修复了 Windows 上窗口标题栏上的鼠标事件处理
* 修复了带有默认值的 `HeaderAttribute` 使用
* 修复了在已烘焙构建中禁用日志文件时的无效日志时间
* 修复了不可靠的 RPC 调用在找不到对象时静默丢弃
* 修复了编辑器中缓存的 `CameraNearPlaneValue` 被覆盖的问题
* 修复了 `Dropdown` 面板正确缩放
* 修复了 `ContextMenu` 快捷键在滚动条可见时适应
* 修复了组合框窗口位置基于其打开方向
* 修复了 `AlwaysShowScrollbars` 更新滚动条的可见性状态
* 修复了 Visject 中多个节点的放置位置为垂直
* 修复了性能分析器窗口关闭时性能分析热键不起作用
* 修复了 GPU 性能分析事件百分比计算，并为慢速条目添加了高亮
* 修复了在图形设置中分配了后期处理材质的项目打开
* 修复了 UI 中的插件窗口布局
* 修复了用户在符号中键入时的插件项目创建
* 修复了新资源命名始终验证文件名
* 修复了精灵图集在 `4096` 上的限制
* 修复了在材质顶点着色器中使用 `ddx`/`ddy` 时的无效着色器代码生成
* 修复了使用多个层时的地形绘制
* 修复了使用 Center 偏移时 CharacterController 初始化的问题
* 修复了 UI 画笔的复制/粘贴
* 修复了 UI 控件选择边界绘制以处理旋转
* 修复了 `NextUnitVector2` 正确生成单位圆内的向量
* 修复了资源缩略图刷新以支持多选
* 修复了聚焦编辑器摄像机到非常大的对象
* 修复了在编辑器中复制数组值
* 修复了各种编辑器输入快捷键绑定
* 修复了如果值范围无效，Slider 反序列化
* 修复了 `Transform` 差异序列化，以正确处理预制体对变换单个组件的更改
* 修复了模型预制体缩放和旋转的问题
* 修复了 Assimp 和 OpenFBX 导入在单位缩放上的差异
* 修复了带父级的拖放上的预制体变换
* 修复了预制体中替换缺失脚本
* 修复了重置新创建的预制体子级的局部变换
* 修复了嵌套预制体实例构建逻辑
* 修复了从 Actor 创建预制体时重置其局部变换，以便更好地实例化
* 修复了预制体视口中的布料编辑撤销
* 修复了触发体积内不正确的车辆车轮碰撞
* 修复了游戏窗口中编辑器输入处理与游戏输入干扰
* 修复了可视化脚本中私有参数没有可用的 getter/setter 节点和项目
* 修复了时间抗锯齿的重影，并提高了混合质量
* 修复了使用 `MarshalAs` 将自定义类型数组封送到 C#
* 修复了 `Content::GetAssetInfo` 中缺少的文件错误
* 修复了将缺失脚本保存到文件中的错误
* 修复了绘制时变换缩放应用于嵌套对象
* 修复了 `NetworkConfig::NetworkDriver` 字段未初始化的值
* 修复了网络对象的脏标记用于复制
* 修复了 `NetworkReplicator::RemoveObject` 中的错误
* 修复了最新版 Rider 中 C++ Intellisense 不起作用
* 修复了在 git 插件拉取时，`Game.Build.cs` 中错误包含编辑器模块
* 修复了使用锁定轴时 `AddMovement` 中不正确的刚体旋转
* 修复了代码生成跳过 `if` 并首先写入 `else if`
* 修复了嵌套枚举的代码生成
* 修复了缺少的网络对象 ID 解析
* 修复了 `JsonAsset::GetInstance` 正确检查基类
* 修复了如果使用缩放 UV，程序化纹理采样闪烁的问题
* 修复了获取 Apple、Android 和 Linux 的文件访问时间
* 修复了 `DateTime::GetDate` 计算
* 修复了当没有摄像机活动时渲染视图平移的错误
* 修复了 CSharp 数据的 Json 序列化器使用 UTF-8 文本编码
* 修复了当游戏烘焙命令行失败时编辑器以错误代码退出
* 修复了构建工具中目录排序
* 修复了使用最新的 Vulkan SDK 构建 macOS
* 修复了动画图调试包含嵌套图的节点路径
* 修复了动画窗口中的根运动预览
* 修复了无效的 Visual Studio 解决方案文件夹嵌套
* 修复了使用 LUT 纹理时的颜色分级问题
* 修复了启用大世界时 OpenAL 中的空间音频播放
* 修复了地形平滑笔刷分离问题
* 修复了在 Windows 上进入窗口模式
* 修复了 Linux 上的 `rpath`，以处理编辑器中插件库的加载
* 修复了在使用 `char16` 的平台上无头模式下的错误日志记录
* 修复了 Unix 系统上路径中 utf8 字符的支持
* 修复了动画图更新中堆栈溢出时的死锁
* 修复了时间线轨道拖动，如最近对树 UI 的改进
* 修复了当动画模型姿态尚未评估时的骨骼插槽变换
* 修复了当音频片段持续时间非常小时编辑器中的错误
* 修复了车轮设置中使用的车辆质心旋转
* 修复了从 json 对象加载 `BehaviorKnowledgeSelectorAny`
* 修复了当窗口未聚焦时，Windows 上不正确的鼠标光标隐藏
* 修复了执行 Actor 移除撤销时保留 Actor 层级顺序
* 修复了在编辑器中以不同布局保存场景或预制体时的 UI 大小更改
* 修复了 `CanvasScaler` 中的 UI 坐标转换
* 修复了在某些情况下拆分拖动不起作用
* 修复了基于 DPI 缩放的插入符号和选择高度，以正确缩放界面选项
* 修复了预制体窗口中缺少的调试形状
* 修复了使用不同引擎版本打开时的着色器缓存加载
* 修复了初始 GPU 缓冲区状态上的 d3d12 警告
* 如果数据大小向上对齐超过缓冲区大小，修复了 Vulkan 上的小 GPU 缓冲区更新
* 修复了使用自定义后期处理效果时着色器资源绑定的潜在问题
* 修复了后期解析通道（如编辑器基元和调试 Gizmo）中的 TAA 抖动
* 修复了使用 TAA 时调试绘制中的 Z 冲突问题
* 修复了由于不正确的 Actor 列表设置导致的 Actor 复制操作中的错误
* 修复了视口未聚焦时吸附到地面 Actor
* 修复了树 UI 上的拖放回归问题
* 修复了当属性标记为 `ReadOnly` 时的 `Revert to Default` 选项
* 修复了在仅查找模式下时间线播放控制按钮的可见性
* 修复了编辑器中游戏暂停时游戏 UI 输入到 UI
* 修复了使用外部库时 `NetworkingPlugin` 中的 `Mono.Cecil` 错误
* 修复了原生变体转换辅助函数的重复生成
* 修复了物理 Actor 中 `PhysicsScene` 更改不起作用
* 修复了编辑器内部错误导致场景图节点被重复时的崩溃
* 修复了当模型未加载或条目计数无效时 `StaticModel::GetMaterial` 中的崩溃
* 修复了不正确的对象销毁事件导致的崩溃
* 修复了无效字符串转换为托管字符串时的崩溃
* 修复了由于车辆设置不正确使用 PhysX 导致的崩溃
* 修复了移动模拟禁用的运动学 Actor 时的崩溃
* 修复了添加带有自动模拟的物理场景时的崩溃
* 修复了通过 `Variant` 设置托管结构数据时的崩溃
* 修复了由于异步线程加载失败而缺少引用导致存储文件被删除时的崩溃
* 修复了使用空名称文本查找 Actor 或关卡时的崩溃
* 修复了使用多线程对象生成和缓存脚本 VTables 时的崩溃
* 修复了在派生泛型类上复制带有 `NetworkReplicated` 特性的 C# 对象时的崩溃
* 修复了在 Multi Blend 2D 中使用退化三角形以正确采样动画时的崩溃
* 修复了加载带有抽象脚本类的关卡时的崩溃
* 修复了在 C# 中使用泛型接口时的崩溃
* 修复了编辑器中热重载后使用网络复制或 RPC 时的崩溃
* 修复了使用无效 `GPUTextureDescription` 时的崩溃
