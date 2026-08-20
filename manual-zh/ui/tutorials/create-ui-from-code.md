# 操作指南：从代码创建 UI

在本教程中，你将学习如何为你的游戏创建用户界面。请按照以下步骤为你的玩家准备一个简单的生命值条。

## 1. 创建 `PlayerHealthFromCode` 脚本

添加一个名为 `PlayerHealthFromCode` 的新脚本，它将控制玩家的生命值并更新进度条以可视化它。要了解有关创建和使用脚本的更多信息，请参阅[此教程](../../scripting/new-script.md)。

## 2. 编辑脚本

打开脚本文件并编写以下代码：

```cs
using FlaxEngine;
using FlaxEngine.GUI;

namespace Game
{
	public class PlayerHealthFromCode : Script
	{
		[Limit(0, 100), Tooltip("The current player health (in range 0-100)")]
		public float Health { get; set; } = 100.0f;

		private ProgressBar _healthBar;

		public override void OnEnable()
		{
			_healthBar = new ProgressBar
			{
				Width = 120,
				Parent = RootControl.GameRoot,
			};
			_healthBar.Value = Health;
		}

		public override void OnDisable()
		{
			_healthBar.Dispose();
			_healthBar = null;
		}

		public override void OnUpdate()
		{
			if (Input.GetKey(KeyboardKeys.Q))
				Health -= 5;

			if (Input.GetKey(KeyboardKeys.E))
				Health += 5;

			Health = Mathf.Clamp(Health, 0, 100);
			_healthBar.Value = Health;
		}
	}
}
```

***

如你所见，它在 `OnEnable` 事件中创建了一个 `ProgressBar` 控件，并在 `OnDisable` 中释放它。创建的 GUI 控件链接到 `RootControl.GameRoot` 容器控件，该控件用作主游戏 UI 控件（最顶层）。
你可以在运行时创建更多 UI 元素并管理它们，但请记住在脚本被禁用或从游戏中移除时释放或取消链接它们。

## 3. 将脚本添加到玩家

现在将脚本拖放到玩家 Actor 上。

## 4. 测试！

最后，点击 **播放** 按钮（或按 **F5** 键），并通过使用 **Q** 和 **E** 键来降低或提高生命值，测试玩家生命值控制器。

稍后你可以将现有的游戏逻辑链接起来，以可视化玩家的生命值，或为你的游戏创建更多 HUD。

![测试生命值条](media/test-progress-bar.gif)
