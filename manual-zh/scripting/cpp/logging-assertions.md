# Flax 中 C++ 的日志记录和断言

## 输出日志

从 C++ 代码记录数据和消息的最佳方式是使用 `LOG` 宏，它将消息直接输出到引擎日志输出文件（位于 `projectFolder/Logs` 文件夹中）和编辑器中的 *输出日志* 窗口。

要访问日志工具，请使用以下包含：

```cpp
#include "Engine/Core/Log.h"
```

***

然后你可以使用以下宏来输出日志：

* `LOG(messageType, format, arguments..)` - 使用参数格式化消息并将其打印到日志（请参阅[格式化文档](string-formatting.md)）
* `LOG_STR(messageType, str)` - 将字符串写入日志

支持的消息类型：
* `Info`
* `Warning`
* `Error`
* `Fatal`

示例：

```cpp
String info = TEXT("Object: ") + this->ToString();
LOG_STR(Info, info);
LOG(Warning, "hello there! {0}", info);
LOG(Error, "player speed: {0}, direction: {1}", 11.0f, Vector3::UnitX);
```

***

这些日志也会被重定向到底层平台输出（通过 `Platform::Log`），因此可以在使用目标平台调试器和/或工具（例如 *Visual Studio* 程序输出，或 Android *adb* 输出）时看到。

## 调试日志

C++ API 包含对 C# 脚本中使用的 `DebugLog` 工具的访问。它在编辑器中的 *调试日志* 窗口中显示消息。它还支持显示日志位置的完整堆栈跟踪，以便于调试（包括使用 *Ctrl+C* 复制消息）。

示例：

```cpp
#include "Engine/Debug/DebugLog.h"

DebugLog::Log(LogType::Info, TEXT("Hello there!"));
DebugLog::LogError(String::Format(TEXT("error number: {0}"), 11));
```

***

## 断言

为了防止无效的代码执行或为运行时值提供验证，你可以在代码中使用断言。断言是一种强硬的验证方式，会导致崩溃。

示例：

```cpp
const int32 counter = 100;
ASSERT(counter != 0); // 如果 counter 被设置为 0，将会触发断言
```

***

## 检查

检查的工作方式与断言类似，但不会使程序崩溃，只会输出错误并从当前作用域方法返回。

示例：

```cpp
const int32 counter = 100;
CHECK(counter != 0); // 如果 counter 被设置为 0，将会打印错误并返回

CHECK_RETURN(counter != 0, false); // 如果 counter == 0，将会打印错误并返回 false
```

***

## 堆栈跟踪

Flax 支持为 C++ 和 C# 代码捕获当前线程执行的堆栈跟踪。此功能可能在所有平台上不受支持，并且在 *Release* 构建中被禁用。

示例：

```cpp
#include "Engine/Debug/DebugLog.h"

String managedStackTrace = DebugLog::GetStackTrace();
LOG_STR(Info, managedStackTrace);

String nativeStackTrace = Platform::GetStackTrace();
LOG_STR(Info, nativeStackTrace);
```

***
