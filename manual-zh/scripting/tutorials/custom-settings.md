# 操作指南：使用自定义设置

**自定义设置** 是通过添加自定义数据组件来扩展默认游戏配置的最简便方式，这些组件用于定义游戏配置。同时，这也是插件向游戏注入自定义选项的一种非常统一的方式。在本教程中，您将学习如何在游戏或插件中定义、创建和使用自定义设置。

要了解有关自定义设置的更多信息，请参阅相关页面[此处](../../editor/game-settings/custom-settings.md)。

### 1. 定义自定义设置数据对象

第一步是为自定义设置准备实际的布局。
Flax 使用 C# 对象，这是定义数据、序列化以及从 C# 代码访问的一种非常好的方式。
以下是一个示例类，它定义了示例游戏使用的一组设置。请在您的游戏项目（Game 项目）中创建此类。

```cs
public class MySettings
{
	public float Speed = 2.0f;
}
```

***

### 2. 在编辑器中创建设置

下一步是创建一个包含设置的实际资源（*.json* 文件）。
在项目的 *内容* 目录中，*右键单击*，然后选择选项 **新建 -> Json 资源**。
然后指定其名称，并选取类型为所创建类的类型名称（在本示例中为 `MySettings`）。
点击 **创建** 按钮，即可使用该类型的默认值生成文件。

![新建资源选择器](media/new-settings-asset-picker.png)

此外，您也可以使用脚本代码（Start 方法）、[自定义编辑器](custom-editor.md)或[自定义编辑器窗口](custom-window.md)来执行此操作。

```cs
#if FLAX_EDITOR
	var path = Path.Combine(Globals.ProjectContentFolder, "mySetitng.json");
	FlaxEditor.Editor.SaveJsonAsset(path, new MySettings());
	GameSettings.SetCustomSettings("MyPlugin", Content.LoadAsync<JsonAsset>(path));
#endif
```

***

上述示例代码在 Content 文件夹中创建了一个名为 *myPluginSettings.json* 的新设置资源。

注意：如果您正在开发插件，可以创建默认的插件设置资源并随插件一起提供，以便在使用该插件的项目中调整插件选项。

您还可以为编辑器注入自定义设置资源代理控制器，该控制器允许通过自定义操作、编辑器窗口、创建方法等来扩展资源类型：

```cs
var assetProxy = new CustomSettingsProxy(typeof(MySettings), "My Settings");
Editor.ContentDatabase.AddProxy(assetProxy);

// 然后确保在反初始化时进行清理（例如插件的反初始化）
// Editor.ContentDatabase.RemoveProxy(assetProxy);
```

***

### 3. 在编辑器中编辑设置

现在您可以使用 Flax 编辑器打开并编辑这些设置。只需在 **内容窗口** 中**双击资源**，即可打开编辑器窗口并修改设置。

![编辑自定义设置](media/custom-settings-edit.png)

### 4. 在运行时访问设置

自定义设置可以在运行时通过 `Engine.GetCustomSettings` 方法访问，该方法返回由给定键关联的 `JsonAsset`（此示例代码使用的键为 *MyPlugin*）。

```cs
var settings = Engine.GetCustomSettings("MyPlugin");
if (settings)
{
    Debug.Log("Settings: " + settings.CreateInstance<MySettings>().Speed);
}
```

***

## C++ 中的设置

如果您使用 C++ 脚本，可以创建一个带有 `API_CLASS` 的类来定义设置数据，并继承自 `SettingsBase`。它将自动暴露给 C#/Visual 脚本，并可在原生脚本中访问。

使用 `API_AUTO_SERIALIZATION` 标记使其自动可序列化（所有 `API_FIELD` 项），添加默认的 `DECLARE_SCRIPTING_TYPE_NO_SPAWN` 宏以插入脚本信息，并放置实用宏 `DECLARE_SETTINGS_GETTER` 以在游戏代码中更轻松地使用 getter（在 `.cpp` 文件中使用 `IMPLEMENT_GAME_SETTINGS_GETTER` 宏实现）。

```cpp
// .h
#include "Engine/Core/Config/Settings.h"
#include "Engine/Scripting/ScriptingObject.h"

/// <summary>
/// 自定义设置。
/// </summary>
API_CLASS() class GAME_API MySettings : public SettingsBase
{
    API_AUTO_SERIALIZATION();
    DECLARE_SCRIPTING_TYPE_NO_SPAWN(SettingsBase);
    DECLARE_SETTINGS_GETTER(MySettings);
public:
    // 自定义选项。
    API_FIELD() String Text;
};

// .cpp
#include "MySettings.h"
#include "Engine/Core/Config/GameSettings.h"
#include "Engine/Content/Content.h"
#include "Engine/Content/JsonAsset.h"

IMPLEMENT_GAME_SETTINGS_GETTER(MySettings, "MySettings");
```

***

然后您可以在 C#/Visual 中像使用任何其他设置一样使用它们；在 C++ 代码中，可以通过 getter 访问：

```cpp
const auto settings = MySettings::Get();
```

***

这将从链接到自定义设置（位于根目录 `GameSettings.json` 中）的资源中获取当前设置数据。使用前面提到的 `CustomSettingsProxy` 可以更轻松地在编辑器中构建此资源。
