# 自定义几何体绘制

在本教程中，你将学习如何实现自定义几何体绘制。这种技术允许创建自定义几何体数据，对其进行处理并显示在屏幕上。它可以用于为游戏实现自定义渲染。

## 1. 创建新着色器

首先，在 **Source/Shaders** 文件夹中创建一个空文件，并适当命名，例如 `CustomGeometryDrawing.shader`。你可以手动执行此操作，或在内容窗口的着色器源文件夹中使用编辑器并 *右键单击*，选择 **新建 -> 着色器**。

![新建着色器源](media/new-shader-source.png)

如果你使用的是 Visual Studio，请使用 **文件 -> 生成项目文件** 选项，以确保新文件已添加到 VS 项目中。然后你可以 **双击** 在代码编辑器中打开着色器。

![编辑着色器源](media/shader-editing.png)

## 2. 编写顶点和像素着色器

现在，我们想要编写一个简单的顶点和像素着色器，用于处理几何体并将其显示在屏幕上。为此，我们首先声明一个包含对象变换（`WorldMatrix`）和摄像机+屏幕变换（`ViewProjectionMatrix`）的常量缓冲区。这些矩阵用于将顶点从模型局部空间变换到世界空间，然后再变换到屏幕。此变换在函数 `VS_Custom` 中对每个顶点执行。如你所见，它接收 `ModelInput` 结构数据作为输入（单个顶点数据），并在结构体 `VertexOutput` 中输出处理后的顶点数据。然后，GPU 处理这些数据，构建三角形、插值三角形、执行深度测试，并为屏幕上的每个可见像素调用像素着色器函数 `PS_Custom`。在此示例中，我们简单根据像素的 `WorldPoition.y`（即像素在游戏世界中 Y 轴的位置）创建一个颜色渐变。

```hlsl
#include "./Flax/Common.hlsl"

META_CB_BEGIN(0, Data)
float4x4 WorldMatrix;
float4x4 ViewProjectionMatrix;
META_CB_END

// 传递给顶点着色器的几何体数据
struct ModelInput
{
    float3 Position : POSITION;
};

// 从顶点着色器传递的插值数据
struct VertexOutput
{
    float4 Position : SV_Position;
    float3 WorldPosition : TEXCOORD0;
};

// 传递给像素着色器的插值数据
struct PixelInput
{
    float4 Position : SV_Position;
    float3 WorldPosition : TEXCOORD0;
};

// 用于自定义几何体处理的顶点着色器函数
META_VS(true, FEATURE_LEVEL_ES2)
VertexOutput VS_Custom(ModelInput input)
{
    VertexOutput output;
    output.WorldPosition = mul(float4(input.Position.xyz, 1), WorldMatrix).xyz;
    output.Position = mul(float4(output.WorldPosition.xyz, 1), ViewProjectionMatrix);
    return output;
}

// 用于在屏幕上绘制自定义几何体的像素着色器函数
META_PS(true, FEATURE_LEVEL_ES2)
float4 PS_Custom(PixelInput input) : SV_Target
{
    return lerp(float4(1, 0.1, 0, 1), float4(0.2, 0.9, 0.3, 1), frac(input.WorldPosition.y / 400));
}
```

***

## 3. 编写渲染代码

下一步是创建几何体缓冲区并使用自定义着色器进行渲染。
创建 C# 脚本并将其添加到场景中的任何 Actor 上。你可以使用[此教程](../../scripting/new-script.md)学习如何操作。然后，编写以下代码：

```cs
using System;
using System.Runtime.InteropServices;
using FlaxEngine;

public class CustomGeometryDrawing : PostProcessEffect
{
    /// <summary>
    /// 着色器常量缓冲区数据结构，与 HLSL 源匹配。
    /// </summary>
    [StructLayout(LayoutKind.Sequential)]
    private struct Data
    {
        public Matrix WorldMatrix;
        public Matrix ViewProjectionMatrix;
    }

    private static readonly Float3[] _vertices =
    {
        new Float3(0, 0, 0),
        new Float3(100, 0, 0),
        new Float3(100, 100, 0),
        new Float3(0, 100, 0),
        new Float3(0, 100, 100),
        new Float3(100, 100, 100),
        new Float3(100, 0, 100),
        new Float3(0, 0, 100),
    };

    private static readonly uint[] _triangles =
    {
        0, 2, 1, // 正面
        0, 3, 2,
        2, 3, 4, // 顶面
        2, 4, 5,
        1, 2, 5, // 右面
        1, 5, 6,
        0, 7, 4, // 左面
        0, 4, 3,
        5, 4, 7, // 背面
        5, 7, 6,
        0, 6, 7, // 底面
        0, 1, 6
    };

    private GPUBuffer _vertexBuffer;
    private GPUBuffer _indexBuffer;
    private GPUPipelineState _psCustom;
    private Shader _shader;

    public Shader Shader
    {
        get => _shader;
        set
        {
            if (_shader != value)
            {
                _shader = value;
                ReleaseShader();
            }
        }
    }

    public override unsafe void OnEnable()
    {
        UseSingleTarget = true; // 此后期处理效果覆盖输入缓冲区而不使用输出
        Location = PostProcessEffectLocation.BeforeForwardPass; // 管线中的自定义绘制位置

        // 为自定义几何体绘制创建顶点缓冲区
        _vertexBuffer = new GPUBuffer();
        fixed (Float3* ptr = _vertices)
        {
            var layout = GPUVertexLayout.Get([
                // 顶点结构的布局（必须匹配顶点数据格式）
                new VertexElement(VertexElement.Types.Position, 0, 0, false, PixelFormat.R32G32B32_Float)
            ]);
            var desc = GPUBufferDescription.Vertex(layout, sizeof(Float3), _vertices.Length, new IntPtr(ptr));
            _vertexBuffer.Init(ref desc);
        }

        // 为自定义几何体绘制创建索引缓冲区
        _indexBuffer = new GPUBuffer();
        fixed (uint* ptr = _triangles)
        {
            var desc = GPUBufferDescription.Index(sizeof(uint), _triangles.Length, new IntPtr(ptr));
            _indexBuffer.Init(ref desc);
        }

#if FLAX_EDITOR
        // 注册资源重载事件，并释放使用着色器的资源
        Content.AssetReloading += OnAssetReloading;
#endif

        // 向所有游戏视图注册后期处理效果（包括编辑器）
        SceneRenderTask.AddGlobalCustomPostFx(this);
    }

#if FLAX_EDITOR
    private void OnAssetReloading(Asset asset)
    {
        // 着色器将被热重载
        if (asset == Shader)
            ReleaseShader();
    }
#endif

    public override void OnDisable()
    {
        // 记得取消注册事件并释放创建的资源（这是游戏开发，不是 Web 开发）
        SceneRenderTask.RemoveGlobalCustomPostFx(this);
#if FLAX_EDITOR
        Content.AssetReloading -= OnAssetReloading;
#endif
        ReleaseShader();
        Destroy(ref _vertexBuffer);
        Destroy(ref _indexBuffer);
    }

    private void ReleaseShader()
    {
        // 释放使用着色器的资源
        Destroy(ref _psCustom);
    }

    public override bool CanRender()
    {
        return base.CanRender() && Shader && Shader.IsLoaded;
    }

    public override unsafe void Render(GPUContext context, ref RenderContext renderContext, GPUTexture input, GPUTexture output)
    {
        // 在这里，我们在内置绘制之上执行自定义渲染

        // 设置缺失的资源
        if (!_psCustom)
        {
            _psCustom = new GPUPipelineState();
            var desc = GPUPipelineState.Description.Default;
            desc.VS = Shader.GPU.GetVS("VS_Custom");
            desc.PS = Shader.GPU.GetPS("PS_Custom");
            _psCustom.Init(ref desc);
        }

        // 设置常量缓冲区数据（底层使用内存复制将原始数据从 CPU 复制到 GPU 内存）
        var cb = Shader.GPU.GetCB(0);
        if (cb != IntPtr.Zero)
        {
            var data = new Data();
            Matrix.Multiply(ref renderContext.View.View, ref renderContext.View.Projection, out var viewProjection);
            Actor.GetLocalToWorldMatrix(out var world);
            Matrix.Transpose(ref world, out data.WorldMatrix);
            Matrix.Transpose(ref viewProjection, out data.ViewProjectionMatrix);
            context.UpdateCB(cb, new IntPtr(&data));
        }

        // 使用自定义像素着色器和顶点着色器绘制几何体
        context.BindCB(0, cb);
        context.BindIB(_indexBuffer);
        context.BindVB(new[] {_vertexBuffer});
        context.SetState(_psCustom);
        context.SetRenderTarget(renderContext.Buffers.DepthBuffer.View(), input.View());
        context.DrawIndexed((uint)_triangles.Length);
    }
}
```

***

它重写了 **PostProcessEffect** 类，用于将自定义渲染代码注入到内置图形管线中。
如你所见，脚本在 `OnEnable` 中注册，并在 `OnDisable` 中释放。函数 `OnAssetReloading` 处理编辑器中的着色器热重载，因此一旦你编辑了着色器，它就会被调用以进行更新。实际的渲染在 `Render` 方法中执行，该方法获取 GPU 上下文、渲染上下文以及用于渲染的输入/输出纹理。

然后 **将脚本添加** 到场景中的 Actor 上，并将 **着色器** 属性分配给从 `Content/Shaders` 自动导入的着色器源。

## 4. 查看结果

一旦你设置了着色器、脚本并将其添加到场景中，你应该能够在编辑器和游戏视口中看到渲染的自定义模型。如果遇到问题，请查看编辑器中的 *输出日志* 窗口，因为它可能包含任何编译错误（包括 C# 脚本和着色器代码）。

![锐化滤镜示例](media/custom-geometry-drawing.png)
