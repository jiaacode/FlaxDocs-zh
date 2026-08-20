# Tracy 性能分析器

**Tracy** 是一个 C++ 帧分析器，可以从[此处](https://github.com/wolfpld/tracy/releases)下载。

Tracy 支持分析 CPU、线程、内存、锁、上下文切换等。它已集成到 Flax 中，可用于在编辑器或已烘焙构建（Debug 或 Development 配置）中分析游戏和引擎。

> [!TIP]
> 不支持在脚本热重载后使用 Tracy 分析编辑器。在自定义引擎构建中，可以通过将 `PROFILE_CPU_USE_TRANSIENT_DATA` 设置为 `1` 来可选地启用此功能（参见 `ProfilerCPU.h`）。

## 设置

![Tracy 性能分析器 Flax 引擎](media/tracy-connected.png)

从 [Github 发布页面](https://github.com/wolfpld/tracy/releases)下载最新的 Tracy，解压 `Tracy-<version>.7z` 文件并运行 **Tracy.exe**。它将显示活动的 Flax 进程。*双击* 以连接并开始收集性能分析数据。

![Tracy 连接](media/tracy-connect.png)

> [!Tip]
> 使用 *Tracy.pdf* 手册了解更多关于性能分析和性能测量的信息。

## 性能分析器集成

使用 Flax API 注入性能分析块：

# [C#](#tab/code-csharp)
```cs
Profiler.BeginEvent("MyFunc");
// 执行一些操作
Profiler.EndEvent();
```
***

# [C++](#tab/code-cpp)

```cpp
#include "Engine/Profiler/ProfilerCPU.h"

PROFILE_CPU();
// 执行一些操作
```
***

## 自动化数据收集

![Tracy 连接](media/tracy-full-profile.png)

Tracy 支持自动检测被分析的代码，而无需注入性能分析器部分/宏。为此，请以管理员权限（提权）运行 Flax。在此模式下，Tracy 还将捕获其他进程的 CPU 核心使用情况，并允许进行更复杂的应用程序性能分析。

## 内存分析

![Tracy 性能分析器 Flax 引擎](media/tracy-memory-profiling.png)

Flax 自动捕获内存分配和释放的调用栈。这可以在 Tracy 性能分析器应用程序中用于分析内存使用情况。

## GPU 分析

![Tracy GPU 性能分析器 Flax 引擎](media/tracy-gpu.png)

GPU 性能时间线中支持 D3D11、D3D12 和 Vulkan 图形 API。集成会自动插入计时器查询来计算各种事件的持续时间。此外，Tracy 还提供了显示与给定 GPU 工作事件相对应的 CPU 部分的功能。这可用于分析连接设备上的渲染性能。
