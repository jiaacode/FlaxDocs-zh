# 操作指南：通过代码导入资源

对于更高级的游戏开发或插件开发，您可能需要通过代码导入或创建纹理、模型或其他资源。Flax 编辑器提供了多种公共 C# API，有助于自动化资源的创建和管理。

以下示例脚本演示了如何从指定路径导入纹理。在编辑器中编译代码时，务必使用 `FLAX_EDITOR` 宏，否则在构建独立游戏时编译可能会失败。您也可以使用编辑器脚本项目，通过自定义逻辑来扩展编辑器（用于您的游戏或插件）。

```cs
#if FLAX_EDITOR
var sourcePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), "MyTexture.png");
var outputPath = Globals.ProjectContentFolder;
var outputLocation = (ContentFolder)Editor.Instance.ContentDatabase.Find(outputPath);

Editor.Instance.ContentImporting.Import(sourcePath, outputLocation, true);
#endif
```

***

您还可以为导入器提供自定义设置，如下例所示，该示例导入模型资源。

```cs
var sourcePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), "MyModel.fbx");
var outputPath = Globals.ProjectContentFolder;
var outputLocation = (ContentFolder)Editor.Instance.ContentDatabase.Find(outputPath);

var settings = new FlaxEditor.Content.Import.ModelImportSettings();
settings.Settings.ImportVertexColors = false;
settings.Settings.Scale = 1.0f;

Editor.Instance.ContentImporting.Import(sourcePath, outputLocation, true, settings);
```

***
