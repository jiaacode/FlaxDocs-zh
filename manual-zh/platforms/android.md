# Android

![Android](media/android.jpg)

## 技术信息

Flax 使用 **Android NDK** 为 Linux 平台编译，并使用 **Android SDK** 构建。支持系统版本为 Android 7 或更高版本（平台 API 级别 24）。Flax 在 Android 上使用 **Vulkan** 进行图形渲染（最低 Vulkan 1.0）。

## Android 设置

请按照以下步骤为 Android 平台构建游戏设置你的开发 PC。如果遇到问题，请遵循 Android 平台的官方文档。

* 下载并安装 **Android Studio** ([https://developer.android.com/studio](https://developer.android.com/studio))
  * 在 Android Studio 安装过程中安装 **Android SDK**。
  * 将 `ANDROID_HOME` 环境变量设置为 SDK 位置（Windows 上通常为 `C:\Users\USERNAME\AppData\Local\Android\android-studio\sdk`）
* 安装 **NDK**
  * 通过 Android SDK 管理器：*Android SDK -> SDK Tools -> NDK (side by side)*
  * 或通过 [https://developer.android.com/ndk/downloads/index.html](https://developer.android.com/ndk/downloads/index.html) 手动安装，并将 `ANDROID_NDK` 环境变量设置为安装位置
* 安装 **Java**
  * 使用 Android Studio 内置版本：将 `JAVA_HOME` 环境变量设置为 `<android-studio>\jbr`
  * 或从 [https://jdk.java.net/19](https://jdk.java.net/19) 手动下载，并将环境变量 `JAVA_HOME` 设置为 JDK 根文件夹
* 安装 **.Net Android 工作负载**
  * 通过命令行运行 `dotnet workload install android`
  * 更多信息：[https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-workload-install](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-workload-install)
* （当从启动器使用 Flax 时）通过 Flax 启动器为编辑器安装安装 Android 平台工具

### 故障排除

* 确保[接受软件许可](https://stackoverflow.com/questions/39760172/you-have-not-accepted-the-license-agreements-of-the-following-sdk-components)来自 Android SDK
* 验证环境变量是否正确设置：
  * 在 Windows 上：`echo %ANDROID_HOME%`、`echo %JAVA_HOME%`
  * 在 Linux/Mac 上：`echo $ANDROID_HOME`、`echo $JAVA_HOME`
* 如果你收到错误 `Missing NET SDK runtime for Android ARM64.`，请为 dotnet 安装 Android 工作负载（如上所述）。它包含在 Android 上运行 C# 所需的 .Net 库和运行时。

## 构建选项

请参阅 *Game Cooker* 窗口。

| 属性         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| **输出**     | 构建的游戏输出文件夹（相对于项目）。                         |
| **显示输出** | 如果勾选，构建后将在资源管理器中显示输出文件夹。             |
| **配置模式** | 游戏构建模式。可能的选项：<table><tbody><tr><th>选项</th><th>描述</th></tr><tr><td>**Release**</td><td>准备发布的发布构建。</td></tr><tr><td>**Debug**</td><td>用于测试和性能分析的调试构建。为获得最佳调试体验，大多数代码优化已被禁用。</td></tr><tr><td>**Development**</td><td>用于测试和性能分析的开发构建，但比 Debug 构建更针对运行时优化。</td></tr></tbody></table> |

## 平台设置

请参阅 *Android 平台设置* 资源。

| 属性              | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| **包名称**        | 应用程序包名称（例如 `com.company.product`）。自定义令牌：`${PROJECT_NAME}`、`${COMPANY_NAME}`。 |
| **版本代码**      | 应用程序版本代码（例如 1、12、123）。                        |
| **最低 API 级别** | 最低 Android API 级别（例如 20、28、34）。                   |
| **目标 API 级别** | 目标 Android API 级别（例如 20、28、34）。                   |
| **权限**          | 应用程序权限列表（例如 `android.media.action.IMAGE_CAPTURE`）。添加到生成的清单文件中。 |
| **默认方向**      | 默认屏幕方向。                                               |
| **纹理质量**      | 输出纹理质量（压缩）。                                       |
| **覆盖图标**      | 用于应用程序的自定义图标纹理（覆盖默认图标）。               |

## C++ 调试

* 通过 Visual Studio 安装程序安装 `C++ Android development tools`
* 为 android 构建游戏到 `.apk` 并安装在设备上
* 重新生成脚本项目文件
* 将启动项目设置为名为 `Android` 的项目
* 编辑该项目属性：`Debugging -> Package To Launch` 在 `Package to Launch` 中设置你的 APK 路径，并将 `Additional Symbol Search Paths` 设置为游戏烘焙器输出位置文件夹，其中包含目标架构 ARM64 的 `libFlaxGame.so` 文件（`<output>/app/jniLibs/arm64-v8a`）
* 在设备上使用调试器运行 Android 项目

或者，你可以手动安装 APK 并附加到它：
* 使用 `Debug -> Attach to Android Process`
* 一旦调试器附加，你可以插入断点并调试游戏代码

要解决 Visual Studio 中 `gdb` 调试器的一些问题，请执行以下操作：
* 在 Windows 上添加环境变量 `HOME=C:/Users/yourusername`，其中 `yourusername` 是你的 Windows 用户名
* 重启 Visual Studio（如果已打开）
* 在该 `HOME` 目录中创建 `.gdbinit` 文件，内容如下：

```
handle SIGXCPU SIG33 SIG35 SIG36 SIGPWR nostop noprint
```

## Android adb 日志收集

Debug 和 Development 构建使用低级 Android 日志记录器，将引擎和游戏日志直接输出到 `adb`。
使用 `.\adb.exe -d logcat Flax:I *:S` 监听设备上的游戏日志。

## Vulkan 调试

* 构建 Debug 构建
* 将 `libVkLayer_khronos_validation.so`（可选地包含其他验证库）从 `NDK/sources/third_party/vulkan/src/build-android/jniLibs/arm64-v8a` 或从[官方网站](https://developer.android.com/ndk/guides/graphics/validation-layer)复制到输出 Gradle 项目库文件夹（`<output>/app/jniLibs/arm64-v8a`）
* 使用 Vulkan 验证层日志监控 adb 输出日志
* 请注意，由于对 GPU 命令的额外验证，游戏性能将降低（尤其是 CPU）

## 附加说明

- Flax 将 Android 设备的游戏手柄暴露在索引 0 处，可用于使设备振动或在游戏过程中读取用户按下的返回键
- 要启用设备振动，请在 Android 平台设置资源中将 `android.permission.VIBRATE` 添加到权限列表
- 要启用设备网络状态读取，请在 Android 平台设置资源中将 `android.permission.ACCESS_NETWORK_STATE` 添加到权限列表
