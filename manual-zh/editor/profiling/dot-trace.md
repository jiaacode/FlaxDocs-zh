# dotTrace 性能分析器

**dotTrace** 是 JetBrains 出品的 .NET 性能分析器。可以从[此处](https://www.jetbrains.com/profiler)下载。

使用 dotTrace，你可以检测游戏中的性能瓶颈。它可以获取关于调用执行时间、内存分配和文件系统访问的精确数据。

## 设置

![Flax 的 dotTrace 设置](/manual/media/dot-trace-profiler-step-1.png)

打开 dotTrace，并**添加新进程运行**，类型选择 **.NET Core 应用程序**（如上图所示）。

![Flax 的 dotTrace 设置](/manual/media/dot-trace-profiler-step-2.png)

然后在 **路径** 字段中选择游戏可执行文件（如上图所示）。当启动 Flax 编辑器时，还要在命令行参数中填写你的项目路径（如果需要）。点击 **保存**，然后你可以使用 **启动** 按钮运行 Flax 并附加性能分析工具。

![Flax 的 dotTrace 设置](/manual/media/dot-trace-profiler-step-3.png)

## 性能分析快照

![Flax 的 dotTrace 性能分析器](/manual/media/dot-trace-profiler-flax.png)

dotTrace 性能分析器快照提供了关于 Flax 游戏性能的各种信息。这些可用于深入分析和监控运行时。要了解更多信息，请访问官方文档[此处](https://www.jetbrains.com/profiler/documentation/documentation.html)。
