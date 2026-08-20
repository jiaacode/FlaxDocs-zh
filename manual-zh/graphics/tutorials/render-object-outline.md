# 操作指南：渲染对象轮廓

在本教程中，你将学习如何创建自定义后期处理特效脚本，并使用它将对象渲染到自定义深度缓冲区，以实现选择轮廓渲染。

### 1. 创建后期处理材质

首先，创建后期处理材质，该材质将使用场景深度缓冲区和自定义深度缓冲区来勾勒自定义对象的轮廓。

* 将 **领域** 设置为 **后期处理**。
* 添加类型为 **Color** 的新参数 **OutlineColor**。
* 添加类型为 **GPUTexture** 的新参数 **CustomDepth**。
* 按下图所示设置材质图（下载图像以放大查看）。

![后期处理轮廓材质](/manual/media/outline-material.png)

### 2. 创建脚本

创建一个新脚本，并添加执行效果渲染的代码。使用 **PostProcessEffect** 类，该类继承自 Script，可用作摄像机或视图上的后期处理效果。

```cs
using System.Collections.Generic;
using FlaxEngine;

public class OutlineRenderer : PostProcessEffect
{
    private MaterialInstance _material;

    /// <summary>
    /// 要渲染的 Actor 列表。
    /// </summary>
    public List<Actor> Actors = new List<Actor>();

    /// <summary>
    /// 轮廓颜色。
    /// </summary>
    public Color Color = Color.Red;

    /// <summary>
    /// 轮廓后期处理材质。
    /// </summary>
    public MaterialBase Material;

    /// <inheritdoc/>
    public override void OnEnable()
    {
        _material = Material?.CreateVirtualInstance();
    }

    /// <inheritdoc/>
    public override void OnDisable()
    {
        Destroy(ref _material);
    }

    /// <inheritdoc />
    public override bool CanRender()
    {
        return base.CanRender() && _material && Actors?.Count != 0;
    }

    /// <inheritdoc/>
    public override void Render(GPUContext context, ref RenderContext renderContext, GPUTexture input, GPUTexture output)
    {
        Profiler.BeginEventGPU("Outline");

        // 选取临时深度缓冲区
        var desc = GPUTextureDescription.New2D(input.Width, input.Height, PixelFormat.D32_Float, GPUTextureFlags.DepthStencil | GPUTextureFlags.ShaderResource);
        var customDepth = RenderTargetPool.Get(ref desc);
        context.ClearDepth(customDepth.View());

        // 将对象绘制到深度缓冲区
        Renderer.DrawSceneDepth(context, renderContext.Task, customDepth, Actors);

        // 渲染轮廓
        _material.SetParameterValue("OutlineColor", Color);
        _material.SetParameterValue("CustomDepth", customDepth);
        Renderer.DrawPostFxMaterial(context, ref renderContext, _material, output, input.View());

        // 清理
        RenderTargetPool.Release(customDepth);

        Profiler.EndEventGPU();
    }
}
```

***

### 3. 设置场景

现在，将创建的脚本添加到摄像机 Actor，将脚本的 **Material** 属性链接到创建的轮廓后期处理材质，并将要绘制轮廓的对象链接到 **Actors** 列表中。你还可以调整轮廓的颜色。

![对象轮廓渲染摄像机设置](/manual/media/object-outline-camera.png)

### 4. 测试！

最后，启动游戏并查看结果。

![鼠标点击生成贴花](/manual/media/object-outline.gif)
