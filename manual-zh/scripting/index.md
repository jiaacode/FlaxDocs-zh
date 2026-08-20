# 游戏脚本

![脚本](media/title.jpg)

每个游戏中最重要的部分都是**脚本**。创建处理游戏事件、响应用户输入和控制对象的代码块是所有游戏的基本要素。简而言之，脚本通过添加游戏玩法使游戏具有交互性。这既适用于小型项目，也适用于大型项目。本文档章节涵盖了脚本管线中最重要的部分，并帮助开始游戏编程。

Flax 支持 **C#**、**C++** 和**可视化**脚本。这三种语言的混合使用与引擎高度集成，因为引擎本身就是用这些语言编写的（引擎是 C++，编辑器是 C#）。

> [!Note]
> 解释 C#、C++ 和向量数学不在本文档的讨论范围之内。

## 代码模块

与 Flax 编程相关的重要概念是**二进制模块**。二进制模块是编译后的源代码库，可以引用其他模块（例如编辑器、图形或插件）。

在大多数情况下，主游戏代码位于 `<project_name>` 或名为 `Game` 的模块中，该模块位于 `Source` 文件夹中（例如 `Source/Game`）。这是你可以添加新脚本的地方，构建工具会编译它们。对于更高级的用途，游戏可以包含多个模块，并将代码拆分以便更好地组织（例如引擎本身就是这样做的——它由多个协同工作的模块组成）。例如，你可以创建一个仅编辑器模块，并仅在编辑器中使用其代码。

要了解有关构建工具和基础设施的更多信息，请参阅 [Flax.Build](../editor/flax-build/index.md) 工具文档。

## C# 脚本

你可以使用 **C#** 编写脚本并将其添加到场景对象中。要了解更多信息，请参阅本节中的页面。与脚本相关的大部分文档都涵盖了使用 C# 来实现各种游戏逻辑。如果你需要学习 C# 的帮助，请参阅[此页面](http://www.letmegooglethat.com/?q=C%23+tutorial)。

Flax 使用 [.NET](https://dotnet.microsoft.com/en-us) 来加载、编译和执行 C# 脚本。
目前完全支持最新的 **C# 12** 版本。Flax 编辑器要求系统上安装 [.NET SDK 8](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)。

如果你想使用自定义 .NET 库，请使用构建脚本引用它们，如[此处](tutorials/use-third-party-library.md)所示。

## C++ 脚本

Flax 支持原生 **C++** 脚本，可以直接访问整个引擎 API。C++ 脚本可以与 C# 脚本并存，并通过自动绑定暴露自己的类型/函数/属性，如[此处](../editor/flax-build/api-tags.md)所述。编写和使用 C++ 代码需要引擎头文件和平台工具集。

要开始使用 C++ 进行原生脚本编写，请参阅相关文档[此处](cpp/index.md)。

## 可视化脚本

Flax 支持**可视化**脚本，并提供功能齐全的编辑器工具来创建、使用和调试可视化脚本。可视化脚本可以继承自 C++ 或 C# 类（例如自定义 Actor 或脚本），以提供更多逻辑和数据。可视化脚本是一种非常轻量级且可扩展的原型制作解决方案，尤其有助于加速快速开发。

可视化脚本可以访问整个引擎 API 和游戏代码。可视化脚本可以与 C# 和 C++ 脚本并存，以暴露自己的函数/属性。此外，可视化脚本不需要任何额外的工具或编译器，因为它可以在编辑器中热重载，无需任何处理，从而提供更强大的开发体验。

要开始使用可视化脚本，请参阅相关文档[此处](visual/index.md)。

## 本节内容

* [创建和使用脚本](new-script.md)
* [脚本属性与字段](properties.md)
* [脚本事件](events.md)
* [访问场景对象](scene-objects.md)
* [创建和销毁对象](objects-lifetime.md)
* [特性](attributes.md)
* [脚本调试](debugging/index.md)
  * [Visual Studio](debugging/visual-studio.md)
  * [Visual Studio Code](debugging/visual-studio-code.md)
  * [Rider](debugging/rider.md)
  * [CLion](debugging/clion.md)
* [脚本序列化](serialization/index.md)
* [空白 Actor](empty-actor.md)
* [引擎 API](engine-api.md)
* [自定义编辑器](custom-editors/index.md)
  * [自定义脚本编辑器](tutorials/custom-editor.md)
  * [特性](custom-editors/attributes.md)
* [预处理器变量](preprocessor.md)
* [C# 脚本](csharp/index.md)
  * [项目文件管理](csharp/project-file-management.md)
  * [NuGet 包](csharp/nuget-packages.md)
  * [脚本限制](csharp/restrictions.md)
* [C++ 脚本](cpp/index.md)
  * [常用类型](cpp/common-types.md)
  * [集合](cpp/collections.md)
  * [字符串格式化](cpp/string-formatting.md)
  * [日志和断言](cpp/logging-assertions.md)
  * [对象引用](cpp/object-references.md)
  * [序列化](cpp/serialization.md)
  * [接口](cpp/interfaces.md)
  * [提示与技巧](cpp/tips-tricks.md)
* [可视化脚本](visual/index.md)
  * [事件](visual/events.md)
  * [数组](visual/arrays.md)
  * [字典](visual/dictionaries.md)
* [插件](plugins/index.md)
  * [插件窗口](plugins/plugins-window.md)
  * [插件项目](plugins/plugin-project.md)
* [高级](advanced/index.md)
  * [脚本模板](advanced/templates.md)
  * [原始数据资源](advanced/raw-data-asset.md)
  * [自定义编辑器选项](advanced/custom-editor-options.md)
  * [曲线](advanced/curve.md)
  * [访问游戏窗口](advanced/access-game-window.md)
  * [多线程](advanced/multithreading.md)
  * [屏幕截图](advanced/screenshots.md)
  * [游戏全局设置](advanced/gameplay-globals.md)
  * [重构和重命名](advanced/refactoring-renaming.md)
  * [证书存储](advanced/cert-store.md)
  * [噪声](advanced/noise.md)
  * [标签](advanced/tags.md)
  * [模块加载时运行代码](advanced/code-on-load.md)
  * [文件引用](advanced/file-reference.md)
  * [调试命令](advanced/debug-commands.md)
* [人工智能](ai/index.md)
  * [行为树](ai/behavior-trees/index.md)
    * [行为知识](ai/behavior-trees/knowledge.md)
    * [行为](ai/behavior-trees/behavior.md)
    * [行为树节点](ai/behavior-trees/nodes.md)
    * [行为树装饰器](ai/behavior-trees/decorators.md)
    * [如何创建自定义行为树节点](ai/behavior-trees/custom-node.md)
    * [如何创建自定义行为树装饰器](ai/behavior-trees/custom-decorator.md)
    * [如何创建自定义 Move To 节点](ai/behavior-trees/custom-move-to.md)
* [教程](tutorials/index.md)
  * [如何创建自定义编辑器](tutorials/custom-editor.md)
  * [如何创建自定义编辑器窗口](tutorials/custom-window.md)
  * [如何创建自定义编辑器插件](tutorials/custom-plugin.md)
  * [如何创建自定义资源类型](tutorials/custom-asset.md)
  * [如何创建自定义 Actor](tutorials/custom-actor.md)
  * [如何从脚本切换场景](tutorials/change-scene.md)
  * [如何使用自定义设置](tutorials/custom-settings.md)
  * [如何从代码导入资源](tutorials/import-asset-from-code.md)
  * [如何从代码控制后期特效](tutorials/control-postfx-from-code.md)
  * [如何使用第三方库](tutorials/use-third-party-library.md)
  * [如何添加脚本模块](tutorials/add-scripts-module.md)
  * [如何创建加载画面](tutorials/loading-screen.md)
