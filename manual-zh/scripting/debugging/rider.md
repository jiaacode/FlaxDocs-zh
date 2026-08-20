# Rider

![Rider](/manual/media/rider.jpg)

你可以从[此处](https://www.jetbrains.com/rider)下载 Rider。

### 1. 更改源代码编辑器

![Flax 编辑器源代码编辑器 Rider](/manual/media/rider-selected.png)

打开 Flax 编辑器，在主菜单中转到 **工具 -> 选项** 以打开编辑器选项窗口。然后选择 **源代码** 选项卡，并将 **源代码编辑器** 设置为 **Rider**。如果缺少此选项，请确保已安装 Rider。单击“保存”按钮确认以应用更改。

### 2. 将脚本附加到 Actor

要调试脚本代码，必须将其附加到场景中的 Actor 上。
只需将其拖放到选中的 Actor 属性区域即可。

![添加脚本](../media/attach-script.gif)

### 3. 在 Rider 中打开脚本

双击脚本项，等待 IDE 显示出来。

![Rider 中的脚本](/manual/media/rider-startup.png)

### 4. 添加断点

单击代码编辑器的左侧，以在代码行上设置断点。应添加红色圆点，如下图所示。

![添加断点](/manual/media/rider-breakpoint.png)

### 5. 附加到 Flax

现在，使用 **运行 -> 附加到进程** 选项。

![Rider 调试器附加](/manual/media/rider-debug-attach-1.png)

然后，选择 `FlaxEditor` 进程（或已烘焙的 Flax 游戏可执行文件），以使用 .NET Core 调试器进行附加（你也可以使用原生 C++ 调试器附加到原生脚本）。

![Rider 调试器附加](/manual/media/rider-debug-attach-2.png)

### 6. 启动游戏

返回 Flax 编辑器，按下 `Play` 按钮以启动游戏。然后脚本的 *OnUpdate()* 函数将被调用，并命中已设置的断点。

![Rider 中的脚本](/manual/media/debug-vs-4.jpg)

### 7. 调试你的代码

现在你可以使用所有 Rider 调试功能来验证变量的状态并测试你的代码。

![在 Rider 中调试 C# 脚本](/manual/media/rider-debugging-csharp.png)

有关 Rider 中 C# 的更多信息，请参阅 [Rider 文档](https://www.jetbrains.com/help/rider/Languages_CSharp.html)。

## Mono 调试

在过去，Flax 使用 mono 作为 C# 运行时（版本 1.5 及更早版本）。移动和主机平台仍然使用 mono 进行 .NET 托管（包括 Mono AOT 功能）。要调试此类构建，请通过从日志中识别调试器服务器端口来使用 C# Mono 调试器附加：

```
...
[ 00:00:02.667 ]: [Info] Initialize Scripting...
[ 00:00:02.667 ]: [Info] Mono debugger server at 127.0.0.1:41816
...
```

这会通知你 Mono 调试器服务器正在本地机器上运行，并显示给定的端口。它是通过表达式 `41000 + process_id % 1000` 计算得出的。你也可以使用命令行参数（例如 `-debug 127.0.0.1:55555`）以指定的 IP 和端口运行 Flax。

一旦你知道了端口，你就可以创建 **Mono Remote** 类型的配置。使用 *Edit Configuration* 按钮，并选择 `+` 加号按钮，为 Mono Remote 调试创建新配置。

![Rider 编辑配置](/manual/media/rider-edit-configuration.png)

![Rider Mono Remote](/manual/media/rider-add-mono-remote.png)

然后将其命名，例如 `Debug C# Game`，并将 **Port** 设置为编辑器日志中的值。

![Rider Mono Remote](/manual/media/rider-edit-mono-remote.png)

设置好端口后，你可以启动此配置并附加调试器。

![Rider Debug C# Start](/manual/media/rider-start-debug.png)
