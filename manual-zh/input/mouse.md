# 鼠标

**鼠标** 是桌面平台上最常见的输入设备之一。你可以通过 Input 类访问鼠标状态：
* [Input.MousePosition](https://docs.flaxengine.com/api/FlaxEngine.Input.html#FlaxEngine_Input_MousePosition)
* [Input.MousePositionDelta](https://docs.flaxengine.com/api/FlaxEngine.Input.html#FlaxEngine_Input_MousePositionDelta)
* [Input.MouseScrollDelta](https://docs.flaxengine.com/api/FlaxEngine.Input.html#FlaxEngine_Input_MouseScrollDelta)
* [Input.GetMouseButton](https://docs.flaxengine.com/api/FlaxEngine.Input.html#FlaxEngine_Input_GetMouseButton_FlaxEngine_MouseButton_)
* [Input.GetMouseButtonDown](https://docs.flaxengine.com/api/FlaxEngine.Input.html#FlaxEngine_Input_GetMouseButtonDown_FlaxEngine_MouseButton_)
* [Input.GetMouseButtonUp](https://docs.flaxengine.com/api/FlaxEngine.Input.html#FlaxEngine_Input_GetMouseButtonUp_FlaxEngine_MouseButton_)

## 锁定光标

在某些游戏中，你可能希望在游戏过程中锁定鼠标位置或隐藏光标。例如，第一人称射击游戏通常需要 360 度摄像机旋转，并且你不希望点击离开游戏或让光标遮挡游戏画面。

你可以通过使用 [Screen.CursorLock](https://docs.flaxengine.com/api/FlaxEngine.Screen.html#FlaxEngine_Screen_CursorLock) 锁定鼠标移动，并通过使用 [Screen.CursorVisible](https://docs.flaxengine.com/api/FlaxEngine.Screen.html#FlaxEngine_Screen_CursorVisible) 修改光标可见性。

## 用法

在你的 C# 脚本中，你可以读取鼠标按钮输入：

```cs
public override void OnUpdate()
{
	if (Input.GetMouseButton(MouseButton.Left))
    {
        Debug.Log("Left mouse button is pressed.");
    }
}
```

***

你可以读取鼠标移动了多少：

```cs
public override void OnUpdate()
{
	Float2 delta = Input.MousePositionDelta;
    Debug.Log("The mouse movement since last frame is: " + delta);
}
```

***

你可以锁定并隐藏鼠标光标：

```cs
public override void OnStart()
{
	Screen.CursorLock = CursorLockMode.Locked;
    Screen.CursorVisible = false;
}
```

***
