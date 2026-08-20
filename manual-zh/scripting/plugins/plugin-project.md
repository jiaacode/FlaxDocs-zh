# 插件项目

Flax 支持插件项目的概念。插件项目是一个独立的 Flax 项目，可以从游戏项目中引用，并作为插件分发。Flax 支持嵌套项目之间的这些引用。默认情况下，游戏项目通过引用引擎项目来使用此概念。在本文档部分，你将学习如何在游戏项目中引用和使用插件项目。

## 自动化创建

> [!Important]
> 使用此工具创建第一个插件项目时需要互联网访问。

打开插件窗口 **工具 -> 插件**。
![插件菜单](/manual/media/plugin-menu.png)

点击创建插件项目按钮，并填写插件项目的名称、版本和公司。
![插件创建菜单](/manual/media/plugin-create-menu.png)

点击提交按钮。

重启编辑器以使更改生效。

## 自动化 Git 克隆

> [!Important]
> 此工具需要互联网访问和 Git。

打开插件窗口 **工具 -> 插件**。
![插件菜单](/manual/media/plugin-menu.png)

点击克隆插件项目按钮，并输入插件项目的 Git 地址。输入名称是可选的，仅会重命名包含插件项目的文件夹，否则将使用仓库名称。
![插件克隆菜单](/manual/media/plugin-clone-menu.png)

点击提交按钮。

重启编辑器以使更改生效。

## 手动创建

创建一个新项目，并将其添加到现有的 **项目工作区子目录** 中。例如，将其放在 `Plugin/<plugin_name>` 文件夹中。你也可以使用[示例插件](https://github.com/FlaxEngine/ExamplePlugin)项目来完成此操作。

必须重命名插件项目文件，因为默认名称“Game”不能使用，否则在构建期间会在全局上下文中与主项目名称冲突（如果保留默认名称“Game”）。要重命名插件项目，你首先需要在编辑器中打开 `.flaxproj` 文件，并双击一个 C# 源文件以生成 C# 项目文件和必要的构建脚本。然后重命名 `.flaxproj` 文件、.Net 项目文件（`.csproj`）、源文件和类名，将“Game”替换为你的插件名称（例如“MyPlugin”）。重命名完成后，右键单击 `.flaxproj` 文件以“生成脚本项目文件”，生成脚本文件应该没有问题，如果有问题，请仔细检查命名。

接下来，从你的游戏项目向添加的插件项目添加一个**引用**。使用文本编辑器打开 **<project_name>.flaxproj**，并添加对插件项目的引用：

```
    "References": [
        {
            "Name": "$(EnginePath)/Flax.flaxproj"
        },
        {
            "Name": "$(ProjectPath)/Plugins/MyPlugin/MyPlugin.flaxproj"
        }
    ],
```

如你所见，通过使用 `$(ProjectPath)` 后跟本地路径，你可以直接引用插件项目文件。然后你可以打开编辑器，并在游戏中使用插件项目中的内容和脚本。

## 引用插件

如果你想引用引用的项目代码模块中的类型，请在游戏代码模块构建脚本中添加引用（在 `Setup` 函数中）：

```cs
options.PrivateDependencies.Add("MyPlugin");
```

***

插件项目也可以引用其他项目，但不支持跨解决方案引用。

![编辑器中的插件项目](/manual/media/plugin-projects.png)
