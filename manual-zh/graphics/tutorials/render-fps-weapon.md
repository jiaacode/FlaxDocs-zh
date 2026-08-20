# 操作指南：渲染 FPS 武器

在本教程中，你将学习如何创建自定义后期处理特效脚本，并使用它在第一人称射击游戏中渲染玩家武器。其功能包括：
* 独立的武器渲染通道
* 不与世界几何体发生裁剪
* 可自定义的武器视觉效果（例如可以禁用 SSAO/SSR）
* 可自定义的渲染投影（武器可以使用自己的 FOV/视锥进行渲染）
* 可自定义的光照（例如武器只能受阳光影响）

### 1. 创建脚本

创建一个新脚本，并添加执行效果渲染的代码。使用 **PostProcessEffect** 类，该类继承自 Script，可用作摄像机或视图上的后期处理效果。

```cs
using FlaxEngine;

/// <summary>
/// 用于在世界几何体之上进行自定义玩家武器渲染的后期处理特效脚本。附加到玩家摄像机 Actor 上。
/// </summary>
public class WeaponRenderer : PostProcessEffect
{
    private Camera _camera;
    private SceneRenderTask _renderingTask;
    private GPUTexture _outputTexture;
    private GPUPipelineState _compositeOutputPipeline;

    /// <summary>
    /// 武器使用的层（或层组合）。用于在游戏视口的默认场景渲染中隐藏武器。
    /// </summary>
    public LayersMask WeaponLayer = new LayersMask(0);

    /// <summary>
    /// 武器渲染使用的额外对象（例如灯光、后期处理效果体积）所使用的层（或层组合）。
    /// </summary>
    public LayersMask AdditionalLayers = new LayersMask(0);

    /// <summary>
    /// 用于武器渲染的渲染功能（仅限于主渲染 - 后期处理效果在主视图绘制中配置）。
    /// </summary>
    public ViewFlags RenderFlags = ViewFlags.DirectionalLights |
                                   ViewFlags.SkyLights |
                                   ViewFlags.SpotLights |
                                   ViewFlags.PointLights |
                                   ViewFlags.SpecularLight |
                                   ViewFlags.Shadows |
                                   ViewFlags.ContactShadows |
                                   ViewFlags.Fog |
                                   ViewFlags.Reflections |
                                   ViewFlags.GI;

    /// <summary>
    /// 如果勾选，武器将使用自定义投影进行渲染（可自定义 FOV 和近/远平面）。
    /// </summary>
    [EditorDisplay("Projection")]
    public bool CustomProjection = false;

    /// <summary>
    /// 武器渲染的自定义视野角度。
    /// </summary>
    [Range(30, 120), EditorDisplay("Projection"), VisibleIf(nameof(CustomProjection))]
    public float WeaponFov = 60.0f;

    /// <summary>
    /// 武器渲染的自定义近平面距离。
    /// </summary>
    [Limit(0.0001f), EditorDisplay("Projection"), VisibleIf(nameof(CustomProjection))]
    public float WeaponNearPlane = 0.1f;

    /// <summary>
    /// 武器渲染的自定义远平面距离。
    /// </summary>
    [Limit(10.0f), EditorDisplay("Projection"), VisibleIf(nameof(CustomProjection))]
    public float WeaponFarPlane = 10000.0f;

    public WeaponRenderer()
    {
        // 在场景渲染之后但任何后期处理效果之前渲染武器
        Location = PostProcessEffectLocation.AfterForwardPass;
        UseSingleTarget = true;
    }

    public override void OnEnable()
    {
        _camera = Actor.As<Camera>();
        if (_camera == null)
        {
            Debug.LogError("Attach WeaponRenderer to the player camera actor.", this);
            return;
        }

        // 在摄像机的视图中禁用武器绘制
        _camera.RenderLayersMask &= ~WeaponLayer;

        // 创建新的渲染任务进行绘制
        _outputTexture = GPUDevice.Instance.CreateTexture("WeaponTexture");
        _renderingTask = new SceneRenderTask
        {
            IsCustomRendering = true, // 不使用自动渲染，而是手动安排渲染
            Output = _outputTexture,
        };
        _renderingTask.Buffers.LinkedCustomBuffers = MainRenderTask.Instance.Buffers;
        _renderingTask.Buffers.UseAlpha = true;

        // 创建将武器绘制到场景之上的 PSO（渲染的武器使用 Alpha 遮罩）
        var psoDesc = GPUPipelineState.Description.DefaultFullscreenTriangle;
        psoDesc.PS = GPUDevice.Instance.QuadShader.GetPS("PS_CopyLinear");
        psoDesc.BlendMode = BlendingMode.AlphaBlend;
        psoDesc.BlendMode.SrcBlend = BlendingMode.Blend.One;
        psoDesc.BlendMode.DestBlend = BlendingMode.Blend.InvSrcAlpha;
        psoDesc.BlendMode.BlendOp = BlendingMode.Operation.Add;
        psoDesc.BlendMode.SrcBlendAlpha = BlendingMode.Blend.One;
        psoDesc.BlendMode.DestBlendAlpha = BlendingMode.Blend.Zero;
        psoDesc.BlendMode.BlendOp = BlendingMode.Operation.Add;
        _compositeOutputPipeline = new GPUPipelineState();
        _compositeOutputPipeline.Init(ref psoDesc);
    }

    public override void OnDisable()
    {
        // 清理
        Destroy(ref _compositeOutputPipeline);
        Destroy(ref _outputTexture);
        Destroy(ref _renderingTask);
        _camera = null;
    }

    public override void Render(GPUContext context, ref RenderContext renderContext, GPUTexture input, GPUTexture output)
    {
        if (!_renderingTask)
            return;
        var camera = _camera ?? Actor.As<Camera>();
        if (!camera)
            return;
        Profiler.BeginEventGPU("Weapon");
        var width = input.Width;
        var height = input.Height;

        // 初始化武器渲染
        var view = renderContext.View;
        view.Mode = ViewMode.NoPostFx; // 仅渲染带有光照的武器，后期处理效果对整个游戏视图统一应用
        view.RenderLayersMask = WeaponLayer | AdditionalLayers; // 同时渲染武器和光照
        view.Flags = RenderFlags; // 选择渲染期间使用的视觉功能
        if (CustomProjection)
        {
            // 自定义投影矩阵
            view.Near = WeaponNearPlane;
            view.Far = WeaponFarPlane;
            float aspect = (float)width / (float)height;
            float fov = WeaponFov * Mathf.DegreesToRadians;
            Matrix.PerspectiveFov(fov, aspect, view.Near, view.Far, out view.Projection);
            view.NonJitteredProjection = view.Projection;
            view.UpdateCachedData();
        }
        _renderingTask.View = view;

        // 设置渲染分辨率
        if (!_outputTexture.IsAllocated)
        {
            var outputDesc = GPUTextureDescription.New2D(width, height, _renderingTask.Buffers.OutputFormat);
            _outputTexture.Init(ref outputDesc);
        }
        _renderingTask.Resize(width, height);

        // 在渲染武器时重用主游戏视口的 GI/全局 SDF 等
        _renderingTask.Buffers.LinkedCustomBuffers = renderContext.Buffers;

        // 渲染仅包含武器的嵌套场景
        Renderer.Render(_renderingTask);

        // 将武器合成到场景视图之上
        context.ResetRenderTarget();
        context.SetViewport(width, height);
        context.SetRenderTarget(input.View());
        context.BindSR(0, _outputTexture.View());
        var pipeline = _compositeOutputPipeline;
        context.SetState(pipeline);
        context.DrawFullscreenTriangle();

        Profiler.EndEventGPU();
    }
}
```

***

### 2. 设置层

打开[层与标签设置](../../editor/game-settings/layers-and-tags-settings.md)，为 `Weapons` 和 `Lights` 添加单独的层。然后将这些层分配给相应的 Actor，以便游戏 *知道* 哪个对象是玩家的武器，哪些是场景中的灯光。

![FPS 武器渲染层设置](/manual/media/weapon-fps-render-layers.png)

### 3. 设置场景

现在，将创建的脚本添加到摄像机 Actor，将脚本的 **WeaponLayer** 属性链接到包含玩家武器对象的层。将 **AdditionalLayers** 属性链接到在渲染武器时应使用的全局后期处理效果体积、环境探针和灯光。

![FPS 武器渲染设置](/manual/media/weapon-fps-script-setup.png)

你还可以通过 **RenderFlags** 属性调整渲染设置，或覆盖用于武器渲染的投影矩阵。

### 4. 测试！

最后，启动游戏并查看结果。

![FPS 武器渲染展示](/manual/media/weapon-fps.gif)
