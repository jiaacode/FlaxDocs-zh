# 操作指南：使用第三方库

Flax 支持在游戏脚本中使用外部库、第三方代码和 SDK。根据所需功能的不同，有几种方式可以实现：
* 您可以直接引用预构建的库
* 您可以通过 [Flax.Build](../../editor/flax-build/index.md) 脚本集成外部代码构建
* 您可以在构建脚本中实现带有库的代码模块（例如 `ThirdPartyModule`、`DepsModule` 或 `HeaderOnlyModule`）

在本文档章节中，您将学习如何在 C++ 或 C# 脚本中使用第三方库。

## 使用 C# 库

要在游戏脚本中添加对预构建 .Net DLL 文件的引用，只需修改构建脚本文件（例如 `Source/GameModule/GameModule.Build.cs`），在重写的 `Setup` 方法中添加文件引用：

```cs
// 引用放置在 Content 文件夹中的 C# DLL
options.ScriptingAPI.FileReferences.Add(Path.Combine(FolderPath, "..", "..", "Content", "JetBrains.Annotations.dll"));
```

***

此外，如果该 DLL 将被编辑器模块使用，则还需要将该 DLL 添加为外部依赖：

```cs
options.ExternalModules.Add(new BuildOptions.ExternalModule(BuildOptions.ExternalModule.Types.CSharp, path));
```

***

然后重新生成脚本项目解决方案，以便在游戏代码中使用从导入的 C# 模块中的类型。
这适用于为编辑器和已构建游戏构建的脚本，因为引用的程序集将被打包。如果提供了相应的 `.pdb` 和 `.xml` 文件，构建系统也会将其复制。

请记住，引擎使用的是 .NET 8。

## 使用 C++ 库

要在游戏脚本中添加对预构建原生库的引用，您需要修改游戏代码模块的构建环境。这需要将库头文件位置添加到包含搜索路径中，并修改链接环境以引用给定的库。此外，如果您使用动态库，则需要将其标记为依赖文件，以便在构建过程中部署。为此，只需编辑构建脚本文件（例如 `Source/GameModule/GameModule.Build.cs`）中的重写 `Setup` 方法：

```cs
var bcryptPath = Path.Combine(FolderPath, "..", "bcrypt");
options.CompileEnv.IncludePaths.Add(Path.Combine(bcryptPath, "include"));
options.LinkEnv.InputLibraries.Add(Path.Combine(bcryptPath, "lib", "bcrypt.lib"));
options.DependencyFiles.Add(Path.Combine(bcryptPath, "bin", "bcrypt.dll"));
```

***

您还可以部署调试符号文件，和/或通过预处理定义通知模块 C++ 代码可以使用该库：

```cs
options.OptionalDependencyFiles.Add(Path.Combine(bcryptPath, "bin", "bcrypt.pdb"));
options.CompileEnv.PreprocessorDefinitions.Add("USE_BCRYPT");
```

***

在开发跨平台游戏时，您可以在构建脚本中使用 `options.Platform.Target` 和 `options.Toolchain.Architecture` 来切换平台和架构（您可能希望针对不同平台链接不同的文件）。

## 示例：带有原生 DLL 的 Steamworks C# API

为了更好地理解引用外部库的过程，让我们看看如何使用带有 C# 绑定的原生库中的外部 Steamworks API。在本示例中，我们将使用 [Steamworks.NET](https://github.com/rlabrecque/Steamworks.NET) 项目。您可以下载预构建的发布版本，并从压缩包中获取文件（来自 `Windows-x64` 文件夹的文件）。

首先，将库文件复制到项目工作区中以便使用。您可以将它们放在 `Content/Steamworks.NET` 文件夹中。

![使用第三方库代码示例](/manual/media/steamworks-files.png)

下一步是修改游戏代码构建脚本（例如 `Source/GameModule/GameModule.Build.cs`），在重写的 `Setup` 方法中引用该库：

```cs
var steamworksPath = Path.Combine(FolderPath, "..", "..", "Content", "Steamworks.NET");
options.ScriptingAPI.FileReferences.Add(Path.Combine(steamworksPath, "Steamworks.NET.dll"));
options.DependencyFiles.Add(Path.Combine(steamworksPath, "steam_api64.dll"));
options.DependencyFiles.Add(Path.Combine(steamworksPath, "steam_appid.txt"));
```

***

然后重新生成脚本项目文件，并在您的 C# 脚本中使用 Steamworks API。它将在编辑器和游戏中正常工作。
以下是一个初始化 API 的示例脚本：

```cs
using System;
using FlaxEngine;
using Steamworks;

public class Steam : Script
{
    public override void OnStart()
    {
        if (!Packsize.Test())
        {
            Debug.LogError("[Steamworks.NET] Packsize Test returned false, the wrong version of Steamworks.NET is being run in this platform.");
            return;
        }

        if (!DllCheck.Test())
        {
            Debug.LogError("[Steamworks.NET] DllCheck Test returned false, One or more of the Steamworks binaries seems to be the wrong version.");
            return;
        }

        try
        {
            if (SteamAPI.RestartAppIfNecessary(AppId_t.Invalid))
            {
                Engine.RequestExit();
                return;
            }
        }
        catch (DllNotFoundException ex)
        {
            Debug.LogException(ex);
            Debug.LogError("[Steamworks.NET] Could not load [lib]steam_api.dll/so/dylib. It's likely not in the correct location.");
            Engine.RequestExit();
            return;
        }

        var initialized = SteamAPI.Init();
        if (!initialized)
        {
            Debug.LogError("[Steamworks.NET] SteamAPI_Init() failed.");
            return;
        }
    }
}
```

***

要了解更多信息，请参阅该库的[网站](https://github.com/rlabrecque/Steamworks.NET)。

## 包含脚本的外部模块

如果您的项目引用了一个包含 Flax Scripts 的自定义代码模块（例如 F# 库或自定义原生库），您可以通过修改构建脚本（在 `Setup` 方法中）将其与游戏模块二进制文件一起包含：

```cs
options.ExternalModules.Add(new BuildOptions.ExternalModule(BuildOptions.ExternalModule.Types.CSharp, System.IO.Path.Combine(FolderPath, "../../External/MyScripts.dll")));
```

***
