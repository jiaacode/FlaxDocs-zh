# 输入

为了有效地处理用户交互，游戏需要持续访问输入数据。在 Flax 中，你可以通过使用 Input 类来读取玩家输入。

## 输入处理

Flax 支持两种类型的输入：
* **低级** API：这使你能够直接访问已连接输入设备的状态（例如鼠标位置、游戏手柄按钮）。
* **高级** API：它使用[虚拟输入](virtual-input.md)功能，在不同平台和输入设备之间提供更直观、统一的输入数据（例如“移动 X”轴、“跳跃”事件）。

游戏将需要使用 C# 脚本 API 来访问输入数据。这可以通过使用 [Input](https://docs.flaxengine.com/api/FlaxEngine.Input.html) 类来完成。它在运行时和编辑器内运行模式下提供低级和高级输入数据。

## 本节内容

* [虚拟输入](virtual-input.md)
* [输入设置](input-settings.md)
* [鼠标](mouse.md)
* [键盘](keyboard.md)
* [游戏手柄](gamepads.md)
