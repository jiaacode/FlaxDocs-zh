# 动画插槽

![动画图中的动画插槽](media/anim-slot-usage.gif)

动画插槽是动画图和动画模型的一项功能，允许从代码中在图内播放自定义动画。这可用于播放受击反应片段或由游戏脚本直接控制的死亡动画。插槽支持以自定义播放速率对动画进行淡入淡出混合。

## 动画图设置

![动画图中的动画插槽设置](media/animation-slot.png)

要设置插槽动画，只需在动画图或动画图函数中添加 **动画插槽** 节点，并将其链接到需要注入动画的位置。它可以放置在最终动画输出之前以覆盖整个姿态，你也可以使用自定义混合规则来实现更高级的效果（例如，使用 *带遮罩混合* 节点仅在身体上半部分播放动画插槽）。

每个插槽都有自己的名称，但你可以在图的不同位置重用相同的名称，或者使用多个不同名称的插槽。

## 脚本

**动画模型** 提供了用于播放/暂停/停止动画插槽播放以及查询当前状态的脚本 API。你可以同时在不同的插槽上播放不同的动画，但请注意，单个插槽一次只能播放一个动画。你也可以使用 `StopSlotAnimation` 方法停止所有动画播放。

# [C#](#tab/code-csharp)
```cs
public class AnimationSlotPlayer : Script
{
    public AnimatedModel Model;
    public string AnimSlot = "Default";

    public Animation Anim;
    public float Speed = 1.0f;
    public float BlendInTime = 0.2f;
    public float BlendOutTime = 0.2f;

    /// <inheritdoc />
    public override void OnUpdate()
    {
        if (Input.GetKeyDown(KeyboardKeys.Q))
        {
            Model.PlaySlotAnimation(AnimSlot, Anim, Speed, BlendInTime, BlendOutTime);
        }
        if (Input.GetKeyDown(KeyboardKeys.A))
        {
            Model.StopSlotAnimation(AnimSlot, Anim);
        }
        if (Input.GetKeyDown(KeyboardKeys.Z))
        {
            Model.PauseSlotAnimation(AnimSlot, Anim);
        }
    }
}
```

# [C#](#tab/code-csharp)
```cs
public class AnimationSlotPlayer : Script
{
    public AnimatedModel Model;
    public string AnimSlot = "Default";

    public Animation Anim;
    public float Speed = 1.0f;
    public float BlendInTime = 0.2f;
    public float BlendOutTime = 0.2f;

    /// <inheritdoc />
    public override void OnUpdate()
    {
        if (Input.GetKeyDown(KeyboardKeys.Q))
        {
            Model.PlaySlotAnimation(AnimSlot, Anim, Speed, BlendInTime, BlendOutTime);
        }
        if (Input.GetKeyDown(KeyboardKeys.A))
        {
            Model.StopSlotAnimation(AnimSlot, Anim);
        }
        if (Input.GetKeyDown(KeyboardKeys.Z))
        {
            Model.PauseSlotAnimation(AnimSlot, Anim);
        }
    }
}
```
# [C++](#tab/code-cpp)
```cpp
#include "Engine/Scripting/Script.h"
#include "Engine/Scripting/ScriptingObjectReference.h"
#include "Engine/Level/Actors/AnimatedModel.h"
#include "Engine/Content/AssetReference.h"
#include "Engine/Content/Assets/Animation.h"
#include "Engine/Input/Input.h"

API_CLASS() class GAME_API AnimationSlotPlayer : public Script
{
    API_AUTO_SERIALIZATION(AnimationSlotPlayer);
    DECLARE_SCRIPTING_TYPE(AnimationSlotPlayer);
public:
    API_FIELD() ScriptingObjectReference<AnimatedModel> Model;
    API_FIELD() String AnimSlot = TEXT("Default");

    API_FIELD() AssetReference<Animation> Anim;
    API_FIELD() float Speed = 1.0f;
    API_FIELD() float BlendInTime = 0.2f;
    API_FIELD() float BlendOutTime = 0.2f;

public:

    void OnUpdate() override
    {
        CHECK(Model);
        if (Input::GetKeyDown(KeyboardKeys::Q))
        {
            Model->PlaySlotAnimation(AnimSlot, Anim, Speed, BlendInTime, BlendOutTime);
        }
        if (Input::GetKeyDown(KeyboardKeys::A))
        {
            Model->StopSlotAnimation(AnimSlot, Anim);
        }
        if (Input::GetKeyDown(KeyboardKeys::Z))
        {
            Model->PauseSlotAnimation(AnimSlot, Anim);
        }
    }
};
```
***
