# 动画事件

![Flax 引擎中的动画事件 VFX](media/anim-event-vfx.gif)

动画时间线支持特殊的**动画事件**轨道，可以包含自定义的单次或连续事件。这些可用于播放脚步声、生成脚步贴花或将其他基于动画的效果应用到游戏玩法中。

动画事件有 2 种类型：
* `AnimEvent` - 在动画播放期间触发的动画通知事件，当动画播放通过给定帧时执行一次单次回调。
* `AnimContinuousEvent` - 在动画播放期间触发的动画通知事件（具有持续时间），包含开始和结束（事件通知作为 tick 接收）。它与单次事件的不同之处在于，它在每个动画 tick 期间更新，并且保证在开始之前接收 start，在所有 tick 发生之后接收 end。

### 多线程

**默认情况下，事件在主线程上调用**，这使得安全地访问场景对象和修改游戏玩法成为可能。

动画系统使用作业系统在游戏更新期间异步更新所有动画模型。这可以极大地提高具有大量对象的场景的性能。因此，如果你设置了事件的 `Async` 属性（例如在构造函数中），则动画事件回调可以在作业线程（主线程处于休眠状态）上调用。此时，在事件期间安全地访问其他游戏数据以确保不会导致竞态条件是很重要的。通常，访问单个动画模型对象或其脚本/子对象是安全的，因为每个模型实例在此异步过程中仅更新自己的动画一次（你可以在事件内生成或编辑属于该动画模型的对象）。

要了解有关多线程的更多信息，请参阅[此文档](../../scripting/advanced/multithreading.md)。

### 数据和缓存

引擎在加载时在 `Animation` 资源内创建 `AnimEvent` 对象实例。这些实例在播放动画时由动画模型重用，因此在自定义动画事件中缓存任何数据或状态时需要谨慎。例如，`AnimContinuousEvent` 可以在 `OnBegin` 中存储数据，并在 `OnEnd` 中清除（保证始终被调用）。但请记住，一个 `AnimEvent` 对象可以在同一时间从不同的动画对象接收多个不同的回调——实际上是在同一时间，因为动画系统使用异步作业系统调度动画图更新。这意味着存储在动画事件中或全局重用（例如通过 `AnimatedModel` 访问的角色状态）的数据需要谨慎访问（参见上面的多线程部分）。

## 如何创建动画事件类型？

游戏和插件可以定义自定义动画事件类型，包含实例化数据和自定义游戏逻辑。以下是一个自定义动画事件的示例，它在给定骨骼节点位置播放声音片段。它可以用于播放角色脚步声，也可以扩展以生成 VFX 和贴花。

# [C#](#tab/code-csharp)
```cs
using FlaxEngine;

/// <summary>
/// 在给定的骨骼节点位置播放声音片段。
/// </summary>
public class PlaySoundAnimEvent : AnimEvent
{
    /// <summary>
    /// 要播放的声音片段。
    /// </summary>
    public AudioClip Sound;

    /// <summary>
    /// 声音音量。
    /// </summary>
    [Limit(0, 1)]
    public float Volume = 1.0f;

    /// <summary>
    /// 播放声音的节点名称（例如左脚）。
    /// </summary>
    public string NodeName;

    /// <inheritdoc />
    public override void OnEvent(AnimatedModel actor, Animation anim, float time, float deltaTime)
    {
        // 在骨骼位置播放声音（例如脚）
        var node = actor.SkinnedModel.FindNode(NodeName);
        actor.GetNodeTransformation(node, out var nodeMatrix);
        var source = new AudioSource
        {
            HideFlags = HideFlags.FullyHidden,
            Volume = Volume,
            Clip = Sound,
            Position = nodeMatrix.TranslationVector,
            Parent = actor,
        };
        source.Play();

        // 播放结束后自动移除声音源
        // TODO: 使用对象池
        Destroy(source, Sound.Length);
    }
}
```
# [C++](#tab/code-cpp)
```cpp

#pragma once

#include "Engine/Core/Math/Matrix.h"
#include "Engine/Animations/AnimEvent.h"
#include "Engine/Content/AssetReference.h"
#include "Engine/Level/Actors/AnimatedModel.h"
#include "Engine/Audio/AudioClip.h"
#include "Engine/Audio/AudioSource.h"

/// <summary>
/// 在给定的骨骼节点位置播放声音片段。
/// </summary>
API_CLASS() class GAME_API PlaySoundAnimEvent : public AnimEvent
{
API_AUTO_SERIALIZATION();
DECLARE_SCRIPTING_TYPE(PlaySoundAnimEvent);

    /// <summary>
    /// 要播放的声音片段
    /// </summary>
    API_FIELD() AssetReference<AudioClip> Sound;

    /// <summary>
    /// 声音音量。
    /// </summary>
    API_FIELD(Attributes="Limit(0, 1)") float Volume = 1.0f;

    /// <summary>
    /// 播放声音的节点名称（例如左脚）。
    /// </summary>
    API_FIELD() String NodeName;

    // [AnimEvent]
    void OnEvent(AnimatedModel* actor, Animation* anim, float time, float deltaTime) override
    {
        CHECK(Sound);

         // 在骨骼位置播放声音（例如脚）
        int32 node = actor->SkinnedModel->FindNode(NodeName);
        Matrix nodeMatrix;
        actor->GetNodeTransformation(node, nodeMatrix);
        auto source = New<AudioSource>();
        source->HideFlags = HideFlags::FullyHidden;
        source->Clip = Sound;
        source->SetVolume(Volume);
        source->SetPosition(nodeMatrix.GetTranslation());
        source->SetParent(actor);
        source->Play();

        // 播放结束后自动移除声音源
        // TODO: 使用对象池
        source->DeleteObject(Sound->GetLength());
    }
};
```
***

## 如何添加动画事件？

动画事件在动画资源内部使用单独的轨道类型，可以轻松地放置在时间线上以在非常特定的时间位置触发。使用 *添加* 按钮并选择 *动画事件* 轨道。然后使用 `+` 按钮或 *右键单击* 该轨道以插入新的动画事件。

![在编辑器中添加新动画事件](media/anim-event-new.png)

然后你可以 *双击* 创建的事件或 *右键单击* 以编辑其属性。

![在编辑器中编辑动画事件](media/anim-event-edit.png)

保存资源后，它将在动画播放期间使用创建的事件。

## 连续事件

连续事件是普通的动画事件，包含固定的持续时间，具有明确的开始和结束。它们对于基于时间的操作非常有用，例如基于动画时机的游戏玩法攻击逻辑。

连续事件可以重写额外的方法：
* `OnStart`
* `OnEnd`

## 事件颜色

![编辑器中的动画事件颜色](media/anim-event-colors.png)

每种事件类型都可以调整 `Color` 字段以控制其在编辑器中的外观。这可用于在编辑更复杂的资源时区分 SFX、VFX 或其他事件。
