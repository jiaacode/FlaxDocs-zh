# 操作指南：从代码更改动画图参数

在本教程中，你将学习如何使用 C# 脚本创建和访问[动画图](../anim-graph/index.md)参数。你可以将图参数视为图的公共变量，可以从外部修改以配置逻辑。例如，你可以创建一个名为 **Speed** 的参数，并使用它在角色的 *Run* 和 *Walk* 动画之间进行混合，从而为你的游戏实现合适的动画播放。

## 1. 创建动画图

![动画图窗口](media/anim-walk-playback.gif)

首先准备你的动画图资源。要了解如何设置，请参阅相关教程[如何创建动画图](create-anim-graph.md)。

## 2. 添加图参数

![动画图添加参数](media/add-param-button.jpg)

现在添加一个或多个图参数。只需指定参数类型（使用组合框菜单），然后单击 **添加参数** 按钮。它将添加一个新参数。你可以通过使用专用的上下文菜单重命名或删除已创建的参数。只需右键单击参数名称标签。你还可以指定参数的默认值。

![动画图编辑参数](media/anim-param-edit.jpg)

## 3. 使用图参数

下一步是在图中访问此参数。只需生成 **获取参数** 节点，然后从下拉菜单中选择你的参数。

![动画图获取参数](media/get-param-node-add.jpg)

之后，将你的参数输出与其他节点连接以实现所需的使用。在此示例中，**Head Scale** 参数用于使用 **变换骨骼（局部空间）** 节点缩放骨骼。请注意，动画图支持隐式类型转换，因此值类型 **float** 会被转换为用于骨骼变换缩放的 **Float3** 类型。

![动画图获取参数](media/get-param-node-use.png)

## 4. 从 C# 设置图参数

在以下代码示例中，图脚本获取动画模型参数并设置该值。你可以缓存图参数、遍历它们，并从代码的任何部分访问它们。

```cs
using FlaxEngine;

public class EditAnimGraphParam : Script
{
	[Range(0.5f, 2.5f)]
	public float HeadScale  = 1.0f;

	private AnimGraphParameter _parameter;

	public override void OnStart()
	{
		// 缓存参数句柄
		_parameter = Actor.As<AnimatedModel>().GetParameter("Head Scale");
	}

	public override void OnUpdate()
	{
		// 更新值
		_parameter.Value = HeadScale;
	}
}
```

***

## 5. 查看结果

以下是一个缩放角色头部骨骼的示例用法。

![动画图参数编辑](media/edit-anim-graph-param-code.gif)
