# 操作指南：从代码创建地形

在本教程中，你将学习如何在运行时从代码创建地形。这种技术可用于在运行时生成地形的游戏（例如 RTS 游戏）中实现地形功能。

> [!Note]
> 要支持在运行时为高度场碰撞体烘焙碰撞，你必须在物理设置中启用选项 **支持运行时烘焙**。

## 1. 创建新脚本

你可以使用[此教程](../../scripting/new-script.md)学习如何操作。

## 2. 实现地形生成器

编写以下代码来实现示例地形生成器。

```cs
using System;
using System.Threading.Tasks;
using FlaxEngine;

public class TerrainFromCode : Script
{
    private Terrain _terrain;

    [Limit(1, 10), Tooltip("地形图块数量（在 XZ 平面上每个方向上的数量）。")]
    public Int2 PatchesCount = new Int2(2, 2);

    public override void OnStart()
    {
        // 创建新的动态地形 Actor 并将其添加到场景中
        _terrain = new Terrain();
        _terrain.HideFlags = HideFlags.DontSave;
        _terrain.Name = "My Terrain";
        _terrain.Setup();

        // 使用异步任务生成地形以防止游戏卡顿
        // 你也可以使用 C# 线程来执行此工作
        // 你的游戏可以在生成地形时显示进度条或加载画面
        Task.Run(new Action(GenerateTerrain));
    }

    private void GenerateTerrain()
    {
        var chunkSize = _terrain.ChunkSize;
        var heightMapSize = chunkSize * FlaxEngine.Terrain.PatchEdgeChunksCount + 1;
        var heightMapLength = heightMapSize * heightMapSize;
        var heightmap = new float[heightMapLength];

        for (int patchZ = 0; patchZ < PatchesCount.Y; patchZ++)
        {
            for (int patchX = 0; patchX < PatchesCount.X; patchX++)
            {
                // 生成高度图（简单的正弦波，用于示例演示）
                for (int z = 0; z < heightMapSize; z++)
                {
                    for (int x = 0; x < heightMapSize; x++)
                    {
                        heightmap[z * heightMapSize + x] = Mathf.Sin((float)x / chunkSize * Mathf.PiOverFour * 3.0f) * 3000.0f;
                    }
                }

                // 初始化图块（虚拟）
                var patchCoord = new Int2(patchX, patchZ);
                _terrain.AddPatch(ref patchCoord);
                _terrain.SetupPatchHeightMap(ref patchCoord, heightmap, null, true);
            }
        }

        // 在主线程上将地形生成到场景中（安全）
        Scripting.InvokeOnUpdate(() => _terrain.Parent = Actor);
    }
}
```

***

## 3. 将脚本添加到场景

将脚本拖放到空 Actor 上，或使用 *属性* 窗口和 **添加脚本** 按钮。

![添加脚本](media/add-terrain-generator-script.png)

## 4. 在运行模式下测试

按下工具栏上的 **播放** 按钮或按 *F5* 键查看结果。地形应在后台快速生成。以下示例使用 *虚拟* 纹理来存储地形高度图和泼溅贴图，这意味着没有 I/O 使用。虚拟地形数据仅存储在内存中。你可以在需要在运行时或在编辑器中生成地形的游戏中使用它。

![从代码创建地形结果](media/generated-terrain.png)
