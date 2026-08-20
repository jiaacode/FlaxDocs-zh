# 游戏设置

**游戏设置** 基础设施用于为构建的游戏准备 Flax 选项。
通过使用游戏设置，你可以设置初始游戏场景、链接你的插件运行时选项等。
本节涵盖了游戏设置的主要概念，并记录了相关的资源类型。

## 根资源

为了提供更通用的设计并统一[项目结构](../../get-started/project-structure.md)，游戏设置资源**始终位于** `Content/GameSettings.json` 中。此文件为 json 格式，包含基本的游戏描述（产品名称、公司等），并引用其他资源（时间设置、层与标签等）。
示例游戏设置文件可以在[此处](https://github.com/FlaxEngine/FlaxSamples/blob/master/BasicTemplate/Content/GameSettings.json)找到。默认情况下，所有 Flax 示例和模板都包含要使用的正确的游戏设置。

## 创建设置

![新建设置](../../physics/media/new-settings.png)

你可以使用 *内容* 窗口创建新设置。只需在 Content 文件夹中右键单击，选择选项 **新建 -> 设置**，指定其名称并按 *Enter*。然后选择新的资源类型。游戏设置资源或任何其他设置资源都是普通的 Json 资源，因此你可以像其他资源类型一样重命名/移动/编辑它们。强烈建议对设置使用[版本控制](../../get-started/version-control.md)系统，因为它们都是文本文件，在团队中工作时应该进行版本控制。

![新建设置](../../physics/media/physics-settings-new.png)

## 属性

![Flax 游戏设置](media/game-settings.png)

| 属性              | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| **产品名称**      | 你的游戏名称。                                               |
| **公司名称**      | 你的公司或组织的名称。                                       |
| **版权声明**      | 用于内容签名（例如源代码标头）的版权声明。                   |
| **图标**          | 默认应用程序图标。可以按每个平台覆盖。                       |
|                   |                                                              |
| **初始场景**      | 游戏启动时要加载的第一个场景的引用。                         |
| **无启动画面**    | 如果为 true，则在游戏启动时跳过显示启动画面图像。            |
| **启动画面**      | 游戏启动时要显示的启动画面图像的引用。                       |
|                   |                                                              |
| **时间**          | 对[时间设置](time-settings.md)资源的引用。包含初始时间管理器选项。 |
| **音频**          | 对[音频设置](../../audio/audio-settings.md)资源的引用。包含初始音频播放引擎选项。 |
| **层与标签**      | 对[层与标签设置](layers-and-tags-settings.md)资源的引用。包含游戏中使用的 Actor 标签和层名称。 |
| **物理**          | 对[物理设置](../../physics/physics-settings.md)资源的引用。包含物理模拟选项。 |
| **输入**          | 对[输入设置](../../input/input-settings.md)资源的引用。包含初始虚拟输入布局。 |
| **图形**          | 对[图形设置](graphics-settings.md)资源的引用。包含初始渲染选项。 |
| **导航**          | 对[导航设置](../../navigation/navigation-settings.md)资源的引用。包含初始导航网格构建选项。 |
| **游戏烘焙**      | 对[构建设置](build-settings.md)资源的引用。包含 Game Cooker 配置文件和游戏构建期间使用的附加选项。 |
| **流式传输**      | 对[流式传输设置](streaming-settings.md)资源的引用。包含资源配置，例如纹理组选项。 |
| **自定义设置**    | 由游戏和插件使用的自定义 json 资源集合。要了解更多信息，请参阅相关文档[此处](custom-settings.md)。 |
| **Windows**       | 对 [Windows 设置](../../platforms/windows.md)资源的引用。包含为 Windows 构建游戏时使用的选项。 |
| **PlayStation 4** | 对 [PlayStation 4 设置](../../platforms/ps4.md)的引用。包含为 PlayStation 4 构建游戏时使用的选项。 |
| **PlayStation 5** | 对 [PlayStation 5 设置](../../platforms/ps5.md)的引用。包含为 PlayStation 5 构建游戏时使用的选项。 |
| **Xbox Scarlett** | 对 [Xbox Scarlett 设置](../../platforms/xbox-scarlett.md)的引用。包含为 Xbox Scarlett 构建游戏时使用的选项。 |
| **Switch**        | 对 [Switch 设置](../../platforms/switch.md)的引用。包含为 Switch 构建游戏时使用的选项。 |
| **macOS**         | 对 [macOS 设置](../../platforms/mac.md)资源的引用。包含为 macOS 构建游戏时使用的选项。 |
| **iOS**           | 对 [iOS 设置](../../platforms/ios.md)资源的引用。包含为 iOS 构建游戏时使用的选项。 |
| **Web**           | 对 [Web 设置](../../platforms/web.md)资源的引用。包含为 Web 构建游戏时使用的选项。 |

## 在运行时访问设置

在游戏代码中访问游戏设置数据的示例代码。

# [C#](#tab/code-csharp)
```cs
using FlaxEditor.Content.Settings;
using FlaxEngine;

public class TestSettingsUsage : Script
{
    public override void OnEnable()
    {
        var gameSettings = GameSettings.Load();
        Debug.Log("Game name: " + gameSettings.ProductName);
        var timeSettings = GameSettings.Load<TimeSettings>();
        Debug.Log("Draw FPS from settings: " + timeSettings.DrawFPS);
    }
}
```
***

# [C++](#tab/code-cpp)

```cpp
#include "Engine/Core/Log.h"
#include "Engine/Core/Config/GameSettings.h"
#include "Engine/Core/Config/TimeSettings.h"
#include "Engine/Scripting/Script.h"

class GAME_API TestSettingsUsage : public Script
{
DECLARE_SCRIPTING_TYPE(TestSettingsUsage);
public:
    void OnEnable() override
    {
        const auto gameSettings = GameSettings::Get();
        LOG(Info, "Game name: {0}", gameSettings->ProductName);
        const auto timeSettings = TimeSettings::Get();
        LOG(Info, "Draw FPS from settings: {0}", timeSettings->DrawFPS);
    }
};
```
***
