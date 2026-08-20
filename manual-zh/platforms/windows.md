# Windows

## 技术信息

Flax 使用 Microsoft Visual C++ 编译器为 Windows 平台编译。它使用 **v140 工具集**（VC++ 2015）、**Windows 10 SDK**（或 Windows 8.1 SDK），采用多线程 DLL 运行时和 **.Net Framework 4.5.2 SDK** 目标包。

> [!Note]
> Flax 要求系统上安装 **Visual C++ Redistributable for Visual Studio 2015** 才能启动。

## 构建选项

![构建选项](/manual/media/build-windows.jpg)

| 属性         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| **输出**     | 构建的游戏输出文件夹（相对于项目）。                         |
| **显示输出** | 如果勾选，构建后将在资源管理器中显示输出文件夹。             |
| **配置模式** | 游戏构建模式。可能的选项：<table><tbody><tr><th>选项</th><th>描述</th></tr><tr><td>**Release**</td><td>准备发布的发布构建。</td></tr><tr><td>**Debug**</td><td>用于测试和性能分析的调试构建。为获得最佳调试体验，大多数代码优化已被禁用。</td></tr><tr><td>**Development**</td><td>用于测试和性能分析的开发构建，但比 Debug 构建更针对运行时优化。</td></tr></tbody></table> |

## 平台设置

![设置](/manual/media/settings-windows.jpg)

| 属性                | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| **窗口模式**        | 默认游戏窗口模式。可能的选项：<table><tbody><tr><th>选项</th><th>描述</th></tr><tr><td>**Windowed**</td><td>窗口带有边框，不占据全屏。</td></tr><tr><td>**Fullscreen**</td><td>窗口独占全屏。</td></tr><tr><td>**Borderless**</td><td>窗口行为类似于窗口化模式，但没有边框。</td></tr><tr><td>**Fullscreen Borderless**</td><td>与无边框相同，但尺寸为屏幕大小。</td></tr></tbody></table> |
| **屏幕宽度**        | 默认游戏窗口宽度（以像素为单位）。                           |
| **屏幕高度**        | 默认游戏窗口高度（以像素为单位）。                           |
| **可调整窗口大小**  | 允许用户调整游戏窗口大小。                                   |
| **强制单实例**      | 将同时运行的游戏实例数量限制为一个，否则用户可以多次启动应用程序。 |
| **覆盖图标**        | 用于应用程序的自定义图标纹理（覆盖默认图标）。               |
| **支持 DirectX 12** | 启用对 DirectX 12 的支持。禁用它可减少编译的着色器数量。     |
| **支持 DirectX 11** | 启用对 DirectX 11 的支持。禁用它可减少编译的着色器数量。     |
| **支持 DirectX 10** | 启用对 DirectX 10 和 DirectX 10.1 的支持。禁用它可减少编译的着色器数量。 |
| **支持 Vulkan**     | 启用对 Vulkan 的支持。禁用它可减少编译的着色器数量。         |
