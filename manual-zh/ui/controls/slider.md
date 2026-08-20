# 滑块

![滑块](media/slider.png)

**滑块** 响应用户的值更改事件以改变数值。

# 用法

以下是一个 C# 示例，演示如何在脚本中获取并使用滑块的 `ValueChanged` 事件：

```cs
public ControlReference<Slider> Slider;
private Slider _slider;

public override void OnStart()
{
    if (Slider)
        _slider = Slider.Control;
    if (_slider != null)
        _slider.ValueChanged += OnValueChanged;
}

private void OnValueChanged()
{
    Debug.Log($"Slider Value changed to {_slider.Value}");
}

public override void OnDestroy()
{
    if (_slider != null)
    {
        _slider.ValueChanged -= OnValueChanged;
        _slider = null;
    }
}
```

***

