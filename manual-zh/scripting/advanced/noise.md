# 噪声

Flax 包含了用于采样不同噪声函数的多种工具，例如：

| **噪声类型** | **预览**                                 |
| ------------ | ---------------------------------------- |
| Perlin       | ![Perlin 噪声](media/noise-perlin.png)   |
| Simplex      | ![Simplex 噪声](media/noise-simplex.png) |
| Worley       | ![Worley 噪声](media/noise-worley.png)   |
| Voronoi      | ![Voronoi 噪声](media/noise-voronoi.png) |
| Custom       | ![自定义噪声](media/noise-custom.png)    |

这些可以通过脚本 `FlaxEngine.Utilities.Noise` 静态类访问，并用于丰富程序化生成的世界和内容。

## 材质/粒子中的噪声

![材质图噪声节点](media/noise-shader.png)

所有可视化图（材质、粒子、动画）都可以在 CPU 和 GPU 上采样噪声函数，以丰富内容。所有噪声函数返回归一化到 0-1 范围内的结果。其中一些返回更多噪声分量，例如 Voronoi 噪声，其中 `X=minDistToCell`、`Y=randomColor`、`Z=minEdgeDistance`。根据上下文，可以只使用一个分量，甚至使用所有分量。请遵循每个节点的文档工具提示。

## 噪声预览控件

以下是一个自定义 UI 控件的示例代码，可以添加到场景中，用于以可视方式调试或测试不同的噪声类型。只需创建 `UI Canvas`，向其添加 `UI Control`，将控件类型设置为 `NoisePreview`，并使用 `NoiseType` 和 `NoiseScale` 属性来分析噪声。

```cs
public class NoisePreview : ContainerControl
{
    private GPUTexture _tempTexture;
    private byte[] _data;
    private Noises _noise = Noises.None;
    private float _scale;

    public enum Noises
    {
        [HideInEditor]
        None,
        Perlin,
        Simplex,
        Voronoi,
        Worley,
        Custom,
    }

    /// <summary>
    /// 要预览的噪声类型。
    /// </summary>
    public Noises NoiseType = Noises.Perlin;

    /// <summary>
    /// 噪声缩放。
    /// </summary>
    [Limit(0.001f)]
    public float NoiseScale = 10.0f;

    /// <inheritdoc />
    public NoisePreview()
    {
        Size = new Float2(64);
    }

    /// <inheritdoc />
    public override void DrawSelf()
    {
        base.DrawSelf();

        if (!_tempTexture)
        {
            // 创建新的 GPU 纹理
            var texture = new GPUTexture();
            _tempTexture = texture;
            var desc = GPUTextureDescription.New2D(64, 64, PixelFormat.R8G8B8A8_UNorm, GPUTextureFlags.ShaderResource);
            if (texture.Init(ref desc))
                return;
        }

        if (_noise != NoiseType || _scale != NoiseScale)
        {
            // 更新噪声纹理
            _noise = NoiseType;
            _scale = NoiseScale;
            UpdateTexture();
        }

        // 绘制噪声纹理
        Render2D.DrawTexture(_tempTexture, new Rectangle(Float2.Zero, Size));
    }

    /// <inheritdoc />
    public override void OnDestroy()
    {
        // 确保清理资源
        _tempTexture?.ReleaseGPU();
        FlaxEngine.Object.Destroy(ref _tempTexture);

        base.OnDestroy();
    }

    private unsafe void UpdateTexture()
    {
        var desc = _tempTexture.Description;
        var size = desc.Width * desc.Height * PixelFormatExtensions.SizeInBytes(desc.Format);
        if (_data == null || _data.Length != size)
            _data = new byte[size];
        fixed (byte* dataPtr = _data)
        {
            // 生成像素数据
            Float2 uv;
            var colorsPtr = (Color32*)dataPtr;
            for (int y = 0; y < desc.Height; y++)
            {
                uv.Y = (float)y / desc.Height * _scale;
                for (int x = 0; x < desc.Width; x++)
                {
                    uv.X = (float)x / desc.Width * _scale;

                    // 在 UV 位置采样噪声
                    var noise = Vector3.Zero;
                    switch (_noise)
                    {
                    case Noises.Perlin:
                        noise = new Vector3(FlaxEngine.Utilities.Noise.PerlinNoise(uv));
                        break;
                    case Noises.Simplex:
                        noise = new Vector3(FlaxEngine.Utilities.Noise.SimplexNoise(uv));
                        break;
                    case Noises.Voronoi:
                        noise = FlaxEngine.Utilities.Noise.VoronoiNoise(uv);
                        break;
                    case Noises.Worley:
                        noise = new Vector3(FlaxEngine.Utilities.Noise.WorleyNoise(uv), 0.0f);
                        break;
                    case Noises.Custom:
                        noise = new Vector3(FlaxEngine.Utilities.Noise.CustomNoise(new Float3(uv, 0.0f)));
                        break;
                    }

                    colorsPtr[y * desc.Width + x] = (Color32)(Color)noise;
                }
            }

            // 在 GPU 上更新纹理数据（发送数据）
            uint rowPitch = (uint)size / (uint)desc.Height;
            uint slicePitch = (uint)size;
            GPUDevice.Instance.MainContext.UpdateTexture(_tempTexture, 0, 0, new IntPtr(dataPtr), rowPitch, slicePitch);
            _tempTexture.ResidentMipLevels = 1; // 将 mip-map 标记为可用（仅对标准纹理而非渲染纹理需要）
        }
    }
}
```

***
