# iOS

![iOS](media/ios.jpg)

## 技术信息

Flax 支持 **iOS 14 或更高版本**。图形渲染方面，通过 MoltenVK 使用 Vulkan 在 Metal 上运行。

iOS 不允许动态代码执行，因此 Flax 使用 [AOT](../scripting/csharp/restrictions.md) 将 C# 代码预编译为原生代码。

## iOS 设置

请按照以下步骤为 iOS 平台构建游戏设置你的开发 PC。如果遇到问题，请遵循 iOS 平台的官方文档。

* 设置 [Apple Developer](https://developer.apple.com/) 帐户（包括游戏的证书和描述文件）
* 安装 **XCode**（最低版本 `16.4`）
* 安装 **.Net iOS 工作负载**
  * 通过命令行运行 `dotnet workload install ios`
  * 更多信息：[https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-workload-install](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-workload-install)
* 在 Mac 上构建并运行 Flax 编辑器（[https://github.com/FlaxEngine/FlaxEngine](https://github.com/FlaxEngine/FlaxEngine#mac)）

### 故障排除

* 如果你收到错误 `Missing NET SDK runtime for iOS ARM64.`，请为 dotnet 安装 iOS 工作负载（如上所述）。它包含在 iOS 上运行 C# 所需的 .Net 库、工具和运行时。
* 要访问游戏日志，你可以从 XCode 项目中轻松运行应用程序，并检查进程输出（来自 `NSLog`）。
* iOS 不允许动态代码执行，因此 Flax 使用 AOT 将 C# 代码预编译为原生代码。

## XCode 项目

![Flax 的 XCode 项目](media/xcode-project.png)

在为 iOS 构建游戏时，Flax 将编译游戏代码并将内容文件烘焙到 XCode 项目中，该项目可用于在 iOS 设备上进行部署和测试。如果 [构建设置](../editor/game-settings/build-settings.md) 中的 *Skip Packaging* 选项被禁用，则编辑器还将存档并导出游戏到一个 `.ipa` 包中，该包可以上传到 App Store 进行分发。

![XCode 输出构建文件](media/xcode-files.png)

要了解如何为应用程序构建、测试和分发设置 Apple Developer，请参阅[官方文档](https://developer.apple.com/documentation/)。

## 构建选项

| 属性         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| **输出**     | 构建的游戏输出文件夹（相对于项目）。                         |
| **显示输出** | 如果勾选，构建后将在资源管理器中显示输出文件夹。             |
| **配置模式** | 游戏构建模式。可能的选项：<table><tbody><tr><th>选项</th><th>描述</th></tr><tr><td>**Release**</td><td>准备发布的发布构建。</td></tr><tr><td>**Debug**</td><td>用于测试和性能分析的调试构建。为获得最佳调试体验，大多数代码优化已被禁用。</td></tr><tr><td>**Development**</td><td>用于测试和性能分析的开发构建，但比 Debug 构建更针对运行时优化。</td></tr></tbody></table> |

## 平台设置

| 属性                         | 描述                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| **应用标识符**               | 应用程序标识符（反向 DNS，例如 com.company.product）。自定义令牌：`${PROJECT_NAME}`、`${COMPANY_NAME}`。 |
| **应用团队 ID**              | 应用程序开发者名称 - App Store 团队 ID。例如：`VG6K6HT8B`。  |
| **应用版本**                 | 应用程序版本号（与 XCode 中的 `CURRENT_PROJECT_VERSION` 匹配）。 |
| **导出方式**                 | 应用程序导出模式（如果未通过构建设置禁用自动打包，否则通过 XCode 项目手动导出应用程序）。 |
| **纹理质量**                 | 输出纹理质量（压缩）。                                       |
| **支持的界面方向（iPhone）** | iPhone 设备上支持的 UI 界面方向模式。                        |
| **支持的界面方向（iPad）**   | iPad 设备上支持的 UI 界面方向模式。                          |
| **覆盖图标**                 | 用于应用程序的自定义图标纹理（覆盖默认图标）。               |
