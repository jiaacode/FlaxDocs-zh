# 操作指南：创建 UI

在本教程中，你将学习如何为你的游戏创建用户界面。请按照以下步骤为你的玩家准备一个简单的生命值条。

## 1. 创建 `UICanvas`

第一步是添加 [UI 画布](../canvas/index.md) Actor，它用于渲染 GUI 控件。它支持在 *屏幕空间*、*世界空间* 和 *摄像机空间* 中渲染 GUI。此处使用默认选项 - 屏幕空间。

要生成 UI 画布，可以使用工具箱窗口，从 **GUI** 部分拖放 **UI Canvas**。或者，你也可以使用场景树窗口，通过专用的上下文菜单添加新的场景对象。

![生成画布](media/spawn-canvas.png)

## 2. 创建 `UIControl`

按照与上一步相同的步骤，但这次创建一个代表单个 GUI 控件的 [UI 控件](../control/index.md) Actor。将其作为子级添加到 *UI 画布* 中（如下图所示）。

![生成控件](media/spawn-control.png)

## 3. 将控件类型设置为 `Progress Bar`

创建的 GUI 将使用 `Progress Bar` 控件来可视化玩家的生命值。为此，选择生成的 **UI 控件**，然后使用 **设置类型** 按钮将其类型设置为 **Progress Bar**。从列表中选择项目或输入名称进行搜索。

![设置类型](media/set-progress-bar.png)

然后 `UI 控件` Actor 会将创建的控件链接到 GUI。显示 **游戏** 窗口选项卡以查看进度条。你可以使用 *设置类型* 按钮下方的面板调整其属性。

![编辑进度条](media/created-progress-bar.gif)

## 4. 创建 `PlayerHealth` 脚本

添加一个名为 `PlayerHealth` 的新脚本，它将控制玩家的生命值并更新进度条以可视化它。要了解有关创建和使用脚本的更多信息，请参阅[此教程](../../scripting/new-script.md)。

## 5. 编辑脚本

打开脚本文件并编写以下代码：

```cs
using FlaxEngine;
using FlaxEngine.GUI;

namespace Game
{
	public class PlayerHealth : Script
	{
		[Limit(0, 100), Tooltip("当前玩家生命值（范围为 0-100）")]
		public float Health { get; set; } = 100.0f;

		[Tooltip("指向玩家生命值进度条控件的引用")]
		public ControlReference<ProgressBar> HealthBar { get; set; }

		private ProgressBar _healthBar;

		public override void OnStart()
		{
			// 缓存生命值条控件
			_healthBar = HealthBar.Control;
			if (_healthBar == null)
			{
				Debug.LogError("Missing health bar control");
				return;
			}
		}

		public override void OnUpdate()
		{
			// 使用按键控制生命值
			if (Input.GetKey(KeyboardKeys.Q))
				Health -= 5;
			if (Input.GetKey(KeyboardKeys.E))
				Health += 5;
			Health = Mathf.Clamp(Health, 0, 100);

			// 更新进度条
			_healthBar.Value = Health;
		}
	}
}
```

***

## 6. 将脚本添加到玩家

现在将脚本拖放到玩家 Actor 上。

## 7. 将 *Progress Bar* 控件引用链接到 Player Health 脚本

选择玩家 Actor，然后将步骤 2 中创建的 `UIControl` Actor 拖放进去，为脚本分配对它的引用。

![链接进度条](media/link-progress-bar.gif)

## 8. 测试！

最后，点击 **播放** 按钮（或按 **F5** 键），并通过使用 **Q** 和 **E** 键来降低或提高生命值，测试玩家生命值控制器。

稍后你可以将现有的游戏逻辑链接起来，以可视化玩家的生命值，或为你的游戏创建更多 HUD。

![测试生命值条](media/test-progress-bar.gif)
