# 模块加载时运行代码

向游戏或引擎注入自定义功能最常见的方式是通过插件，但你也可以在代码程序集被引擎加载时运行自定义代码块：

# [C#](#tab/code-csharp)
```cs
// 在静态类上使用 ModuleInitializer 特性 - 每个静态、无返回类型、无参数的方法将在 C# 模块加载后被调用。

using FlaxEngine;

[ModuleInitializer]
static partial class Initializer
{
    static void Init()
    {
        Debug.Log("Hello!");
    }
}
```
***

# [C++](#tab/code-cpp)

```cpp
// 使用静态变量，其构造函数将在 C++ 模块加载时被调用。

#include "Engine/Core/Log.h"

struct Initializer
{
    Initializer()
    {
        LOG(Info, "Helllo!");
    }
};

Initializer Init;
```
***
