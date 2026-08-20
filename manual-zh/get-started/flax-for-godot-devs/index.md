# Flax 面向 Godot 开发者

![Godot 到 Flax](/manual/media/title.jpg)

Flax 和 Godot 有许多相似之处，并共享许多概念，然而也有一些差异。此页面帮助 Godot 引擎开发者将他们现有的 Godot 经验迁移到 Flax 引擎的世界中。

> [!Warning]
> 警告！你会爱上这个引擎的发展方向和开发速度。

## 编辑器

Flax 编辑器和 Godot 编辑器非常相似。你可以在两个编辑器的截图中看到彩色编码的高亮区域，它们具有共同的功能。Flax 编辑器的布局也是高度可定制的，因此你可以拖放窗口来使编辑器适应你的工作流程。

![Godot 编辑器](/manual/media/godot-layout.png)

![Flax 编辑器](../media/flax-layout.png)

## 术语

本节包含 Godot 中最常用的术语及其 Flax 等效项（或大致等效项）。Flax 关键词直接链接到文档中更深入的信息。

| Godot          | Flax                                                  |
| -------------- | ----------------------------------------------------- |
| **Node**       | [Actor](../scenes/actors.md)                          |
| **Script**     | [脚本](../../scripting/index.md)                      |
| **Scene**      | [场景窗口](../../editor/windows/scene-window.md)      |
| **Inspector**  | [属性窗口](../../editor/windows/properties-window.md) |
| **FileSystem** | [内容窗口](../../editor/windows/content-window.md)    |

## 项目

![Flax 项目](../media/project-structure.png)

Flax 项目结构是高度标准化的，包含：**Cache** 文件夹（类似于 Godot 中的 `.import` 文件夹）、**Content** 文件夹和 **Source** 文件夹。所有游戏资源都在 Content 目录中，而所有脚本都在 Source 目录中。因此，资源和脚本的混乱程度更低。

Flax 还会为你的游戏 C# 脚本生成解决方案和项目文件。

请参阅 [Flax 项目结构](../project-structure.md) 页面以了解有关 Flax 引擎中项目的更多信息。

## 资源

Flax 使用两种类型的资源类型：**二进制文件**（扩展名为 `.flax`）和其他**文本文件**（大多为 JSON 格式，如场景、预制体等）。当你导入模型或纹理时，它会被处理并转换为引擎在运行时使用的二进制表示，这种表示针对可扩展性和流式传输进行了良好优化。Flax 不像 Godot 那样使用 `.import` 文件。

Flax 支持最流行的资源文件格式（适用于 3D 模型和纹理），因此你可以导入你的游戏内容。

请参阅[资源](../assets/index.md)页面以了解有关导入和使用游戏资源的更多信息。

## Node 与 Actor

Flax 使用类似的概念来描述场景内容。我们不使用 Node，而是使用 [Actor](../scenes/actors.md)。每个 Actor 都有自己的类型（例如点光源、盒体碰撞体）和一组附加的脚本。

在 Flax 中，场景对象也是一个 Actor，因此你可以像访问任何其他 Actor 一样访问它。这意味着场景可以拥有自己的脚本，并像其他对象一样进行变换。

如果你想创建复合对象的多个实例，你可以使用 [预制体](../prefabs/index.md)，它可以用于实例化游戏对象。

## 脚本

> [!Tip]
> 与 Godot 相比，Flax 中的 C# 和 C++ 脚本功能完整且已可用于生产。此外，可视化脚本提供了更多的工具和功能。

在游戏脚本方面，Flax 支持可视化、C# 和 C++ 脚本（类似于 Godot）。C# API 存在一些差异。事实上，整个 C# API 是一个开源项目，可以在[此处](https://github.com/FlaxEngine/FlaxEngine)找到。欢迎所有贡献。

* Godot

```cs
public class MyScript : Node
{
    public override void _Ready()
    {
        GD.print("It is Godot!");
    }
}
```

***

* Flax

```cs
public class MyScript : Script
{
	public override void OnStart()
	{
		Debug.Log("It is Flax!");
	}
}
```

***

请参阅[脚本](../../scripting/index.md)文档以了解有关 Flax 中 C# 脚本的更多信息。
