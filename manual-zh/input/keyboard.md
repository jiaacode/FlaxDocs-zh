# 键盘

**键盘** 是桌面平台上最常见的输入设备之一。你可以通过 Input 类访问键盘状态：
* [Input.InputText](https://docs.flaxengine.com/api/FlaxEngine.Input.html#FlaxEngine_Input_InputText)
* [Input.GetKey](https://docs.flaxengine.com/api/FlaxEngine.Input.html#FlaxEngine_Input_GetKey_FlaxEngine_KeyboardKeys_)
* [Input.GetKeyDown](https://docs.flaxengine.com/api/FlaxEngine.Input.html#FlaxEngine_Input_GetKeyDown_FlaxEngine_KeyboardKeys_)
* [Input.GetKeyUp](https://docs.flaxengine.com/api/FlaxEngine.Input.html#FlaxEngine_Input_GetKeyUp_FlaxEngine_KeyboardKeys_)

## 用法

在你的 C# 脚本中，你可以读取键盘输入：

```cs
public override void OnUpdate()
{
	if (Input.GetKey(KeyboardKeys.E))
	{
		Debug.Log("E key is pressed.");
	}
}
```

***
