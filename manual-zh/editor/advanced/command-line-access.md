# 命令行访问

Flax 引擎和构建的游戏（Flax 可执行文件）都支持各种输入命令行参数。
使用此功能可以帮助游戏开发，并可用于测试各种场景。

在单独的机器上甚至在云端构建游戏是非常常见的技术。例如，[Jenkins](https://jenkins-ci.org/) 服务器可用于调用 Flax Game Cooker 为 QA 团队构建游戏，以便在早上准备好进行测试。

以下是一个示例命令，它将在 Output 文件夹中为 Windows 平台构建游戏项目：

```
FlaxEditor.exe -project "<project-path>" -headless -mute -null -std -build "Development.Windows"
```

要通过 Windows **命令提示符**（`cmd.exe`）运行 Flax 并查看日志，请使用 `start /w ...`，如下所示：

```
start /w FlaxEditor.exe -std -project "<project-path>"
```

要通过 Windows **PowerShell** 运行 Flax 并查看日志，请使用 `Start-Process -Wait ...`，如下所示：

```
Start-Process -Wait FlaxEditor.exe -Args "-std -project `"<project-path>`""
```

它还会将日志（包括 C# API [Debug.Log](https://docs.flaxengine.com/api/FlaxEngine.Debug.html#FlaxEngine_Debug_Log_System_Object_)）发送到标准进程输出，因此在出现问题时可以轻松检测到。更重要的是，编辑器可以在无窗口（无头模式）下启动，并执行一些额外的操作，例如清除烘焙器缓存或项目缓存。
当然，所有这些事情都可以通过使用 Flax Editor C# API 和编辑器插件手动完成（参见[此处](https://docs.flaxengine.com/api/FlaxEditor.GameCooker.html)）。

## 选项

| 命令                 | 描述                                                         |
| -------------------- | ------------------------------------------------------------ |
| **-windowed**        | 以窗口模式启动游戏（即使默认构建的游戏设置为全屏）。         |
| **-fullscreen**      | 以全屏模式启动游戏（即使默认构建的游戏设置为窗口）。         |
| **-vsync**           | 强制在屏幕上呈现帧时启用垂直同步。                           |
| **-novsync**         | 强制在屏幕上呈现帧时禁用垂直同步。                           |
| **-nolog**           | 禁用输出日志文件。                                           |
| **-std**             | 将日志重定向到标准进程输出（std）。                          |
| **-debug `ip:port`** | 设置用于远程调试的 Mono 调试器地址和端口（或仅端口）。默认 Mono 调试器 IP=127.0.0.1，端口=41000+(进程ID%1000)。可以仅使用端口号以使用 *localhost*。 |
| **-debugwait**       | 指示 Mono 调试器等待客户端附加 5 秒。可用于在独立游戏启动时调试初始化代码。 |
| **-headless**        | 无窗口启动，由命令行使用。也可用于桌面平台上的已烘焙游戏。   |
| **-lowdpi**          | 禁用高 DPI 感知支持。                                        |
| **-vulkan**          | 强制使用 Vulkan 渲染后端（如果可用）。                       |
| **-d3d12**           | 强制使用 DirectX 12 渲染后端（如果可用）。                   |
| **-d3d11**           | 强制使用 DirectX 11 渲染后端（如果可用）。                   |
| **-d3d10**           | 强制使用 DirectX 10 渲染后端（如果可用）。                   |
| **-null**            | 强制使用 Null 渲染后端。图形渲染将被禁用，但其他游戏系统将正常工作。强烈建议用于多人游戏的无头服务器构建。 |
| **-nvidia**          | 提示使用 NVIDIA GPU（如果可用）。                            |
| **-amd**             | 提示使用 AMD GPU（如果可用）。                               |
| **-intel**           | 提示使用 Intel GPU（如果可用）。                             |
| **-monolog**         | 启用 Mono 运行时的高级调试。可用于调试托管脚本运行时的问题。会产生大量日志。 |
| **-mute**            | 禁用音频播放并使用 Null 音频后端。                           |

## 仅编辑器选项

| 命令                   | 描述                                                         |
| ---------------------- | ------------------------------------------------------------ |
| **-project <路径>**    | 启动项目路径。必须指定才能启动编辑器。                       |
| **-new**               | 在指定的项目文件夹内生成项目文件，或使用当前工作区文件夹。   |
| **-play**              | 在编辑器启动后启动运行模式。如果提供了资源 ID，可以打开特定关卡（例如 `-play SCENE_ASSET_ID`）。 |
| **-genProjectFiles**   | 生成脚本项目文件并退出。                                     |
| **-skipcompile**       | 在编辑器启动时跳过脚本编译，在从 IDE 启动引擎时非常有用。    |
| **-shaderdebug**       | 为着色器启用调试数据生成，并禁用着色器编译器优化。           |
| **-shaderprofile**     | 为着色器启用调试数据生成，但保留着色器编译器优化以进行性能分析。 |
| **-clearCache**        | 在启动编辑器之前清除项目缓存。                               |
| **-clearCooker**       | 在启动编辑器之前清除项目 Game Cooker 缓存。                  |
| **-build `预设.目标`** | 在编辑器启动后开始游戏构建，并在构建结束后关闭编辑器。你可以指定单个预设名称以构建其所有目标，或同时指定预设名称和目标名称（用点分隔）。如果预设/目标名称包含空格，可以使用大括号。 |
| **-exit**              | 在启动并执行所有排队操作后退出编辑器。在从命令行/CD 调用编辑器时非常有用。 |
