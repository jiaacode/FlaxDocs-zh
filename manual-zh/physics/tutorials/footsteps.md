# 操作指南：在不同表面上播放脚步声

在本教程中，你将学习如何创建一个脚本，根据玩家脚下的表面类型播放不同的脚步声。它使用向玩家脚下进行射线投射来检测玩家下方的物理材质，并播放匹配的音效。脚本使用了 标签 来提高游戏组件的可读性（物理材质类型与音效之间的关联）。

## 1. 创建脚本

首先，我们需要编写一个脚本（例如命名为 `Footsteps`）。它将处理检测表面类型并播放适当声音的逻辑。要了解有关创建脚本的更多信息，请参阅[此页面](../../scripting/new-script.md)。

```cs
using System.Collections.Generic;
using FlaxEngine;

public class Footsteps : Script
{
    /// <summary>
    /// 将表面类型（来自物理材质的 Tag）映射到用于播放脚步声的音频片段。
    /// </summary>
    public Dictionary<Tag, AudioClip> SoundPerSurfaceType = new();

    /// <summary>
    /// 世界对象所有层的遮罩——但不包含玩家（以防止射线投射到自身）。
    /// </summary>
    public LayersMask WorldLayersMask = LayersMask.Default;

    /// <summary>
    /// 声音音量。
    /// </summary>
    public float Volume = 1.0f;

    public override void OnUpdate()
    {
        // 此逻辑可以存在于动画事件的动画角色脚步声或玩家移动脚本中
        // 为了便于说明，在按下空格键时运行
        if (!Input.GetKeyDown(KeyboardKeys.Spacebar))
            return;

        // 对 Actor 下方的物理表面进行射线投射
        var feetLocation = Actor.Position;
        if (Physics.RayCast(feetLocation, Vector3.Down, out RayCastHit hit))
        {
            // 尝试获取特定物理表面材质的音效（空标签作为回退）
            var tag = hit.Material ? hit.Material.Tag : new Tag();
            if (SoundPerSurfaceType.TryGetValue(tag, out AudioClip sound))
            {
                // 在脚部位置播放音效（自动销毁）
                var source = new AudioSource
                {
                    HideFlags = HideFlags.DontSave,
                    Volume = Volume,
                    Clip = sound,
                    Position = feetLocation,
                };
                Level.SpawnActor(source);
                source.Play();
                Destroy(source, sound.Length);
            }
        }
    }
}
```

***

## 2. 设置脚本

![设置脚本](media/footsteps-properties.png)

将脚本添加到创建的玩家或测试 Actor 上，从 `WorldLayersMask` 中取消勾选玩家 Actor 所在的层，并设置 `SoundPerSurfaceType` 以包含各种表面类型。该字典将 `Tag` 映射到 `AudioClip`。Tag 必须与[物理材质](../physical-material.md)中分配的标签匹配。通常使用命名空间来更好地组织表面类型。例如，`Surface.Dirt`、`Surface.Metal` 等。

![物理材质属性](media/footsteps-materials.png)

## 3. 测试！

点击 **播放** 按钮，通过按 `Spacebar` 键测试脚本，当 Actor 位于特定碰撞体上方时测试声音——它也与[地形](../../terrain/collision.md)层配合使用。
