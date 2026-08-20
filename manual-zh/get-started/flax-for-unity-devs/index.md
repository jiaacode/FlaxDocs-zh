# Flax 面向 Unity® 开发者

![Unity 到 Flax](/manual/media/title.jpg)

Flax 和 Unity 有许多相似之处（C# 脚本、物理引擎），并共享许多概念，然而也有一些差异。此页面帮助 Unity 引擎开发者将他们现有的 Unity 经验迁移到 Flax 引擎的世界中。

> [!Warning]
> 警告！你会爱上这个引擎的发展方向和开发速度！

## 编辑器

Flax 编辑器和 Unity 编辑器非常相似。你可以在两个编辑器的截图中看到彩色编码的高亮区域，它们具有共同的功能。Flax 编辑器的布局也是高度可定制的，因此你可以拖放窗口来使编辑器适应你的工作流程。

![Unity 编辑器](/manual/media/unity-layout.png)

![Flax 编辑器](../media/flax-layout.png)

> [!Tip]
> 使用 Flax 编辑器，享受即时的运行模式。

## 术语

本节包含 Unity 中最常用的术语及其 Flax 等效项（或大致等效项）。Flax 关键词直接链接到文档中更深入的信息。

| Unity               | Flax                                                         |
| ------------------- | ------------------------------------------------------------ |
| **GameObject**      | [Actor](../scenes/actors.md)                                 |
| **MonoBehaviour**   | [脚本](../../scripting/index.md)                             |
| **Shader**          | [材质](../../graphics/materials/index.md)                    |
| **Material**        | [材质实例](../../graphics/materials/instanced-materials/index.md) |
|                     |                                                              |
| **Hierarchy Panel** | [场景窗口](../../editor/windows/scene-window.md)             |
| **Inspector**       | [属性窗口](../../editor/windows/properties-window.md)        |
| **Project Browser** | [内容窗口](../../editor/windows/content-window.md)           |
| **Scene View**      | [视口](../../editor/windows/viewport.md)                     |
| **SRP**/**HDRP**    | [图形](../../graphics/index.md)                              |

## 项目

![Flax 项目](../media/project-structure.png)

Flax 项目结构与 Unity 项目类似。编辑器使用 **Cache** 文件夹代替 **Library** 文件夹。此外，Unity 中的 **Assets** 文件夹被拆分为两个独立的部分：**Content** 和 **Source**。所有 C# 脚本文件都位于源目录中，因此资源和脚本的混乱程度更低。

Flax 还会为你的游戏 C# 脚本生成解决方案和项目文件。

请参阅 [Flax 项目结构](../project-structure.md) 页面以了解有关 Flax 引擎中项目的更多信息。

## 资源

Flax 不使用 `.meta` 文件。相反，每个资源都包含所有必需的元数据信息，并且是一个自包含的文件。扩展名为 `.flax` 的文件使用我们自己的二进制格式，该格式针对可扩展性和流式传输进行了良好优化。其他资源通常以 `Json` 格式存储（场景、设置等）。

Flax 支持最流行的资源文件格式（适用于 3D 模型和纹理），因此你可以导入你的游戏内容。

请参阅[资源](../assets/index.md)页面以了解有关导入和使用游戏资源的更多信息。

## GameObject 与 Actor

Flax 不使用组件来构建场景对象逻辑。我们使用 [Actor](../scenes/actors.md)。每个 Actor 都有自己的类型（例如点光源、盒体碰撞体）和一组附加的脚本。此外，没有 *TransformComponent*，但 Actor 具有内置的变换（更少的对象，为更大的游戏提供更优化的设计）。这意味着，在 Flax 中，场景对象层级是使用 Actor 创建的，而不是像 Unity 那样通过 Transform 创建的。

然而，你仍然可以将实体-组件设计用于你的脚本，因为每个 Actor 都可以像 Unity 那样拥有脚本。
只需在你的脚本中使用 `GetChild<T>()`/`GetScript<T>()` 而不是 `GetComponent<T>()`。

在 Flax 中，场景对象也是一个 Actor，因此你可以像访问任何其他 Actor 一样访问它。这意味着场景可以拥有自己的脚本，并像其他对象一样进行变换。

> [!Tip]
> Flax 坐标系统的基本单位是厘米而不是米，这意味着放置在 <100,100,100> 的 Flax Actor 相当于放置在 <1,1,1> 的 Unity Transform 的等效位置。

## MonoBehaviour 与 Script

在游戏脚本方面，Unity 和 Flax 非常相似。C# API 存在一些差异（Flax 拥有更大的数学库，更注重性能，并通过 .NET 8 使用新的 C# 12）。事实上，整个 C# 编辑器以及包含脚本 API 的 C++ 引擎都是开放的，可以在[此处](https://github.com/FlaxEngine/FlaxEngine)找到。欢迎所有贡献。

此外，Flax 支持原生 **[C++](../../scripting/cpp/index.md)** 脚本和 **[可视化脚本](../../scripting/visual/index.md)** 作为内置功能。我们不想将开发者限制为仅使用一种编程语言进行游戏开发，因为将 C++ 和可视化脚本与 C# 结合使用可以带来好处。

如果你编写 C# 脚本，只需将 `MonoBehaviour` 替换为 `Script`，因为它更有意义（并且更短）。

* Unity
```cs
public class MyScript : MonoBehaviour
{
	void Start()
	{
		Debug.Log("It is Unity!");
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

## C# API 中的新酷特性

如果你是一名程序员，以下是 Flax C# API 中可能有用的一些新酷特性列表：
* 你可以使用最新的 .NET 8 和新的 C# 12
* 引擎和编辑器是开放的，包含完整源代码（[链接](https://github.com/FlaxEngine/FlaxEngine)）
* 你可以在运行时编辑所有输入设置（[链接](https://docs.flaxengine.com/api/FlaxEngine.Input.html)）
* 你可以在运行时更改游戏手柄设备布局（[链接](https://docs.flaxengine.com/api/FlaxEngine.Gamepad.html)）
* 你可以动态设置更新/绘制/物理 FPS（[链接](https://docs.flaxengine.com/api/FlaxEngine.Time.html)）
* 你可以将任何对象序列化/反序列化为 json（[链接](https://docs.flaxengine.com/api/FlaxEngine.Json.JsonSerializer.html)）
* 你可以使用庞大的数学库（[链接](https://github.com/FlaxEngine/FlaxEngine/tree/master/Source/Engine/Core/Math)）
* 你可以在 GPU 上执行自定义渲染（[链接](https://docs.flaxengine.com/api/FlaxEngine.RenderTask.html)）
* 你可以使用自定义编辑器管线来创建出色的编辑器扩展（[链接](https://docs.flaxengine.com/manual/scripting/tutorials/custom-editor.html)）

<hr>

Unity® 是 Unity Technologies 的商标。
