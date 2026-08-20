# 操作指南：创建自定义控件

在本教程中，你将学习如何为你的游戏创建自定义的用户界面控件。Flax Engine 使用 C# 端脚本编写 UI，因此你可以根据需要添加自己的控件和容器控件。

## 1. 创建 `MyControl` 脚本

添加一个名为 `MyControl` 的新脚本，它将实现控件逻辑。该 C# 类需要继承自 [Control](https://docs.flaxengine.com/api/FlaxEngine.GUI.Control.html) 类型。要了解有关创建和使用脚本的更多信息，请参阅[此教程](../../scripting/new-script.md)。

## 2. 编辑脚本

打开脚本文件并编写以下代码：

```cs
using FlaxEngine;
using FlaxEngine.GUI;

namespace Game
{
	public class MyControl : Control
	{
		[EditorOrder(0), Tooltip("The Tint color for the texture. Uses red as default.")]
		public Color TintColor { get; set; } = Color.Red;

		[EditorOrder(1), Tooltip("The texture to be drawn.")]
		public Texture Image { get; set; }

		/// <inheritdoc />
		public override void Draw()
		{
			base.Draw();

			Render2D.DrawTexture(Image, new Rectangle(Float2.Zero, Size), TintColor);
		}
	}
}

```

***

如你所见，它公开了一个纹理属性和用于渲染的色调颜色。使用 [Render2D](https://docs.flaxengine.com/api/FlaxEngine.Render2D.html) 来执行自定义渲染任务。你还可以重写所有控件事件，为你的 UI 提供任何其他自定义逻辑。请随意尝试。

## 3. 生成 `UI Control`

现在在场景中生成一个新的 *UI 控件*，并将其类型设置为 **MyControl**，如下图所示。
要了解如何操作，请参阅相关[教程](create-ui.md)。

![将控件类型设置为 MyControl](/manual/media/set-control-to-my-control.png)

## 4. 测试！

最后，调整控件的公开属性并查看最终结果。

![最终结果](/manual/media/custom-control-results.png)
