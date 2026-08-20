# Flax 1.6 发布说明

## 亮点

### .NET 7

![Flax 引擎中的 .NET 7](/manual/media/dotnet7.png)

我们做到了！Flax C# 脚本现在运行在最新的 .NET 7 运行时上，并包含所有新的闪亮功能，例如：
* 更好的性能（新的 GC、新的 JIT、优化的标准库）
* 最新的 C# 11 支持
* 能够在 VS 2022 中使用混合原生/托管调试器
* 通过 `AssemblyLoadContext` 实现的新编辑器代码热重载（比我们的[自定义解决方案](https://github.com/FlaxEngine/mono)更安全）
* 未来对更新 .Net 版本的无缝支持（例如 .NET 8/9）
* 更小的构建大小（由于新的标准库剥离）

现在，Flax 编辑器要求系统上安装 [.NET SDK 7](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)——编辑器和启动器都会检测它，并引导新用户安装它（如果尚未安装）。请参阅下面的 `迁移指南` 部分，了解这如何影响你的游戏项目。

### PhysX 5

物理模拟引擎已更新到 PhysX 5.1（从 4.1），其中包括出色的稳定性和性能改进，以及新的 GPU 模拟功能（我们计划在未来使用）。我们将在未来几个月内为引擎添加布料和破坏支持，作为 Flax 游戏的内置功能使用。

### iOS 支持

![Flax 引擎中的 iOS 支持](/manual/media/ios.jpg)

随着 iOS 平台最终登陆 Flax，我们自豪地宣布 **Flax 是一个真正的多平台引擎**。我们支持和维护所有常见的游戏平台，包括桌面、主机和移动端。

Flax 通过 `MoltenVK` 使用 `Vulkan` 在 iOS 上渲染高质量的 3D 图形，并完全支持 C++、C#、可视化脚本、立体音频、多点触控输入、高 DPI UI、一键部署等等。

我们更新了所有 Flax 示例项目，以支持触摸显示输入并在 iPhone/iPad 设备上流畅运行。要了解更多信息，请参阅关于 [iOS 平台](../../platforms/ios.md) 的官方文档。

### macOS arm64 支持

![macOS arm64 上的 Flax 编辑器](/manual/media/mac-arm64.png)

Flax 1.6 现在可在包括 macOS 在内的 arm64 Apple 设备上运行。M1/M2 芯片提供了出色的性能，因此 Flax 编辑器和 Flax 游戏具有出色的稳定性。

### 动画重定向

![Flax 引擎中的动画重定向](/manual/media/anim-retargeting.gif)

动画重定向是一项允许 **在不同骨骼上播放相同动画** 的功能。这在开发大型游戏时非常有用，因为动画共享有助于减少开发时间和游戏构建大小。此更新在编辑器中添加了用于骨骼重定向的新工具。此外，引擎在蒙皮模型之间重用动画方面做得更好。请参阅[文档](../../animation/animation/retargeting.md)了解更多信息。

| 之前                                                      | 之后                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| ![动画重定向之前](/manual/media/animation-retargeting-before.gif) | ![Flax 中的动画重定向](/manual/media/animation-retargeting-before.gif) |

### 动画图中的任意状态

![状态机中的任意状态](/manual/media/any-state.png)

**任意** 状态是一个特殊节点，可以定义到状态的过渡，这些过渡将在状态机更新期间始终被检查。它可以改善创建更复杂角色动画时的工作流程（例如，可以从所有状态触发的角色 `Death` 状态）。

此外，状态机过渡可以定义中断选项，以支持 **过渡规则重新检查** 或 **即时过渡**。

### 音频改进

每次 Flax 更新都会为所有引擎领域带来新功能和修复。这次音频系统获得了多项质量改进，以实现更好的空间声音播放和新的 [HRTF](https://en.wikipedia.org/wiki/Head-related_transfer_function) 音频。音频源现在可以控制 `Pan`、`Doppler Factor` 和 `Spatialization`。我们修复了最小音频衰减距离，并添加了调试球体以在编辑器中可视化它。

### 网络复制层次结构

`NetworkReplicationHierarchy` 是一项新功能，允许游戏配置对象复制机制。它是 `NetworkReplicator` 的可选扩展，可通过 `Hierarchy` 属性访问，游戏可以将其设置为自定义节点层次结构。它用于在更优化的结构（例如网格或层次树）中存储要复制的对象，并且可以用于单独控制每个对象的复制速率和目标客户端。

例如，当大型游戏关卡包含 1 万个网络对象（例如兴趣点）时，将所有对象复制到所有已连接的客户端会严重影响性能。为了解决这个问题，可以创建一个简单的复制层次结构，控制每个对象的复制 FPS，并为距离太远的客户端跳过不必要的复制。请参阅[文档](../../networking/high-level.md)了解更多信息。

此外，我们投入了大量精力到网络系统中，因为我们看到许多正在开发的游戏项目都在使用它。网络 RPC 代码生成更加可靠，并支持更多功能。

## 迁移指南

### 从 Mono 迁移到 .NET 7

C# 脚本运行时和工具已更新，以在所有平台（桌面、移动端和主机）上使用最新的 .NET 7 SDK。它带来了巨大的性能和稳定性优势，但可能需要一些用户更新他们的代码和工具。显著变化：
* Flax 编辑器不再包含 C# 运行时或 C# 编译器，而是依赖于系统安装的 .NET SDK
* 桌面平台（Windows、macOS、Linux）使用带有新 JIT 和新 GC 的 CoreCLR 运行时
* 移动端和主机使用新的 [mono](https://github.com/dotnet/runtime/tree/main/src/mono) 和 Mono AOT（只有 Android 使用带有 JIT 的 Mono），但使用最新的类库（功能与 CoreCLR 兼容）
* Visual Studio 2019（及更早版本）不受 .NET 7 SDK 支持（仍然可以用于编程，但工具支持较少）
* [Flax.VS](https://marketplace.visualstudio.com/items?itemName=Flax.FlaxVS) 扩展不再需要用于 Visual Studio 中的 C# 调试——VS 2022 具有内置的 .NET 7 调试器
* Android 平台需要通过 `dotnet workload install android` 安装 Android .NET 工作负载
* 旧的 Mono 运行时托管代码仍然在 Flax 代码库中可用，但已被禁用，将在未来被移除
* 如果你在代码中使用 `Regex`，则将 `options.ScriptingAPI.SystemReferences.Add("System.Text.RegularExpressions");` 添加到 `Game.Build.cs` 中以正确引用系统库（现在默认不使用）

我们更新了文档、代码示例和所有官方插件以反映这些更改。

### 车辆驱动方向

车辆已更新为使用 `Z` 轴作为前进方向，而不是 `X`，这现在与引擎[坐标系统](../../get-started/scenes/world-units.md)匹配。引擎将自动围绕原点旋转旧车辆以匹配当前布局（当加载旧场景或预制体时）。但是，请更新任何车辆对象和驾驶脚本，以便在版本升级后正常工作。

## 更新日志

### 版本 1.6.6344 - 2023年7月8日

贡献者：mafiesto4、GoaLitiuM、envision3d、Tryibion、Withaust、PrecisionRender、stefnotch、RuanLucasGD、Menotdan、Swiggies、MinhCT、PhyresiCompany、HydrogenC

合并的 PR：148

* 添加了 **.NET 7** 支持，包含 **C# 11** 和最新的 DotNet 运行时（新的 JIT 和 GC）
* 向构建工具添加了 `Platform.BuildTargetArchitecture`
* 在 Visual Studio 中添加了对 **混合脚本调试（C++ 和 .Net Core）** 的支持
* 在 Windows 上，如果在崩溃位置返回之前附加了调试器，添加了记录原生异常堆栈跟踪
* 添加了单元测试以验证 `LibraryImport` 特性的使用，以确保正确的绑定
* 添加了 **PhysX 5**
* 添加了 **物理统计信息和性能分析器**
* 添加了 `FileSystem::GetDirectorySize`
* 添加了选项 *Skip .NET Runtime Packaging*，以跳过使用已烘焙游戏打包 C# 类库（如果可能，使用系统安装的）
* 在游戏烘焙器中添加了打印输出 C# 文件大小
* 为常规游戏构建（不带 AOT）添加了 C# 类库优化
* 为 AOT 编译添加了多线程（主机和 iOS 的构建速度提高 3 倍）
* 在 `NetworkLagDriver` 中，当延迟设置为零时，添加了立即处理网络事件的支持
* 向动画图状态机添加了 **任意状态**
* 向状态机过渡添加了 **中断选项**
* 在编辑器中为骨骼节点或骨骼复制添加了上下文菜单
* 在蒙皮模型窗口视口中添加了调试绘制选中的骨骼节点
* 在编辑器预览中启用时，添加了骨骼节点名称调试绘制
* 添加了 **骨骼重定向**，以在不同骨骼上播放动画
* 向 `DebugDraw` 文本绘制添加了缩放参数，以在不减小字体大小的情况下重新缩放文本
* 添加了将仅骨骼作为蒙皮模型导入的支持（例如，从动画文件导入以获取用于重定向的骨骼）
* 添加了对 **macOS arm64（M1/M2 芯片）** 的支持
* 在加载失败时添加了记录缺失资源类型
* 将 `Output/` 文件夹添加到 *.gitignore*
* 添加了 `TaskGraphSystem.RemoveDependency`，并在系统销毁时自动清理依赖项
* 改进了动画图状态机节点的外观
* 在 C++ 中为网络添加了对在自定义结构上使用 `INetworkSerializable` 的支持
* 添加了在单个组中通过网络生成多个对象的支持，该组不是来自预制体
* 添加了 **网络复制层次结构**，用于对多人游戏中的复制进行稳健控制
* 添加了在访问所有权时缺少网络对象的网络错误日志
* 为各种网络功能添加了 CPU 性能分析事件
* 向 Arizona 框架添加了网络复制层次结构系统，具有设置和脚本功能
* 添加了 `NetworkReplicator::HasObject`
* 向 Actor 和脚本添加了网络调试面板
* 添加了 `INetworkObject::OnNetworkSync`
* 为 `INetworkObject` 添加了默认空实现，以便于在游戏脚本中使用
* 向脚本 API 添加了 `SoftTypeReference<T>`，用于延迟加载类型引用（通过类型名称）
* 添加了 **输入操作阶段**
* 添加了 `Camera.UnprojectPoint` 方法
* 向粒子特效添加了播放、暂停和停止功能
* 改进了内容窗口中资源的工具提示
* 改进了 UI 控件样式组的组织
* 改进了变换中缩放值链接的 UI，使其更直观
* 向控件添加了 **相对于枢轴的 UI 大小调整**
* 添加了编辑作为结构的字典键的支持
* 在编辑器中通过上下文菜单添加了资源重载选项
* 添加了按父标签搜索 Actor（`Level.FindActorsByParentTag`）
* 添加了按类型和名称查找 Actor（适用于 Actor 和 Level）
* 在构建工具中为编译和链接环境添加了 `CustomArgs` 以进行自定义
* 在枚举适配器时添加了优先选择高性能独立 GPU
* 通过新的 `Utilities::UnitsToText` 添加了 `Utilities::HertzToText`
* 向物理脚本添加了 `LineCast` 和 `LineCastAll`
* 将默认新脚本名称更改为 `MyScript`，并避免将其命名为 `Script`，以便于使用
* 添加了 `Platform::GetMousePosition`/`WindowsPlatform::SetMousePosition`，用于在所有平台上统一访问屏幕空间鼠标位置
* 在 Windows 和 Linux 上为编辑器添加了 **吸管颜色选择器**
* 改进了复制样条线点时的可用性
* 向 C#/可视化脚本 API 添加了各种 `Input` 类委托
* 添加了加载具有不同根 Actor 的嵌套预制体的自动化测试
* 在 `FontTextureAtlas` 中添加了字体字形的位图数据槽位
* 为脚本字段添加了 `Span<T>` 支持
* 向 C++ 调试器 natvis 文件添加了 `Span<T>`
* 通过 `OpenAL` 后端添加了 **HRTF 音频** 支持
* 在编辑器选项保存时添加了更新主菜单快捷键
* 向四元数编辑器上下文菜单添加了 *Copy Euler* 角度
* 添加了将 `PixelFormat` 记录为字符串而不是整数值，以提高可读性
* 向 C++ `Vector3` 添加了 `ClampLength` 函数
* 在编辑器公共 API 中添加了可从插件修改的 *InputBindings*
* 添加了对大写字母和下划线的单词换行，以改善文本渲染
* 对滚动条进行了各种更改，使其感觉更好
* 在编辑器中，通过单击空白区域添加了取消选择内容视图中的项目
* 为性能分析器添加了播放图标变为停止图标，反之亦然
* 添加了为内容窗口中选择的每个模型执行 `Create collision data` 操作
* 改进了编辑器中 Visject 上下文菜单界面
* 添加了更改未聚焦编辑器窗口的 FPS 的能力
* 添加了将新材质实例名称设置为父材质名称
* 添加了 `EnumAddFlags`，用于轻松附加标志
* 添加了 `NetworkReplicator::EnableLog`，可选地启用网络的详细日志记录
* 添加了 `NetworkStream::SenderId`，以在对象复制或 RPC 代码期间检测消息发送者
* 添加了 `NetworkManager::GetClient`，通过 `uint32 clientId`
* 添加了 `NetworkRpcParams`，用于将 RPC 发送到特定的客户端集或读取发送者 ID
* 为 C# 网络添加了数组属性复制代码生成
* 为具有对象引用或自定义结构的 C# 数组属性添加了网络复制代码生成
* 为脚本添加了 **LateFixedUpdate 事件**
* 添加了对 `Font` 大小中十进制值的支持
* 在 C# 网络复制代码生成中添加了正确的 POD 类型检查
* 添加了对 C# 数组作为网络 RPC 方法参数的支持
* 为正确的 C# 网络代码生成，添加了从客户端到服务器的对象 ID 反向映射
* 为网络对象添加了可选复制（如果 Rep FPS 为负数）
* 添加了更改 C# 可为空引用上下文构建选项的支持
* 为脚本 API 添加了内容导入器和导出器
* 改进了编辑器中模型/材质预览的可用性
* 添加了仅使用 `Tag` 搜索活动 Actor 的选项
* 向构建清除命令添加了输出二进制文件夹清理
* 在 `FileBase::WriteAllText` 中添加了写入 UTF-8 文件的支持
* 添加了使用 `null` 项取消设置类型引用的能力
* 向 C++ 脚本添加了 `SpanContains` 工具
* 添加了 `ReallocAligned` 工具
* 在 `API_INJECT_CODE` 宏中添加了对换行符的支持
* 向 gitattribute 添加了 `eol=lf`
* 在编辑器启动时，添加了删除项目引用中旧的热重载文件
* 改进了拖动树节点的视觉效果
* 向编辑器场景树上下文菜单添加了 `Unload all but this scene`
* 在编辑器中，使用父 Actor 的名称作为初始预制体名称
* 向 C++ Math 添加了 `MoveTowards` 函数
* 向脚本 API 添加了 `Tags::GetSubTags`
* 向 `ViewportIconsRenderer` 添加了 `AddActorWithTexture`，用于每个 Actor 的自定义图标
* 在粒子发射器表面中添加了 Random Range 节点的输入
* 为 Actors 和 Scripts 添加了 `==` 运算符，以在 C# 脚本中正确执行比较
* 添加了 `AudioDataInfo.Length`
* 在编辑器中重新导入资源时，添加了音频片段预览刷新
* 在编辑器的音频片段窗口中，添加了带有查找功能的当前播放位置预览
* 添加了 OpenAL `AL_SOFT_source_spatialize` 扩展支持，用于立体声空间音频播放
* 向音频源添加了 `AllowSpatialization` 选项
* 向音频源添加了 `DopplerFactor`
* 向音频源添加了 `Pan`，用于立体声声像
* 为音频源和场景动画播放器添加了编辑器播放工具
* 添加了在编辑器会话之间保存和重新打开所有活动场景
* 添加了确保预制体 Actor 的静态标志与父标志匹配或保留其自己的标志
* 向构建工具添加了记录 .NET 运行时版本
* 在 Windows 上添加了忽略记录缺失的环境变量
* 为构建脚本添加了引擎版本定义（例如 `FLAX_1_6_OR_NEWER`）
* 为字符串格式化和本地化添加了自动化测试
* 为自定义资源类型扩展添加了内容代理修改功能和工作区重建
* 当使用不同编辑器版本打开项目时，添加了清理构建工具和游戏烘焙器缓存
* 添加了定期运行 GC 以减少卡顿
* 为 Visual Studio 2022 添加了带有 .NET 7 的 `launchSettings.json` 生成
* 添加了更好的纹理初始化 API，支持自定义数据
* 添加了更好的 Visual Studio 解决方案生成，带有嵌套 C# 项目交叉引用，以便将项目正确放置在组文件夹中
* 改进了根运动提取和播放
* 改进了编辑器中浮点值字段的自动滑块速度
* 优化了 `Flax.Build` 性能，以实现更快的构建
* 通过字符串构建器池优化了绑定代码生成
* 优化了各种地方的文本格式化
* 通过移除 Xml、Schema 支持并使其对 AOT 游戏构建友好，优化了 `Newtonsoft.Json` 库
* 优化了 `System.ComponentModel.TypeConverter` 程序集的使用，以减少已烘焙游戏构建的大小
* 优化了性能分析器窗口资源，并仅在视图处于活动状态时进行 GPU 资源排序
* 当没有客户端可以接收对象时，优化了网络复制
* 优化了接口方法查找，以消除 `strlen` 调用
* 优化了向量归一化
* 在销毁复杂 UI 结构时，优化了 UI 性能
* 如果结构可以零初始化，优化了生成的绑定代码中 `Utils.InitStructure` 的使用
* 优化了 `CollisionsHelper::FrustumContainsBox`
* 在 Mono AOT 构建中，优化了 C# 标准库调试符号的生成
* 将 *Newtonsoft.Json* 更新到 `13.0.2`
* 将 *Nintendo SDK* 支持更新到 `16.1`
* 将 OpenAL 版本更新到 `1.23.1`
* 将依赖的 DotNet 库更新到 `dotnet7`
* 在 `Flax.Build` 文件下载工具中，将已弃用的 `WebClient` 更新为 `HttpClient`
* 将 `fmt` 库更新到版本 `9.1`（2022年8月27日）
* 将编辑器分析从已弃用的 `Universal Analytics` 更新到最新的 `GA4`
* 将 Tracy 更新到版本 `0.9`
* 更新了 Flax `.gitignore`，以跳过生成的代码模块头文件
* **将 Flax Docs 许可证更改为** `CC-BY-4.0 license`
* 从 VS Code 扩展列表中移除了 mono 调试器
* 从编辑器摄像机模型中移除了阴影投射和 SDF 数据
* 移除了未使用的 `Function::TryCall`
* 移除了编辑器未聚焦时的额外休眠
* 从物理设置中移除了 `EnableAdaptiveForce`（PhysX 中已弃用的功能）
* 将网络代码生成初始化器重命名为 `NetworkingPlugin`，用于 C# 网络代码
* 重构了车辆，以使用 `Z` 轴作为前进方向，而不是 `X`
* 重构了平台进程启动，使用 `CreateProcessSettings`
* 重构了编辑器窗口布局中拆分器值的序列化，以防止加载窗口时的无效状态
* 重构了骨骼映射，由蒙皮模型处理，而不是动画资源
* 重构了 `StringUtils` 以简化代码
* 重构了各种编辑器 API，以使用自动生成的绑定而不是手动代码
* 重构了 macOS 上的窗口，以支持屏幕缩放和 HighDpi 模式
* 将 `RootMotionData` 重构为 `Transform` 以简化代码
* 重构了 `Level` 类，以相反顺序卸载场景
* 重构了 **3D 音频，具有更好的空间声音质量**
* 重构了网络 RPC C# 代码生成，以与数据序列化器共享代码
* 修复了动画图状态机规则图在过渡移除撤销后打开的问题
* 修复了在预制体编辑器中生成 Actor
* 修复了 `StringUtils::PathRemoveRelativeParts` 中向上到带有相对路径位的 Windows 驱动器时的错误
* 修复了 Clang 上 `NetworkConfig` 中的弃用编译警告
* 修复了 API 代码注入行，以排除在包含缓存之外
* 修复了 `Asset::WaitForLoaded` 在之前加载失败时的警告
* 修复了动画模型边界计算
* 修复了路径名称的错误，防止项目在复制时被重命名
* 修复了内容窗口自动滚动的回归问题
* 修复了调试绘制线条不像是调试绘制表面那样使用模拟光照
* 修复了可视化脚本节点 `Array For Each` 的局部变量设置
* 修复了 OpenAL 空间音频中左右和前后反转的错误
* 修复了在动画图中编辑状态机时使用嵌套 Visject Surface 上下文时的错误
* 修复了 Json 资源烘焙，以正确序列化整个资源数据，即使在运行时修改了
* 修复了从模型资源烘焙碰撞数据，倾向于使用 CPU 数据获取
* 修复了通用 Json 代理未在内容上下文菜单中显示的问题
* 修复了 C# 网络代码生成在使用自定义结构进行复制和 RPC 时的问题
* 修复了 macOS 上从隐藏状态恢复鼠标光标
* 修复了 macOS 上的窗口焦点通知处理
* 修复了 macOS 上的 dylib rpath id
* 修复了动画图中 `Blend with Mask` 节点的视觉效果
* 修复了编辑器中样条线切线点的视觉效果
* 修复了 Visual Studio Code 跳转到行参数
* 修复了在编辑器中保存场景文件时场景资源的运行时内容
* 修复了当属性抛出异常时场景对象的 C# 序列化
* 修复了 C# 数学符号函数对于值 `0` 的问题
* 修复了 C# `Math.Remap` 方法为已弃用（使用 `Math.Map` 代替）
* 修复了 C++ API 中 Vector2/3 归一化与 C# API 相同
* 修复了游戏 C++ 脚本中 `ViewportIconsRenderer` 的使用
* 修复了 `TextureMipData::GetPixels` 以正确复制相同格式的像素
* 修复了通过 `stb` 导出 `png` 纹理时的内存泄漏
* 修复了在编辑器中拖放 Actor 树时的问题
* 修复了使用许多层时的 `LayersMatrixEditor`
* 修复了内容窗口中右键单击菜单删除考虑选择的问题
* 修复了使用搜索字段时内容视图项目的刷新（例如删除后）
* 修复了同时使用 C++ 和 C# 脚本时 Visual Studio 项目名称冲突
* 修复了自我引用的 C# 序列化（例如，脚本子对象引用拥有它的脚本）
* 修复了高 DPI 下编辑器视口摄像机移动迟钝
* 修复了 `GridGizmo` 在编辑器视口中透明度之前渲染
* 修复了在内容编辑器上重命名 Source/Content 文件夹的无效能力
* 修复了热重载后自定义编辑器窗口恢复
* 修复了 `AnimatedModel.SetCurrentPose` 中错误的空间转换结果
* 修复了车辆车轮调试方向
* 修复了 `CharacterController::Move` 期间生成的碰撞事件缺失
* 修复了 `HashSet::ClearDelete` 中的编译时错误
* 修复了带有 Array 参数的 C++ RPS 的代码生成
* 修复了新项目中垃圾的 `DefaultScene` 值
* 修复了引用二进制模块结构的 Intellisense 错误
* 修复了在主机客户端上调用客户端 RPC，当它未包含在 `targetIds` 列表中时
* 修复了 `StringUtils::ConvertANSI2UTF16` 以正确处理多字节字符长度
* 修复了使用使用 `GlobalSDF` 的材质实例时的错误
* 修复了在编辑器中滑动大小数字时集合大小变化的错误
* 修复了删除文件夹时未删除所有子项的错误
* 修复了在非资源文件夹中自动创建碰撞资源的错误
* 修复了 XAudio2 缺少的初始音频源音量设置
* 修复了从客户端发送时网络 RPC 对象 ID 映射回服务器 ID
* 修复了 `NetworkTransform` 无效字段同步复制粘贴错误
* 修复了在空白项目上创建本地化表
* 修复了 `Array` 中使用的内置 `Char` 类型的绑定生成
* 修复了正交视图投影中的模型屏幕尺寸计算
* 修复了缓冲区已满时 CPU 性能分析事件提取
* 修复了绑定代码实例对象参数 `obj` 为 `__obj`，以防止名称冲突
* 修复了更新基础预制体更改时应用现有嵌套预制体同步
* 修复了生成具有不同根 Actor 的嵌套预制体
* 修复了在对象完全生成之前本地访问对象所有权信息
* 修复了角色控制器向上方向限制在 `(-1, 1)` 之间
* 修复了大气预计算着色器中的拼写错误
* 修复了编辑变换时缩放链接使用比率
* 修复了层次网络所有权传播到子对象
* 修复了本地客户端网络状态更改为在线后 `NetworkManager::ClientConnected` 的分派
* 修复了在预制体编辑器中创建 UI 时 `UIControl` 到预制体窗口的链接
* 修复了使用画布缩放器时的 UI 控件选择高亮
* 修复了从父控件空间到局部空间的 3D UI 画布点转换
* 修复了使用自定义编辑器编辑值类型时的值同步
* 修复了生成具有不同根 Actor 的嵌套预制体
* 修复了编辑器中预制体差异上下文菜单以正确区分数组
* 修复了从预制体加载对象时的预制体数据构建号
* 修复了启用缩放捕捉时缩放变换 Gizmo 的问题
* 修复了使用起始位置偏移时动画图中的循环动画
* 修复了在编辑器中创建具有私有 `ctor` 方法的 C# 脚本
* 修复了当文本框具有导航焦点时的提交
* 修复了加载资源失败时的文件锁
* 修复了在编辑器中卸载可视化脚本项时的错误
* 修复了在脚本绑定中为 `IntPtr` 值类型使用正确的默认值
* 修复了在编辑器内容中使用 `Ctrl+C`/`Ctrl+V` 复制预制体文件
* 修复了在具有不同 ID 但匹配父级和类型的对象上调用 RPC
* 修复了 `BitArray::Set` 不是 `const`
* 修复了输出日志文本范围以处理行结束
* 修复了在编辑器中绘制资源缩略图时内部错误导致的崩溃
* 修复了由于序列化版本不匹配导致资源加载失败时引擎退出时的崩溃
* 修复了将 `String` 的子字符串分配给自身时的崩溃
* 修复了导入具有 LOD 生成但仅指定单个 LOD 的模型时的崩溃
* 修复了在动画图中采样使用其长度计算起始位置的动画时的崩溃
* 修复了当 C# 类型缺少空 `ctor` 或抛出异常时的崩溃
* 修复了系统未安装有效 GPU 驱动程序时 GPU 设备初始化中的崩溃
* 修复了加载具有类型不是场景对象的脚本的场景时的崩溃
* 修复了当其中一个 Actor 被手动禁用时结束播放时的崩溃
* 修复了在播放时重新导入音频片段时的崩溃
* 修复了将 GPU 纹理驻留状态更新为 `0` 时的崩溃
* 修复了使用 XAudio2 后端流式传输多个音频片段时的崩溃
* 修复了在无效控件状态（从窗口分离）下开始拖放时的崩溃
* 修复了在热重载期间使用游戏代码中的自定义资源时的崩溃
* 修复了由于枚举值类型变量的无效 RPC 代码生成导致的崩溃
* 修复了使用自定义资源时热重载的崩溃
* 修复了在更新事件期间从游戏代码修改动画模型骨骼姿态时的崩溃
* 修复了由于系统销毁时复制对象泄漏导致的崩溃
* 修复了在显示/关闭序列之前删除窗口时的崩溃
