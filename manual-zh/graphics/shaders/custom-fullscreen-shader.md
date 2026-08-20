# 自定义全屏着色器

在本教程中，你将学习如何创建并使用一个简单的单通道全屏效果，该效果将使用像素着色器来应用后期处理效果。

## 1. 创建新着色器

首先，在 **Source/Shaders** 文件夹中创建一个空文件，并适当命名，例如 `SimplePostFx.shader`。你可以手动执行此操作，或在内容窗口的着色器源文件夹中使用编辑器并 *右键单击*，选择 **新建 -> 着色器**。

![新建着色器源](/manual/media/new-shader-source.png)

如果你使用的是 Visual Studio，请使用 **文件 -> 生成项目文件** 选项，以确保新文件已添加到 VS 项目中。然后你可以 **双击** 在代码编辑器中打开着色器。

如你所见，默认生成的着色器包含：
* 基于项目设置（如果指定）的版权声明
* 包含 Flax 内置着色器库中通用类型的 Include 指令
* 包含一个 *Color* 变量的常量缓冲区声明
* 名为 *PS_Fullscreen* 的像素着色器函数，它仅从常量缓冲区返回一个纯色。

![编辑着色器源](/manual/media/shader-editing.png)

## 2. 使用全屏着色器

现在，在编写更高级的内容之前，我们想尝试使用模板生成的着色器，看看它的实际效果。

创建 C# 脚本并将其添加到场景中的任何 Actor 上。你可以使用[此教程](../../scripting/new-script.md)学习如何操作。然后，编写以下代码：

```cs
public class SimplePostFx : PostProcessEffect
{
    private GPUPipelineState _psFullscreen;
    private Shader _shader;

    public Color Color = Color.Red;

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

    public override void OnEnable()
    {
#if FLAX_EDITOR
        // 注册资源重载事件，并释放使用着色器的资源
        Content.AssetReloading += OnAssetReloading;
#endif

        // 向游戏视图注册后期处理效果
        MainRenderTask.Instance.AddCustomPostFx(this);
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
        MainRenderTask.Instance.RemoveCustomPostFx(this);
#if FLAX_EDITOR
        Content.AssetReloading -= OnAssetReloading;
#endif
        ReleaseShader();
    }

    private void ReleaseShader()
    {
        // 释放使用着色器的资源
        Destroy(ref _psFullscreen);
    }

    public override bool CanRender()
    {
        return base.CanRender() && Shader && Shader.IsLoaded;
    }

    public override unsafe void Render(GPUContext context, ref RenderContext renderContext, GPUTexture input, GPUTexture output)
    {
        // 在这里，我们在内置绘制之上执行自定义渲染

        // 设置缺失的资源
        if (!_psFullscreen)
        {
            _psFullscreen = new GPUPipelineState();
            var desc = GPUPipelineState.Description.DefaultFullscreenTriangle;
            desc.PS = Shader.GPU.GetPS("PS_Fullscreen");
            _psFullscreen.Init(ref desc);
        }

        // 设置常量缓冲区数据（底层使用内存复制将原始数据从 CPU 复制到 GPU 内存）
        var cb = Shader.GPU.GetCB(0);
        if (cb != IntPtr.Zero)
        {
            // 当使用更多常量时，创建带有 `StructLayout(LayoutKind.Sequential)` 特性的结构体，并传递其地址以复制数据
            fixed (Color* cbData = &Color)
                context.UpdateCB(cb, new IntPtr(cbData));
        }

        // 使用自定义像素着色器绘制全屏三角形
        context.BindCB(0, cb);
        context.SetState(_psFullscreen);
        context.SetRenderTarget(output.View());
        context.DrawFullscreenTriangle();
    }
}
```

***

它重写了 **PostProcessEffect** 类，用于将自定义渲染代码注入到内置图形管线中。你还可以覆盖 *Order* 和 *Location* 属性，以对渲染进行更多控制。
如你所见，脚本在 `OnEnable` 中注册，并在 `OnDisable` 中释放。函数 `OnAssetReloading` 处理编辑器中的着色器热重载，因此一旦你编辑了着色器，它就会被调用以进行更新。实际的渲染在 `Render` 方法中执行，该方法获取 GPU 上下文、渲染上下文以及用于渲染的输入/输出纹理。

然后 **将脚本添加** 到场景中的 Actor 上，并将 **着色器** 属性分配给从 `Content/Shaders` 自动导入的着色器源。然后你可以调整颜色，在游戏视图中实时查看变化。

![简单纯色着色器](/manual/media/simple-solid-color-shader.png)

## 3. 使用纹理

最后一步是对输入图像执行实际的后期处理。为此，我们需要将 *输入* 纹理绑定到着色器，并使用自定义处理对其进行采样。

以下是更新后的着色器，它通过采样附近像素并与其混合来实现 **锐化** 滤镜：

```hlsl
#include "./Flax/Common.hlsl"

META_CB_BEGIN(0, Data)
float2 TexelSize;
float Sharpness;
float Dummy0;
META_CB_END

Texture2D Input : register(t0);

META_PS(true, FEATURE_LEVEL_ES2)
float4 PS_Fullscreen(Quad_VS2PS input) : SV_Target
{
	float2 uv = input.TexCoord;
	float2 step = TexelSize * 1.5f;
	float4 texA = Input.SampleLevel(SamplerLinearClamp, uv + float2(-step.x, -step.y), 0);
	float4 texB = Input.SampleLevel(SamplerLinearClamp, uv + float2( step.x, -step.y), 0);
	float4 texC = Input.SampleLevel(SamplerLinearClamp, uv + float2(-step.x,  step.y), 0);
	float4 texD = Input.SampleLevel(SamplerLinearClamp, uv + float2( step.x,  step.y), 0);

	float4 blur = 0.25 * (texA + texB + texC + texD);
	float4 original  = Input.SampleLevel(SamplerLinearClamp, uv, 0);

	return original + (original - blur) * Sharpness;
}
```

***

现在，让我们修改 C# 脚本，以便为着色器传递正确的常量和纹理。

在脚本类中添加以下代码（例如，代替 *Color* 字段）。

```cs
/// <summary>
/// 着色器常量缓冲区数据结构，与 HLSL 源匹配。
/// </summary>
[StructLayout(LayoutKind.Sequential)]
private struct Data
{
    public Float2 TexelSize;
    public float Sharpness;
    public float Dummy0;
}

[Tooltip("锐化效果强度 (0-10)"), Limit(0, 10, 0.1f)]
public float Sharpness = 5.0f;
```

***

然后修改渲染代码：

```cs
// 设置常量缓冲区数据（底层使用内存复制将原始数据从 CPU 复制到 GPU 内存）
var cb = Shader.GPU.GetCB(0);
if (cb != IntPtr.Zero)
{
    var data = new Data
    {
        TexelSize = Float2.One / input.Size,
        Sharpness = Sharpness,
    };
    context.UpdateCB(cb, new IntPtr(&data));
}

// 使用自定义像素着色器绘制全屏三角形
context.BindCB(0, cb);
context.BindSR(0, input);
context.SetState(_psFullscreen);
context.SetRenderTarget(output.View());
context.DrawFullscreenTriangle();
```

As you can see the only changes are calling `UpdateCB` with our shader data structure and binding input texture to the shader pipeline with `BindSR` method.

如你所见，唯一的更改是使用我们的着色器数据结构调用 `UpdateCB`，并使用 `BindSR` 方法将输入纹理绑定到着色器管线。

## 4. 查看结果

最后一步是测试结果。将 **锐度** 属性从 0 更改为 10 时，你可以实时看到效果。如果遇到问题，请查看编辑器中的 *输出日志* 窗口，因为它可能包含任何编译错误（包括 C# 脚本和着色器代码）。

![锐化滤镜示例](/manual/media/sharpen-filter-example.png)
