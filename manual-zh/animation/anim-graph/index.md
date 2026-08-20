# 动画图

![动画图](/manual/media/title.jpg)

**动画图**资源用于定义蒙皮模型的动画播放逻辑。它允许混合无限数量的动画、执行自定义骨骼变换或高级动画状态机。唯一的限制是你的创造力，因为动画图编辑器在合适的人手中可以成为一个非常强大的工具。它是 Flax 动画系统的关键元素之一。

本文档章节解释了基础知识，并展示了如何创建和使用动画图。请按照这些文档页面来创建属于你自己的具有逼真动画和行为的角色。

## 本节内容

* [编辑器界面](interface.md)
* [图参数](parameters.md)
* [状态机](state-machine.md)
* [反向动力学](inverse-kinematics.md)
* [物理](physics.md)
* [函数](functions.md)
* [动画插槽](animation-slots.md)
* [实例数据](instance-data.md)
* [自定义节点](custom-nodes.md)

## 创建动画图

![创建动画图](../tutorials/media/new-anim-graph.jpg)

第一步是创建一个新资源。它是一个二进制文件，包含节点图数据以及一组图参数描述。要了解如何操作，请参阅专门的分步教程[如何创建动画图](../tutorials/create-anim-graph.md)。

## 使用动画图

![使用动画图](../tutorials/media/anim-walk-playback.gif)

下一步是编辑和使用动画图。你可以在[如何使用动画图](../tutorials/use-anim-graph.md)教程中查看操作方法。

## 编辑动画图参数

![编辑动画图参数](../tutorials/media/edit-anim-graph-param-code.gif)

最后，如果你想从 **C# 代码** 访问和更改动画图参数值，你可以查看专门的分步教程[如何从代码更改动画图参数](../tutorials/change-anim-graph-param.md)，在其中你可以学习如何操作。

## 骨骼变换

在动画图中，骨骼节点的变换以矩阵数组的形式存储在父节点的**局部空间**中。
某些节点（例如反向动力学）在**模型空间**中操作，该空间定义为 Actor（运行动画播放的动画模型）的局部空间。
