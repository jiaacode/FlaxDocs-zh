# 游戏全局变量

在创建依赖于内容的更复杂游戏系统或创建技术美术时，提供可以影响整个游戏玩法的全局参数通常很有用。例如，玩家队伍颜色、风向、风速或其他天气参数。**游戏全局变量** 资源包含一个命名参数列表，可以在项目中全局访问，包括材质、动画和粒子。它们的值可以由美术师在编辑器中设置，或从代码驱动。这极大地提高了生产效率，并为游戏开发者提供了一个丰富其游戏内容的绝佳工具。

本文档页面解释了如何在项目中创建和使用游戏全局变量。

## 创建

使用 *内容窗口* 并 *右键单击*，然后选择 **新建 -> 游戏全局变量**，输入资源名称并按回车确认。然后 *双击* 打开资源编辑器。

![游戏全局变量编辑器](/manual/media/gameplay-globals-1.png)

现在，你可以指定参数类型并使用添加按钮。添加新参数后，你可以通过双击名称标签来重命名它，并编辑默认值。在运行模式下，编辑器窗口显示当前的运行时值，可以预览或编辑。你也可以使用工具栏上的最后一个按钮恢复默认值。

![游戏全局变量值](/manual/media/gameplay-globals-2.png)

要移除游戏全局变量，请右键单击其名称标签并按下删除按钮。

> [!TIP]
> 编辑后记得保存资源，以使这些更改在编辑器中生效。

## 在资源中使用

游戏全局变量可以在所有基于图的资源中访问，例如：材质、粒子发射器和动画图。为此，请使用 **获取游戏全局变量** 节点。

![获取游戏全局变量](/manual/media/gameplay-globals-3.png)

然后选择资源并选择要读取的全局变量。

![粒子中的游戏全局变量](/manual/media/gameplay-globals-4.png)

![材质中的游戏全局变量](/manual/media/gameplay-globals-5.png)

## 在代码中使用

游戏全局变量支持用于在运行时访问变量的脚本 API。

```cs
using FlaxEngine;

public class GameplayGlobalsSet : Script
{
    public GameplayGlobals MyGlobals;
    public float PlayerHealth = 100;

    public override void OnStart()
    {
        // 将全局变量的值打印到日志
        var values = MyGlobals.Values;
        foreach (var value in values)
            Debug.Log(value.Key + " = " + value.Value);
    }

    public override void OnDisable()
    {
        // 恢复默认状态
        MyGlobals.ResetValues();
    }

    public override void OnUpdate()
    {
        // 更新玩家生命值
        MyGlobals.SetValue("Player Health", PlayerHealth);
    }
}
```

***

你也可以从代码创建虚拟的游戏全局变量资源，并在代码生成的程序化内容的情况下将其保存到项目中。
