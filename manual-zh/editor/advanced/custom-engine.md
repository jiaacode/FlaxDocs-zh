# 自定义引擎构建

本文档部分涵盖了自定义引擎构建的使用。这包括编译、分发和运行自定义编辑器二进制文件。作为前提条件，需要访问引擎源代码。

## 构建工具

Flax 包含一组内置工具集，称为 **Flax.Build**，它是一个用 C# 编写的完整构建系统。它支持：
* 编译和链接引擎、游戏和工具项目
* 下载和预构建引擎依赖项
* 更新第三方库
* 生成项目文件
* 部署引擎
* 为本机代码生成 C# 绑定

有关高级引擎自定义或引擎与游戏工具的深度集成，请参阅位于 `Source\Tools\Flax.Build` 下的 Flax.Build 源代码，和/或使用 `Binaries\Tools\Flax.Build.exe -help` 来了解更多用法。引擎仓库包含一些有用的脚本，它们是构建工具的包装器，并自动编译其源代码。

要了解有关构建工具和构建脚本的更多信息，请参阅相关文档页面[此处](../flax-build/index.md)。

## 编译

要了解如何从源代码构建编辑器，请参阅位于仓库根目录的 **README.md** 文档文件。在 *Windows*/*Linux* 部分，描述了基本步骤以及要求。

你可以使用 *Flax.Build* 为你的团队成员自动化构建带有自定义引擎的编辑器。在这种情况下，分发流程类似于通过 Flax Store 分发的二进制文件，但引擎是手动定位和安装的。要进一步使用它，请遵循引擎注册和引擎昵称部分。

* `PackagePlatforms.bat`/`PackagePlatforms.sh` - 运行构建工具以编译和打包平台数据（可执行文件及平台数据/工具）。你可以使用 Flax.Build 参数来指定构建参数，例如 `-platform=Windows -arch=x64`。
* `PackageEditor.bat`/`PackageEditor.sh` - 运行构建工具以编译和打包编辑器（可执行文件及内容）。你可以使用 Flax.Build 参数来指定构建参数，例如 `-deployOutput=Output -arch=x64`。
* `GenerateProjectFiles.bat`/`GenerateProjectFiles.sh` - 为引擎生成脚本项目文件。你可以使用自定义参数运行它来覆盖某些选项，例如：`-commpiler=v140 -vscode`。

## 引擎注册

**Flax Launcher** 管理系统上已安装引擎版本的小型注册表。当从 Flax Store 安装或移除引擎时，它会被更新。要使用驱动器上任何位置的自定义引擎构建，请使用 **RegisterEngineLocation.bat** 脚本（引擎仓库根目录）。它将注册引擎位置，以便该引擎构建可以通过 Flax Launcher（或 shell 集成）打开项目。

## 引擎昵称

在使用自定义引擎构建时（例如 Flax 的内部分支），一些团队成员可能安装了其他版本的 Flax。为了确保游戏项目始终使用正确的引擎版本打开，你的团队可以使用 **引擎昵称** 功能。这是一个用户友好的引擎安装昵称，用于在打开项目时使用。它可以用于使用为团队成员分发的自定义引擎打开游戏项目。此值在引擎和游戏项目中必须相同才能配对。然后 Flax Launcher 将在打开项目时选择匹配的引擎构建。

要使用它，只需将 `EngineNickname` 属性添加到 `Flax.flaxproj` 和 `<game>.flaxproj` 中，以将项目与引擎关联。

```json
...
	"EngineNickname": "our-cool-flax-engine",
...
```

之后，Flax Launcher 还会显示引擎昵称，以便在 UI 中识别。

