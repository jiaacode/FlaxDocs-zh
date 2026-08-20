# 操作指南：创建主菜单

在本教程中，你将学习如何为你的游戏创建主菜单。

## 1. 创建 `UICanvas`

第一步是添加一个 [UI 画布](../canvas/index.md) Actor，用于渲染 GUI 控件。它支持在 *屏幕空间*、*世界空间* 和 *摄像机空间* 中渲染 GUI。此处使用选项 - **世界空间**，并将其放置在摄像机前方的某个位置。

要生成 UI 画布，可以使用工具箱窗口，从 **GUI** 部分拖放 **UI Canvas**。或者，你也可以使用场景树窗口，通过专用的上下文菜单添加新的场景对象。

![生成画布](media/spawn-canvas.png)

## 2. 创建 `UIControl`

按照与上一步相同的步骤，但这次创建一个代表单个 GUI 控件的 [UI 控件](../control/index.md) Actor。将其作为子级添加到 *UI 画布* 中（如下图所示）。

![生成控件](media/spawn-control.png)

## 3. 将控件类型设置为 `Button`

对于 GUI，使用一个 `Button` 控件。为此，选择生成的 **UI 控件**，然后单击 **设置类型** 按钮，将其类型设置为 **Button**。你可以从列表中选择项目或输入名称进行搜索。

![设置类型](media/set-button.png)

然后 `UI 控件` Actor 会将创建的控件链接到 GUI。显示 **游戏** 窗口选项卡以查看进度条。你可以使用 *设置类型* 按钮下方的面板调整其属性。

![编辑进度条](media/created-button.png)

## 4. 创建更多按钮

使用 **Ctrl+D** 复制创建的按钮，或使用变换小工具配合 **Shift + 鼠标** 克隆选中的按钮控件。以此为基础，准备更多的菜单选项。

![主菜单](media/main-menu-buttons.png)

## 5. 创建一个 `MainMenu` 脚本

添加一个名为 `MainMenu` 的新脚本，它将处理按钮点击事件。要了解有关创建和使用脚本的更多信息，请参阅[此教程](../../scripting/new-script.md)。

## 6. 编辑脚本

打开脚本文件并编写以下代码：

```cs
using System.Collections.Generic;
using FlaxEngine;
using FlaxEngine.GUI;

public class MainMenu : Script
{
	[Tooltip("The menu buttons.")]
	public List<ControlReference<Button>> Buttons;

	public override void OnStart()
	{
		if (Buttons == null || Buttons.Count == 0)
		{
			Debug.Log("No buttons");
			return;
		}

		foreach (var button in Buttons)
		{
			button.Control.ButtonClicked += OnButtonClicked;
		}
	}

	private void OnButtonClicked(Button button)
	{
		Debug.Log("Clicked: " + button.Text);
	}
}
```

***

## 7. 将脚本添加到 Actor

现在将脚本拖放到场景中的 Actor（例如 *Canvas*）上。

## 8. 将按钮链接到脚本

选择添加了 `MainMenu` 脚本的 Actor，将 `Buttons` 列表的大小设置为 3，然后将带有按钮的 `UIControl` Actor 拖放进去，为脚本分配对它们的引用。

![链接按钮](media/link-buttons.png)

## 9. 测试！

最后，点击 **播放** 按钮（或按 **F5** 键）并测试脚本逻辑。点击菜单按钮后，它将在 *调试* 窗口中打印其文本。使用回调来实现你的游戏逻辑，例如开始新游戏或向用户显示游戏选项。

![测试按钮](media/results-main-menu.png)
