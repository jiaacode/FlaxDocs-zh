# 操作指南：使用事件轨道

在以下教程中，你将学习如何添加事件轨道并在时间线中调用它。要了解如何创建场景动画，请参阅[此页面](../scene-animation.md)。

场景动画支持使用专用的事件轨道调用自定义 C# 方法。这允许从动画对象（Actor、脚本或嵌套对象）调用任何公共方法。要调用的方法必须是 `void` 类型，并且最多可以使用 *8* 个参数（仅限值类型）。

## 教程

### 1. 创建场景动画

同时准备好包含你要调用的事件的脚本。
示例：

```cs
public class TestScript : Script
{
    public void SimpleEvent()
    {
        Debug.Log("SimpleEvent");
    }

    public void SimpleEventInt(int value)
    {
        Debug.Log("SimpleEventInt: " + value);
    }

    public void SimpleEventVector3(Vector3 value)
    {
        Debug.Log("SimpleEventVector3: " + value);
    }

    public void SimpleEventEnum(LogType value)
    {
        Debug.Log("SimpleEventEnum: " + value);
    }
}
```

***

### 2. 添加 Actor 轨道

你可以将 Actor 拖放到轨道面板中，或使用按钮 添加 -> Actor 来创建新轨道并选择要为其制作动画的 Actor。

![添加 Actor 轨道](media/add-actor-track-drag.png)

### 3. 添加 Script 子轨道

使用 **+** 按钮并选择 Script 子轨道来调用其方法。你也可以直接调用 Actor 的方法。

![添加旋转子轨道](media/add-script-track.png)

### 3. 添加子轨道

使用 **+** 按钮并选择要调用的脚本方法。

![添加旋转子轨道](media/add-event-track.png)

### 4. 添加事件

现在你可以向事件轨道插入关键帧。为此，请使用 **+** 按钮，如下图所示。你也可以使用右键单击打开上下文菜单并选择 **添加关键帧** 选项。每个关键帧包含方法参数数据，并表示在播放经过关键帧时间位置时调用事件的时间点。要编辑参数，只需双击关键帧即可。

### 5. 播放动画

最后一步是添加场景动画播放器 Actor 并播放此动画。

![事件轨道](media/scene-anims-events.gif)
