# 样条线

![样条线链](media/spline-chain.gif)

**样条线** 是定义空间曲线的形状 Actor，并带有用于通用用途的工具函数。它们是创建关卡和游戏组件的绝佳工具，例如铁轨、河流、绳索、链条、楼梯等。

样条线由 **贝塞尔曲线** 点定义，这些点表示为 3D 空间中的一系列变换（带有切线）。点存储在 Actor 的局部空间中。样条线包含用于曲线评估的广泛脚本 API，可用于程序化对象放置或任何其他游戏逻辑用例。例如，你可以轻松地让对象沿样条线飞行，如下所示。

要了解有关样条线的更多信息，请遵循本节中的专门教程。

![样条线](media/splines-editing.gif)

## 本节内容

* [如何让对象沿样条线运动](animate-object.md)
* [如何从样条线创建道路](create-road.md)
* [如何从样条线创建动态链条](create-chain.md)

## 如何创建样条线？

要将样条线添加到场景中，只需从 *工具箱* 窗口 *拖放* 到关卡视口中，或使用 *右键单击* 并选择选项 **新建 -> 其他 -> 样条线**。

![选中的样条线编辑器](media/spline-editor.png)

选择新创建的样条线后，*属性* 窗口将显示所选样条线的设置关键帧列表。它可以用于手动编辑贝塞尔曲线（每个点的值和两个切线）。你还可以使用工具按钮在曲线切线点处调整曲线，使其具有线性或平滑形状（自动计算切线）。样条线支持循环，它会自动将最后一个样条曲线点与第一个点同步以形成循环。

编辑器支持在关卡编辑器中选择样条线点，并使用 Gizmo 进行变换。选择点后，它将显示其切线点，这些点也可以进行编辑。你可以使用 Gizmo 快速在关卡中创建曲线，并按住 *Shift* 键插入新点。

![样条线点复制编辑器](media/spline-duplicating.gif)

## 如何从代码创建样条线？

样条线 Actor 具有非常丰富的脚本 API，并支持在运行时从代码动态生成。以下示例脚本生成一个样条线并在其上创建几个点。

```cs
var spline = new Spline
{
    Name = "My Spline",
};
spline.AddSplineLocalPoint(new Vector3(0, 0, 0), false);
spline.AddSplineLocalPoint(new Vector3(0, 0, 500), false);
spline.AddSplineLocalPoint(new Vector3(0, 400, 700), false);
spline.SetTangentsSmooth();
Level.SpawnActor(spline);
```

***
