# 调试工具

* [性能分析器](../../editor/profiling/index.md)
* [调试视图](debug-view.md)
* [视图标志](view-flags.md)

## 测试值

在开发着色器、新渲染技术、VFX 或材质时，经常需要对着色器或渲染管线中的不同代码路径进行 A/B 测试。为此，引擎包含 `Graphics.TestValue` 命令值作为调试工具，用于在开发期间控制视觉或渲染功能。例如，可用于在着色器中分支不同的代码路径进行 A/B 测试（性能或质量）。其值可以通过控制台或代码更改（即使在非 Release 构建中也可用）。

## 性能分析器

![GPU 性能分析器](../../editor/profiling/media/gpu-dump-command.png)

图形性能分析可以通过外部工具进行，也可以直接在引擎内通过[性能分析器](../../editor/profiling/profiler.md)或 `ProfilerGPU.Dump` 命令进行。它会对下一帧（或多帧）的渲染性能进行分析，并将结果转储到日志中（以层级结构形式）。当使用超过 1 帧时，结果会被平均以获得更准确的性能分析（尤其适用于 A/B 测试）。
