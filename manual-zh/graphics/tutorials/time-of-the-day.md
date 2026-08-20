# 操作指南：设置一日内时间模拟

![纹理](/manual/media/time-of-the-day.gif)

在本教程中，你将学习如何设置脚本，以根据当前时间（基于太阳旋转）控制太阳光的颜色。

## 教程

### 1. 设置方向光

调整方向光的旋转和亮度（例如 `10`）。

### 2. 设置天空

通过将 `Sun Light` 链接到已创建的方向光 Actor（如果尚未链接）来设置 `Sky` Actor。

### 3. 创建新的 C# 脚本 `RealisticSun`

设置新脚本，该脚本将根据方向光的旋转控制其颜色，以匹配一日内不同时间的光照颜色。

```cs
/// <summary>
/// 真实的太阳着色脚本。
/// </summary>
[ExecuteInEditMode]
public class RealisticSun : Script
{
    /// <summary>
    /// 要控制的方向光 Actor 引用（如果未指定，则使用第一个方向光）。
    /// </summary>
    public DirectionalLight SunActor;

    /// <summary>
    /// 太阳光颜色的颜色曲线。时间范围为 [-1;1]，其中正值（介于 [0;1] 之间）为白天，负值（介于 [-1;0) 之间）为夜晚。
    /// </summary>
    public LinearCurve<Color> SunLightColors = new LinearCurve<Color>
    {
        Keyframes = new[]
        {
            new LinearCurve<Color>.Keyframe(-0.2f, new Color(0.609958f, 0.768231f, 0.97746f, 0.3f)),
            new LinearCurve<Color>.Keyframe(0.0f, new Color(0.998158f, 0.431645f, 0.083600f, 0.7f)),
            new LinearCurve<Color>.Keyframe(0.1f, new Color(0.991379f, 0.796836f, 0.427773f, 0.9f)),
            new LinearCurve<Color>.Keyframe(0.2f, new Color(0.991379f, 0.893238f, 0.598813f)),
            new LinearCurve<Color>.Keyframe(0.4f, new Color(1.0f, 0.966467f, 0.911958f)),
            new LinearCurve<Color>.Keyframe(1.0f, new Color(1.0f, 0.977460f, 0.911515f)),
        }
    };

    /// <inheritdoc />
    public override void OnStart()
    {
        // 自动选择第一个太阳光
        if (!SunActor)
            SunActor = Actor as DirectionalLight;
        if (!SunActor)
            SunActor = Level.FindActor<DirectionalLight>();
    }

    /// <inheritdoc />
    public override void OnUpdate()
    {
        if (!SunActor)
            return;
  
        // 基于俯仰角更新光照颜色
        var sunAngle = SunActor.Orientation.EulerAngles.X / 90.0f;
        SunLightColors.Evaluate(out var color, sunAngle, false);
        SunActor.Color = color;
    }
}
```

***

### 4. 附加脚本

现在，将创建的脚本附加到方向光 Actor（或任何其他 Actor）。现在，你可以编辑太阳颜色曲线属性 `Sun Light Colors`。
