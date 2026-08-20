# 脚本限制

Flax 尝试在所有支持的平台上实现所有引擎特性和脚本 API。然而，某些平台有永久性限制。此页面有助于理解并处理可能的跨平台限制。

## 不支持的功能

* `Debugger.Break()`

## 不支持的 API

- System.Collections.Immutable.dll
- System.Design.dll
- System.Drawing.Design.dll
- System.Reflection.Metadata.dll
- System.Web.Extensions.Design.dll

## 编辑器中的静态变量

在编辑器中运行脚本时，静态变量的行为可能与运行已烘焙游戏时不同。静态变量通常在脚本程序集加载并首次使用时初始化，但 Flax 编辑器可能不会在每次运行之间重新加载程序集（除非需要重新编译），因此之前运行的值会被保留。有多种方法可以解决此问题，例如使用[游戏插件](../plugins/index.md)来管理状态，或订阅 `FlaxEditor.Editor.Instance.PlayModeBeginning` 事件，该事件在进入运行模式之前被调用。

## 预先编译

预先编译（**AOT**）是一种在游戏构建过程中预编译所有托管代码的技术，而不是在目标设备上使用即时编译（**JIT**）。这是因为某些平台不允许运行时生成代码。在大多数情况下，这对游戏脚本没有影响，但在少数特定情况下，AOT 平台需要额外考虑。

由于在 AOT 模式下禁用了代码生成（脚本后端会抛出异常），因此不支持以下功能：
* 无动态加载（例如 `Assembly.LoadFile`）。
* 无运行时代码生成（例如 `System.Reflection.Emit`）。
* 泛型虚方法有限制。
* 使用泛型类型时，需要声明泛型特性类型以预编译它们。
* C# 调试器不可用——但调试符号可用于原生调试器（例如完整的堆栈跟踪）。

在启用 AOT 模式编译时，C# 脚本会定义预处理器 `USE_AOT`。它可用于根据目标平台构建重定向不同的 API 使用。

使用 AOT 的平台：
* Xbox One
* Xbox Scarlett
* PlayStation 4
* PlayStation 5
* Switch
* iOS
