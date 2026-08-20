# 视图标志

**视图标志** 用于启用或禁用各种渲染功能。这在调试图形或调整游戏的图形渲染时非常有用。

编辑器中的每个视口都有选项，可以使用 **视图 -> 视图标志** 来配置其渲染标志，如下图所示。

![视图标志](/manual/media/view-flags.png)

完整的选项列表和文档可在[此处](https://docs.flaxengine.com/api/FlaxEngine.ViewFlags.html)查看。

你还可以从代码中调整这些选项：

```cs
MainRenderTask.Instance.View.Flags |= ViewFlags.PhysicsDebug;
```
