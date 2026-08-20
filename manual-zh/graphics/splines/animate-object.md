# 操作指南：让对象沿样条线运动

在以下教程中，你将学习如何让对象沿样条线运动。

## 教程

### 1. 创建样条线

按照[此](index.md)教程操作。或者，可以将样条线设置为 **循环** 以实现连续动画。

![创建样条线编辑器](/manual/media/create-spline.gif)

### 2. 创建脚本

请遵循[脚本文档](../../scripting/index.md)了解如何创建新脚本，然后创建一个名为 **SplineAnimation** 的新脚本并编写以下代码：

```cs
using System;
using FlaxEngine;

public class SplineAnimation : Script
{
    private float _time;
    private Spline _spline;

    [Tooltip("对象沿样条线动画的速度。")]
    public float Speed = 1.0f;

    [Tooltip("要沿样条线移动的 Actor。")]
    public Actor ObjectToMove;

    public override void OnEnable()
    {
        // 缓存样条线 Actor
        _spline = Actor.As<Spline>();
        if (!_spline)
            throw new Exception("Attach script to a spline.");
    }

    public override void OnUpdate()
    {
        if (!_spline || !ObjectToMove)
            return;

        // 更新位置
        _time += Time.DeltaTime * Speed;

        // 评估样条曲线
        var direction = _spline.GetSplineDirection(_time);
        var transform = _spline.GetSplineTransform(_time);

        // 将对象放置在样条线上，并使其沿样条线方向定向
        transform.Orientation = Quaternion.LookRotation(direction, Float3.Up) * transform.Orientation;
        ObjectToMove.Transform = transform;
    }
}
```

***

### 3. 设置

选择样条线并单击 **添加脚本** 按钮。然后，选择你的新脚本并将其附加到样条线。
最后，通过设置脚本上的 **Object To Move** 属性来选择要沿样条线移动的 Actor。

![样条线动画设置编辑器](/manual/media/spline-animate-object-setup.png)

### 4. 测试！

现在，点击 *播放* 按钮，观察对象沿样条线移动。你甚至可以在对象沿样条线移动时编辑样条线。

![对象沿样条线动画](/manual/media/animate-object-over-spline.gif)
