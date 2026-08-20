# 蒙皮模型

![蒙皮模型](/manual/media/title.jpg)

**蒙皮模型** 是已经过蒙皮处理以匹配骨骼层级结构的[模型](../../graphics/models/index.md)。绑定后的模型包含蒙皮信息，该信息描述了模型移动时网格顶点如何变换。

导入后的蒙皮模型包含一个骨骼结构。**骨骼**是一种结构，描述了蒙皮模型的变形模式。你可以将其想象为由骨骼组成的人体骨架。每块骨骼都有一个父骨骼。当父骨骼改变其位置时，也会影响子骨骼的位置。例如，手部骨骼可能有五个子骨骼（手指和拇指）；当手上下移动时，手指和拇指也随之移动。

## 导入蒙皮模型

导入蒙皮模型的方式与其他资源类型相同。只需将模型文件从 *资源管理器* 拖放到 *内容* 窗口中，或使用 *导入* 按钮。

![导入蒙皮模型](../animation/media/import-animation.jpg)

选择文件后，**导入文件设置** 对话框将显示。它用于为每个资源指定导入选项。在大多数情况下，默认值即可，你只需按下 **导入** 按钮。请记住将导入的模型类型设置为 **蒙皮模型**，否则它将作为静态模型资源导入。

> [!Note]
> 使用 **导入文件设置** 对话框，你可以一次选择多个资源（或使用 **Ctrl+A** 全选）并同时指定导入选项。

每个资源都可以重新导入（源文件的相对路径会被缓存），并可以使用动画窗口修改导入设置。

要了解有关 **导入选项** 的更多信息，请参阅[模型导入页面](../../graphics/models/import.md)。

> [!Note]
> 出于性能原因，Flax 在导入时会分离骨骼（用于蒙皮）和骨骼节点层级（用于渲染的骨骼更少）。如果你的模型使用了插槽或任何专用节点，它们可能会丢失。但是，最好在 Flax 中使用骨骼插槽 Actor。

Flax 支持蒙皮模型的**细节层次**，包括在导入时自动生成。

## 编辑蒙皮模型

![蒙皮模型窗口](/manual/media/skinned-model-window.jpg)

要在 *内容* 窗口中查看和编辑导入的蒙皮模型资源，请双击它。
你可以编辑默认材质槽，或从源文件快速重新导入资源。该窗口还包含各种调试工具，例如骨骼[调试](../advanced/bones-debugging.md)和网格信息面板。
要了解有关编辑蒙皮模型属性和探索它的更多信息，请参阅[窗口界面](interface.md)页面。

## 使用蒙皮模型

蒙皮模型被动画系统的许多部分使用。
最重要的用途是为渲染系统提供网格数据。
此外，像[动画图](../anim-graph/index.md)和[骨骼遮罩](../skeleton-mask.md)这样的资源也使用蒙皮模型资源中索引的骨骼结构。你还可以通过 C# 脚本 API（参见 [SkinnedModel](https://docs.flaxengine.com/api/FlaxEngine.SkinnedModel.html) 类）访问骨骼数据。

## Blend Shapes

![Blend Shapes](/manual/media/blend-shapes.gif)

Flax 支持为蒙皮模型导入和使用 Blend Shapes（即变形目标）。这对于在对话场景中实现角色面部表情或口型同步非常有用。导入资源时，请勾选 **导入 Blend Shapes** 选项。然后你将能够在蒙皮模型窗口中预览 Blend Shapes（每个通道都可以在 *Blend Shapes* 组下进行调整）。
然后，你可以在运行时使用 [AnimatedModel](https://docs.flaxengine.com/api/FlaxEngine.AnimatedModel.html) 类的方法 *SetBlendShapeWeight* / *GetBlendShapeWeight* / *ClearBlendShapeWeights* 从代码控制 Blend Shapes 的外观。
