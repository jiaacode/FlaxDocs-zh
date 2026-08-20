# 游戏手柄

**游戏手柄** 是主机和桌面端最流行的输入设备之一。Flax 支持同时连接多达 8 个游戏手柄设备。此外，每个游戏手柄都可以使用自定义的按钮/扳机布局。这有助于处理不同类型的游戏手柄。

## 访问游戏手柄

使用 [Input.Gamepads](https://docs.flaxengine.com/api/FlaxEngine.Input.html#FlaxEngine_Input_Gamepads) 属性获取所有已连接游戏手柄的列表。每个游戏手柄可以通过操作系统提供的 ID 和名称来标识。

你可以使用 [Gamepad](https://docs.flaxengine.com/api/FlaxEngine.Gamepad.html) 对象的方法来读取原始设备状态，并设置震动反馈或布局。

以下是一个列出所有已连接游戏手柄的示例代码：

```cs
foreach (var gamepad in Input.Gamepads)
	Debug.Log("Gamepad: " + gamepad.Name + "(" + gamepad.ProductID + ")");
```

***

## 游戏手柄扫描

Flax 输入层支持在运行时检测已连接的游戏手柄。某些平台（例如 Xbox One）会暴露用于跟踪输入设备更改的事件，但其他平台（例如 Windows）默认会处理游戏手柄的更改。

如果你想检测游戏手柄设备的任何更改（连接/断开），请使用 [Input.GamepadsChanged](https://docs.flaxengine.com/api/FlaxEngine.Input.html#FlaxEngine_Input_GamepadsChanged) 事件。它总是在脚本更新之前的主应用程序线程上调用。这有助于在本地多人游戏中检测新/旧玩家。
