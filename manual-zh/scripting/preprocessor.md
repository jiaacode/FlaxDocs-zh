# 预处理器变量

如果你正在为多个平台进行开发，通常需要为每个平台编写自定义代码。在大多数情况下，最好的方法是使用 [Platform.Platform](https://docs.flaxengine.com/api/FlaxEngine.Platform.html#FlaxEngine_Application_Platform) 和 [GPUDevice.RendererType](https://docs.flaxengine.com/api/FlaxEngine.GPUDevice.html#FlaxEngine_GPUDevice_RendererType)。或者，当你需要添加仅编辑器代码或针对选定平台进行编译时，预处理器变量会非常有用。

## 示例

```cs
public override void OnStart()
{
#if FLAX_EDITOR
    Debug.Log("Ups! It's Editor!");
#else
}
```

***

## 定义

| 定义                       | 描述                                                         |
| -------------------------- | ------------------------------------------------------------ |
| **FLAX**                   | 始终定义。可用于检测为 Flax 环境编译的代码。                 |
| **FLAX_EDITOR**            | 为编辑器编译（编辑器内运行）。                               |
| **PLATFORM_WINDOWS**       | 为 Windows 编译。                                            |
| **PLATFORM_XBOX_ONE**      | 为 Xbox One 编译。                                           |
| **PLATFORM_XBOX_SCARLETT** | 为 Xbox Scarlett 编译。                                      |
| **PLATFORM_PS4**           | 为 PlayStation 4 编译。                                      |
| **PLATFORM_PS5**           | 为 PlayStation 5 编译。                                      |
| **PLATFORM_LINUX**         | 为 Linux 编译。                                              |
| **PLATFORM_ANDROID**       | 为 Android 编译。                                            |
| **PLATFORM_SWITCH**        | 为 Switch 编译。                                             |
| **PLATFORM_MAC**           | 为 macOS 编译。                                              |
| **PLATFORM_IOS**           | 为 iOS 编译。                                                |
| **PLATFORM_WEB**           | 为 Web 编译。                                                |
| **FLAX_X**                 | 用于在编译期间检测 Flax 版本。X=Flax 的主版本号。例如 `FLAX_1`。 |
| **FLAX_X_Y**               | 用于在编译期间检测 Flax 版本。X=Flax 的主版本号，Y=Flax 的次版本号。例如 `FLAX_1_2`。 |
| **FLAX_X_Y_OR_NEWER**      | 用于在编译期间检测 Flax 版本。X=Flax 的主版本号，Y=Flax 的次版本号。例如 `FLAX_1_6_OR_NEWER`。可用于区分新旧版本之间的 API 使用。 |
| **BUILD_DEBUG**            | 在 `Debug` 模式下编译。完全代码调试支持，无代码优化。性能最差，但调试体验最佳。所有代码检查断言均已启用。构建目标是为程序员测试代码中的错误。 |
| **BUILD_DEVELOPMENT**      | 在 `Development` 模式下编译。性能优于 Debug，因为代码进行了优化，但调试仍然可用，并且包含大多数断言和检查。构建目标是为开发团队提供代码验证/确认与性能之间的良好平衡。 |
| **BUILD_RELEASE**          | 在 `Release` 模式下编译。性能最佳，因为代码获得了所有优化。构建目标为发布。 |
| **FLAX_BUILD_BINDINGS**    | 由脚本 API 解析器添加的 C++ 头文件中使用的定义，可在需要时用于区分解析器的代码。 |
| **USE_AOT**                | 在启用 [AOT 模式](csharp/restrictions.md) 编译 C# 时定义。   |

要指定自定义编译宏，请参阅 [Game Cooker](../editor/flax-build/index.md) 文档。
