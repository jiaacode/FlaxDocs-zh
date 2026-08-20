# Visual Studio Code

![Visual Studio Code](media/vscode.jpg)

你可以从[此处](https://code.visualstudio.com)下载 Visual Studio Code。

### 1. 安装扩展

![Flax VS Code 扩展](media/vscode-extensions.png)

在 VS Code 中为 Flax 游戏编写游戏代码需要一组扩展：
* **C#** - `ms-dotnettools.csharp`
* **C/C++** - `ms-vscode.cpptools`（可选 - 如果你使用 C++ 编码则很有用）

### 2. 更改源代码编辑器

![Flax 编辑器源代码编辑器 VSCode](media/vscode-selected.png)

打开 Flax 编辑器，在主菜单中转到 **工具 -> 选项** 以打开编辑器选项窗口。然后选择 **源代码** 选项卡，并将 **源代码编辑器** 设置为 **Visual Studio Code**。如果缺少此选项，请确保已安装 VSCode。单击“保存”按钮确认以应用更改。

### 3. 将脚本附加到 Actor

要调试脚本代码，必须将其附加到场景中的 Actor 上。
只需将其拖放到选中的 Actor 属性区域即可。

![添加脚本](../media/attach-script.gif)

### 4. 在 Visual Studio Code 中打开脚本

双击脚本项，等待 IDE 显示出来。

![Visual Studio 中的脚本](media/vscode-startup.png)

### 5. 添加断点

单击代码编辑器的左侧，以在代码行上设置断点。应添加红色圆点，如下图所示。

![添加断点](media/vscode-breakpoint.png)

### 6. 附加到 Flax

现在，使用 .NET Core 调试器附加到 Flax Editor（或已烘焙的 Flax 游戏）。你也可以选择其他配置（例如 `MyProject|Editor.Windows.Development|x64 (C#)`）以从一开始就使用 C# 调试器运行编辑器。

![VS Code 附加到 Flax 引擎](media/vscode-attach.png)

### 7. 启动游戏

返回 Flax 编辑器，按下 `Play` 按钮以启动游戏。然后脚本的 *OnUpdate()* 函数将被调用，并命中已设置的断点。

![Visual Studio Code 中的脚本](media/debug-vs-4.jpg)

### 8. 调试你的代码

现在你可以使用所有 Visual Studio Code 调试功能来验证变量的状态并测试你的代码。

![Visual Studio 中的脚本](media/vscode-debugging.png)

有关 Visual Studio Code 中 C# 的更多信息，请参阅 [VS Code 文档](https://code.visualstudio.com/docs/languages/csharp)。

## Mono 调试

在过去，Flax 使用 mono 作为 C# 运行时（版本 1.5 及更早版本），这需要在 VS Code 中安装 `ms-vscode.mono-debug` 扩展。移动和主机平台仍然使用 mono 进行 .NET 托管（包括 Mono AOT 功能）。要调试此类构建，请使用 **Mono Debug** 扩展。

要使用 C# 调试器附加到 Flax，你需要知道 **调试器端口**。可以在日志中查看，并找到类似于以下内容的行：

```
...
[ 00:00:02.667 ]: [Info] Initialize Scripting...
[ 00:00:02.667 ]: [Info] Mono debugger server at 127.0.0.1:41816
...
```

这会通知你 Mono 调试器服务器正在本地机器上运行，并显示给定的端口。它是通过表达式 `41000 + process_id % 1000` 计算得出的。你也可以使用命令行参数（例如 `-debug 127.0.0.1:55555`）以指定的 IP 和端口运行 Flax。

一旦你知道了端口，你可以在包含 VS Code 调试器配置的 `launch.json` 文件中设置它。找到类似于以下内容的代码块，并将端口属性设置为你的 Flax 当前正在使用的端口。

```json
...
{
    "type": "mono",
    "name": "MyProject (C# attach)|Game.Windows.Development|x64",
    "request": "attach",
    "address": "localhost",
    "port": 55555
},
...
```

如果你将端口属性设置为正确的端口，你可以启动此任务并附加调试器。Visual Studio Code 应进入调试模式，IDE 底部将保持橙色。这表示 IDE 已准备好进行调试。
