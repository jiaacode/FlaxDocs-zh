# 操作指南：编写额外的渲染通道

在本教程中，你将学习如何将自定义渲染通道注入渲染管线。这种技术在许多自定义效果中被广泛采用。本教程将通过背面膨胀的方法实现卡通风格轮廓，这需要在渲染不透明对象之后执行一个额外的轮廓通道。

## 1. 创建轮廓材质

首先，创建一个新的材质作为卡通轮廓材质。你可以手动创建，或者在编辑器的内容窗口内容文件夹中 *右键单击*，选择 **新建 -> 材质 -> 材质**。

要实现背面膨胀，你需要沿着法线方向稍微移动顶点来将模型放大一些。只渲染放大后模型的背面，这样原始模型不会被遮挡。打开材质，将混合模式设置为 **透明**，将剔除模式设置为 **反转**，关闭 Z 测试和 Z 写入。然后按下图所示设置材质图：

![卡通轮廓](media/toon-outline-material.png)

## 2. 编写渲染代码

下一步是通过 `PostProcessEffect` 类注入自定义渲染通道并进行渲染。
创建 C# 脚本并将其添加到场景中的任何 Actor 上。你可以使用[此教程](../../scripting/new-script.md)学习如何操作。然后，编写以下代码：

```cs
using System.Runtime.InteropServices;
using FlaxEngine;

namespace Game;

/// <summary>
/// OutlineRenderer 脚本。
/// </summary>
public class OutlineRenderer : PostProcessEffect
{
    private Material _material;
    private Model _model;

    public Material OutlineMaterial
    {
        get => _material;
        set
        {
            if (_material != value)
            {
                _material = value;
            }
        }
    }

    /// <inheritdoc />
    public override unsafe void OnEnable()
    {
        // 此后期处理效果覆盖输入缓冲区而不使用输出
        UseSingleTarget = true;

        // 管线中的自定义绘制位置，在正向通道之前，以便绘制调用可以与其他正向绘制调用一起执行
        Location = PostProcessEffectLocation.BeforeForwardPass;

        // 将 Actor 作为 `StaticModel`（或 `AnimatedModel` 替代）获取
        var modelInstance = Actor as StaticModel;
        // 获取实际的 `Model`
        _model = modelInstance.Model;

        // 向所有游戏视图注册后期处理效果（包括编辑器）
        SceneRenderTask.AddGlobalCustomPostFx(this);
    }

    /// <inheritdoc />
    public override void OnDisable()
    {
        // 记得取消注册事件并释放创建的资源（这是游戏开发，不是 Web 开发）
        SceneRenderTask.RemoveGlobalCustomPostFx(this);
    }

    /// <inheritdoc />
    public override bool CanRender()
    {
        return base.CanRender() && _material;
    }

    /// <inheritdoc />
    public override unsafe void Render(GPUContext context, ref RenderContext renderContext, GPUTexture input, GPUTexture output)
    {
        // 第二通道：使用轮廓材质绘制模型

        // 获取 Actor 的变换
        Actor.GetLocalToWorldMatrix(out var world);

        // 将绘制调用提交到渲染列表，稍后将在正向通道中处理
        _model.Draw(ref renderContext, _material, ref world, StaticFlags.None, false);
    }
}
```

***

它重写了 **PostProcessEffect** 类，用于将自定义渲染代码注入到内置的图形管线中。
如你所见，脚本在 `OnEnable` 中注册，并在 `OnDisable` 中释放。实际的渲染在 `Render` 方法中执行，该方法提交绘制调用。

然后将 **脚本** 添加到场景中的模型 Actor 上，并将第 2 步创建的 **轮廓材质** 分配给 **Outline Material** 属性。

## 3. 查看结果

一旦你设置了材质、脚本并将其添加到场景模型中，你应该能够看到轮廓通道正在工作（在游戏模式下）。如果遇到问题，请查看编辑器中的 *输出日志* 窗口，因为它可能包含任何编译错误。

![卡通轮廓示例](media/toon-outline-example.png)
