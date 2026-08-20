# 自定义计算着色器

在本教程中，你将学习如何创建并使用一个简单的**模糊效果**，该效果将使用计算着色器通过两个通道对输入图像进行模糊处理。
此示例需要 GPU 支持计算着色器和间接绘制，低端 GPU 可能不支持。

计算着色器是不使用经典 GPU 管线（如顶点变换、片段着色或 MSAA）的 GPU 程序。它们是完全可配置的代码，可以在 GPU 上异步运行。它们可用于大规模并行计算算法，或加速游戏渲染的某些部分。计算着色器不需要顶点/索引缓冲区，也不直接写入输出渲染目标，而是可以读取和写入用户提供的任意缓冲区和纹理。

## 1. 创建新着色器

首先，在 **Source/Shaders** 文件夹中创建一个空文件，并适当命名，例如 `BlurComputeShader.shader`。你可以手动执行此操作，或在内容窗口的着色器源文件夹中使用编辑器并 *右键单击*，选择 **新建 -> 着色器**。

![新建着色器源](media/new-shader-source.png)

如果你使用的是 Visual Studio，请使用 **文件 -> 生成项目文件** 选项，以确保新文件已添加到 VS 项目中。然后你可以 **双击** 在代码编辑器中打开着色器。

![编辑着色器源](media/shader-editing.png)

## 2. 编写计算着色器

现在，让我们编写计算着色器。在此示例中，我们使用两个函数：一个将水平模糊输入图像（`CS_BlurH`），第二个将执行垂直模糊（`CS_BlurV`）。模糊将使用可配置的半径（范围 0-10）和混合强度。

以下是本教程中使用的示例代码。请遵循代码注释以更好地理解其工作原理。

```hlsl
#include "./Flax/Common.hlsl"

// 配置常量（必须与 C# 匹配）
#define BLUR_MAX_SAMPLE_RADIUS 10
#define BLUR_GRID_SIZE 450
#define BLUR_APRON_SIZE BLUR_MAX_SAMPLE_RADIUS
#define BLUR_THREAD_GROUP_SIZE (BLUR_GRID_SIZE + (BLUR_APRON_SIZE * 2))

// 从 CPU 传递到 GPU 的常量缓冲区数据
META_CB_BEGIN(0, Data)
float2 Dummy0;
float BlurStrength;
float BlurRadius;
META_CB_END

// 要模糊的输入纹理和要写入的输出纹理
Texture2D Input : register(t0);
RWTexture2D<float4> Output : register(u0);

// 组内所有线程使用的共享内存
groupshared float4 Samples[BLUR_THREAD_GROUP_SIZE];

// 水平通道的计算着色器模糊函数
META_CS(true, FEATURE_LEVEL_SM5)
[numthreads(BLUR_THREAD_GROUP_SIZE, 1, 1)]
void CS_BlurH(uint3 groupID : SV_GroupID, uint3 groupThreadID : SV_GroupThreadID)
{
    // 这些位置相对于“网格”，即此线程组要写入的水平像素组
    const int2 gridStartXY = groupID.xy * BLUR_GRID_SIZE;
    const int2 gridXY = groupThreadID.xy - BLUR_APRON_SIZE;

    // 这些位置相对于像素坐标
    const int sampleX = gridStartXY.x + gridXY.x;
    const int sampleY = groupID.y;
    const int groupIndex = groupThreadID.x;

    uint2 textureSize;
    Input.GetDimensions(textureSize.x, textureSize.y);
    const int2 samplePos = int2(sampleX, sampleY);

    // 采样纹理
    float2 sampleCoord = saturate(((float2)samplePos + 0.5f) / float2(textureSize));
    float4 color = Input.SampleLevel(SamplerPointClamp, sampleCoord, 0.0f);

    // 存储到共享内存并同步线程
    Samples[groupIndex] = color;
    GroupMemoryBarrierWithGroupSync();

    // 不继续处理边缘区域的线程，以及渲染目标尺寸之外的线程
    if (gridXY.x >= 0 && gridXY.x < BLUR_GRID_SIZE && sampleX < textureSize.x)
    {
        float4 outputColor = 0.0f;
        float totalContribution = 0.0f;

        // 在半径内收集采样点
        for (int i = -BLUR_MAX_SAMPLE_RADIUS; i <= BLUR_MAX_SAMPLE_RADIUS; i++)
        {
            // 从共享内存中获取采样
            float4 tap = Samples[groupIndex + i];

            // 如果采样超出 CoC 半径则拒绝
            float tapWeight = saturate(BlurRadius + 1.0f - abs(float(i)));

            outputColor += tap * tapWeight;
            totalContribution += tapWeight;
        }

        // 写出结果
        outputColor /= totalContribution;
        outputColor = max(outputColor, 0);
        outputColor = lerp(color, outputColor, BlurStrength);
        Output[samplePos] = outputColor;
    }
}

// 垂直通道的计算着色器模糊函数
META_CS(true, FEATURE_LEVEL_SM5)
[numthreads(1, BLUR_THREAD_GROUP_SIZE, 1)]
void CS_BlurV(uint3 groupID : SV_GroupID, uint3 groupThreadID : SV_GroupThreadID)
{
    // 这些位置相对于“网格”，即此线程组要写入的垂直像素组
    const int2 gridStartXY = groupID.xy * BLUR_GRID_SIZE;
    const int2 gridXY = groupThreadID.xy - BLUR_APRON_SIZE;

    // 这些位置相对于像素坐标
    const int sampleX = groupID.x;
    const int sampleY = gridStartXY.y + gridXY.y;
    const int groupIndex = groupThreadID.y;

    uint2 textureSize;
    Input.GetDimensions(textureSize.x, textureSize.y);
    const int2 samplePos = int2(sampleX, sampleY);

    // 采样纹理
    float2 sampleCoord = saturate(((float2)samplePos + 0.5f) / float2(textureSize));
    float4 color = Input.SampleLevel(SamplerPointClamp, sampleCoord, 0.0f);

    // 存储到共享内存并同步线程
    Samples[groupIndex] = color;
    GroupMemoryBarrierWithGroupSync();

    // 不继续处理边缘区域的线程，以及渲染目标尺寸之外的线程
    if (gridXY.y >= 0 && gridXY.y < BLUR_GRID_SIZE && sampleY < textureSize.y)
    {
        float4 outputColor = 0.0f;
        float totalContribution = 0.0f;

        // 在半径内收集采样点
        for (int i = -BLUR_MAX_SAMPLE_RADIUS; i <= BLUR_MAX_SAMPLE_RADIUS; i++)
        {
            // 从共享内存中获取采样
            float4 tap = Samples[groupIndex + i];

            // 如果采样超出 CoC 半径则拒绝
            float tapWeight = saturate(BlurRadius + 1.0f - abs(float(i)));

            outputColor += tap * tapWeight;
            totalContribution += tapWeight;
        }

        // 写出结果
        outputColor /= totalContribution;
        outputColor = max(outputColor, 0);
        outputColor = lerp(color, outputColor, BlurStrength);
        Output[samplePos] = outputColor;
    }
}
```

***

## 3. 调度计算

下一步是编写一个脚本，该脚本将在 GPU 上调用计算着色器的执行。为此，我们将使用一个实现 **PostProcessEffect** 类的 C# 脚本，该类用于将自定义渲染代码注入到内置图形管线中。你还可以覆盖 *Order* 和 *Location* 属性，以对渲染进行更多控制。

创建 C# 脚本并将其添加到场景中的任何 Actor 上。你可以使用[此教程](../../scripting/new-script.md)学习如何操作。然后，编写以下代码：

```cs
using System;
using System.Runtime.InteropServices;
using FlaxEngine;

public class BlurComputeShader : PostProcessEffect
{
    /// <summary>
    /// 着色器常量缓冲区数据结构，与 HLSL 源匹配。
    /// </summary>
    [StructLayout(LayoutKind.Sequential)]
    private struct Data
    {
        public Float2 Dummy0;
        public float BlurStrength;
        public float BlurRadius;
    }

    [Tooltip("模糊效果强度 (0-1)"), Limit(0, 1.0f, 0.01f)]
    public float BlurStrength = 1.0f;

    [Tooltip("模糊效果半径 (0-10)"), Limit(0, 10.0f, 0.1f)]
    public float BlurRadius = 10.0f;

    private bool _isComputeSupported;

    public Shader Shader;

    public override void OnEnable()
    {
        _isComputeSupported = GPUDevice.Instance.Limits.HasCompute;

        // 向游戏视图注册后期处理效果
        MainRenderTask.Instance.AddCustomPostFx(this);
    }

    public override void OnDisable()
    {
        // 记得取消注册绘制
        MainRenderTask.Instance?.RemoveCustomPostFx(this);
    }

    public override bool CanRender()
    {
        return base.CanRender() && _isComputeSupported && Shader && Shader.IsLoaded;
    }

    public override unsafe void Render(GPUContext context, ref RenderContext renderContext, GPUTexture input, GPUTexture output)
    {
        // 在这里，我们在内置绘制之上执行自定义渲染

        // 设置常量缓冲区数据（底层使用内存复制将原始数据从 CPU 复制到 GPU 内存）
        var cb = Shader.GPU.GetCB(0);
        if (cb != IntPtr.Zero)
        {
            var data = new Data
            {
                BlurStrength = BlurStrength,
                BlurRadius = BlurRadius,
            };
            context.UpdateCB(cb, new IntPtr(&data));
        }

        // 分配用于模糊的临时纹理
        var desc = input.Description;
        desc.Flags = GPUTextureFlags.UnorderedAccess | GPUTextureFlags.ShaderResource | GPUTextureFlags.RenderTarget;
        var blurH = RenderTargetPool.Get(ref desc);
        var blurV = RenderTargetPool.Get(ref desc);

        // 配置常量（必须与 HLSL 匹配）
        const int BLUR_GRID_SIZE = 450;

        // 调度计算着色器将输入图像水平模糊到 blurH
        context.BindCB(0, cb);
        context.BindSR(0, input);
        context.BindUA(0, blurH.View());
        var csBlurH = Shader.GPU.GetCS("CS_BlurH");
        int groupCountX = (desc.Width / BLUR_GRID_SIZE) + ((desc.Width % BLUR_GRID_SIZE) > 0 ? 1 : 0);
        int groupCountY = desc.Height;
        context.Dispatch(csBlurH, (uint) groupCountX, (uint) groupCountY, 1);

        // 清理槽位
        context.ResetUA();
        context.ResetSR();

        // 调度计算着色器将 blurH 图像垂直模糊到 blurV
        context.BindCB(0, cb);
        context.BindSR(0, blurH);
        context.BindUA(0, blurV.View());
        var csBlurV = Shader.GPU.GetCS("CS_BlurV");
        groupCountX = desc.Width;
        groupCountY = (desc.Height / BLUR_GRID_SIZE) + ((desc.Height % BLUR_GRID_SIZE) > 0 ? 1 : 0);
        context.Dispatch(csBlurV, (uint) groupCountX, (uint) groupCountY, 1);

        // 清理槽位
        context.ResetUA();
        context.ResetSR();

        // 将模糊后的图像复制到输出
        context.Draw(output, blurV);

        RenderTargetPool.Release(blurH);
        RenderTargetPool.Release(blurV);
    }
}
```

***

## 4. 查看结果

最后一步是 **将脚本添加** 到场景中的 Actor 上，并将 **着色器** 属性分配给从 `Content/Shaders` 自动导入的着色器源。将 **模糊半径** 属性从 0 更改为 10 时，你可以实时看到效果。如果遇到问题，请查看编辑器中的 *输出日志* 窗口，因为它可能包含任何编译错误（包括 C# 脚本和着色器代码）。

![计算着色器模糊](media/compute-blur.gif)
