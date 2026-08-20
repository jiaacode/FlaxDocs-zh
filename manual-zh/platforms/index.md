# 平台

![标题](/manual/media/title.jpg)

Flax 是一个**跨平台游戏引擎**。这意味着你可以一次性创建游戏并同时部署到多个平台。引擎本身会处理平台差异、图形后端和脚本环境。这有助于游戏开发，并且是游戏引擎的重要组成部分之一。

本节涵盖了每个平台不同方面的具体信息。

## 支持的平台

* [Windows 桌面 7、8、10、11](windows.md)
* [Xbox One](xbox-one.md)
* [Xbox Scarlett](xbox-scarlett.md)
* [PlayStation 4](ps4.md)
* [PlayStation 5](ps5.md)
* [Linux](linux.md)
* [Android](android.md)
* [Switch](switch.md)
* [macOS](mac.md)
* [iOS](ios.md)
* [Web](web.md)

> [!TIP]
> 要检查游戏正在哪个平台上运行，请使用 [Platform.Platform](https://docs.flaxengine.com/api/FlaxEngine.Platform.html#FlaxEngine_Application_Platform)。你也可以在代码中使用[预处理器变量](../scripting/preprocessor.md)。

## 支持的图形后端

* DirectX 11（含 DirectX 10/10.1 回退）
* DirectX 12
* Vulkan
* WebGPU
* Null
* 平台原生（例如 PS4）

> [!TIP]
> 要检查游戏正在使用哪个渲染后端，请使用 [GPUDevice.Instance.RendererType](https://docs.flaxengine.com/api/FlaxEngine.GPUDevice.html#FlaxEngine_GPUDevice_RendererType)。你也可以使用 [GPUDevice.Instance.ShaderProfile](https://docs.flaxengine.com/api/FlaxEngine.GPUDevice.html#FlaxEngine_GPUDevice_ShaderProfile) 来检查渲染后端正在使用的着色器格式。

## 构建游戏日志

默认情况下，Flax 将日志文件存储在项目文件夹的 `Logs` 子目录中（如[此处](../get-started/project-structure.md)所述）。然而，构建后的游戏通常安装在没有写入权限的文件夹中，这意味着 Flax 需要将日志文件存储在 `%LocalAppData%\<CompanyName>\<ProductName>` 中的临时目录中。其中 `<CompanyName>` 和 `<ProductName>` 是在 *游戏设置* 中定义的值。使用这些日志文件来调试你的构建游戏崩溃或错误。

## 崩溃日志

![崩溃数据](/manual/media/crash-files.png)

Debug 和 Development 构建支持崩溃转储收集（取决于目标平台）。默认情况下，崩溃转储在 Logs 文件夹中名为 `Crash_<log_name>` 的目录中创建，它包含原始日志文件的副本和内存转储。
例如，在 Windows 上，你可以使用 Visual Studio 打开 minidump 文件，指定引擎/游戏二进制文件（带有 .pdb 文件），并调试原生崩溃。
