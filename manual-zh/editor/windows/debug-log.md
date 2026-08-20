# 调试日志

![调试日志](/manual/media/debug-log.png)

**调试日志** 是一个实用工具窗口，显示通过 C# 中的 `Debug.Log`、`Debug.LogWarning`、`Debug.LogError` 或 `Debug.LogException`，或通过 C++ 中的 `DebugLog` 接口调用的游戏日志消息。可用于检测游戏问题或通过简单的打印来调试逻辑。这些日志也会传递到[输出日志](output-log.md)和引擎日志输出（控制台/文件）。

你可以轻松地选择并复制日志条目（使用 `Ctrl+C` 或 *右键单击* 并使用上下文菜单），或根据捕获的堆栈跟踪打开调用日志函数的代码位置（*双击* 或 *右键单击* 并使用上下文菜单）。

调试日志窗口支持从 C++ 和 C# 脚本捕获堆栈跟踪。

![调试日志堆栈跟踪](/manual/media/debug-log-stack-trace.png)
