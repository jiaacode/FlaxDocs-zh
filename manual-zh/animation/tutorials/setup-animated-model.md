# 操作指南：设置动画模型

在本教程中，你将学习如何在游戏中创建和使用动画模型 Actor。

## 1. 添加动画模型 Actor

![添加动画模型](/manual/media/add-animated-model.jpg)

下一步是向场景中创建[动画模型](../animated-model.md) Actor。
这种类型的 Actor 使用蒙皮模型资源和动画图来更新动画并渲染蒙皮模型。
有几种方法可以创建它。你可以在运行时从 C# 脚本生成它，通过场景树窗口上下文菜单将其添加到场景中，或者只需将蒙皮模型资源**拖放**到编辑器视口中。

![添加动画模型](/manual/media/add-animated-model.gif)

## 2. 链接蒙皮模型

![动画图分配](/manual/media/anim-graph-property-model-2.jpg)

生成动画模型后，它将链接蒙皮模型进行渲染，但你可以通过设置 **蒙皮模型** 属性来手动修改。只需选择 Actor，然后将蒙皮模型资源拖放到资源选择器中。

## 3. 链接动画图

![动画图分配](/manual/media/anim-graph-property-model.jpg)

下一步是为其分配[动画图](../anim-graph/index.md)，以便动画可以在每帧更新。同样，将动画图资源拖放到 **动画图** 属性中。

## 4. 查看结果

![播放动画](/manual/media/play-animated-mode.gif)

最后，只需按下 **播放** 按钮或按 **F5** 键。你应该会看到你的动画正在播放。

## 从代码生成动画模型

以下是一个示例脚本，当用户单击鼠标左键时生成动画模型 Actor。

```cs
using FlaxEngine;

public class SpawnAnimModel : Script
{
	public AnimationGraph AnimGraph;
	public SkinnedModel Model;

	public override void OnUpdate()
	{
		if (Input.GetMouseButtonDown(MouseButton.Left))
		{
			var actor = new AnimatedModel();
			actor.Name = "My animated model";
			actor.SkinnedModel = Model;
			actor.AnimationGraph = AnimGraph;
			Level.SpawnActor(actor);
		}
	}
}
```

***

