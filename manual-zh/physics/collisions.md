# 碰撞

![碰撞](/manual/media/physics3.gif)

本页面介绍了如何过滤和检测对象碰撞。

## 碰撞过滤

Flax 支持最多 32 个不同的碰撞层。每个层可以定义不同的碰撞遮罩。

你可以使用[物理设置](physics-settings.md)来定义层的碰撞遮罩矩阵。
每个 Actor 都有属性 [Actor.Layer](https://docs.flaxengine.com/api/FlaxEngine.Actor.html#FlaxEngine_Actor_Layer)，用于获取对象的碰撞遮罩。

## 碰撞检测

Flax 使用基于事件的碰撞检测。当检测到两个对象之间的碰撞时，会在 **固定更新** 期间报告。使用 [Collider](https://docs.flaxengine.com/api/FlaxEngine.Collider.html) 事件来处理碰撞。
要访问碰撞信息，请使用 [Collision](https://docs.flaxengine.com/api/FlaxEngine.Collision.html) 类和 [ContactPoint](https://docs.flaxengine.com/api/FlaxEngine.ContactPoint.html) 结构。

以下是一个示例脚本，用于为场景中给定的碰撞体注册碰撞检测。

# [C#](#tab/code-csharp)
```cs
public class MyScript : Script
{
	public Collider TargetCollider;

	public override void OnEnable()
	{
		TargetCollider.CollisionEnter += OnCollisionEnter;
	}

	public override void OnDisable()
	{
		TargetCollider.CollisionEnter -= OnCollisionEnter;
	}

	private void OnCollisionEnter(Collision collision)
	{
		Debug.Log("We got the collision sir! With: " + collision.OtherCollider);
	}
}
```
***

# [C++](#tab/code-cpp)

```cpp
#pragma once

#include "Engine/Scripting/Script.h"
#include "Engine/Core/Log.h"
#include "Engine/Physics/Colliders/Collider.h"
#include "Engine/Scripting/ScriptingObjectReference.h"

API_CLASS() class GAME_API MyScript : public Script
{
    API_AUTO_SERIALIZATION();
    DECLARE_SCRIPTING_TYPE(MyScript);

    API_FIELD() ScriptingObjectReference<Collider> TargetCollider;

    void OnCollisionEnter(const Collision& c)
    {
        LOG(Info, "We got the collision sir! With: {0}", c.OtherActor->ToString());
    }

    // [Script]
    void OnEnable() override
    {
        if (TargetCollider)
            TargetCollider->CollisionEnter.Bind<MyScript, &MyScript::OnCollisionEnter>(this);
    }
    void OnDisable() override
    {
        if (TargetCollider)
            TargetCollider->CollisionEnter.Unbind<MyScript, &MyScript::OnCollisionEnter>(this);
    }
};

inline MyScript::MyScript(const SpawnParams& params)
    : Script(params)
{
}
```
***

请注意，不仅碰撞体可能是碰撞的来源，其他 Actor 类型（例如地形）也可能产生碰撞。要处理这种情况，请使用属性 **ThisActor** 和 **OtherActor**。

## 了解更多

请参阅[脚本事件](../scripting/events.md)页面，了解有关 C# 脚本事件的更多信息。
