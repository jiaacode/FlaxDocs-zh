# 虚拟输入

**虚拟输入** 是 Flax 的一项功能，用于统一不同输入设备和运行时平台之间的输入数据。它有助于跨平台开发，并在原始输入设备和游戏脚本之间添加了一个方便的抽象层。它高度可配置，可用于所有使用 Flax 制作的游戏。

本文档涵盖了虚拟输入接口的用法和重要部分。

## 设置和使用

使用虚拟输入的第一步是准备适当的配置。这是通过 **输入设置** 资源完成的。你可以在[输入设置](input-settings.md)页面上了解有关创建和使用这些设置的更多信息。如果你使用 *Flax 模板* 之一，它应该已经在 `Content/Settings/Input Settings.json` 中包含了一个适当的配置文件。在编辑器中打开此资源。

![虚拟输入配置](/manual/media/virtual-input-config.jpg)

如上图所示，可以有多个虚拟输入，并且每个虚拟输入可以绑定多个输入。例如，`Fire` 操作被设置为在 `鼠标左键` 和 `游戏手柄按钮 A` 上触发。此操作设置为 `按下` 模式，这意味着当操作被激活时，它将触发一个事件。

在你的 C# 脚本中，你可以直接读取操作的状态：

```cs
public override void OnUpdate()
{
	if (Input.GetAction("Fire"))
	{
		ShootBall();
	}
}
```

***

你还可以使用 [InputEvent](https://docs.flaxengine.com/api/FlaxEngine.InputEvent.html) 和 [InputAxis](https://docs.flaxengine.com/api/FlaxEngine.InputEvent.html) 类来进一步配置你的脚本，直接将方法订阅到 `Pressed` 事件：

```cs
public InputEvent FireEvent = new InputEvent("Fire");
public InputAxis MouseX = new InputAxis("MouseX");

public OnStart()
{
	// 注册输入操作事件
	FireEvent.Pressed += ShootBall;
}

private void ShootBall()
{
	Debug.Log("Shooting Ball");
}

public override void OnUpdate()
{
	// 读取虚拟轴的值
	var mouseX = MouseX.Value;
	...
}

public override void OnDestroy()
{
	// 取消注册输入操作事件
	FireEvent.Pressed -= ShootBall;

	// 记得释放操作对象（它持有对你方法的引用）
	FireEvent.Dispose();
	MouseX.Dispose();
}
```

***

如果你在编辑器中选择了带有此脚本的 Actor，你可以在不编辑代码的情况下修改 `FireEvent` 和 `MouseX` 的名称。

![虚拟输入脚本](/manual/media/virtual-input-script-example.jpg)
