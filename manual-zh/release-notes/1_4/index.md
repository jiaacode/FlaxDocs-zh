# Flax 1.4 发布说明

## 亮点

### 实时全局光照

<center><iframe width="750" height="421" src="https://www.youtube-nocookie.com/embed/22zplE1STgU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></center>

**实时全局光照** 现已登陆 Flax！这是呼声最高的功能之一，现在它已可用于游戏和建筑可视化项目。你可以在上面的视频中看到它的实际效果。我们使用 **DDGI 算法** 实现了它，该算法使用围绕摄像机的滚动探针体积，并利用我们自定义的 **软件光线追踪** 解决方案，该方案可在所有现代 GPU 上运行——无需支持 RTX 的 GPU。相反，我们为模型添加了有符号距离场支持，将其光栅化为全局体积，从而可以在 GPU 的着色器中进行光线追踪。结合全局表面缓存，我们可以在光照条件不断变化的动态环境中模拟 GI 效果（例如通过一日内时间变化）。

要了解更多信息，请参阅[实时 GI 文档](../../graphics/lighting/gi/realtime.md)。

### 下载技术演示

![Flax 引擎 2022 技术演示 GI](/manual/media/demo-shot.jpg)

为了展示新的 **全局光照** 渲染的能力，我们制作了一个小型演示，展示了具有动态光照、动态对象和可调一日内时间的建筑可视化场景。这是一个小型沙盒，你可以在实际生产项目中测试 GI 的外观和性能。你可以从我们的服务器 **[立即下载](https://flaxengine.com/tech-demo-2022/)**，或从 Steam 获取。

<center><iframe src="https://store.steampowered.com/widget/2138130/" frameborder="0" width="646" height="190"></iframe></center>

在演示中，你可以使用鼠标和键盘控制摄像机，或使用游戏手柄操作。使用 *D-pad* 或 *UHJK* 键旋转太阳，并在场景中调整一日内时间，观察它如何影响动态光照。

### 许可变更

伴随着本次更新中大量新功能加入 Flax，我们想要做得更多。因此，我们更新了许可条款，**将最低收入门槛从 2.5 万美元提高到 25 万美元**。现在，如果你的游戏或产品在每个日历季度的收入低于 25 万美元，使用 Flax 是免费的。超过此金额的任何收入，仍像以前一样使用 4% 的收入分成。例如，如果你的游戏收入为 30 万美元，你需支付 2,000 美元，即超过新门槛的 5 万美元的 4%。

我们相信这一变化将使引擎对小型开发者更加友好。该变更自本日历季度（2022 年第三季度）起生效。

### 64 位世界坐标

![大世界——整个地球](/manual/media/large-worlds-support.gif)

Flax 引擎包含多种用于创建大型且丰富世界的功能，例如异步数据流式传输、不同的内容工具（用于植被和地形）以及优化的多线程。在此更新中，我们带来了 **世界坐标的 64 位精度支持**，以支持构建更大的世界。结合相对摄像机的渲染和物理场景原点偏移，大型世界可以被高效地模拟和渲染，这使得游戏场景可以像整个太阳系一样大，同时仍然保持良好的质量和精度。

默认情况下，引擎仍然使用 32 位浮点数精度，可以在自定义构建中升级到 64 位。要了解更多信息，请参阅[文档](../../editor/large-worlds/index.md)。

### 全局 SDF

![全局 SDF](/manual/media/global-sdf.jpg)

为了实现实时 GI，我们需要一种 **在场景中进行光线追踪的方法**，以模拟漫反射光反弹和镜面反射光的传输。如今，最常见的方法是通过硬件光线追踪，但这仅限于高端 GPU。我们决定使用 **有符号距离场**，它为光线追踪提供了一种高效的方式。为此，我们将模型 SDF 光栅化为一个体积纹理数组（称为 *Global SDF*），以在 200 米或更远的距离内为摄像机附近提供高达 10 厘米的精度。这提供了场景几何体的粗略近似，可用于 **软件光线追踪**。

要了解更多信息，请参阅[全局 SDF 文档](../../graphics/models/sdf.md)。

#### 内容中的全局 SDF

![粒子全局 SDF 碰撞](/manual/media/particles-global-sdf-collisions.gif)

此外，维护整个场景的全局 SDF 的好处是能够在材质、粒子和着色器中使用它。我们向材质和粒子添加了新的 `Sample Global SDF` 和 `Sample Global SDF Gradient` 节点，用于在任何位置采样 SDF。此外，粒子发射器具有用于全局 SDF 碰撞和全局 SDF 力的新模块，以驱动逼真的 VFX 模拟。

![粒子全局 SDF](/manual/media/particles-global-sdf.gif)

### 人群导航

| 之前                                               | 之后                                              |
| -------------------------------------------------- | ------------------------------------------------- |
| ![导航代理之前](/manual/media/nav-agents-crowd-before.gif) | ![导航代理之后](/manual/media/nav-agents-crowd-before.gif) |

对于使用基于导航网格的 AI 的游戏项目，我们添加了一个新的 `NavCrowd` 系统，该系统可以高效地模拟 **代理人群** 的寻路和规避。上面你可以看到 2 组简单的[导航网格代理](../../navigation/tutorials/path-following.md)正在相互碰撞。[NavCrowd](../../navigation/nav-crowd.md) 是一个用于一组代理的导航转向行为系统。它通过自适应的 RVO 采样计算来处理代理之间的规避。它可以用于使用导航网格实现人群的自动规避和移动，并支持异步计算，可以在我们的作业系统上运行（如文档所示）。

### 富文本格式

![自定义文本样式富文本框](/manual/media/custom-text-styling.png)

在此版本中，我们改进了[富文本框](../../ui/controls/rich-text-box.md) GUI 控件，添加了带有样式、布局和内联图像支持的 HTML 标签格式化。这显著简化了 UI 中文本的样式设置，并允许创建更优雅的内容。我们简单的 HTML 解析器非常可扩展，可以使用自定义标签（例如由插件定义）。请参阅[文档](../../ui/controls/rich-text-box.md)了解支持哪些标签以及如何在项目中使用它们。

### 可视化脚本改进

![可视化脚本字典](/manual/media/dictionaries-visual-script.png)

每次更新，我们都会为可视化脚本用户带来许多功能和改进。我们的目标是使其成为一个高度可扩展且可用的游戏脚本解决方案。这次我们添加了 **字典** 支持、新的编辑器功能以简化脚本编辑，以及查找器工具。**新的查找器工具** 允许你在图中快速搜索任何内容，甚至是在项目中的所有脚本中（在所有图编辑器中通过 `Ctrl+F` 打开）。这也可以用于在整个项目的所有材质、粒子和动画图中搜索某些内容（例如搜索特定纹理或方法的使用）。

最后，**绕行节点获得了更多可用性**，现在可以轻松地连接到其他节点，包括多个输入/输出（取决于类型）。这将改善图部分的重用，并有助于组织可视化脚本或材质图。

## 透明材质的屏幕空间反射

![SSR 透明度](/manual/media/ssr-transparency.png)

透明材质现在具有执行逐像素深度缓冲区光线追踪以渲染反射的新选项，这提高了水坑等水面的真实感。此外，透明度可以采样新的全局光照和/或使用非方向光照模式，这在创建烟雾、雾或灰尘粒子材质时非常有用（如下所示）。

![体积粒子光照](/manual/media/volumetric-particles-lighting.gif)

## 嵌套动画

![嵌套动画](/manual/media/nested-anim.png)

动画可以在内部包含嵌套动画，以创建子片段或复合动画（也称为蒙太奇）。这允许轻松重用现有的动画资源（例如，为每个枪弹壳重复使用单次换弹动画三次）。

## 噪声工具

![材质中的噪声节点](/manual/media/noise-nodes.png)

现在，Flax 包含用于各种噪声函数的多种工具，例如：Perlin、Simplex、Worley、Voronoi、Custom。这些可以通过脚本 `FlaxEngine.Utilities.Noise` 静态类访问，并用于丰富程序化生成的世界和内容。

![噪声示例](/manual/media/noise-examples.png)

所有可视化图（材质、粒子、动画）都可以在 CPU 和 GPU 上采样噪声函数，以丰富内容。所有噪声函数返回归一化到 0-1 范围内的结果。其中一些返回更多噪声分量，例如 Voronoi 噪声，其中 `X=minDistToCell`、`Y=randomColor`、`Z=minEdgeDistance`。根据上下文，可以只使用一个分量，甚至使用所有分量。请遵循每个节点的文档工具提示。

## 迁移指南

### 脚本初始化顺序

我们将 Actor 的 `PostLoad`/`PostSpawn` 方法重构为 `Initialize`，并将脚本 `OnAwake` 事件改为在此初始化阶段调用——在任何 `OnStart`/`OnEnable` 逻辑之前。这有助于在管理器+对象的方案中创建游戏系统，其中管理器可以使用 `OnAwake` 正确初始化，而 `OnEnable` 可以用于将对象注册到管理器。此更改没有性能影响，但可能需要对现有的 Flax 项目进行处理。

### 插件脚本更改

在此更新中，我们添加了在 C++ 脚本中实现游戏插件的支持——以前这是仅限 C# 的功能。为此，`GamePlugin` 和 `EditorPlugin` 都进行了轻微修改：
* `Description` getter 是只读的，你的插件可以在构造函数中填充 `_description` 字段以设置插件信息。
* `OnCollectAssets` 已重命名为 `GetReferences`，并返回带有引用资源的 Guid 列表。
* `DeinitializeEditor` 是编辑器插件的新方法，与 `InitializeEditor` 配对并匹配编辑器生命周期。
我们更新了文档、代码示例和所有官方插件以反映这些更改。

### 大世界

向 Flax 添加 64 位精度的世界坐标是一项挑战。引擎和编辑器都具有非常复杂且成熟的系统和工具，因此我们希望使这种过渡无缝且稳定。目标之一是不仅仅通过将每个浮点值加倍来膨胀内存，而是升级与世界坐标相关的数据以支持非常大的世界。例如，32 位浮点数为我们提供了足够的精度来表示对象旋转和缩放，因此我们仅将 `Transform` 的 `Translation`（即 `Position`）升级为 64 位双精度向量。此外，UI 系统、网格数据、纹理转换器和其他引擎功能已更改，以出于性能原因明确保留 *Float* 向量。

![带有 64 位坐标的大世界](/manual/media/world-coordinates-64-bit.png)

关于数据兼容性，我们为旧项目添加了自动升级支持，以及在 32 位和 64 位向量类型之间进行隐式转换，以确保游戏代码可以轻松更新到新的引擎版本。最后，此大世界坐标功能可以通过引擎配置参数启用（参见 `Flax.flaxproj`）。如果你的游戏需要 64 位浮点数，则可以使用自定义引擎构建（[文档](../../editor/large-worlds/index.md)）并启用该功能。

关于此功能的重要更改：
- 重构了 Vector 类型 Float/Double/Int，使其数据为 float/double/int，而 Vector 具有 float 或 double（在编译时基于 `USE_LARGE_WORLDS` 定义使用 `Real` typedef）
- 重构了 UI 以显式使用 `Float2` 而不是 `Vector2`（UI 不需要 64 位精度）
- 重构了渲染以显式使用 `Float3` 而不是 `Vector3`（GPU 对 64 位坐标的支持有限，由于性能原因，我们继续使用 32 位精度，但场景渲染相对于大世界块，因此可以使用大世界）
- 添加了 Vector<->Float<->Double<->Int 向量类型之间的隐式转换，以便于升级项目到 1.4 版本
- 保持 32 位浮点精度的核心数学类型：`Rectangle`、`Color`、`Matrix`、`Matrix3x3`、`Matrix3x4`、`Quaternion`、`Viewport`、`BoundingFrustum`
- 升级到 64 位双精度的核心数学类型：`Vector2/3/4`、`BoundingBox`、`BoundingSphere`、`OrientedBoundingBox`、`Plane`、`Ray`、`Triangle`、`Transform`（仅平移，方向和缩放将使用 32 位精度，因为它足以表示旋转和缩放）
- Mesh API 已更改，明确使用 `Float2/3/4` 作为网格顶点数据（而不是 `Vector2/3/4`）——旧 API 已被弃用，但仍然有效
- Collision Data 和 Physics 使用 32 位精度处理顶点和几何体——旧 API 已被弃用，但仍然有效
- 打包向量类型（例如 `FloatR10G10B10A2`、`Half3`）已重构，默认使用 Float2/3/4 类型进行转换，而不是 `Vector2/3/4`
- 材质、粒子和动画图参数已从 Vector 更改为 Float（显式类型），但新增了对 Double 的支持
- Gameplay Globals 中 `Vector2/3/4` 类型的条目已更改为 `Float2/3/4`，并添加了 `Double2/3/4` 以备需要更高精度时使用

迁移指南：
- BoundingBox、BoundingSphere、Transform、Ray、Triangle、Plane、Vector2/3/4 类型如果使用双精度，可能具有不同的内存大小。确保使用这些类型的数据序列化能够相应工作。你可以使用新的 WriteStream 和 ReadStream 工具方法进行这些数据类型的序列化。`Variant` 类型将自动升级现有数据。
- GameplayGlobals 中向量类型的值已更改为 `Float2/3/4`（读取向量需要显式更改）。
- 用户界面和输入显式使用 `Float2` 表示坐标，请更新你的 UI 代码。

## 更新日志

### 版本 1.4.6334 - 2022年9月7日

贡献者：mafiesto4、GoaLitiuM、iainmckay、PrecisionRender、mxruben、whocares77、ScottLongley、tom-weiland、Wolfos

合并的 PR：23

* 添加了带有实时辐照度探针的 **动态漫反射全局光照**
* 添加了 `JobSystem.Execute` 工具，用于快速运行作业
* 添加了 **全局有符号距离场** 渲染
* 为 Bounding Box 添加了到盒体/点的距离
* 向 `Collisions.hlsl` 添加了 `LineHitBox`
* 向 D3D11 添加了翻转呈现模式和撕裂支持
* 添加了 `MeshAccelerationStructure` 工具，用于健壮的三角形几何体查询
* 为使用 `Matrix3x3` 添加了更多工具
* 向 `RenderView` 添加了 `IsSingleFrame`，用于缩略图/预渲染视图的绘制，无需时间效果和 LOD 过渡
* 添加了 `DynamicStructuredBuffer` 和 `DynamicTypesBuffer` 工具
* 添加了如果所有属性都被 `VisibleIf` 规则隐藏，自动隐藏组面板
* 添加了模型 SDF 生成工具（在导入时、编辑器窗口中，或为场景中所有模型批量生成）
* 向材质和粒子添加了 **Sample Global SDF** 节点
* 添加了 `Collision (Global SDF)` 粒子模块
* 向 GPU 粒子添加了 `Conform to Global SDF` 模块
* 向 GPU 粒子添加了 `Position (Global SDF)` 模块
* 为资源编辑器中的各种标签添加了 `Copy` 选项工具
* 添加了 `ISceneRenderingListener`，用于在渲染器缓存中使用场景信息
* 向编辑器 CodeDocs 添加了用于 C# 类型和成员工具提示的工具
* 添加了 `CustomBuffers`，用于将自定义状态注入 `RenderBuffers`
* 添加了在着色器中从 Quaternion 到其他类型的隐式转换支持
* 向 Visject Surface 图添加了 `Rotate Vector` 节点
* 为透明材质添加了 **屏幕空间反射**
* 向可视化脚本添加了 `Array Add Unique` 节点
* 添加了在透明材质（正向通道）中采样场景颜色的支持
* 基于项目名称首字符，向内容视图添加了键盘按键导航
* 为 C# 资源对象添加了 `JsonAsset.Instance`
* 添加了 `Delegate::BindUnique`
* 向可视化脚本添加了 **字典**
* 添加了对可视化脚本对象数组的支持
* 在脚本 API 中添加了对 `constexpr` 字段的支持
* 向材质添加了 **世界三平面纹理节点**
* 为场景动画渲染添加了播放速度选项
* 添加了 Smoothstep 和 Step 材质节点
* 添加了在更改类型时保留可视化脚本参数的现有值
* 为 GUI 材质添加了 `View Size` 节点
* 在编辑器中通过拖放到场景树窗口添加了叠加场景打开
* 向材质添加了 `Custom Global Code` 节点，用于注入自定义代码、包含或常量
* 向 `PlaySlotAnimation` 添加了 `loopCount`，用于循环插槽动画
* 添加了 `Color.FromRGBA`
* 在编辑器工具栏中为场景数据构建添加了确认对话框（防止误点击）
* 添加了光标裁剪（用于 RTS、MOBA 游戏）
* 向 C# 脚本 API 添加了 `Double2`、`Double3`、`Double4`
* 添加了 **对 64 位世界坐标的大世界支持**（在自定义引擎构建中启用 `UseLargeWorlds`）
* 为大世界添加了相对摄像机的渲染
* 添加了对最新 Windows 11 SDK（22H2）的支持
* 添加了对物理场景原点偏移的支持
* 在 `Variant` 中添加了对 Double2/3/4 原生存储的支持
* 添加了自定义浮点数格式化以防止科学计数法
* 添加了可选的 Environment Probes 分辨率（在图形设置中或每个探针）
* 在 JobSystem 中添加了在作业内调度作业的支持
* 为材质添加了 **透明光照模式**，可选使用非方向着色
* 向透明材质（例如粒子）添加了全局光照采样选项
* 在编辑器窗口中为材质实例参数覆盖添加了全选/全不选工具按钮
* 在编辑器视口小部件中添加了单独的 GBuffer 视图模式
* 添加了 **实时环境探针** 支持
* 添加了在已烘焙游戏中烘焙环境探针的支持
* 为屏幕空间反射添加了新的追踪模式，用于 DDGI 场景追踪
* 在模型预览中显示模型屏幕尺寸
* 为游戏手柄右扳机添加了编辑器摄像机加速
* 为游戏手柄 DPad 添加了 `GamepadDPadX`/`GamepadDPadY` 输入轴
* 添加了 `Engine.FocusGameViewport` 以实现带有摄像机焦点收集的游戏菜单
* 在富文本框中添加了 **HTML 标签处理**
* 向引擎工具添加了 `HtmlParser`（并为其添加了单元测试）
* 添加了在文本框中禁用文本裁剪的选项
* 添加了在文本框中禁用文本选择的选项
* 添加了从文本解析颜色的工具（十六进制或命名颜色）
* 添加了 `Content.GetEditorAssetPath`
* 添加了 `EditorPlugin.DeinitializeEditor`，以在退出时正确清理编辑器扩展
* 在脚本 API 中添加了对带有 `Template` 标志的泛型类型的支持
* 在 `SetMaterial` 中添加了等待模型加载
* 添加了 `NavCrowd`，用于一组代理的导航转向行为系统
* 添加了重命名 GPU 资源的支持（仅限开发构建）
* 为脚本 API 类型实例化添加了新的 `API_TYPEDEF` 元数据（带有 `Alias` 选项）
* 添加了 `FLAX_BUILD_BINDINGS` 定义，供脚本 API 解析器在需要时使用
* 为 C# 数学库添加了各种改进
* 添加了 **内容搜索** 窗口，用于搜索可视化脚本和其他资源
* 为图参数和方法添加了 `查找引用` 工具
* 为编辑器运行模式流程添加了公共事件
* 在所有 Windows 系统中将计时器分辨率设置为可能的最低值
* 在子通道渲染期间（例如阴影深度），为表面材质中的主视图信息添加了支持
* 在 `Header` 特性中添加了对字体大小和颜色的支持
* 向 Actor/脚本搜索工具添加了 `TypeReference` 特性，便于在可视化脚本中选择类型
* 为构建模块编译添加了设置 C++ 版本的支持
* 添加了用于合成动画片段的 **嵌套动画**
* 为 C++/C#/VisualScript/HLSL 工具添加了新的 **噪声** 库
* 向脚本结构添加了自动生成的 `Default` 成员，并改进了反序列化
* 向 `RenderBuffers` 添加了 `UseAlpha`，用于支持 Alpha 通道的通道渲染器
* 为编辑器中的内容查找器工具添加了延迟初始化
* 添加了对从代码创建的虚拟预制体资源的支持
* 在 GPU 性能分析器绘制调用列中添加了 GPU Dispatch 调用
* 为曲面编辑添加了撤销操作批处理，以防止在单次编辑期间产生撤销操作垃圾
* 在 Vulkan 上的 Dispatch 后添加了缺失的管线屏障，以防止 UAV 竞态条件
* 添加了对 3D 纹理使用 Mipmap 的支持
* 在 Visject 中添加了对内置颜色常量的支持（例如 red/blue/violet）
* 如果未批处理/排序，添加了绘制 `RenderList`
* 向 C++ 添加了 `Actor::GetOrAddChild`
* 添加了自动选择在内容窗口中创建的新项目
* 向 `IMaterial` 接口添加了着色器获取器
* 为包含编译错误的着色器在头文件编辑时添加了着色器重载
* 添加了对体积纹理像常规纹理一样更改驻留状态的支持
* 添加了流式资源驻留状态更改跟踪的事件
* 优化了脚本 API 中空注释的解析
* 优化了 ProbesFilter 着色器
* 公开了 `IsDuringPlay` 属性，供 Actor 和脚本在脚本中使用
* 改进了 `StaticModel`，使其在模型有任何 LOD 流式传入时注册到场景渲染
* 改进了静态模型碰撞数据资源的初始名称
* 改进了属性显示（将同一组的所有参数分组在一起）
* 改进了 JetBrains Rider 安装检测
* 改进了 Linux 源代码编辑器检测（Rider 和 VSCode）
* 改进了 UI 中显示的属性名称
* 将编辑器中的搜索框更改为固定在面板顶部
* 更新到 .Net Framework 4.5.2
* 将 DirectXShaderCompiler 更新到版本 1.7（2022年7月）
* 将 `Actor.DestroyChildren` 移至 C++
* 从体积雾中移除了禁用时间重投影
* 移除了 `FlaxException`
* 移除了动画图状态机缺少初始入口状态的警告
* 重构了模型导入选项，仅显示与资源 Type 相关的属性
* 将 `PhysicsActor` 重构为 `Rigidbody`（手动使用 `IPhysicsActor` 接口）
* 重构了 `HashSet` 以支持自定义分配器
* 将 `API_INJECT_CPP_CODE` 重构为 `API_INJECT_CODE`，以支持其他语言的代码注入
* 重构了 Visject 绕行节点以支持重新连接，并具有更多可用性
* 重构了场景对象初始化，在所有 `OnStart` 之前调用 `OnAwake`
* 重构了引擎以支持双精度向量
* 重构了 `OrientedBoundingBox`，使用 `Transform` 进行变换，而不是 `Matrix`（用于大世界）
* 重构了 `FlaxTests`，使其作为编辑器运行，并初始化所有引擎服务
* 使用 ReSharper 格式化了引擎代码库
* 修复了模型导入选项中 `Lightmap UVs Source` 不工作的问题
* 修复了 macOS dylib 路径
* 修复了文本框不消耗按键事件，导致输入时编辑器快捷键被激活的问题
* 修复了在使用值滑块更改颜色时保留 Alpha 通道
* 修复了使用 NDK 25 的 Android 构建
* 修复了编辑器选项启动时因文件缺失而记录错误的问题
* 修复了更快的模型导出
* 修复了打开和编辑缺少动画事件的动画
* 修复了 `Vector2` 相等比较
* 修复了采样带有负时间值关键帧的曲线
* 修复了在 Visject Surface 参数面板中显示多个结构参数
* 修复了如果着色器编译失败，在编辑器中打开材质或粒子发射器
* 修复了选择以正确选择网格的最近三角形
* 修复了天空大气颜色中方向光颜色的 Alpha
* 修复了使用 3 个级联时的 CSM 分割点
* 修复了 `TextureBrush` 在纹理尚未加载时返回有效大小
* 修复了如果窗口不是前台窗口，编辑器视口捕获鼠标
* 修复了具有多个块的循环流式音频片段
* 修复了枚举运算符为 `constexpr`
* 修复了在编辑时过场动画渲染期间编辑器中的游戏更新
* 修复了时间线视图中的 `Ctrl+S` 不分割摄像机镜头媒体
* 修复了 DirectX 资源的调试名称
* 修复了表面参数特性编辑器弹出位置
* 修复了在使用 Graphics 后 Compute 通道后，在 D3D12 上使用相同常量时的常量缓冲区绑定
* 修复了景深在不同分辨率下保持一致
* 修复了景深中边框采样以减少屏幕边缘的泄漏伪影
* 修复了选择植被类型时的编辑器错误
* 修复了 `FlaxStorage` 引用计数为原子操作
* 修复了在 Visject 中粘贴/复制节点以调用生成事件
* 修复了从未加载的资源加载曲面时的错误
* 修复了如果移动首先经过有效的放置目标，拖放到场景树的问题
* 修复了 C# 性能分析事件中错误的时间戳
* 修复了将多行文本复制粘贴到单行文本框
* 修复了移除 Gameplay Globals
* 修复了如果所有混合点都在同一条线上，多重混合 2D 节点的问题
* 修复了使用鼠标左键选择调试日志窗口条目
* 修复了如果使用该发射器的效果被选中，编辑粒子发射器时编辑器中的错误
* 修复了在向 Actor 添加脚本后缺少属性窗口焦点
* 修复了带有默认持续时间的 `ParticleEmitter.Spawn()`
* 修复了 `[AssetReference(typeof(typeName)]` 对资源数组不起作用（修复了集合类型）
* 通过立即将 PhysX Actor 添加到场景，修复了由于延迟 Actor 添加导致的 PhysX 崩溃
* 修复了可视化脚本中 foreach 循环在空数组或字典时继续流程
* 修复了 `Dot` 和 `Distance` 图节点中的默认值
* 修复了在属性窗口中编辑 `LinearCurve<Color>`（颜色选择器窗口关闭关键帧编辑弹出窗口）
* 修复了可视化脚本中对空数组或字典使用 init
* 修复了为多重混合动画调用动画事件
* 修复了在展开的下拉列表面板下鼠标悬停控件
* 修复了 `Spline::GetSplineLength` 冻结
* 修复了编辑器分析跟踪选项文件 SetupStyle
* 修复了在预制体中重新设置 Actor 父级后 Actor 重复
* 修复了可视化脚本脉冲流中的绕行节点
* 修复了关闭最大化的游戏窗口后编辑器运行模式退出错误
* 修复了在 Flax.Build 绑定解析中使用预处理器定义值
* 修复了在 `Flax.Build` 绑定解析器中处理 `else` 和 `elif` 预处理块
* 修复了为模板类型的脚本 API 类型解析注释
* 修复了将对象吸附到编辑器中的组时跳过触发体积
* 修复了双击空富文本框时的错误
* 修复了调试器值评估期间可视化脚本设置参数节点调用流程的小问题
* 修复了在 D3D12 中将体积纹理数据上传到 GPU
* 修复了编译错误时着色器源代码编码错误
* 修复了自定义 DPI 缩放下的字体渲染和对齐
* 修复了 `Dictionary::Remove` 在空字典时的返回值
* 修复了渲染方向光阴影贴图时正向着色器功能中的错误
* 修复了如果选中，发射器编辑后的 ParticleEffectEditor 问题
* 修复了将数组绑定到着色器时的 `UsedSRsMask`/`UsedUAsMask`
* 修复了为模型文件导入材质时的法线贴图
* 修复了在编辑器中各种上下文列表弹出窗口中的项目排序
* 修复了 `InstanceOrigin`、`PerInstanceRandom` 和 `LODDitherFactor` 不在着色器阶段之间使用插值
* 如果第一个输入断开连接，修复了 Visject 中 `Multiply`（及类似）节点的结果值
* 修复了从输出日志消息文本中高亮显示第一个错误/警告
* 修复了如果着色器编译失败，打开粒子发射器编辑器窗口
* 修复了如果刚体没有附加任何形状，无效的刚体边界
* 修复了如果在初始化期间 D3D 设备出现 `DXGI_ERROR_DEVICE_REMOVED` 时的崩溃
* 修复了在屏幕空间画布中使用模糊面板时 Vulkan 的崩溃
* 修复了由于 Vulkan 时间戳查询错误导致的 macOS 崩溃
* 修复了由于某些头文件中未使用 GPU 粒子定义导致的崩溃
* 修复了设置递归材质实例继承时的崩溃
* 修复了更改 Actor 场景时的崩溃
* 修复了打开骨骼遮罩窗口时的崩溃
* 修复了如果当前本地化为空，脚本初始化中的崩溃
* 修复了编辑器热重载后 C# 中 API 事件的崩溃
* 修复了 Linux 上带有空日志消息的崩溃
* 修复了在没有加载场景的情况下生成预制体时的崩溃
* 修复了为 Variant 结构数据加载空 json 时的崩溃
