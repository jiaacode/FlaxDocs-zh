# Visual Studio

![Visual Studio 扩展](../../get-started/media/vs.jpg)

你可以从[此处](https://www.visualstudio.com)下载 Visual Studio。我们支持 **Visual Studio 2022**（较旧的版本仍然可以与 Flax 一起使用，但最新的 .NET SDK 7 不支持它们）。

为了支持 C# 脚本调试，Flax 需要安装以下组件：
* C# 和 Visual Basic Roslyn 编译器
* C# 和 Visual Basic
* .NET 8.0 Runtime（Flax 编辑器已需要）
* .NET SDK（Flax 编辑器已需要）

![用于 C# 的 Visual Studio 组件](/manual/media/vs-components-cs.png)

对于 C++ 脚本调试，需要平台相关的工具集：
* Windows 10 SDK（或任何其他较新的 SDK）
* MSVC C++ 2015 v140 工具集（或任何其他较新的工具集）

![用于 C++ 的 Visual Studio 组件](/manual/media/vs-components-cpp.png)

### 1. 将脚本附加到 Actor

要调试脚本代码，必须将其附加到场景中的 Actor 上。
只需将其拖放到选中的 Actor 属性区域即可。

![添加脚本](../media/attach-script.gif)

### 2. 在 Visual Studio 中打开脚本

双击脚本项，等待 IDE 显示出来。

![Visual Studio 中的脚本](/manual/media/vs-script-open.jpg)

确保选择正确的解决方案配置，例如 **Editor.Development**，并选择平台 **Win64**。

![Visual Studio 配置](/manual/media/vs-configuration-picker.jpg)

### 3. 添加断点

单击代码编辑器的左侧，以在代码行上设置断点。应添加红色圆点，如下图所示。

![添加断点](/manual/media/debug-vs-2.jpg)

### 4. 附加到 Flax

在 Visual Studio 的 **调试** 菜单下，按下 **附加到进程**。

![Visual Studio 中的调试](/manual/media/vs-attach-to-process-1.png)

它将打开一个附加窗口，你可以在其中选择要调试的进程（例如 Flax Editor、已烘焙的游戏或在 DevKit 上运行的游戏）。选择目标进程后，单击 **附加**。你可以通过使用 *筛选进程* 文本字段按名称搜索进程，或使用 *选择窗口* 工具。在大多数情况下，你想要选择正在运行你要调试的项目的 `FlaxEditor.exe` 进程。

![Visual Studio 中的调试](/manual/media/vs-attach-to-process-2.png)

Visual Studio 应进入调试模式，IDE 底部将保持橙色。这表示 Visual Studio 已准备好进行调试。

![Visual Studio 中的调试](/manual/media/debug-vs-6.jpg)

### 5. 启动游戏

返回 Flax 编辑器，按下 `Play` 按钮以启动游戏。然后脚本的 *OnUpdate()* 函数将被调用，并命中已设置的断点。

![Visual Studio 中的脚本](/manual/media/debug-vs-4.jpg)

### 6. 调试你的代码

现在你可以使用所有 Visual Studio 调试功能来验证变量的状态并测试你的代码。

![Visual Studio 中的脚本](/manual/media/debug-vs-5.jpg)

有关 Visual Studio 中调试的更多信息，请参阅 [VS 文档](https://docs.microsoft.com/en-us/visualstudio/debugger/index)。
