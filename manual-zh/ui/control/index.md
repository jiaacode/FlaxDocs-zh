# UI 控件

![UI 控件](media/title.jpg)

**UI 控件** 是一种包含单个 GUI 控件的 Actor 类型。它负责将控件链接到父容器控件或画布，并提供可靠的数据序列化以及 C# API。

## 设置控件类型

在编辑器中，要设置控件类型，请选择 UI 控件并单击 **Set Type** 按钮。你可以从列表中选择一种类型，或者输入以按类名搜索。它还支持从代码创建的自定义控件类型。要了解有关它的更多信息，请参阅相关教程[此处](../tutorials/create-custom-control.md)。

![设置类型](media/set-type.png)

你还可以从 C# 代码修改控件，如下所示：

```cs
public class MyScript : Script
{
	public UIControl MyControl;

	public override void OnStart()
	{
		MyControl.Control = new Button
		{
			Text = "Hello there!",
			Width = 130,
		};
	}
}
```

***

最后，你还可以更改已创建控件的类型，并在需要时撤销更改。

## 编辑控件

你可以使用 *属性窗口* 修改已创建控件的所有暴露属性。选择控件 Actor 并编辑控件。最顶部的带有 **Type** 标签的属性显示当前控件类型的完整名称。

要了解有关使用控件 **变换** 的更多信息，请参阅相关文档[此处](transform.md)。

![属性](media/properties.png)
