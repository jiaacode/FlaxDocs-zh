# 输入设置

**输入设置资源** 用于为你的游戏设置默认输入配置。此资源包含操作映射和轴映射的描述，这些映射用于将物理输入映射为更统一的配置。请参阅[虚拟输入](virtual-input.md)页面以了解更多信息。

## 创建输入设置

1. 在 *内容* 窗口中导航到 Content 目录

2. 右键单击并选择选项 **新建 -> 设置**，指定资源名称（例如 *Input Settings*）并按 *Enter*
   <br>![教程](/manual/media/new-settings.jpg)

3. 选择选项 **输入设置** 并按下 **创建** 按钮
   <br>![教程](/manual/media/input-settings-new.jpg)

4. 双击资源以打开并编辑它。
   <br>![教程](/manual/media/empty-input-settings.jpg)

## 使用输入设置

你可以创建任意数量的输入设置资源（甚至每个平台的专用版本），但在构建游戏时只能使用一个。使用 **游戏设置** 资源（始终位于 `Content/GameSettings.json`）来指定你希望使用的输入设置资源。如果你的游戏使用更高级的配置，你可以从代码中的构建脚本编辑游戏设置（使用 C# API 中的 [GameSettings.Load](https://docs.flaxengine.com/api/FlaxEditor.Content.Settings.GameSettings.html#FlaxEditor_Content_Settings_GameSettings_Load) 和 [GameSettings.Save](https://docs.flaxengine.com/api/FlaxEditor.Content.Settings.GameSettings.html#FlaxEditor_Content_Settings_GameSettings_Save__1___0_)）。

![使用输入设置](/manual/media/use-input-settings.jpg)

## 操作映射

![操作映射](/manual/media/input-action-mappings.jpg)

**操作映射** 用于配置虚拟操作。它有助于将物理鼠标或游戏手柄按钮绑定到由名称标识的特定操作。稍后游戏可以使用操作名称来跟踪这些输入事件。

有用的 C# API：[InputEvent](https://docs.flaxengine.com/api/FlaxEngine.InputEvent.html)、[Input.ActionConfig](https://docs.flaxengine.com/api/FlaxEngine.ActionConfig.html) 和 [Input.ActionMappings](https://docs.flaxengine.com/api/FlaxEngine.Input.html#FlaxEngine_Input_ActionMappings)。

| 属性             | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| **名称**         | 操作的 *“友好名称”*，用于从代码中访问它。                    |
| **模式**         | 触发模式。允许用户指定何时触发输入事件。请参阅 [InputActionMode](https://docs.flaxengine.com/api/FlaxEngine.InputActionMode.html)。 |
| **按键**         | 为此操作映射的[键盘按键](https://docs.flaxengine.com/api/FlaxEngine.KeyboardKeys.html)。使用 *None* 以忽略它。 |
| **鼠标按钮**     | 为此操作映射的[鼠标按钮](https://docs.flaxengine.com/api/FlaxEngine.MouseButton.html)。使用 *None* 以忽略它。 |
| **游戏手柄按钮** | 为此操作映射的[游戏手柄按钮](https://docs.flaxengine.com/api/FlaxEngine.GamepadButton.html)。使用 *None* 以忽略它。 |
| **游戏手柄**     | 应使用哪个游戏手柄。                                         |

## 轴映射

![轴映射](/manual/media/input-axis-mappings.jpg)

**轴映射** 用于配置虚拟轴。它有助于将物理游戏手柄扳机或鼠标移动绑定到归一化且统一的输入源。稍后游戏可以使用虚拟输入接口访问这些输入轴的值。

有用的 C# API：[InputAxis](https://docs.flaxengine.com/api/FlaxEngine.InputAxis.html)、[Input.AxisConfig](https://docs.flaxengine.com/api/FlaxEngine.AxisConfig.html) 和 [Input.AxisMappings](https://docs.flaxengine.com/api/FlaxEngine.Input.html#FlaxEngine_Input_AxisMappings)。

| 属性           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| **名称**       | 轴的 *“友好名称”*，用于从代码中访问它。                      |
| **轴**         | 轴类型（鼠标、游戏手柄等）。请参阅 [InputAxisType](https://docs.flaxengine.com/api/FlaxEngine.InputAxisType.html)。 |
| **游戏手柄**   | 应使用哪个游戏手柄。                                         |
| **正方向按钮** | 向正方向移动时要按下的按钮。使用 *None* 以忽略它。           |
| **负方向按钮** | 向负方向移动时要按下的按钮。使用 *None* 以忽略它。           |
| **死区**       | 任何小于此数的正值或负值将注册为零。对于游戏手柄指定死区非常有用。 |
| **灵敏度**     | 对于键盘输入，较大的值将导致更快的响应时间（单位/秒）。较低的值会更加平滑。对于鼠标增量，该值将缩放实际的鼠标增量。 |
| **重力**       | 对于键盘输入，此值描述输入居中的速度。当设备处于静止状态时，输出值重置为中性值的速度（单位/秒）。 |
| **缩放**       | 应用于轴值的附加缩放参数。允许反转它或修改范围。             |
| **吸附**       | 如果勾选，轴值在接收到相反输入后将立即重置为零。仅用于键盘输入。 |

## 键盘按键选择

![使用键盘选择键盘按键枚举](/manual/media/keyboard-navigation-context-menu.gif)

有时，为操作/轴映射选择正确的按键可能会很麻烦，因为有太多键盘按键需要滚动浏览。为了简化此操作，你可以**使用键盘在打开的上下文菜单弹出窗口中搜索**项目。通过多次按下某个键，它将带你遍历以该字母开头的每个键。你还可以**使用方向键在列表中导航**，并**按 Enter 确认选择**。这使得设置输入设置更加容易。此功能适用于编辑器中所有较长的上下文菜单列表。
