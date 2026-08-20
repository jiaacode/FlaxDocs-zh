# 曲线

引擎 API 包含 **BezierCurve<T>** 和 **LinearCurve<T>** 类型，它们对于通过游戏代码驱动的动画非常有用。例如，你可以公开曲线，在编辑器中编辑它，然后使用它来执行平滑动画。

以下是一个示例脚本，展示了如何使用曲线：

```cs
public class CustomCurve : Script
{
    public BezierCurve<float> FloatCurve = new BezierCurve<float>(new BezierCurve<float>.Keyframe(0, 0), new BezierCurve<float>.Keyframe(1, 1));

    public BezierCurve<Vector2> Vector2Curve = new BezierCurve<Vector2>();

    public BezierCurve<Vector3> Vector3Curve = new BezierCurve<Vector3>();

    private float start;
    public float speed = 0.1f;

    public override void OnStart()
    {
        start = Time.GameTime;
    }

    public override void OnUpdate()
    {
        var time = (Time.GameTime - start) * speed;

        FloatCurve.Evaluate(out var floatValue, time);
        Vector2Curve.Evaluate(out var vector2Curve, time);
        Vector3Curve.Evaluate(out var vector3Curve, time);

        Debug.Log(string.Format("At {0}: float: {1}, vec2: {2}, vec3: {3}", time, floatValue, vector2Curve, vector3Curve));
    }
}
```

***
