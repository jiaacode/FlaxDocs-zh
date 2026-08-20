# CLion

![CLion](media/clion.png)

你可以从[此处](https://www.jetbrains.com/clion/)下载 CLion。

CLion 支持通过生成的 CMake 门面项目文件，用于桌面主机平台（Windows、Linux 和 Mac）上的原生 C++ 开发。通过向项目生成脚本传递 `-clion` 参数来生成它们，例如 `GenerateProjectFiles.bat -clion`、`./GenerateProjectFiles.sh -clion` 或 `GenerateProjectFiles.command -clion`。

生成的 CMake 项目被写入 `Cache/Projects/CMake/<ProjectName>`。在 CLion 中作为 CMake 项目打开该目录。Flax 不会生成 `.idea` 文件；CLion 在项目打开后会拥有并更新其自己的本地 IDE 设置。

此 CMake 项目是一个 IDE 门面，而非主要的 Flax 构建系统。CMake 用于描述代码模型并公开构建预设，而实际的原生构建步骤则委托给 `Flax.Build`。运行配置在构建生成的引擎可执行文件后启动它。

CLion 项目生成有意排除了此工作流不支持的平台，包括 Android、iOS、UWP、Web、GDK/Xbox、PlayStation 和 Switch。生成的 CLion 项目未配置 C# 调试；对于托管代码，请使用支持 .NET 调试的 IDE 或编辑器。
