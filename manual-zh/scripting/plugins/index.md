# 插件

插件是添加到 Flax 项目中的源代码集合，可用于实现持久化的游戏或工具类、自定义引擎功能，或通过添加带有 UI 表现的自定义工具来扩展编辑器。本文档部分解释了创建和使用插件的基础知识。请遵循这些说明以了解更多关于 Flax 插件系统的信息。

示例插件项目可以在[此处](https://github.com/FlaxEngine/ExamplePlugin)找到，请将其作为参考。

## 本节内容

* [插件窗口](plugins-window.md)
* [插件项目](plugin-project.md)
* [如何创建自定义编辑器插件](../tutorials/custom-plugin.md)
* [如何使用自定义设置](../tutorials/custom-settings.md)

## 介绍

Flax 支持加载原生 .dll 文件、从 *.dll* 文件加载 C# 库，并将引用添加到游戏项目中以便在脚本中使用。Flax 引擎的许多系统都被设计为可扩展的，使开发者能够添加新功能并修改内置功能，而无需直接修改引擎源代码。

使用插件允许在游戏中使用外部的 .Net 库。例如，开发者可以使用自定义游戏类、自定义网络库或社交媒体插件。要在游戏脚本中引用 .Net 模块，请修改构建脚本文件（例如 `Source/GameModule/MyGame.Build.cs`），在重写的 `Setup` 方法中添加文件引用：

```cs
// 引用放置在 Content 文件夹中的 C# DLL
options.ScriptingAPI.FileReferences.Add(Path.Combine(FolderPath, "..", "..", "Content", "JetBrains.Annotations.dll"));
```

***

添加此条目后，并且 .dll 文件在文件系统中的该路径可用，你将需要 *生成脚本项目文件*。可以通过在游戏项目根目录中右键单击 .flaxproj 文件时访问上下文菜单选项来生成脚本项目文件。

要向项目添加原生 .dll，例如，如果你的 .Net dll 包装了一个原生 .dll，你可以添加一个选项，将原生 .dll 复制到输出目录，方法是将以下内容添加到 `Setup` 方法中：

```cs
// 将放置在 Content 文件夹中的原生 DLL 复制到输出目录
options.DependencyFiles.Add(Path.Combine(FolderPath, "..", "..", "Content", "native.dll"));
```

***

请记住，每当你修改 `Game.Build.cs` 文件时，都要生成脚本项目文件。

构建脚本对编辑器和烘焙后的游戏都有效，因为被引用的程序集将被打包。

> [!IMPORTANT]
> 如果你的插件收集了 C# 类型信息（例如方法缓存或特性），请务必在编辑器中的 [FlaxEditor.ScriptsBuilder.ScriptsReloadBegin](https://docs.flaxengine.com/api/FlaxEditor.ScriptsBuilder.html#FlaxEditor_Scripting_ScriptsBuilder_ScriptsReloadBegin) 事件中释放它们，以防止在编辑器中进行脚本重载时发生崩溃。

## 插件描述

每个插件都必须导出其描述结构，该结构定义了基本的插件属性。插件描述用于在[插件窗口](plugins-window.md)中显示插件信息。插件描述的内容及相关注释如下所示：

| 属性              | 信息                                                 |
| ----------------- | ---------------------------------------------------- |
| **名称**          | 插件的名称。                                         |
| **版本**          | 插件的版本。                                         |
| **作者**          | 插件作者的名称。                                     |
| **作者网址**      | 插件作者的网站 URL。                                 |
| **主页网址**      | 插件的主页 URL。                                     |
| **仓库网址**      | 插件的仓库 URL（用于开源插件）。                     |
| **描述**          | 插件的描述。                                         |
| **类别**          | 插件的类别（例如 `Rendering`）。                     |
| **是否测试版**    | 如果插件处于 Beta 测试阶段（发布之前），则为 True。  |
| **是否 Alpha 版** | 如果插件处于 Alpha 测试阶段（早期版本），则为 True。 |
| **支持平台**      | 此插件支持的目标部署平台。                           |

# 插件类型

有两种类型的插件：

* 游戏插件
* 编辑器插件

## 游戏插件

**游戏插件** 是一种可以在运行时使用的插件类型。游戏插件随游戏一起部署，可以通过添加新功能来扩展引擎。插件可以包含可在游戏中使用的自定义脚本。要创建一个简单的游戏插件，请使用以下代码示例：

# [C#](#tab/code-csharp)
```cs
public class MyPlugin : GamePlugin
{
    public MyPlugin()
    {
        // 初始化插件描述
        _description = new PluginDescription
        {
            Name = "My Plugin",
            Category = "Other",
            Description = "This is my custom plugin made for Flax.",
            Author = "Someone Inc.",
        };
    }

    /// <inheritdoc />
    public override void Initialize()
    {
        base.Initialize();

        Debug.Log("Plugin initialization!");
    }

    /// <inheritdoc />
    public override void Deinitialize()
    {
        Debug.Log("Plugin cleanup!");

        base.Deinitialize();
    }
}
```
***

# [C++](#tab/code-cpp)

```cpp
// .h
#pragma once

#include "Engine/Scripting/Plugins/GamePlugin.h"

API_CLASS() class GAME_API MyPlugin : public GamePlugin
{
    DECLARE_SCRIPTING_TYPE(MyPlugin);

    void Initialize() override;
    void Deinitialize() override;
};

// .cpp
#include "MyPlugin.h"
#include "Engine/Core/Log.h"

MyPlugin::MyPlugin(const SpawnParams& params)
    : GamePlugin(params)
{
    // 初始化插件描述
    _description.Name = TEXT("My Plugin");
    _description.Category = TEXT("Other");
    _description.Description = TEXT("This is my custom plugin made for Flax.");
    _description.Author = TEXT("Someone Inc.");
}

void MyPlugin::Initialize()
{
    LOG(Info, "Plugin initialization!");
}

void MyPlugin::Deinitialize()
{
    LOG(Info, "Plugin cleanup!");
}
```
***

你的游戏也可以在代码中使用游戏插件来实现各种游戏功能，因为插件不依赖于已加载的场景或场景对象，并且在场景加载之前创建（与普通脚本相比）。

### 如何获取你的游戏插件

你现在可以通过以下方式获取对游戏插件的引用：

```cs
MyPlugin gamePlugin = PluginManager.GetPlugin<MyPlugin>();
```

***

为了更容易访问插件，你可以在 MyPlugin 类中定义一个 Instance 属性，如下所示：

```cs
public static MyPlugin Instance { get => PluginManager.GetPlugin<MyPlugin>(); }
```

***

现在你可以像这样访问游戏插件：

```cs
MyPlugin gamePlugin  = MyPlugin.Instance;
```

***

### 游戏插件设置

如果你需要为插件包含自定义设置，请参阅[此教程](../tutorials/custom-settings.md)以了解更多信息。

### 游戏插件资源

如果你想捆绑仅在代码插件中使用的自定义资源（例如着色器或调试模型），请如下重写 `GetReferences` 方法并提供要包含的资源的 ID：

```cs
#if FLAX_EDITOR
/// <inheritdoc />
public override Guid[] GetReferences()
{
    var assets = new System.Collections.Generic.List<Guid>();

    // 将资源 ID 添加到列表中
    assets.Add(ShaderId);

    // 基于资源路径添加资源 ID
    var path = Path.Combine(Globals.ProjectFolder, "Plugins/MyPlugin/Content/MyCustomDebugModel.flax");
    Content.GetAssetInfo(path, out var info);
    assets.Add(info.ID);

    return assets.ToArray();
}
#endif
```

***

## 编辑器插件

**编辑器插件** 可以通过添加新工具或功能来扩展 Flax 编辑器。编辑器插件可以向编辑器 GUI 添加新按钮，和/或覆盖自定义编辑器管线，或创建用于游戏内容创建的自定义窗口。可能性非常多。要了解有关如何创建和使用编辑器插件的更多信息，请参阅相关教程[此处](../tutorials/custom-plugin.md)。

> [!Note]
> 注意：如果你的插件同时使用了 **游戏插件** 和 **编辑器插件** 类型，请记住实现 `EditorPlugin.GamePluginType` 以指向游戏插件的类型。

## 插件顺序

`PluginLoadOrder` 特性允许指定插件的初始化顺序：

```
[PluginLoadOrder(InitializeAfter = typeof(TestPlugin4), DeinitializeBefore = typeof(TestPlugin4))]
```
