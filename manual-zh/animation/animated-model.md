# 动画模型

![动画模型](/manual/media/animated-model.gif)

**动画模型** 是一种 Actor 类型，用于执行动画并渲染蒙皮模型。
它使用动画图实例来评估蒙皮模型的骨骼变换。

在游戏中使用动画模型之前，你需要导入一个[蒙皮模型](skinned-model/index.md)并创建一个[动画图](anim-graph/index.md)。

## 使用方法

要了解如何设置和使用动画模型，请参阅专门的教程：[如何设置动画模型](tutorials/setup-animated-model.md) 和 [如何从代码更改动画图参数](tutorials/change-anim-graph-param.md)。

## 脚本

动画模型 Actor 提供了丰富的 C# 脚本 API。你可以通过 [AnimatedModel.Parameters](https://docs.flaxengine.com/api/FlaxEngine.AnimatedModel.html#FlaxEngine_AnimatedModel_Parameters) 修改动画图实例化参数值，通过 [AnimatedModel.Entries](https://docs.flaxengine.com/api/FlaxEngine.AnimatedModel.html#FlaxEngine_AnimatedModel_Entries) 修改渲染模型网格的材质，通过 [AnimatedModel.GetCurrentPose](https://docs.flaxengine.com/api/FlaxEngine.AnimatedModel.html#FlaxEngine_AnimatedModel_GetCurrentPose_FlaxEngine_AnimatedModel_Pose__) 获取当前骨骼姿态，甚至可以通过 [AnimatedModel.UpdateAnimation](https://docs.flaxengine.com/api/FlaxEngine.AnimatedModel.html#FlaxEngine_AnimatedModel_UpdateAnimation) 手动更新动画。

## 模块化角色

![Flax 引擎动画中的模块化角色](/manual/media/modular-character.gif)

在处理高度可定制的角色时，通常会将蒙皮模型拆分为使用相同骨骼的模块化部件。这允许构建可定制的角色（例如自定义玩家皮肤或随机化的敌人外观）。动画模型支持链接到其他实例以复制骨骼姿态，而不是重新评估它。使用 `SetMasterPoseModel` 方法可以创建此类链接，如下面的示例脚本所示：

```cs
using FlaxEngine;

/// <summary>模块化角色设置脚本。</summary>
public class ModularCharacter : Script
{
    public AnimatedModel Master;
    public AnimatedModel[] Puppets;

    /// <inheritdoc/>
    public override void OnStart()
    {
        if (Master == null || Puppets == null)
            return;
        foreach (var e in Puppets)
            e.SetMasterPoseModel(Master);
    }
}
```

***

## 属性

![动画模型属性](/manual/media/animated-model-properties.png)

| 属性               | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| **蒙皮模型**       | 用于渲染的蒙皮模型资源。                                     |
| **动画图**         | 用于蒙皮网格骨骼评估的动画图。                               |
| **逐骨骼运动模糊** | 如果勾选，则在此骨骼模型上使用逐骨骼运动模糊。这需要额外的渲染开销，可以禁用以节省性能。 |
| **使用时间缩放**   | 如果勾选，动画速度将受全局时间缩放参数的影响。               |
| **屏幕外更新**     | 如果勾选，即使 Actor 在任何摄像机视野之外，动画也会更新。否则，当 Actor 在屏幕外时，动画本身也会停止运行。 |
| **更新速度**       | 动画更新增量时间缩放。可用于加速动画播放或创建慢动作效果。   |
| **更新模式**       | 动画更新模式。可用于优化性能。可能的选项：<table><tbody><tr><th>选项</th><th>描述</th></tr><tr><td>**自动**</td><td>将使用自动更新（基于平台能力、与玩家的距离等）。</td></tr><tr><td>**每帧更新**</td><td>动画将在每次游戏更新时更新。</td></tr><tr><td>**每两帧更新**</td><td>动画将在每两次游戏更新时更新一次。</td></tr><tr><td>**每四帧更新**</td><td>动画将在每四次游戏更新时更新一次。</td></tr><tr><td>**手动**</td><td>动画可以由用户脚本手动更新。使用 AnimatedModel.UpdateAnimation() 方法。</td></tr><tr><td>**从不**</td><td>动画将完全不会更新。</td></tr></tbody></table> |
| **边界缩放**       | Actor 包围盒的主缩放参数。有助于减少屏幕边缘的网格闪烁效果。 |
| **自定义边界**     | 自定义边界（在 Actor 局部空间中）。如果设置为空边界，则将使用源蒙皮模型的绑定姿态边界。 |
| **阴影模式**       | 使用此条目的网格的阴影投射模式。可能的选项：<br><table><tbody><tr><th>选项</th><th>描述</th></tr><tr><td>**无**</td><td>从不渲染阴影。</td></tr><tr><td>**仅静态**</td><td>仅在静态视图中渲染阴影（环境探针、光照图等）。</td></tr><tr><td>**仅动态**</td><td>仅在动态视图中渲染阴影（游戏、编辑器等）。</td></tr><tr><td>**全部**</td><td>始终渲染阴影。</td></tr></tbody></table> |
| **根运动目标**     | 动画根运动应用目标。如果未指定，动画模型将自行应用。         |
