# Flax 术语表

此页面列出并描述了 Flax 引擎中最常用的术语。例如，如果你发现自己提出诸如 *“什么是 Actor？”* 或 *“什么是 Visject？”* 之类的问题，此页面将帮助你理解每个术语的含义。提供了链接，以供更多文档和操作指导。

## 术语表

| 术语                | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| **Project**         | 一个独立的目录，包含开发期间使用的所有游戏文件。请参阅 [Flax 项目结构](project-structure.md) 页面以了解更多信息。 |
| **Actor**           | Actor 是可以放置在你的关卡中的对象。每个 [Actor](https://docs.flaxengine.com/api/FlaxEngine.Actor.html) 都链接到父 Actor（除了场景 Actor，它们是层级的根），并且可以有子 Actor（树形层级）。Actor 有自己的 3D 变换（平移、旋转和缩放），并继承父 Actor 的变换。你可以将 C# 脚本附加到 Actor，并在运行时生成/销毁它们。请参阅 [Actor](scenes/actors.md) 页面以了解更多信息。 |
| **C# Script**       | 一个文本文档，包含用 [C# 语言](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/) 编写的自定义 [Script](https://docs.flaxengine.com/api/FlaxEngine.Script.html) 类实现的源代码。 |
| **Scene Objects**   | 此术语指的是 **Actor** 和 **Script**，因为它们可以在你的游戏中被实例化并出现在场景中。每个场景对象都可以在运行时创建和销毁，并由 [Object.ID](https://docs.flaxengine.com/api/FlaxEngine.Object.html#FlaxEngine_Object_ID) 标识。 |
| **Visject**         | 一种可视化曲面图，包含连接成网络的节点。例如，它被 [材质编辑器](../graphics/materials/material-editor/index.md) 用于创建材质着色器。*Visject* 是以前版本引擎中现已弃用的可视化脚本界面的名称。它已被 C# 脚本取代。 |
| **Visual Script**   | 一种内置的二进制资源，包含带有可视化脚本节点、属性和元数据的图。该图在运行时由引擎处理和执行。它用于可视化脚本，这是一种基于非代码的游戏逻辑编程方法。 |
| **Prefab**          | 一种 json 格式的资源，包含预制体数据。它保存了预制体对象集合的序列化数据。预制体可以被实例化以重用原型内的对象。 |
| **Prefab Instance** | 生成的预制体对象可以包含对预制体资源和预制体对象的链接。它们可以在运行时修改，并且可以包含多个 Actor（整个 Actor 树，包括嵌套的预制体）。 |
| **Flax**            | ![Flax 图标](../../media/Web_Logo_64.png)                    |
