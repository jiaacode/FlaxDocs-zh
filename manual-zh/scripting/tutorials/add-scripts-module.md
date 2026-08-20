# 操作指南：添加脚本模块

当项目源代码规模变大，或者需要在源代码中分离库时，您可以在代码库中添加更多模块。例如，添加一个独立的编辑器专用模块，可用于创建仅用于编辑器中游戏和工具的脚本，而不会在已构建的游戏中运行时使用。如果您的项目目前没有任何脚本模块，可以按照本教程添加第一个模块。

要了解有关模块和构建脚本的更多信息，请参阅[此处](../../editor/flax-build/index.md)的文档页面。

## 1. 创建文件夹和 `.Build.cs` 文件

第一步是在项目的 `Source/<new_module_name>` 目录下为新模块脚本创建一个文件夹。然后在该文件夹中创建一个名为 `<new_module_name>.Build.cs` 的空文件。

![新建模块文件](media/new-module-folder.png)

## 2. 编写模块构建脚本

现在，参照以下示例设置模块脚本。如果您的模块不是编辑器专用模块，请确保继承 `GameModule` 类而不是 `GameEditorModule` 类。如果您想在模块中使用 C++ 脚本，还可以将 `BuildNativeCode` 设置为 `true`。

```cs
using Flax.Build;
using Flax.Build.NativeCpp;

public class GraphicsFeaturesTourEditor : GameEditorModule
{
    /// <inheritdoc />
    public override void Setup(BuildOptions options)
    {
        base.Setup(options);

        // 在此处可以修改游戏模块的构建选项
        // 要引用另一个模块，请使用：options.PublicDependencies.Add("Audio");
        // 要添加 C++ 定义，请使用：options.PublicDefinitions.Add("COMPILE_WITH_FLAX");
        // 要了解更多信息，请参阅脚本文档。
        BuildNativeCode = false;

        // 引用游戏脚本模块
        options.PublicDependencies.Add("GraphicsFeaturesTour");
    }
}
```

***

## 3. 使用模块

最后一步是将此模块添加到目标构建中。为此，请编辑 **Target** 构建脚本（例如 `Source/GraphicsFeaturesTourEditorTarget.Build.cs`）。如果是游戏模块，也请将其添加到游戏目标中，以便它能在游戏构建中工作。

```cs
using Flax.Build;

public class GraphicsFeaturesTourEditorTarget : GameEditorTarget
{
    /// <inheritdoc />
    public override void Init()
    {
        base.Init();

        // 为编辑器引用模块
        Modules.Add("GraphicsFeaturesTour");
        Modules.Add("GraphicsFeaturesTourEditor");
    }
}
```

***

如您所见，新模块已通过名称添加到 `Modules` 列表中。
现在您可以重新生成脚本项目文件并启动编辑器，以在单独的模块中使用这些脚本。
