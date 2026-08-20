# 访问游戏窗口

Flax 会自动为游戏创建主窗口。某些平台允许自定义它（例如桌面），而在其他平台上对其的访问是固定的（例如主机）。然而，Flax 支持用于创建自定义窗口（多窗口设置）的 API，你也可以从脚本中访问预创建的窗口。

## 更改窗口标题

要更改游戏窗口的标题，只需访问游戏 UI 的根控件，并获取其父窗口。

```cs
#if !FLAX_EDITOR
RootControl.GameRoot.RootWindow.Window.Title = "Hello!"
#endif
```

***

你也可以手动调整窗口大小或位置。

## 管理光标和焦点

引擎提供了通过 `Screen.CursorVisible` 和 `CursorLock.CursorLockMode` 属性来显示/隐藏和约束鼠标光标的工具。光标锁定模式有：
* `None` - 默认模式。
* `Locked` - 光标位置锁定到游戏窗口的中心。适用于 FPS 游戏。
* `Clipped` - 光标位置被限制在游戏窗口的边界内。适用于 RTS/策略游戏。

你的游戏摄像机脚本可以管理这些，并使用 `Engine.HasGameViewportFocus` 属性来检测游戏视口是否被玩家聚焦，这在编辑器中得到了很好的支持，允许开发者在游戏运行于某个编辑器窗口时调试游戏：

```cs
/// <inheritdoc />
public override void OnUpdate()
{
    if (Engine.HasGameViewportFocus)
    {
        Screen.CursorVisible = false;
        Screen.CursorLock = CursorLockMode.Locked;
    }

    var mouseDelta = new Float2(Input.GetAxis("Mouse X"), Input.GetAxis("Mouse Y"));
    pitch = Mathf.Clamp(pitch + mouseDelta.Y, -88, 88);
    yaw += mouseDelta.X;
    // ...更多摄像机逻辑
}
```

***

在创建暂停菜单或游戏主菜单时，你可以使用 `Engine.FocusGameViewport()` 方法，该方法会聚焦游戏窗口，并允许玩家在打开的 UI 面板中使用 UI 导航（例如使用游戏手柄或 Tab 键）。
