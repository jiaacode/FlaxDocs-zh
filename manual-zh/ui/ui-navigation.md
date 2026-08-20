* # UI 导航

  ![UI 导航](media/ui-navigation.gif)

  **UI 导航** 允许通过键盘方向键或游戏手柄按键等输入操作在用户界面中执行焦点导航。此功能对于主机游戏或其他支持游戏手柄的游戏至关重要，这些游戏旨在无需鼠标输入或用户触摸输入即可提供完整的 UI 可用性。

  ## 导航设置

  ![画布上的 UI 导航设置](media/ui-navigation-canvas.png)

  [UI 画布](canvas/index.md) 包含用于导航设置的属性，例如输入时序和用于触发导航的输入操作名称（在输入设置中定义）。通过在 [输入设置](../input/input-settings.md) 中添加带有上/下/左/右/提交操作的输入操作，画布将触发 UI 导航。你还可以调整导航输入延迟和速率。

  ![UI 导航设置](media/ui-navigation-settings.png)

  正确设置输入后，UI 将自动路由焦点导航。导航流程基于启用了 `Auto Focus` 属性的控件，该属性默认对所有可交互控件（如按钮、复选框和下拉列表）启用。你可以手动将其他控件包含或排除在导航之外，甚至可以通过在 UI 控件上使用显式的 `Nav Target` 属性来覆盖每个控件的导航。

  ![控件上的 UI 导航设置](media/ui-navigation-control.png)

  ## 自定义控件

  如果你正在使用自定义 UI 控件，可以使用：
  * `IsNavFocused` 获取器来检测控件当前是否具有导航焦点。
  * `NavigationFocus` 方法来重写并响应导航焦点的获取。
  * `OnSubmit` 方法来重写用户与控件交互时执行的操作。
  * `GetNavTarget` 方法来重写每个控件的导航流程。
  * `GetNavOrigin` 方法来重写控件内的导航原点。
  * `OnNavigate` 方法来重写默认的导航流程逻辑。

  ## 编辑器中的导航

  ![编辑器中的 UI 导航](media/ediotr-ui-navigation.gif)

  Flax 编辑器使用内置的 UI 导航系统，并处理：
  * `Tab` 键导航到下一个控件。
  * `Enter` 键提交与聚焦控件的用户交互，或在打开的对话框上确认。
  * `Escape` 键取消与聚焦控件的用户交互，或取消打开的对话框。
  * `方向键` 在上下文菜单、列表弹出窗口、树形层级等中导航。
