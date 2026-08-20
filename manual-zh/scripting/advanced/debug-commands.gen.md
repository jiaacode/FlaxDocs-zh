| **命令**                                        | **描述**                                                     |
| ----------------------------------------------- | ------------------------------------------------------------ |
| `Audio.ActiveDevice`                            | 获取活动设备。                                               |
| `Audio.ActiveDeviceIndex`                       | 活动设备的索引。                                             |
| `Audio.Devices`                                 | 所有音频设备。                                               |
| `Audio.DopplerFactor`                           | 设置多普勒效应因子。用于缩放源和监听器的速度。默认值为 1。   |
| `Audio.EnableHRTF`                              | 是否优先使用 HRTF 音频（当平台支持时）。默认值为 true。      |
| `Audio.MasterVolume`                            | 应用于所有音频源的主音量（归一化到 0-1 范围）。              |
| `Audio.Volume`                                  | 获取实际主音量（包括所有副作用和静音效果器）。               |
| `Engine.Crash`                                  | 使引擎崩溃。用于测试崩溃报告或游戏稳定性监控系统的工具。     |
| `Engine.Exit`                                   | 退出引擎。                                                   |
| `Globals.BinariesFolder`                        | 游戏可执行文件的位置。                                       |
| `Globals.CompanyName`                           | 公司名称（用于应用数据目录的短名称）。                       |
| `Globals.EngineBuildNumber`                     | 引擎构建版本号。                                             |
| `Globals.EngineContentFolder`                   | 引擎内容目录路径（仅编辑器）。                               |
| `Globals.EngineVersion`                         | 完整的引擎版本。                                             |
| `Globals.MainThreadID`                          | 引擎主线程 ID。                                              |
| `Globals.ProductLocalFolder`                    | 产品本地数据目录。                                           |
| `Globals.ProductName`                           | 产品的短名称（可以是 `Flax Editor` 或游戏名称，例如 `My Space Shooter`）。 |
| `Globals.ProjectCacheFolder`                    | 项目特定的缓存文件夹路径（仅编辑器）。                       |
| `Globals.ProjectContentFolder`                  | 项目内容目录路径。                                           |
| `Globals.ProjectFolder`                         | 包含项目的目录。                                             |
| `Globals.ProjectSourceFolder`                   | 游戏源代码目录路径（仅编辑器）。                             |
| `Globals.StartupFolder`                         | 引擎主目录路径。                                             |
| `Globals.TemporaryFolder`                       | 临时文件夹路径。                                             |
| `GPUDevice.DumpResources`                       | 将所有 GPU 资源信息转储到日志。                              |
| `Graphics.AAQuality`                            | 抗锯齿质量设置。可用值：Low、Medium、High、Ultra（或 0、1、2、3）。 |
| `Graphics.AllowCSMBlending`                     | 为方向光阴影启用级联分割混合。                               |
| `Graphics.GammaColorSpace`                      | 启用 Gamma 色彩空间工作流（代替 Linear）。Gamma 色彩空间使用应用的伽马曲线（sRGB）定义颜色，因此它们在感知上是线性的。当渲染的输出表示将呈现给非 HDR 屏幕的最终颜色值时，这是有意义的。 |
| `Graphics.GICascadesBlending`                   | 为全局光照启用级联分割混合。                                 |
| `Graphics.GIQuality`                            | 全局光照质量。控制 GI 效果的质量。可用值：Low、Medium、High、Ultra（或 0、1、2、3）。 |
| `Graphics.GlobalSDFQuality`                     | 全局 SDF 质量。控制体积纹理分辨率和要使用的级联数量。可用值：Low、Medium、High、Ultra（或 0、1、2、3）。 |
| `Graphics.PostProcessing.ColorGradingVolumeLUT` | 在 2D 和 3D LUT 纹理之间切换，用于颜色分级。                 |
| `Graphics.PostProcessSettings`                  | 默认后期处理设置。可以由关卡中的 PostFxVolume 在本地、按摄像机或整个地图覆盖。 |
| `Graphics.ShadowMapsQuality`                    | 阴影贴图质量（纹理分辨率）。可用值：Low、Medium、High、Ultra（或 0、1、2、3）。 |
| `Graphics.Shadows.MinObjectPixelSize`           | 投射阴影的对象的最小像素大小。通过跳过太小的对象（例如亚像素）渲染到阴影贴图来提高性能。 |
| `Graphics.ShadowsQuality`                       | 阴影质量。可用值：Low、Medium、High、Ultra（或 0、1、2、3）。 |
| `Graphics.ShadowUpdateRate`                     | 所有阴影贴图更新率的全局缩放。可用于在较低质量设置或低端平台上降低阴影渲染频率。默认值为 1。 |
| `Graphics.SpreadWorkload`                       | 调试工具，用于切换由阴影映射、全局光照或表面图集等系统跨多帧分摊图形工作负载。可用于在最坏情况下（例如摄像机剪切）测试性能。 |
| `Graphics.SSAOQuality`                          | 屏幕空间环境光遮蔽质量设置。可用值：Low、Medium、High、Ultra（或 0、1、2、3）。 |
| `Graphics.SSRQuality`                           | 屏幕空间反射质量设置。可用值：Low、Medium、High、Ultra（或 0、1、2、3）。 |
| `Graphics.TestValue`                            | 开发期间用于控制视觉或渲染功能的调试工具。例如，可用于在着色器中分支不同的代码路径进行 A/B 测试（性能或质量）。 |
| `Graphics.UseVSync`                             | 启用与显示设备刷新率的渲染同步，以避免“撕裂”伪影。           |
| `Graphics.VolumetricFogQuality`                 | 体积雾质量设置。可用值：Low、Medium、High、Ultra（或 0、1、2、3）。 |
| `Level.StreamingFrameBudget`                    | 帧预算中用于限制关卡流式传输时间的比例。例如，值为 0.3 表示帧时间的 30% 可用于在单帧内加载关卡（例如，60fps 下 0.3 为 4.8ms 预算）。 |
| `Level.TickEnabled`                             | 如果为 true，游戏对象（Actor 和脚本）可以在引擎 Update/LateUpdate/FixedUpdate 事件期间接收更新。可用于临时禁用游戏逻辑更新。 |
| `NetworkManager.Clients`                        | 所有客户端的列表：正在连接、已连接和已断开。客户端上为空。   |
| `NetworkManager.Frame`                          | 当前网络系统帧编号（每次更新递增）。可用于网络和复制中的帧计数。 |
| `NetworkManager.GetClient`                      | 获取给定连接的网络客户端。如果查找失败则返回 null。          |
| `NetworkManager.GetClient`                      | 获取给定连接的网络客户端。如果查找失败则返回 null。          |
| `NetworkManager.IsClient`                       | 如果网络是客户端则返回 true。                                |
| `NetworkManager.IsConnected`                    | 如果网络已连接且在线则返回 true。                            |
| `NetworkManager.IsHost`                         | 如果网络是主机（同时作为客户端和服务器）则返回 true。        |
| `NetworkManager.IsOffline`                      | 如果网络在线或已断开则返回 true。                            |
| `NetworkManager.IsServer`                       | 如果网络是服务器则返回 true。                                |
| `NetworkManager.LocalClient`                    | 本地客户端，仅在网络管理器以客户端或主机模式运行时有效（服务器没有客户端）。 |
| `NetworkManager.LocalClientId`                  | 本地客户端标识符。即使在没有 LocalClient 的服务器上也有效。  |
| `NetworkManager.Mode`                           | 当前管理器模式。                                             |
| `NetworkManager.NetworkFPS`                     | 每秒网络逻辑更新的目标次数（复制、事件发送和网络更新的频率）。使用 0 表示每次游戏更新都运行。 |
| `NetworkManager.Peer`                           | 当前网络对等端（低级）。                                     |
| `NetworkManager.ServerClientId`                 | 服务器客户端标识符。常量值为 0。                             |
| `NetworkManager.StartClient`                    | 以客户端模式启动网络。如果失败（例如无效配置）则返回 true。  |
| `NetworkManager.StartHost`                      | 以主机模式启动网络。如果失败（例如无效配置）则返回 true。    |
| `NetworkManager.StartServer`                    | 以服务器模式启动网络。如果失败（例如无效配置）则返回 true。  |
| `NetworkManager.State`                          | 当前网络连接状态。                                           |
| `NetworkManager.Stop`                           | 停止网络。                                                   |
| `NetworkReplicator.EnableLog`                   | 启用网络运行时的详细日志记录。可用于调试 RPC 调用缺失或对象复制问题。 |
| `Physics.Gravity`                               | 当前重力。                                                   |
| `ProfilerGPU.Dump`                              | 对下一帧（或多帧）的渲染性能进行分析，并将结果转储到日志中（以层级结构形式）。当使用超过 1 帧时，结果会被平均以获得更准确的性能分析（尤其适用于 A/B 测试）。 |
| `ProfilerGPU.Enabled`                           | 如果启用了 GPU 性能分析则为 true，否则为 false 以禁用事件收集和 GPU 计时器查询。可在渲染期间更改。 |
| `ProfilerGPU.EventsEnabled`                     | 如果启用了 GPU 事件（参见 GPUContext.EventBegin）则为 true，否则为 false。不能在渲染期间更改。 |
| `ProfilerMemory.Dump`                           | 转储内存分配统计信息（分组）。                               |
| `ProfilingTools.Enabled`                        | 控制引擎性能分析器（CPU、GPU 等）的使用。                    |
| `Screen.CursorLock`                             | 光标锁定模式。                                               |
| `Screen.CursorVisible`                          | 光标可见性标志。                                             |
| `Screen.GameViewportToScreen`                   | 将游戏视口位置转换为屏幕空间位置。                           |
| `Screen.GameWindowMode`                         | 游戏窗口模式。                                               |
| `Screen.IsFullscreen`                           | 全屏模式。                                                   |
| `Screen.MainWindow`                             | 获取主窗口。                                                 |
| `Screen.ScreenToGameViewport`                   | 将屏幕空间位置转换为游戏视口位置。                           |
| `Screen.Size`                                   | 窗口大小（在屏幕空间中，包含 DPI 缩放）。                    |
| `Screenshot.Capture`                            | 捕获指定渲染目标的内容并将其保存到文件。请记住，从 GPU 下载数据可能需要一段时间，因此由于延迟，屏幕截图可能在一帧或多帧之后才能完成。暂存纹理将立即保存。 |
| `Streaming.Stats`                               | 获取流式传输统计信息。                                       |
| `Time.DeltaTime`                                | 获取完成上一帧所用的时间（以秒为单位），受 Time.TimeScale 影响。 |
| `Time.DrawFPS`                                  | 每秒渲染帧的目标次数（目标游戏 FPS）。                       |
| `Time.GamePaused`                               | 指示游戏逻辑是否暂停（物理、脚本更新等）的值。               |
| `Time.GameTime`                                 | 获取本帧开始的时间。这是自游戏开始以来的时间（以秒为单位）。 |
| `Time.PhysicsFPS`                               | 每秒物理模拟更新的目标次数（也是固定更新频率）。             |
| `Time.SetFixedDeltaTime`                        | 为游戏逻辑更新（绘制和更新）设置固定的 FPS。                 |
| `Time.StartupTime`                              | 游戏启动的时间（UTC 本地时间）。                             |
| `Time.Synchronize`                              | 同步更新、固定更新和绘制。重置任何挂起的增量，以便同步进行新的更新。 |
| `Time.TimeScale`                                | 游戏时间缩放因子。默认值为 1。                               |
| `Time.TimeSinceStartup`                         | 获取自启动以来的时间（以秒为单位）（未缩放）。               |
| `Time.UnscaledDeltaTime`                        | 获取与时间缩放无关的完成上一帧所用的时间（以秒为单位）。     |
| `Time.UnscaledGameTime`                         | 获取与时间缩放无关的本帧开始的时间。这是自游戏开始以来的时间（以秒为单位）。 |
| `Time.UpdateFPS`                                | 每秒游戏逻辑更新的目标次数（脚本更新频率）。                 |
