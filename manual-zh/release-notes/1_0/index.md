# Flax 1.0 发布说明

## 醒醒吧，各位！我们有一款 Flax 1.0 值得一看！

<center>
<iframe width="750" height="421" src="https://www.youtube-nocookie.com/embed/_KCl_m1IGp4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</center>

## 亮点

### 完整源代码发布

![Flax 引擎完整源代码 Github](/manual/media/github-repo.png)

我们做到了！我们发布了 Flax 引擎的完整源代码，包括 **C++ 核心** 和 **C# 编辑器**，以及所有工具和平台支持。源代码可在 [Github 此处](https://github.com/FlaxEngine/FlaxEngine) 获取。该仓库使用 *Git LFS*，是我们内部服务器的镜像。从现在开始，之前的 FlaxAPI 仓库将被弃用，我们鼓励你在新的 FlaxEngine 仓库上报告问题。此外，我们欢迎 Pull Requests，所以 **请随意贡献**！

当然，Flax 引擎源代码可以像我们通过 Flax Store 分发的二进制文件一样使用。它根据我们的 [EULA 许可证](https://flaxengine.com/licensing) 进行授权。对于希望使用自定义引擎版本的团队，欢迎 fork 并进行自定义（辅助文档[此处](../../editor/advanced/custom-engine.md)）。

### 新授权许可

伴随 1.0 更新和源代码发布，我们将 Flax 收入分成的起征点从 3,000 美元提高到了 25,000 美元。这意味着，如果你的游戏在每个日历季度的收入不超过 25,000 美元，则无需为使用 Flax 支付费用。超过此金额的销售额均采用 4% 的收入分成。有关许可的更多信息[此处](https://flaxengine.com/licensing)。
此更改使 Flax 对于独立开发者和小型团队来说更加实惠。

### 可视化脚本

![Flax 引擎可视化脚本](/manual/media/vs-code.png)

此版本的关键功能之一是全新的 **可视化脚本** 系统。可视化脚本可以像 C# 和 C++ 脚本一样，通过自定义属性来实现游戏逻辑。这使得游戏原型设计更加容易，并且对非程序员来说引擎也更容易上手。

编辑器支持使用断点、调试器单步执行、局部变量和堆栈跟踪来调试可视化脚本的执行。

![Flax 引擎可视化脚本调试](/manual/media/vs-debugging.gif)

我们还改进了用于材质、粒子、动画以及现在的可视化脚本编辑的 Visject Surface 的上下文菜单。它运行得更快，并为开发者提供了更多工具提示。

![可视化脚本上下文菜单](/manual/media/vs-context-menu.png)

### Android 支持

![Android](/manual/media/android.jpg)

在今年，我们增加了对许多新平台的支持，例如 Linux、PS4 和 Xbox Series X/S。现在我们很高兴地宣布 **Android 平台** 支持。这包括所有引擎功能：C++、C#、可视化脚本、**Vulkan** 渲染器、立体音频、**多点触控** 输入、高 DPI UI、一键部署等等。

要了解更多信息，请参阅关于 [Android 平台](../../platforms/android.md) 的官方文档。

我们更新了所有 Flax 示例项目，以支持触摸显示输入并在 Android 设备上流畅运行。

![Flax 引擎中的 Android 支持](/manual/media/android-screen.jpg)

### 顶点绘制

![顶点绘制](/manual/media/vertex-painting.gif)

编辑器工具箱刚刚获得了用于在场景中 **为模型顶点着色** 的顶点绘制工具。通过使用它，美术师可以轻松丰富关卡内容，例如通过在材质中使用顶点颜色遮罩。Flax 已经支持导入顶点颜色的模型网格。

### 高度层混合

![高度层混合](/manual/media/height-layer-blend-terrain.png)

材质图现在包含一个新的节点，用于使用高度图在两个材质层之间更轻松地进行混合，这 **提高了过渡质量**。这可以提升地形材质的质量。

### 植被着色模型

在制作新的 Flax 展示视频时，我们为 **植被材质** 开发了一种新的着色模型着色器。它改善了灌木、树木和草丛的薄叶外观和光照效果。

### 接触阴影

![接触阴影渲染](/manual/media/contact-shadows.gif)

另一个令人兴奋的功能是 **接触阴影渲染**，它通过添加更精确的局部阴影来提高小物体的质量。它是使用深度缓冲区光线追踪实现的，类似于《赛博朋克 2077》中使用的技术。

### 更多编辑器功能

![Flax 编辑器中的过场动画渲染](/manual/media/scene_animation_rendering.png)

每次更新都会为编辑器带来更多功能和工具。这次我们做了大量工作，添加了更多功能。一些新实用功能的示例：
* 过场动画渲染
* 时间线编辑改进
* 动画资源轨道编辑
* 自定义脚本语言支持
* 输出日志窗口错误/警告着色
* 时间线编辑器的撤销支持
* *BC7* 和 *BC6H* 纹理格式导入支持（压缩 HDR）
* 曲线编辑改进。

要了解更多信息，请参阅详细的更新日志（和往常一样长）。

## 更新日志

### 版本 1.0.6216 - 2021年1月31日

贡献者：W2Wizard、jb-perrier、VNNCC、MinhCT、stefnotch、DaruBrub、intolerantape、TalkingWallnut、Evildea、Vizepi、GoaLitiuM

合并的 PR：41

* 在脚本绑定胶水代码中，为使用 `BytesContainer` 的数组参数添加了额外的临时参数
* 向编辑器视图菜单添加了 Orientation
* 添加了黄金比例常数
* 添加了用于 CI 的 **Github Actions** 使用
* 为脚本添加了可执行标志
* 添加了更多启动画面引用
* 向所有图添加了 Remap 节点
* 添加了贡献指南
* 添加了类似于 C# API 的 `Mesh::UpdateMesh` 方法
* 添加了用于混合法线贴图的材质节点
* 在编辑器视口中添加了反转平移选项
* 向材质添加了 Sphere Mask 节点
* 添加了关于网格三角形索引顺序的文档
* 添加了电池信息 API
* 添加了 **格式化 Visject 节点** 的选项
* 为材质添加了 rotator 节点
* 为材质添加了 DDX/DDY 节点
* 添加了用于在 Windows 上浏览文件夹的现代文件对话框
* 为 float16 压缩添加了内联，并添加了代码引用注释
* 向引擎数学类型添加了缺失的 `FLAXENGINE_API` 导出宏
* 向 Collisions Helper 添加了更多工具
* 将 `VectorInt.h` 拆分为 Int2、Int3 和 Int4 的单独文件
* 改进了 Visject Surface 连接的拖拽
* 改进了开发配置中的构建时间
* 改进了长度为零时的 Variant 类型名称加载
* 修复了由于 BlurStrength 滑块导致的 BlurPanel 崩溃
* 修复了多屏幕下编辑器窗口的位置（在启动时）
* 修复了 UICanvas 缺少公共空构造函数的问题
* 修复了拼写错误
* 修复了当打开包含骨骼中不再存在的节点名称的动画图时的错误
* 修复了平面模型法线
* 修复了可视化脚本调用方法节点对通过引用传递的输出参数的签名检查
* 修复了无符号整数字段以防止负值
* 修复了 SliderControl 缺失焦点的问题
* 修复了 Windows 上的打开文件对话框
* 修复了从代码添加框时 Visject 节点的布局
* 修复了缺失的动画模型参数错误
* 修复了如果没有场景存在则禁用地形和植被按钮
* 修复了大量拼写错误
* 修复了编辑器中游戏视图在运行模式下的 `CTRL+W` 问题
* 修复了高 DPI 屏幕上的鼠标偏移追踪
* 修复了当游戏窗口不是选定选项卡时的场景动画渲染问题
* 修复了运动模糊图块大小计算中的崩溃
* 修复了材质预览中平面模型的错误旋转
* 修复了渲染期间崩溃后引擎关闭时的断言
* 修复了在 Visject Surface 中使用 Byte、Int16 或 UInt16 作为参数时的崩溃
* 修复了加载 `VariantType.Blob`
* 修复了创建空粒子发射器时的崩溃
* 修复了在 Windows 上导出 `R10G10B10A2` 和 `R11G11B10` 格式纹理的问题
* 修复了角色控制器中的脚部偏移
* 修复了视口缩放问题
* 修复了将更改应用于预制体时的崩溃
* 修复了 SurfaceNode 中 ResizeAuto 包含自定义控件的问题
* 修复了 `Get Node Transform` 大小和缺失的输出信号框
* 修复了在 Android 上如果 GPU 不支持阴影贴图的线性采样时的崩溃
* 修复了调整模型现有 MaterialSlots 集合大小时的崩溃
* 修复了编辑器信息对话框中的内边距
* 修复了当动画模型骨骼具有重复节点名称时的错误
* 修复了在打开自定义 json 资源时重载脚本的崩溃
* 修复了将坡度限制设置为 90 度时的崩溃（在角色控制器上）
* 修复了材质中的淡出距离节点

### 版本 1.0.6215 - 2021年1月6日

贡献者：jb-perrier、DaveTheGameDev、stefnotch、dragonCASTjosh、Galbi3000、bolognatic、klukule、VNNCC、jfaz1、seapulse

合并的 PR：34

* 添加了对 Visual Studio Code Insiders 的支持
* 为 Json 解析错误添加了日志偏移量
* 向编辑器界面选项添加了 IconsScale
* 添加了在出错情况下对插件二次初始化的额外检查
* 添加了对编辑器值字段中十六进制值的支持
* 在 Visject Surface 编辑器中添加了对使用无符号整数字段的支持
* 向生成的 csproj 文件添加了 `IgnoreMissingDocumentationWarnings` 选项
* 从模型上下文菜单添加了 `Generate collision data`
* 添加了在关闭上下文菜单时将焦点返回到上一个控件的功能
* 添加了对在 Windows 上主动记录进程输出的支持
* 移除了 TAA 渲染实现
* 重新实现了运动模糊
* 移除了已弃用且未使用的 OpenGL 图形后端
* 将最大窗口大小更改为 4096
* 将 DirectXShaderCompiler 更新到 1.6
* 修复了在游戏烘焙期间着色器源中的空字符
* 修复了在 Guid 属性上使用 AssetRefEditor 编辑资源引用的问题
* 修复了 Android 上的 PlatformSettings typedef
* 修复了 PCF 阴影 UV 向量截断警告
* 修复了高 DPI 上的编辑器标题栏
* 修复了 Vulkan 1.2 的编译器错误
* 修复了在动画图使用自定义节点时脚本重载的崩溃
* 修复了在 Y 轴方向翻转时子菜单的上下文菜单位置
* 修复了在粒子系统窗口中编辑覆盖的粒子发射器参数
* 修复了使用摄像机轨道时第一帧的编辑器视口摄像机故障
* 修复了闪烁的工具提示
* 修复了 GamePlugin 仅在运行模式/已烘焙游戏中使用的问题
* 修复了运行模式中的撤销重做标志
* 修复了在运行模式下保留编辑器撤销操作
* 修复了指向 Github 问题页面的链接
* 修复了构建场景工具栏按钮的启用状态
* 修复了反转的 Y Gizmo 旋转
* 修复了未加载场景时编辑器功能的使用启用
* 修复了当类缺失时 `ScriptingObject::ToString()` 中的崩溃
* 修复了更多 DPI 问题
* 修复了编辑器中运行模式下的快捷键（F5、F6、F11）
* 修复了从导入的模型文件中移除节点的命名空间
* 修复了 `GPU timer query detected` 警告为单次触发
* 修复了速度变化滚动不稳定问题
* 修复了在编辑器中防止加载 'null' 样式
* 修复了对于带有作为引用传递的输出结构参数的方法签名的 C# 方法查找
* 修复了如果在初始鼠标单击初始化时 DockHintWindow 拖动偏移无效的问题
* 修复了比较 String 与 StringView
* 修复了在 Windows 上记录进程输出
* 修复了在可视化脚本编辑器中使用无符号整数属性
* 修复了可视化脚本中的 `Length` 节点
* 修复了将文件重命名为相同名称但大小写不同的问题
* 修复了在资源创建时用户指定扩展名时的双扩展名问题
* 修复了使用 RegisterEngine 脚本作为管理员时的错误引擎路径
* 修复了在没有安装 Nuget（或位于不同位置）的情况下运行 Flax 开发脚本时的错误

### 版本 1.0.6214 - 2020年12月17日

* 添加了 **可视化脚本**
* 向类型选择器添加了类工具提示
* 添加了用于类选择器自定义的 TypeReferenceAttribute
* 在编辑器中添加了对自定义脚本语言类型的支持
* 添加了对自定义脚本二进制模块的支持
* 添加了 `FlaxEngine.Object.FullName` 属性以获取对象完整类型名称
* 在 Flax.Build 中为自定义语言支持添加了脚本绑定生成的自定义事件
* 添加了 **Android** 平台支持
* 添加了对 ARM 处理器的支持
* 添加了 **触摸输入** 支持
* 为 UI 添加了子控件剔除
* 添加了 `GPUContext.NativePtr`
* 为异步任务添加了主线程任务调度器
* 在编辑器的运行模式下为 Visject Surface 添加了橙色焦点边框
* 为 Flax.Build 添加了插件支持
* 为新的 Visject 参数添加添加了带有搜索框的上下文菜单
* 为 C# API 中的所有非托管方法添加了自动工具提示
* 向 Visject 节点原型添加了 SubTitle 属性
* 添加了无需按住 Shift 键即可使用鼠标滚轮更改摄像机速度
* 通过 `API_AUTO_SERIALIZATION` 标签添加了 **自动原生对象序列化**
* 添加了自动内部类作为脚本类型的友元，以便更容易地将受保护成员暴露给 API
* 将 Guid 添加到调试器 natvis 文件
* 添加了 **植被着色模型**
* 向 FindObject 工具添加了对象类型检查
* 向材质添加了 **高度层混合** 节点
* 为 `Netwsoft.Json` 库添加了自动化依赖构建
* 向 FlaxObjectRefEditor 添加了带有 Actor/脚本层级路径的工具提示
* 添加了 Json 序列化头文件的前向声明，以改善编译时间
* 如果 Alpha 为 1 或 0，则优化材质层混合
* 添加了 Enter 键以在内容查找器中打开第一个匹配项
* 向材质添加了 `Object Size` 节点
* 添加了 Platform::InterlockedCompareExchange 和 Platform::AtomicRead/Write 用于 32 位
* 添加了对手动场景动画更新的支持
* 添加了 `Time.SetFixedDeltaTime` 用于固定游戏更新/绘制
* 添加了编辑器选项，用于在编译错误或游戏构建错误时自动聚焦输出日志窗口
* 在输出日志窗口中为代码编译警告和错误添加了高亮
* 添加了记录 d3d 调试层消息
* 向粒子发射器窗口添加了预览参数选项卡
* 添加了直接调试日志消息记录，包含级别和消息到日志记录器
* 添加了 `Bokeh Brightness` 参数以控制散景形状的强度
* 为新的 Visject 注释颜色添加了随机化
* 在编译游戏代码时，向 C# 脚本 API 添加了 `FLAX_GAME` 定义
* 添加了从导入的 fbx 文件中提取嵌入纹理的支持
* 为序列化添加了 `SERIALIZE_EPSILON` 常量
* 添加了以世界空间获取动画模型节点姿态的参数
* 添加了 `Collider.ContainsPoint` 辅助方法
* 添加了对 Render2D 中模糊渲染目标的钳位，以匹配 GPU 设备限制
* 为选中的 UI 控件边界添加了游戏视图中的轮廓
* 在 TextBox.Draw 中为缺失字体问题添加了软返回而不是断言
* 向材质添加了 `PixelNormalOffsetRefraction` 选项
* 为光照贴图烘焙添加了动态性能缩放
* 在 HeapAllocation 中为内存不足情况添加了适当的崩溃处理
* 为每个植被类型添加了光照贴图缩放参数
* 使用内存中光照贴图纹理初始化代替临时文件
* 在 GPU 驱动程序崩溃的情况下，添加了对光照贴图烘焙状态的缓存和恢复
* 为编辑器精灵渲染添加了只读深度缓冲区的使用
* 添加了记录 GPU 设备移除事件原因
* 在编辑器中添加了 ArrowDown32 图标
* 为地形雕刻模式 UI 添加了工具提示
* 向时间线轨道上下文菜单添加了复制预览值操作
* 添加了时间线按钮以便于在关键帧之间导航
* 添加了在编辑器视口中将选中的 3D 位置轨道显示为贝塞尔曲线的选项
* 添加了 `DebugDraw.DrawBezier`
* 添加了重置曲线关键帧切线的选项
* 添加了空格键以在时间线中播放/暂停
* 为时间线编辑器（场景动画和粒子系统编辑器）添加了 **撤销支持**
* 向材质实例编辑器添加了还原参数按钮
* 在 Release 构建中跳过了为 C# API 绑定生成工具提示
* 向编辑器添加了 **场景动画电影渲染功能**
* 在 Flax.Build 中添加了对自定义外部代码项目生成器的支持
* 在曲面编辑器中为调试添加了动画图流程的可视化
* 添加了隐藏或更改默认游戏启动画面的选项
* 在动画图编辑器窗口中添加了带有动画模型预览属性的选项卡，用于测试
* 添加了通过时间线编辑器 **查看和编辑 Animation 资源** 的支持
* 向曲线/关键帧编辑器添加了编辑所有关键帧选项
* 在时间线轨道面板中使用箭头导航时，添加了自动滚动到轨道的功能
* 向编辑器添加了 AutoGenerateScriptsProjectFiles 选项，用于自动更新脚本项目
* 添加了 `SceneObject.GetNamePath` 以便于在日志中识别对象
* 添加了对使用单个字符作为 API 函数参数默认值的支持
* 为 GPU 光照贴图烘焙添加了 2GB GPU 内存的限制
* 向 C# API 中的 Vector3、Quaternion 和 Transform 添加了 NearEqual 方法
* 为时间线加载添加了性能分析事件
* 在 `Flax.Build` 中添加了对 Android SDK 和 NDK 的支持
* 为引擎代码中的平台架构识别添加了 `PLATFORM_ARCH` 定义
* 通过 **API_EVENT** 添加了对脚本 API 中作为事件的原生委托的自动支持
* 向 Flax.Build 添加了 `VCEnvironment.CscPath`
* 向脚本 API 构建选项添加了 `IgnoreMissingDocumentationWarnings` 选项
* 为在 Android 上调试添加了额外的 Visual Studio 项目生成
* 添加了记录临时目录路径
* 向 Platform 添加了 `GetScreenOrientationType` 以支持设备屏幕方向
* 添加了对自定义输入设备的支持
* 添加了 Switch On Enum 节点
* 添加了 Branch On Enum 节点
* 添加了 Sequence 节点
* 如果设置了 MonoLog 参数，添加了 mono 调试器服务器调试
* 添加了从 TextureBase 资源数据中提取 TextureData 的支持
* 添加了在游戏烘焙期间为目标平台转换纹理格式的支持
* 添加了在游戏项目代码中扩展资源烘焙的支持（自定义资源烘焙）
* 添加了对编辑着色器编译失败材质的支持
* 添加了对着色器图参数缺失的错误消息
* 在材质自定义代码节点中添加了向 vec4 的输入转换
* 添加了记录每个资源的烘焙统计信息
* 向 Actor 添加了 TryGetScript 和 TryGetChild
* 添加上下文菜单在按键时滚动到项目（更容易从长列表中选择选项）
* 向上下文菜单项添加了键盘导航
* 向所有光源类型添加了 **接触阴影** 支持
* 添加了对光照贴图压缩的支持
* 为植被添加了双面光照贴图采样
* 为光照贴图间接光照添加了 GTAO 多次反弹
* 添加了使用内容查找器按对象 ID 搜索资源/Actor 的支持
* 添加了对 **BC7** 和 **BC6H** 纹理作为带压缩的 HDR 导入的支持
* 添加了对 BC7 和 BC6 格式的 **GPU 纹理压缩** 支持（仅限 DX11）
* 在光照贴图烘焙前等待渲染器资源准备就绪
* 向植被笔刷添加了单击选项以实现单次绘制点击
* 向植被笔刷添加了密度缩放，以便更好地控制绘制
* 添加了在调用 Asset.WaitForLoaded 期间在主线程加载资源的支持，以减少游戏卡顿
* 添加了通过屏幕截图 API 立即保存暂存纹理的支持
* 添加了 BeforeLayout 和 AfterLayout 事件，以将自定义 UI 注入 CustomEditorPresenter
* 向 `RenderOutputControl` 添加了自定义分辨率和宽高比保留模式的支持
* 添加了 `saturate()` 用于 Z 分量重建，以防止某些法线贴图上的 NaN 问题
* 添加了按名称对 Visject 上下文菜单组进行排序
* 在 Visject 输入框中添加了对 Color/Quaternion/Enum 的默认值编辑
* 在曲面上下文菜单中为 Visject 节点添加了工具提示
* 向 Flax.Build 添加了 `-printPlugins` 命令行参数
* 将 Ray 添加为通用值类型
* 向 C++ API 添加了 **Variant** 类型，作为通用的任意值容器
* 在编辑器中为标量值输入字段解析添加了无穷大
* 在图中的打印任意内容到字符串添加了通用 To String 节点
* 添加了使用删除按钮移除 Visject 节点时的撤销支持
* 向 Visject 节点标志添加了 NodeFlags.NoSpawnViaPaste
* 向 Visject 添加了 Enum Value、Enum AND 和 Enum OR 节点
* 添加了 *Alt+点击* 以断开 Visject Surface 框的连接
* **Xbox Scarlett** 移植，具备完整功能支持
* 向 BuildSettings 添加了 SkipPackaging
* 向动画图和可视化脚本图添加了字符串常量节点
* 添加了从类型名称创建脚本对象的支持
* 通过 `MONO_ENV_OPTIONS` 环境变量添加了带有选项的 Mono 性能分析器设置
* 在鼠标双击时，在 TypeEditor 中向选定类型添加了导航
* 向 Actor 常规属性组添加了设置
* 添加了反转 VisibleIf 规则的选项
* 向编辑器 GUI 添加了 ClickableLabel
* 添加了对 API 函数参数属性的支持
* 向 VisjectSurface 添加了 NodeSpawned/NodeDeleted/NodeEdited 事件
* 为 Type 类型的输入框的默认值编辑添加了 TypeDefaultValueEditor
* 在自定义碰撞体 Actor 类型中添加了对覆盖碰撞/触发事件的支持
* 向时间设置添加了 `MaxUpdateDeltaTime`
* 为 FlaxObjectRefEditor 添加了禁用状态视觉效果
* 向 `GPUDevice` C# API 添加了 `IsRendering`、`DefaultWhiteTexture`、`DefaultBlackTexture` 和 `CreateBuffer`
* 从《指环王》传奇中添加了一些启动画面引用
* 为完全匹配在 Visject Surface 上下文菜单中添加了额外的排序得分
* 添加了 `Object.NewManaged` 用于创建 C# 对象（例如在可视化脚本中）
* 向可视化曲面添加了断点支持
* 添加了对 API 绑定头文件中解析定义值的支持
* 在 API 绑定中为结构字段添加了固定大小数组的支持
* 在 API 中添加了 NoArray 标签，用于将固定大小数组数据内联到结构中，而不是使用分配的数组
* 为虚 API 函数添加了 STDCALL 调用约定
* 向编辑器添加了 **可视化脚本调试** 支持
* 调整了编辑器 FPS 控制逻辑
* 将 IsEditor 从 Platform 移至 Engine
* 改进了 DX11 顶点缓冲区的步长/偏移检查
* 将 glslang 更新到 11（SPIR-V 版本：v2020.6）
* 在 Windows/UWP Game Cooker 中隐藏了 `x86` 架构选项，因为它未与编辑器一起分发
* 将 ISerializable 中的 Input/Output 重命名为 DeserializeStream/SerializeStream
* 将 CompilerSpcific.h 重命名为 Compiler.h
* 从后期处理效果设置中移除了 RestoreDefaults（使用构造函数进行初始化和重置）
* 移除了材质实例参数同步的日志
* 重构了库链接（在 Flax.Build 中）并修复了 Unix 工具链的链接
* 重构了编辑器脚本类型工具，以支持可视化脚本和自定义语言
* 重构了表面参数以支持任何脚本类型
* 重构了自定义编辑器系统，以使用 ScriptType 代替原始 System.Type
* 重构了 Visject Surface 编辑器连接和变量，以支持任何类型和任何对象值
* 将 `CommonValue` 重构为 `Variant`
* 将 Quaternion 相等 epsilon 重构为 0.000000001（从 0.0000001）
* 重构了 Delegate 使其线程安全，并通过单次调用列表分配进行了优化
* 重构了 NDA 平台位置以支持单独仓库子模块
* 重构了 C# Matrix API
* 将 C# API 中的 `Curve<T>` 重构为 `BezierCurve<T>` 和 `LinearCurve<T>`
* 重构了 ContainerControl 布局执行
* 重构了序列化系统
* 重构了引擎 Core 头文件的代码风格和代码文档
* 重构了 InputBox 默认值编辑器使其可扩展
* 重构了 C# Collision 以减少动态接触点数组分配
* 重构了场景对象生成和反序列化
* 将生成的 C# 绑定代码位置重构为每个构建配置在 Cache 文件夹中，而不是与源码并列
* 优化了从文本解析 Guid
* 优化了搜索时 ItemsListContextMenu 的性能
* 优化了 C# 绑定胶水代码，使用 TypeInitializer 在原生代码中进行类类型查找
* 优化了编辑器中时间线 UI 的加载
* 通过使用 API_EVENT 优化并重构了从原生代码发送 C# 事件
* 优化了 Visject 曲面上下文菜单节点搜索
* 优化了使用大型场景树层级时的编辑器 UI 渲染
* 优化了 AssetReference 和 WeakAssetReference，使其在设置/取消设置时不使用资源锁（现在 Delegate 是线程安全的）
* 优化了单个植被实例编辑的撤销
* 优化了光照贴图烘焙性能
* 优化了 GPU 光照贴图烘焙的内存使用
* 优化了 ContainerControl 中的 PerformLayout
* 通过在递归调用前检查剩余槽位空间，优化了 RectPack 插入
* 修复了场景和预制体的序列化
* 修复了预制体编辑和使用
* 修复了光照贴图烘焙以改善 GI 质量
* 修复了运动向量渲染通道
* 修复了 Quaternion API 文档
* 修复了时间线编辑
* 修复并改进了按钮按下逻辑
* 修复了曲线关键帧平滑切线选项
* 修复了将曲线切线设置为线性/平滑以仅修改选中的关键帧
* 修复了聚光灯角度设置器和半径设置器缺失的问题
* 修复了地形的光照贴图烘焙
* 修复了 Vulkan 中用于光照贴图烘焙的 UAV 纹素缓冲区
* 修复了在渲染任务运行期间取消光照贴图烘焙时的崩溃
* 修复了关闭编辑器视口时隐藏鼠标光标的问题
* 修复了在已加载事件队列中删除资源时的崩溃
* 修复了如果地形表面有其他对象时编辑地形的问题（改进了选择）
* 修复了失真通道使用只读深度缓冲区
* 修复了运动向量渲染检查
* 修复了具有来自父刚体缩放位置偏移的胶囊碰撞体定位
* 修复了加载未使用显式参数覆盖的旧材质实例
* 修复了仅支持 UWP 的 x64 架构
* 修复了为 PS4 构建仅 C# 项目
* 将 `Building module XXX` 消息改为详细级别而非信息级别（在 Flax.Build 中）
* 修复了如果工具提示覆盖了内容项，双击内容项的问题
* 修复了时间线时间轴标签以秒为单位显示，限制小数位数
* 修复了场景动画中音频轨道可视化以匹配实际音频播放
* 修复了从场景动画轨道内的曲线中移除关键帧
* 修复了如果播放器停止时场景动画时间线的播放位置
* 修复了由于枚举值序列化不正确导致的 Visject 节点复制粘贴问题
* 修复了级联阴影映射在级联之间的混合
* 修复了输出日志滚动条在右下角的位置，以防止重叠
* 修复了当光标移出行边界时在输出日志中选择文本
* 修复了在特定摄像机角度下视差映射的罕见崩溃（循环中断问题）
* 通过使用 float 值代替 half 类型作为变换矩阵数据，提高了实例化网格的质量
* 修复了 AtmospherePreCompute 服务初始化时等待着色器加载导致的主线程卡顿
* 修复了记录错误以防止堆栈溢出
* 修复了在引擎源代码可用时构建仅 C# 游戏项目
* 修复了在脚本中使用没有命名空间的 C# 类
* 修复了高 DPI 显示器的 UI 缩放
* 修复了 DX_SAFE_RELEASE_CHECK 中的断言为检查
* 修复了高 DPI 显示器上的文本渲染字体缩放
* 修复了在旋转期间使用鼠标滚轮更改摄像机速度时编辑器 FPS 摄像机的缩放
* 修复了 MeshCollider 在游戏开始播放时碰撞数据未加载的问题
* 修复了在脚本 onAwake 事件期间启用 Actor 时的崩溃
* 修复了如果设备限制了最多 4 个绑定描述符集，Vulkan 中细分使用的崩溃
* 修复了在材质编辑时更新 TextRender 绘制块
* 修复了文档注释中的拼写错误
* 修复了在 Visual Studio 中编辑源文件时脚本项目的重新生成
* 修复了在已烘焙游戏中加载场景资源时引用缺失的问题
* 修复了如果对象采样深度缓冲区时的阴影通道问题
* 修复了没有散景的景深
* 修复了在运行时烘焙碰撞数据时网格碰撞体几何体形状的更新
* 修复了按优先级排序多个后期处理效果体积
* 修复了屏幕空间模式下 UICanvas 的大小
* 修复了在渲染绘制调用之前在 GPU 上下文中残留的任何 SR
* 修复了如果在编辑器选项中禁用了自动重载选项，在运行模式下调用脚本编译的问题
* 修复了使用嵌套动画图函数
* 修复了没有自动脚本重建时的运行模式进入
* 修复了编辑器中单帧步进
* 修复了如果在动画采样节点之后状态使用变换节点，动画图状态过渡的问题
* 修复了在顶点着色器中使用视差映射节点时的着色器编译错误
* 修复了如果无法创建轨道，在时间线中隐藏添加按钮
* 修复了在编辑器中打开 `Flax.flaxproj` 项目
* 修复了在 d3d12 上截取屏幕截图
* 修复了通过编辑器菜单打开另一个项目
* 修复了在显示时重置 Visject 上下文菜单中的滚动条
* 修复了 d3d12 纹理缺失 UAV 句柄的问题
* 修复了禁用绘制不可见窗口（修复了使用可停靠窗口后的性能问题）
* 修复了编辑器中重新设置 Actor 父级的撤销
* 修复了使用鼠标放置生成对象
* 修复了绘制植被
* 修复了由于 Mono 终结器线程无效调用导致的脚本重载崩溃
* 修复了新脚本位置检查，以防止新脚本位于无效位置
* 修复了由于脚本重载导致场景卸载时重建导航网格的崩溃
* 修复了在预制体中使用自定义 C++ 脚本时退出时的崩溃
* 修复了材质实例参数覆盖默认仅为公共参数启用
* 修复了 UWP 平台不检查 Windows SDK 10.0.17763.0 版本唯一性
* 修复了内容视图缩放以减少某些字符的锯齿
* 修复了具有多个链式输入的嵌套材质函数
* 修复了带有工具栏的材质/粒子/动画函数曲面裁剪
* 修复了矩形相交包含边缘
* 修复了查询文本过滤器中的各种情况
* 修复了 TypePickerControl 的弹出位置
* 修复了 OnCollisionEnter 中的碰撞数据
* 修复了使用 C++ 脚本的整体式构建的二进制模块支持
* 修复了生成的二进制模块代码始终位于该项目中
* 修复了搜索安装位置时 MSVC v141 和 v142 工具集的检查
