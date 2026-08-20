# 操作指南：创建自定义编辑器窗口

在本教程中，您将学习如何通过创建完全自定义的工具窗口来扩展 Flax 编辑器。

Flax 编辑器支持两种基本类型的窗口：
* *原生窗口* - 使用 C# UI 来设置 GUI
* *自定义编辑器窗口* - 使用[自定义编辑器](../custom-editors/index.md)管道来设置 GUI

本教程介绍如何创建第二种类型。

### 1. 准备一个带有自定义编辑器的示例脚本（或使用您游戏中的脚本）

为了展示自定义编辑器窗口，我们将使用带有一个按钮的自定义编辑器。
要了解更多信息，请参阅教程[操作指南：创建自定义编辑器](custom-editor.md)。

游戏脚本示例：

```cs
public class MyScript : Script
{
    public float Speed = 11;

    public Color LightColor = Color.Yellow;

    public override void OnStart()
    {
    }
}
```

***

自定义编辑器示例：

```cs
[CustomEditor(typeof(MyScript))]
public class MyScriptEditor : GenericEditor
{
    public override void Initialize(LayoutElementsContainer layout)
    {
        base.Initialize(layout);

        layout.Space(20);
        var button = layout.Button("Click me", Color.Green);
        button.Button.Clicked += () => Debug.Log("Button clicked!");
    }
}
```

***

### 2. 创建新脚本

导航到 `Source/<module_name>` 目录，并创建新的 `MyWindow` 脚本。或者，您也可以使用额外的编辑器专用脚本模块，如[此处](add-scripts-module.md)的教程所示。

![教程](media/custom-window-tutorial-1.jpg)

### 3. 实现编辑器窗口

打开代码编辑器，编写如下编辑器窗口代码。它应当实现 [CustomEditorWindow](https://docs.flaxengine.com/api/FlaxEditor.CustomEditorWindow.html) 类。请注意，它需要像自定义编辑器那样重写 `public override void Initialize(LayoutElementsContainer layout)` 函数。

```cs
public class MyWindow : CustomEditorWindow
{
	private TextBoxElement textbox;

	public override void Initialize(LayoutElementsContainer layout)
	{
		layout.Label("My Window", TextAlignment.Center);
		layout.Space(20);
		textbox = layout.TextBox();
		var button = layout.Button("Click me", Color.Blue);
		button.Button.Clicked += OnButtonClicked;
	}

	private void OnButtonClicked()
	{
		MessageBox.Show("Entered value: " + textbox.TextBox.Text);
	}
}
```

***

### 4. 添加用于显示窗口的代码

导航到 `MyScriptEditor`，并修改绿色按钮的点击事件处理程序。它应当创建新窗口并将其显示给用户。

```cs
button.Button.Clicked += () => new MyWindow().Show();
```

***

### 5. 查看结果

返回编辑器，等待脚本重新加载，然后选择附加了 `MyScript` 的对象。

![教程](media/custom-window-tutorial-2.jpg)

然后按下按钮。您的自定义窗口应当会显示出来。它像其他编辑器窗口一样工作，因此您可以拖拽和停靠它，或将其移动到任意位置。

![教程](media/custom-window-tutorial-3.jpg)

现在在文本框中输入一些内容，然后点击蓝色按钮，即可看到显示所输入文本的消息框。如果您想关闭此窗口，只需点击右上角的叉号图标。

![教程](media/custom-window-tutorial-4.jpg)
