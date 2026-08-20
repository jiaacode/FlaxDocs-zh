# 操作指南：对 UI 进行射线检测

UI 控件实现了 `RayCast` 实用方法，可以执行精确的鼠标与内容相交检测。这在检查鼠标是否与 UI 或游戏玩法交互时非常有用。

```cs
using FlaxEngine;
using FlaxEngine.GUI;

/// <summary>
/// 示例 UI 射线检测脚本。
/// </summary>
public class TestCanvasRayCast : Script
{
    /// <inheritdoc/>
    public override void OnUpdate()
    {
        var ui = RootControl.GameRoot;
        var pos = Input.MousePosition;
        if (ui.RayCast(ref pos, out var hit))
        {
            Debug.Log("UI hit over: " + hit.GetType().Name);
        }
    }
}
```

***
