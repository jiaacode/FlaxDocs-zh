# 自定义设置

自定义设置可用于将自定义游戏配置或插件配置注入到构建的游戏设置中。
自定义设置通过唯一键进行标识，并将自定义 json 资源与数据相关联。

要在编辑器中设置自定义设置，可以使用以下代码：

```cs
var path = Path.Combine(Globals.ProjectContentFolder, "myPluginSettings.json");
FlaxEditor.Editor.SaveJsonAsset(path, new MySettings());
GameSettings.SetCustomSettings("MyPlugin", Content.LoadAsync<JsonAsset>(path));
```

***

要在运行时访问自定义设置，请使用以下代码：

```cs
var settings = Engine.GetCustomSettings("MyPlugin");
if (settings)
{
	var settingsObj = settings.CreateInstance<MySettings>();
	// 使用 settingsObj 访问选项...
}
```

***

要了解有关使用自定义设置的更多信息，请参阅此[教程](../../scripting/tutorials/custom-settings.md)。
