# 操作指南：创建自定义资源类型

Flax 使用两种类型的资源：
* **二进制**资源（扩展名为 `.flax` 的文件）
* **Json** 资源（扩展名为 `.json`/`.scene` 等的文件）

二进制资源更适合纹理、模型以及一般较大的类型。而 Json 资源在处理可直接由脚本和场景对象使用的数据时非常有用。

在本教程中，您将学习如何定义自定义 Json 资源类型并在游戏中使用它。

### 1. 定义数据类

实现一个用于定义资源数据布局的类。在本示例中，我们存储了一些受支持的屏幕分辨率以及默认语言。随后该数据将被保存为 Json 格式并在编辑器中进行修改。之后游戏可以加载该资源并使用其数据。

# [C#](#tab/code-csharp)

```cs
public class MySettings
{
	public Vector2[] SupportedResolutions =
	{
		new Vector2(1280, 720),
		new Vector2(1920, 1080),
	};

	public string DefaultLanguage = "en";
}
```
***

# [C++](#tab/code-cpp)

```cpp
#pragma once

#include "Engine/Core/ISerializable.h"
#include "Engine/Core/Math/Vector2.h"
#include "Engine/Scripting/ScriptingType.h"

API_CLASS() class GAME_API MySettings : public ISerializable
{
    API_AUTO_SERIALIZATION();
    DECLARE_SCRIPTING_TYPE_NO_SPAWN(MySettings);

    API_FIELD()
	Array<Vector2> SupportedResolutions = { Vector2(1280, 720), Vector2(1920, 1080) };

    API_FIELD()
	String DefaultLanguage = TEXT("en");
};
```
***

将该类添加到游戏脚本程序集中。它也可以放在编辑器脚本程序集中，但那样就只能在设计时使用。

### 2. 创建资源

下一步是创建一个包含设置的实际资源（*.json* 文件）。
在项目的 *内容* 目录中，*右键单击*，然后选择选项 **新建 -> Json 资源**。
然后指定其名称，并选取类型为所创建类的类型名称（在本示例中为 `MySettings`）。
点击 **创建** 按钮，即可使用该类型的默认值生成文件。

![新建资源选择器](/manual/media/new-settings-asset-picker.png)

此外，您也可以使用[自定义编辑器](custom-editor.md)或[自定义窗口](custom-window.md)，或者直接使用[编辑器专用代码](../preprocessor.md)在编辑器中生成新资源。

```cs
[CustomEditor(typeof(MyScript))]
public class MyScriptEditor : GenericEditor
{
	public override void Initialize(LayoutElementsContainer layout)
	{
		base.Initialize(layout);

		layout.Space(20);
		var button = layout.Button("Click me", Color.Green);
		button.Button.Clicked += OnButtonClicked;
	}

	private void OnButtonClicked()
	{
		// 创建 Json 资源
		FlaxEditor.Editor.SaveJsonAsset("/manual/Content/mySettings.json", new MySettings());
	}
}
```

***

选择该脚本并按下自定义编辑器按钮后，资源就会出现在 *内容* 文件夹中。

![教程](/manual/media/custom-asset-tutorial-1.jpg)

### 3. 在编辑器中编辑资源

双击已创建的资源，将弹出专用编辑器窗口。使用该窗口修改资源，然后按 `保存` 按钮保存数据。

![教程](/manual/media/custom-asset-tutorial-2.jpg)

Json 资源文件内容：

```json
{
	"ID": "a71da43c4c1905f17c1104978df8070f",
	"TypeName": "MySettings",
	"EngineBuild": 6147,
	"Data": {
	"SupportedResolutions": [
		{
			"X": 1280.0,
			"Y": 720.0
		},
		{
			"X": 1920.0,
			"Y": 1080.0
		},
		{
			"X": 640.0,
			"Y": 480.0
		}
	],
	"DefaultLanguage": "en"
}
}
```

***

### 4. 在游戏中使用资源

使用 Json 资源在编辑器和已构建的游戏中是相同的。区别在于游戏构建过程中 Json 资源会被压缩和加密，因此数据是安全的。

要使用此资源，只需在脚本中添加 [JsonAsset](https://docs.flaxengine.com/api/FlaxEngine.JsonAsset.html) 引用，然后将 `mySettings.json` 资源拖放到其中。

# [C#](#tab/code-csharp)

```cs
public class MyScript : Script
{
	public JsonAssetReference<MySettings> MySettings;

	public override void OnStart()
	{
		if (MySettings)
		{
			var obj = MySettings.Instance;
			Debug.Log("Default language: " + obj.DefaultLanguage);
		}
	}
}
```
***

# [C++](#tab/code-cpp)

```cpp
#pragma once

#include "Engine/Scripting/Script.h"
#include "Engine/Core/Log.h"
#include "Engine/Content/JsonAssetReference.h"

API_CLASS() class GAME_API MyScript : public Script
{
    API_AUTO_SERIALIZATION();
    DECLARE_SCRIPTING_TYPE(MyScript);

    API_FIELD() JsonAssetReference<::MySettings> MySettings;

    // [Script]
    void OnStart() override
    {
        const auto obj = MySettings.GetInstance();
        if (obj)
        {
            LOG(Info, "Default language: {0}", obj->DefaultLanguage);
        }
    }
};

inline MyScript::MyScript(const SpawnParams& params)
    : Script(params)
{
}
```
***

![教程](/manual/media/custom-asset-tutorial-3.jpg)

## 资源创建实用工具

如果您正在开发第三方 SDK 插件或常用的资源类型，则可以使用 `ContentContextMenu` 属性将其链接到编辑器的内容窗口中。

# [C#](#tab/code-csharp)

```cs
[ContentContextMenu("New/My Settings")]
public class MySettings
{
...
}
```
***

# [C++](#tab/code-cpp)

```cpp
API_CLASS(Attributes="ContentContextMenu(\"New/My Settings\")")
class GAME_API MySettings : public ISerializable
{
...
};
```
***

## 编辑器中的资源扩展

Flax 编辑器支持按资源类型扩展编辑和使用体验。例如，您可以覆盖默认资源图标、根据内容生成缩略图，或者从 *内容* 窗口提供额外的可执行操作。

以下是为 `MySettings` 资源扩展编辑器的 C# 代码示例：

```cs
public class MySettingsItem : JsonAssetItem
{
    /// <inheritdoc />
    public MySettingsItem(string path, Guid id, string typeName)
    : base(path, id, typeName)
    {
        // 使用自定义图标（Sprite）
        _thumbnail = Editor.Instance.Icons.Document128;
    }
}

[ContentContextMenu("New/My Settings")]
public class MySettingsProxy : SpawnableJsonAssetProxy<MySettings>
{
    /// <inheritdoc />
    public override AssetItem ConstructItem(string path, string typeName, ref Guid id)
    {
        // 为编辑器使用自定义资源项类型
        return new MySettingsItem(path, id, typeName);
    }
}
```

***

您可以通过重写这些方法来轻松自定义代理方法。

然后在[编辑器插件](custom-plugin.md)初始化时注册自定义资源代理（确保在游戏代码卸载时将其移除——例如在编辑器中的脚本热重载期间）：

```cs
public class MyEditorPlugin : EditorPlugin
{
    private MySettingsProxy _proxy;

    /// <inheritdoc />
    public override void InitializeEditor()
    {
        _proxy = new MySettingsProxy();
        Editor.ContentDatabase.AddProxy(_proxy, true);
    }

    /// <inheritdoc />
    public override void DeinitializeEditor()
    {
        Editor.ContentDatabase.RemoveProxy(_proxy, true);
        _proxy = null;

        base.DeinitializeEditor();
    }
}
```

***

另一种在不创建新代理的情况下为 **JsonAsset** 添加自定义图标的简单方法如下：

```cs
public class MyEditorPlugin : EditorPlugin
{
    public override void InitializeEditor()
    {
        base.InitializeEditor();
		var atlas = Content.Load<SpriteAtlas>("Content/ExampleSpriteAtlas.flax");
        var spriteHandle = new SpriteHandle(atlas, 0);
        Editor.ContentDatabase.AddProxy(new SpawnableJsonAssetProxy<MySettings>(spriteHandle));
        Editor.ContentDatabase.Rebuild(true);
    }
}
```

***
