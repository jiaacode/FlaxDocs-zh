# Flax.Build

![Flax.Build 构建工具](media/title.jpg)

**Flax.Build** 是一个内置工具，它是一个用 C# 编写的完整构建系统。它支持：

* 编译和链接引擎、游戏和工具项目
* 下载和预构建引擎依赖项
* 更新第三方库
* 生成项目文件
* 部署引擎
* 为本机代码生成 C# 绑定

主要特性：
* 高性能构建系统
* 快速迭代构建和快速缓存
* 与 Flax 深度集成
* 通过插件进行扩展
* 多平台支持

本文档部分涵盖了与 Flax.Build 工具相关的大多数主题。要了解更多信息，请参阅位于 `Source\Tools\Flax.Build` 下的 Flax.Build 源代码，和/或使用 `Binaries\Tools\Flax.Build.exe -help` 来了解更多用法。引擎仓库包含一些有用的脚本，它们是构建工具的包装器，并自动编译其源代码。

## 本节内容

* [API 标签](api-tags.md)
* [构建插件](plugins.md)
* [构建工具指南](guide.md)

## 构建脚本

构建配置的主要来源是位于项目 `Source` 目录中的 **.Build.cs** 文件。脚本用 **C#** 编写，可以包含目标、模块、SDK 或其他用于构建的工具。在生成脚本项目文件时，所有构建脚本都包含在 **Rules** 项目中，该项目定义了构建规则，可以在代码 IDE 中进行查看。

构建脚本使用 C# 12，完全支持 .NET 8。此外，Flax.Build 程序集引用了许多在构建设置期间使用的实用工具，例如：
* 用于命令行解析的 `CommandLine` 特性
* 具有信息/错误日志记录功能的 `Log` 工具（记录到日志文件和控制台输出）
* 用于将代码作为标记传递的 `Tokenizer` 类
* 包含许多有用工具的 `Utilities` 类（例如 `WriteFileIfChanged`、`ReplaceInFiles`、`Run`、`GetFileSize`..）
* SDK 搜索和缓存工具（用于例如 `PS4Sdk`、`GDK`、`VulkanSdk`）
* 可以调用 *MSBuild* 工具的 `VCEnvironment` 工具（适用于 Windows、Linux 和 Mac）

使用构建脚本，你可以自动化与游戏/引擎/插件开发相关的许多过程。

## 目标和模块

构建**目标**是一个脚本，它组合模块以生成最终的可执行文件或复合库。一个[构建**模块**](../../scripting/tutorials/add-scripts-module.md)是一个脚本，可以从源代码编译，并被其他模块和目标使用。目标通常定义全局构建环境（例如全局定义），并将模块包含到二进制构建中。模块是被编译成二进制文件的代码块，稍后链接到目标输出二进制文件（例如游戏可执行文件）中。模块之间可以相互引用，例如，如果游戏脚本想要创建 GPU 纹理资源，则游戏模块需要引用实现 GPU 纹理的 Graphics 模块。

使用模块可以极大地提高代码可读性，允许将庞大的代码库拆分为更独立的块，并有助于组织项目源代码的结构。模块可以在 `Setup` 方法中被引用，这意味着它们可以具有条件引用（例如，Profiler 模块不包含在 Release 构建中）。

模块和目标由 C# 类的名称标识，该名称必须是唯一的。

## 构建二进制文件

Flax.Build 使用游戏项目来为构建选择目标（例如，`.flaxproj` 文件中的 `EditorTarget` 属性用于为编辑器选择目标）。然后，给定目标的 `Modules` 列表用于收集所有用于构建的模块。根据目标的 `LinkType`，所有模块可以合并为单个二进制文件（`Monolithic` 构建），或者每个二进制模块输出一个单独的二进制文件（`Modular` 构建）。

模块使用 `PublicDependencies` 和 `PrivateDependencies` 列表来收集，这些列表定义了给定模块的直接引用。

要修改构建选项，请重写 `void Setup(BuildOptions options)` 方法。它包含许多构建属性，可以在构建脚本中调整或使用：

| **属性**                  | **描述**                                                     |
| ------------------------- | ------------------------------------------------------------ |
| *Target*                  | 构建此模块的目标。                                           |
| *Platform*                | 构建平台。                                                   |
| *Toolchain*               | 构建平台工具链。                                             |
| *Configuration*           | 构建配置。                                                   |
| *CompileEnv*              | 模块编译环境。                                               |
| *LinkEnv*                 | 模块链接环境。                                               |
| *SourcePaths*             | 源文件目录。默认情况下，它包含包含此模块文件的目录。         |
| *SourceFiles*             | 要包含在模块构建中的源文件。                                 |
| *PublicDependencies*      | 此模块所需的模块集合（用于链接）。包含它的模块会继承这些模块。 |
| *PrivateDependencies*     | 此模块所需的模块集合（用于链接）。                           |
| *PublicDefinitions*       | 此模块源文件的预处理符号定义集合。包含它的模块会继承这些定义。 |
| *PrivateDefinitions*      | 此模块源文件的预处理符号定义集合。                           |
| *PublicIncludePaths*      | 此模块源文件的附加包含路径集合。包含它的模块会继承这些路径。 |
| *PrivateIncludePaths*     | 此模块源文件的附加包含路径集合。                             |
| *DependencyFiles*         | 要包含在输出中的依赖文件（附加调试文件、动态库等）。         |
| *OptionalDependencyFiles* | 要包含在输出中的可选依赖文件（附加调试文件、动态库等）。     |
| *Libraries*               | 要链接的库列表（通常是外部和第三方插件）。                   |
| *DelayLoadLibraries*      | 用于延迟加载的库列表（通常是外部和第三方插件）。             |
| *OutputFiles*             | 构建输出文件（二进制文件、目标文件和静态或动态库）。         |
| *IntermediateFolder*      | 中间构建工件文件夹目录。                                     |
| *OutputFolder*            | 输出构建工件文件夹目录。                                     |
| *WorkingDirectory*        | 构建命令工作文件夹目录。                                     |
| *HotReloadPostfix*        | 添加到输出二进制文件中的热重载后缀。                         |
| *ScriptingAPI*            | 脚本 API 构建选项。包含构建 C# 绑定库（.Net Module）时要使用的附加 C# 定义、系统引用和文件引用。 |

Flax.Build 生成 `<target_name>.Build.json` 文件，其中包含构建输出工件的描述和引擎用于加载 C#/C++ 脚本模块的二进制模块元数据。此文件存储在构建输出目录中。

## API 绑定生成

Flax.Build 包含一个自动工具，用于解析 C++ 头文件并为脚本类型生成 C# API。这包括类、结构、枚举、函数等。

对于已分配 `BinaryModuleName` 属性的模块（该属性定义了它们应包含在其中的二进制模块的名称），构建工具会生成并编译 C# API。绑定代码是自动生成的，包含 2 个部分：
* C++ 胶水代码 - 存储在模块构建中间文件夹中的 *<module_name>.Gen.cpp* 中，并与模块源一起编译
* C# 胶水代码 - 存储在模块构建中间文件夹中的 *<module_name>.Gen.cs* 中，并与模块源一起编译

要了解有关在 C# 中使用 C++ API 的更多信息，请参阅相关文档[此处](api-tags.md)（关于 **API_** 标签）。

Flax.Build 还支持脚本类型虚方法的虚表槽覆盖，并生成用于调用在 C# 代码中重写的该方法的包装器。这允许继承 C++ 类型并在 C# 中重写方法，同时在代码中仍然使用相同的对象。

## 项目文件生成

Flax.Build 使用目标和模块来生成脚本项目文件，以便在代码编辑器环境（如 Visual Studio 或 Visual Studio Code）中编辑源代码。对于 Visual Studio，项目文件存储在 `Cache/Projects` 文件夹中。生成的解决方案将引用的项目组织在子文件夹中，并包含 C++ 和 C# 脚本项目。

此外，所有构建脚本都包含在 **BuildScripts** C# 项目中，该项目定义了构建规则，可以在代码 IDE 中查看，以便通过上下文工具提示和代码补全工具轻松编辑它们。

## 平台支持

Flax.Build 是一个**多平台**工具，已在 Windows 和 Linux 上经过实战测试，可为不同的目标平台构建引擎和游戏，包括 Windows、PS4、PS5、Xbox One、Xbox Scarlett、Android、Switch、Linux、macOS、iOS、Web。每个目标平台的实现都存储在 `Source\Tools\Flax.Build\Platforms` 下的单独目录中，并包含 **Platform** 实现和 **Toolchain** 实现。不同的平台可以使用外部 SDK、工具集或自定义编译器为运行时构建代码。

此外，引擎依赖包包含自动构建脚本，以准备用于开发的预构建依赖项。在添加新平台支持时，许多依赖包也必须移植。相关代码可以在 `Source\Tools\Flax.Build\Deps\Dependencies` 文件夹中找到。

## 可扩展性

Flax.Build 工具使用现代 C# 编写，并支持在构建脚本中使用自定义**插件**进行扩展。要了解如何使用它们，请参阅相关文档[此处](plugins.md)。
