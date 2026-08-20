# C++ 脚本

Flax 引擎完全支持 C++ 脚本，其功能甚至比 C# 脚本更多。一般来说，C++ 提供更高的**性能**，并允许**直接访问引擎 API**，这带来了许多好处。Flax 引擎主要用 C++ 编写，并带有 C# 风格，这意味着你可以轻松地在引擎之上构建游戏。此外，Flax 使用自己的构建工具 [Flax.Build](../../editor/flax-build/index.md) 来编译引擎和游戏。

请参阅本文档部分，学习如何编写自己的 C++ 脚本并在游戏中使用它们。此外，如果你在 *Flax 文档* 中看到任何用 C# 编写的代码示例，你也可以在 C++ 脚本中类似地使用它们，因为引擎在两种语言中使用相同的 API（你甚至可以将现有的游戏代码从 C# 快速迁移到 C++）。

请访问 **[C++ API 参考](../../../api-cpp/index.md)** 以了解脚本类型。

## 本节内容

* [常用类型](common-types.md)
* [集合](collections.md)
* [字符串格式化](string-formatting.md)
* [日志和断言](logging-assertions.md)
* [对象引用](object-references.md)
* [序列化](serialization.md)
* [接口](interfaces.md)
* [提示与技巧](tips-tricks.md)

## 设置

Flax 编辑器包含一个用于脚本的内置 C# 编译器，但对于 C++ 脚本，需要在机器上安装平台相关的工具集。每个平台都使用自己的原生工具。要了解它们，请参阅[此页面](../../platforms/index.md)。下面你可以快速了解如何根据你的平台进行设置。

### Windows

* 安装 **Visual Studio 2022**（[下载](https://visualstudio.microsoft.com/en/vs/community/)）
* 安装 **Windows 10 SDK**（或 Windows 8.1 SDK）
* 安装 **Microsoft Visual C++**（v140 工具集或更新版本）

### Linux

* 安装 [Visual Studio Code](https://code.visualstudio.com/)
* 获取编译器 `sudo apt-get install clang lldb lld`（Clang 14 或更新版本）
* 安装所需的依赖项 `libxcursor-dev libxinerama-dev libx11-dev`

### Mac

* 安装 XCode 或 XCode 命令行工具（以及可选的 [Visual Studio Code](https://code.visualstudio.com/)）
* 最低 XCode 版本为 `16.4`。

## 如何创建 C++ 脚本？

默认情况下，新的 Flax 项目使用 C# 脚本的游戏模块。你可以在[此处](../../editor/flax-build/index.md)了解有关模块和目标的更多信息。安装所需工具后，打开 `Source/<module_name>/<module_name>.Build.cs`（即 `Source/Game/Game.Build.cs`）。此文件是代码模块的构建脚本，可以指定其构建环境和依赖项。它包含一个重写的 **Setup(BuildOptions options)** 方法，用于执行模块初始化。

找到 `BuildNativeCode = false` 行，将值更改为 `true`，或在方法末尾添加以下代码：

```cs
BuildNativeCode = true;
```

***

现在，你可以**向项目添加新的 C++ 脚本**，它们将被编译为二进制库并由引擎加载。为此，在 *内容窗口* 中导航到该模块的源文件夹 `Source/<module_name>`，*右键单击* 并选择 **C++ 脚本** 选项。指定其名称并按 *Enter* 确认。

![新建原生 C++ 脚本](media/new-cpp-script.png)

在“文件”下，你可以选择 **生成脚本项目文件**，或右键单击游戏项目文件并选择类似选项。

![生成脚本项目文件](media/project-files-generation.png)

之后，打开代码项目（例如 Visual Studio Solution）。请确保使用 **Editor.Development** 配置和 **Win64** 平台（如果你在 Windows 上工作）。

![Visual Studio 脚本项目](media/cpp-scripts-visual-studio.png)

如你所见，编辑器从模板生成了一个简单的脚本，它重写了 `OnEnable`、`OnDisable` 和 `OnUpdate` 方法，类似于 C# 脚本。打开创建的 `.cpp` 文件，并在顶部添加以下代码以包含调试日志记录：

```cpp
#include "Engine/Core/Log.h"
```

***

然后在 `OnUpdate` 方法中添加一个简单的日志指令：

```cpp
void CppScript::OnUpdate()
{
    LOG(Info, "Hello from C++!");
}
```

***

返回编辑器，以便它可以自动编译脚本，或从 Visual Studio 中使用 **Local Windows Debugger** 按钮（即调试器启动）打开它（或按 *F5*）。现在，你可以将脚本添加到 Actor，并查看你自己的 C++ 脚本每帧在 *输出日志* 中打印的消息。

![C++ 脚本运行时](media/cpp-script-run.png)

尽情开始用 C++ 编写你的游戏逻辑吧！

## 使用 Flax 进行 C++ 脚本编写

Flax 支持 **热重载 C++** 代码，这极大地改善了工作流程。它的工作方式与 C# 脚本相同，并且可以在编辑器选项中进行配置。你也可以关闭编辑器，从 Visual Studio 编译脚本，并使用 Visual Studio 调试器打开项目。

在许多情况下，在使用特定的 API 类型（例如 `PointLight` Actor 或 `Model` 资源）之前，你必须**包含适当的头文件**，因为 Flax 使用“只包含你所见的”范式。但是，如果你想轻松包含所有常见的头文件，可以包含 `Engine/Core/Common.h`。此外，你可能已经注意到，Visual Studio 解决方案还包含 **Flax** C++ 项目（在 Flax 文件夹中）。你可以自由浏览 Flax 代码，以了解有关 API 和可用代码工具的更多信息。如果你从 Flax Store 下载了引擎，则它仅包含头文件。Flax 头文件使用 **XML 文档标签**，并且几乎 100% 有文档记录，因此使用它们相当顺畅，因为你可以快速了解给定的方法/字段的作用。这些文档注释稍后由构建工具解析，并暴露给 C# 用于脚本和编辑器工具提示。

现在，为了理解与 Flax 中 C++ 脚本相关的一些基本概念，让我们分析以下脚本，该脚本在鼠标点击时生成贴花，并使用从鼠标位置进行的光线投射将其放置在几何体上：

```cpp
#pragma once

#include "Engine/Scripting/Script.h"
#include "Engine/Content/AssetReference.h"
#include "Engine/Content/Assets/MaterialBase.h"
#include "Engine/Input/Input.h"
#include "Engine/Level/Level.h"
#include "Engine/Level/Actors/Camera.h"
#include "Engine/Level/Actors/Decal.h"
#include "Engine/Serialization/JsonTools.h"
#include "Engine/Physics/Physics.h"

API_CLASS() class GAME_API MouseDecalShoot : public Script
{
API_AUTO_SERIALIZATION();
DECLARE_SCRIPTING_TYPE(MouseDecalShoot);

    // 用于生成的贴花的贴花材质。
    API_FIELD() AssetReference<MaterialBase> DecalMaterial;

    // 在给定的鼠标屏幕位置生成贴花。
    API_FUNCTION() void SpawnDecal(const Float2& mousePos)
    {
        // 将鼠标位置转换为世界空间光线，并在物理场景中执行光线投射
        const auto ray = Camera::GetMainCamera()->ConvertMouseToRay(mousePos);
        RayCastHit hit;
        if (Physics::RayCast(ray.Position, ray.Direction, hit))
        {
            // 在击中点创建贴花并将其添加到场景中
            auto decal = New<Decal>();
            decal->Material = DecalMaterial;
            decal->SetPosition(hit.Point);
            decal->SetDirection(hit.Normal);
            Level::SpawnActor(decal);
        }
    }

    // [Script]
    void OnUpdate() override
    {
        if (Input::GetMouseButtonDown(MouseButton::Left))
        {
            SpawnDecal(Input::GetMousePosition());
        }
    }
};

inline MouseDecalShoot::MouseDecalShoot(const SpawnParams& params)
    : Script(params)
{
    // 启用 OnUpdate 函数的 Tick
    _tickUpdate = true;
}
```

***

### OnUpdate/OnLateUpdate/OnFixedUpdate

作为优化，引擎默认不会为所有脚本调用 Tick 函数。想要接收此功能的脚本类型需要在其构造函数中将相应的标志 `_tickUpdate`、`_tickLateUpdate` 或/和 `_tickFixedUpdate` 设置为 `true`。这会通知引擎该脚本希望在特定阶段更新。

此外，你可以在 `OnEnable` 中（或当脚本处于活动状态时）手动注册自定义 Tick 函数：

```cpp
GetActor()->GetScene()->Ticking.Update.AddTick<MyScript, &MyScript::Tick>(this);
```

***

## C++ 脚本文档

要了解有关 Flax 中 C++ 脚本特定领域的更多信息，请参阅相关章节：

* [常用类型](common-types.md)
* [集合](collections.md)
* [字符串格式化](string-formatting.md)
* [日志和断言](logging-assertions.md)
* [对象引用](object-references.md)
* [序列化](serialization.md)
* [接口](interfaces.md)
* [提示与技巧](tips-tricks.md)
* [API_ 标签](../../editor/flax-build/api-tags.md)

此外，你可以使用 Flax [C++ API 参考](../../../api-cpp/index.md) 来浏览引擎类型。

## 与 C# 的互操作

要从 C++ 调用 C#，你需要使用引擎的托管脚本包装器 `MClass` 和 `MMethod`，如下例所示：

```cs
public void CallMe()
{
   // C# 中的代码
}
```

```cpp
#include "Engine/Scripting/ManagedCLR/MClass.h"
#include "Engine/Scripting/ManagedCLR/MMethod.h"

...

Script* someCSharpScript = ...;
auto method = someCSharpScript->GetClass()->GetMethod("CallMe");
method->Invoke(someCSharpScript->GetOrCreateManagedInstance(), nullptr, nullptr);
```

***

此代码将从给定的对象调用一个名为 *CallMe* 的无参数成员函数。

要从 C# 调用 C++，只需使用 `API_CLASS` 将你的类型暴露给 C#，并同样使用 `API_FUNCTION` 标签暴露给定的方法。构建工具将生成用于从 C# 调用原生方法的胶水代码。

```cpp
API_FUNCTION() void CallMe()
{
   // C++ 中的代码
}
```

```cs
NativeScript someCppScript = ...;
someCppScript.CallMe();
```

***

## 祝你好运，玩的开心

![Cpp Oh Boi](media/cpp-oh-boi.jpg)
