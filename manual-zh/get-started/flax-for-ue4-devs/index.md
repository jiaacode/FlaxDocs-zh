# Flax 面向 UE4® 开发者

![Unreal 到 Flax](media/title.jpg)

Flax 和 Unreal 有许多相似之处（材质管线、物理引擎），并共享许多概念，然而也有一些差异。此页面帮助 Unreal Engine 4 开发者将他们现有的经验迁移到 Flax 引擎的世界中。

> [!Warning]
> 警告！前方速度保证！

## 编辑器

Flax 编辑器和 Unreal 编辑器非常相似。你可以在两个编辑器的截图中看到彩色编码的高亮区域，它们具有共同的功能。Flax 编辑器的布局也是高度可定制的，因此你可以拖放窗口来使编辑器适应你的工作流程。

![Unreal 编辑器](media/unreal-layout.png)

![Flax 编辑器](../media/flax-layout.png)

> [!TIP]
> Flax 编辑器的主要关注点是快速编译时间和项目打开速度。

## 术语

本节包含 UE4 中最常用的术语及其 Flax 等效项（或大致等效项）。Flax 关键词直接链接到文档中更深入的信息。

| Unreal              | Flax                                                         |
| ------------------- | ------------------------------------------------------------ |
| **Actor**           | [Actor](../scenes/actors.md)                                 |
| **Blueprint**       | [预制体](../prefabs/index.md) + [可视化脚本](../../scripting/visual/index.md) |
| **C++**             | [C++ 和 C#](../../scripting/index.md)                        |
| **Lumen**           | [DDGI](../../graphics/lighting/gi/realtime.md)               |
|                     |                                                              |
| **World Outliner**  | [场景窗口](../../editor/windows/scene-window.md)             |
| **Details Panel**   | [属性窗口](../../editor/windows/properties-window.md)        |
| **Content Browser** | [内容窗口](../../editor/windows/content-window.md)           |

## 项目

![Flax 项目](../media/project-structure.png)

Flax 项目结构与 UE4 项目类似。编辑器使用 **Cache** 文件夹来保存临时数据。此外，**Content** 文件夹的工作方式与 Unreal 相同（仅资源），而 **Source** 目录用于保存所有 C# 和 C++ 脚本。

Flax 还会为你的游戏脚本生成解决方案和项目文件。

请参阅 [Flax 项目结构](../project-structure.md) 页面以了解有关 Flax 引擎中项目的更多信息。

## 资源

Flax 也使用扩展名为 `.flax` 的二进制资源文件（而不是 `.uasset`）。我们使用自己的二进制格式，该格式针对可扩展性和流式传输进行了良好优化。其他资源通常以 `Json` 格式存储（场景、设置等）。

Flax 支持最流行的资源文件格式（适用于 3D 模型和纹理），因此你可以导入你的游戏内容。

请参阅[资源](../assets/index.md)页面以了解有关导入和使用游戏资源的更多信息。

## 场景和 Actor

Flax 不使用组件来构建场景对象逻辑。我们仅使用 [Actor](../scenes/actors.md)。每个 Actor 都有自己的类型（例如点光源、盒体碰撞体）和一组附加的脚本。这意味着，在 Flax 中，场景对象层级是使用 Actor 创建的。

然而，你仍然可以将实体-组件设计用于你的脚本，因为每个 Actor 都可以拥有脚本。
你可以使用 `GetChild<T>()`/`GetScript<T>()` 方法在你的脚本中访问其他对象。

在 Flax 中，场景对象也是一个 Actor，因此你可以像访问任何其他 Actor 一样访问它。这意味着场景可以拥有自己的脚本，并像其他对象一样进行变换。

此外，多个 Actor 可以具有相同的名称，你也可以随时移动资源，因为 Flax 使用对象的唯一 ID 进行跟踪。这释放了你的开发速度。我们不想将你的开发约束到某些古老的设计，而是允许你更快地迭代，并更轻松地创建精美的游戏。

## 脚本

在游戏脚本方面，Unreal 和 Flax 之间存在显著差异。
首先，我们支持 C++ 和 C# 语言来编写游戏代码，并附加可视化脚本。
使用可视化脚本或 C# 有助于快速游戏开发并简化开发，而用 C++ 编写部分游戏逻辑则可以提高性能。
Flax 引擎核心本身是用 C++ 编写的，而 Flax 编辑器主要用 C# 编写。

你可以创建包含脚本类的 C# 和 C++ 文件，这些类提供游戏逻辑。然后脚本可以附加到 Actor 并在游戏中使用。我们的脚本 C# API 是一个开源项目，可以在[此处](https://github.com/FlaxEngine/FlaxEngine)找到。欢迎所有贡献。

以下是为 Unreal 和 Flax 编写的示例脚本，它每帧打印下一个数字。

* Unreal

```cpp
#pragma once
#include "GameFramework/Actor.h"
#include "MyScript.generated.h"

UCLASS()
class AMyScript : public AActor
{
	GENERATED_BODY()
	int Count;

	AMyScript()
	{
		// 允许 Tick() 被调用
		PrimaryActorTick.bCanEverTick = true;
	}

	void BeginPlay()
	{
		// 在游戏启动或生成时调用
		Super::BeginPlay();
		Count = 0;
	}

	void Tick(float DeltaSeconds)
	{
		// 每帧调用
		Super::Tick(DeltaSeconds);
		GLog->Log(FString::FromInt(Count++));
	}
};
```

***

* Flax

```cs
using FlaxEngine;

public class MyScript : Script
{
	int Count;

	public override void OnStart()
	{
		// 用于初始化
		Count = 0;
	}

	public override void OnUpdate()
	{
		// 每帧调用 Update
		Debug.Log(Count++);
	}
}
```

***

请参阅[脚本](../../scripting/index.md)文档以了解有关 Flax 中脚本的更多信息。

<hr>

Unreal 及其徽标是 Epic Games, Inc. 的商标。
