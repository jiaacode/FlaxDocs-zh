# 操作指南：从代码创建植被

在本教程中，你将学习如何在运行时从代码创建植被。这种技术可用于在运行时生成世界的游戏（例如 RTS 游戏）中实现植被功能。

## 1. 创建新脚本

你可以使用[此教程](../../scripting/new-script.md)学习如何操作。

## 2. 实现植被生成器

编写以下代码来实现示例植被生成器。

```cs
using System;
using System.ComponentModel;
using System.Threading.Tasks;
using FlaxEngine;
using FlaxEngine.Utilities;

public class FoliageFromCode : Script
{
    private Foliage _foliage;

    public struct FoliageType
    {
        [Tooltip("植被类型模型资源。")]
        public Model Model;

        [DefaultValue(10.0f), Tooltip("实例生成密度。")]
        public float Density;
    }

    [Tooltip("生成的植被实例边界（在 Actor 局部空间中）。")]
    public Vector2 Bounds = new Vector2(5000);

    [Tooltip("植被类型集合。")]
    public FoliageType[] Types;

    public override void OnStart()
    {
        // 创建新的动态植被 Actor 并将其添加到场景中
        _foliage = new Foliage();
        _foliage.HideFlags = HideFlags.DontSave;
        _foliage.Name = "My Foliage";
        _foliage.Parent = Actor;

        // 使用异步任务生成植被以防止游戏卡顿
        // 你也可以使用 C# 线程来执行此工作
        // 你的游戏可以在生成植被时显示进度条或加载画面
        Task.Run(new Action(GenerateFoliage));
    }

#if FLAX_EDITOR
    public override void OnDebugDrawSelected()
    {
        // 在编辑器中绘制边界区域
        var bounds = new BoundingBox(Vector3.Zero, new Vector3(Bounds.X, 1000.0f, Bounds.Y));
        bounds = BoundingBox.Transform(bounds, Actor.LocalToWorldMatrix);
        DebugDraw.DrawBox(bounds, Color.AliceBlue);
    }
#endif

    private void GenerateFoliage()
    {
        if (Types == null || Types.Length == 0)
        {
            Debug.LogError("No foliage types defined!");
            return;
        }

        // 设置植被类型（在添加实例之前执行以提高性能）
        for (int typeIndex = 0; typeIndex < Types.Length; typeIndex++)
        {
            var type = Types[typeIndex];
            _foliage.AddFoliageType(type.Model);
        }

        // 在边界内使用随机生成来生成实例
        var boundsArea = Bounds.X * Bounds.Y;
        var rand = new Random();
        for (int typeIndex = 0; typeIndex < Types.Length; typeIndex++)
        {
            var type = Types[typeIndex];
            var instancesCount = boundsArea * type.Density / (1000.0f * 1000.0f);

            for (int i = 0; i < instancesCount; i++)
            {
                var instance = new FoliageInstance();
                instance.Type = typeIndex;
                instance.Transform.Translation = new Vector3(rand.NextFloat() * Bounds.X, 0, rand.NextFloat() * Bounds.Y);
                instance.Transform.Scale = new Vector3(rand.NextFloat(0.7f, 1.3f));
                _foliage.AddInstance(ref instance);
            }
        }

        // 编辑植被后确保更新四叉树
        _foliage.RebuildClusters();
    }
}
```

***

## 3. 将脚本添加到场景

将脚本拖放到空 Actor 上，或使用 *属性* 窗口和 **添加脚本** 按钮。

![添加脚本](media/add-foliage-generator-script.png)

## 4. 设置植被类型

通过指定植被类型模型和生成密度来添加植被类型描述符。

![编辑植被类型属性](media/edit-foliage-types-properties.png)

## 5. 在运行模式下测试

按下工具栏上的 **播放** 按钮或按 *F5* 键查看结果。植被应在后台快速生成。你可以在需要在运行时或在编辑器中生成植被的游戏中使用它。

![从代码创建植被结果](media/generated-foliage.png)
