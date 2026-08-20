# 动画图自定义节点

动画图支持通过定义和使用**自定义节点**来进行扩展。此功能可用于实现自定义 IK 求解器，或执行非常特定的动画数据处理，或使用自定义动画数据源（例如实时绑定）。请阅读本文档页面以了解如何在动画图中创建和使用自定义节点。此外，[插件](../../scripting/plugins/index.md) 可以附带自定义节点，以便在不同项目之间重用。

> [!NOTE]
> 动画图使用底层优化来减少内存分配和内存复制。使用自定义节点进行扩展需要具备关于非托管内存指针使用以及蒙皮模型骨骼节点/骨骼方案的基础知识。

## 定义自定义节点原型

每个自定义节点由两部分组成：*曲面节点描述符工厂* 和 *运行时逻辑控制器*。

第一步是在 `Source/<module_name>` 目录中添加一个新的 C# 脚本，并使用带有 *NodeFactory* 后缀的目标类名。或者，你也可以使用一个额外的仅编辑器脚本模块，如教程[此处](../../scripting/tutorials/add-scripts-module.md)所示。

以下是一个示例代码，定义了一个简单的节点，该节点接受动画姿态和缩放参数作为输入，并输出修改后的动画姿态。

```cs
using FlaxEditor.Surface;
using FlaxEngine;

[AnimationGraph.CustomNodeArchetypeFactory]
public static class MyAnimGraphNodeFactory
{
    public static NodeArchetype GetMyNodeArchetype()
    {
        return new NodeArchetype
        {
            // 定义节点标题和元数据
            Title = "My Scale Node",
            Description = "",
            Flags = NodeFlags.AnimGraph,

            // 定义节点变量（每个实例）
            // DefaultValues[0] 必须指定 C# 运行时控制器的类型名
            // DefaultValues[1] 必须指定节点组名称
            // 使用其他槽位存储每个节点的自定义数据
            DefaultValues = new object[]
            {
                "MyScaleNode", // 运行时节点类型名
                "Tools", // 组名称
                1.0f, // 每个节点存储的自定义值
                //..这里可以存储更多每个节点的数据
            },

            // 定义节点视觉和元素
            Size = new Float2(200, 70),
            Elements = new[]
            {
                NodeElementArchetype.Factory.Input(0, "Input", true, typeof(void), 0),
                NodeElementArchetype.Factory.Input(1, "Scale", true, typeof(float), 1, 2),
                NodeElementArchetype.Factory.Output(0, "Output", typeof(void), 2),
            },
        };
    }
}
```

通常，编辑器程序集或编辑器插件程序集中标记有 `AnimationGraph.CustomNodeArchetypeFactory` 属性的类会被扫描，以查找返回 `NodeArchetype` 类型的无参数静态方法。你可以在工厂中定义多种节点类型。

> [!NOTE]
> 如果你的自定义节点未在编辑器中显示或无法按预期工作，请查看引擎日志文件以获取警告信息。

## 实现运行时逻辑控制器

下一步是实现节点的运行时部分，该部分在游戏中执行（节点工厂仅在编辑器中使用，用于定义节点数据和 UI）。将以下 `MyScaleNode` 类添加到你的游戏程序集中。

```cs
using System;
using FlaxEngine;

public class MyScaleNode : AnimationGraph.CustomNode
{
    private float _defaultScale;

    public override void Load(ref InitData initData)
    {
        // 这里可以访问节点值和图形蒙皮模型来设置数据
        // 此方法在图形加载时每个节点初始化调用一次
        // （通常来自内容加载线程）

        // 缓存默认缩放值
        _defaultScale = (float)initData.Values[2];
    }

    public override unsafe object Evaluate(ref Context context)
    {
        // 此处节点被调用来评估给定上下文的输出

        // 评估输入的骨骼姿态
        var input = (Impulse*)(IntPtr)GetInputValue(ref context, 0);

        // 评估输入的缩放
        var scale = HasConnection(ref context, 1) ? (float)GetInputValue(ref context, 1) : _defaultScale;

        // 获取输出的骨骼姿态（内部缓存以提高性能）
        var output = GetOutputImpulseData(ref context);

        // 复制输入并将缩放应用于根节点（始终是第一个）
        CopyImpulseData(input, output);
        output->Nodes[0].Scale *= scale;

        // 返回骨骼姿态以供进一步处理
        return new IntPtr(output);
    }
}
```

***

## 使用自定义节点

最后一步是测试创建的自定义节点。只需 *右键单击* 并从列表中选择你的节点，或输入名称进行搜索。

![自定义动画图节点](/manual/media/custom-node-add.png)

结果：

![动画图自定义节点](/manual/media/custom-node-results.gif)
