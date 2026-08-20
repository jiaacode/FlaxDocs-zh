# 标签

游戏标签，表示形式为 `X.Y.Z` 的层级名称（以点分隔的命名空间）。标签在项目 [层与标签设置](../../editor/game-settings/layers-and-tags-settings.md) 资源中定义，但也可以从代码创建。

脚本 API 包含结构体 `Tag`，它保存了标签在全局 `Tags.List` 数组中的索引。标签比较非常快（`int32` 比较），单个标签也占用很少的内存（4 字节）。脚本 API `Tags` 包含用于操作标签列表的工具，例如 `HasTag`/`HasTagExact`/`HasAny`/`HasAnyExact`/`HasAll`/`HasAllExact`，它们使用标签数组（C# 中为 `Tag[]`，C++ 中为 `Array<Tag>`）。

## Actor 标签

每个 Actor 都包含一个标签列表（`Actor.Tags`）以及用于快速检查标签的各种工具（`Actor.HasTag`）。Actor 可以用特定标签进行标记，以供不同的游戏系统使用。例如，玩家的刚体和碰撞体可以用标签 `Player` 标记，以便在处理碰撞事件或在射击游戏中计算命中伤害时进行区分。

## 标签编辑器

![标签编辑器](/manual/media/tags-editor.png)

`Tag` 和 `Tag[]` 在属性面板中显示，并可以通过树层级进行编辑。每个标签可以包含嵌套的子节点。可以通过复选框选择标签。每个节点右侧都有一个加号（`+`）按钮，可用于向列表中添加子标签。顶部的工具按钮可以帮助编辑标签，搜索字段允许按名称过滤标签。

## 脚本

请遵循下面的代码示例，在你的游戏代码中使用标签：

# [C#](#tab/code-csharp)
```cs
using FlaxEngine;

public class MyScript : Script
{
    private BoxCollider _trigger;
    public Tag PlayerTag = Tags.Get("Player");
    public Tag[] EnemyTags;

    /// <inheritdoc />
    public override void OnEnable()
    {
        _trigger = Level.FindActor(Tags.Get("ObjectDetector")) as BoxCollider;
        if (_trigger)
            _trigger.TriggerEnter += OnTriggerEnter;
    }

    /// <inheritdoc />
    public override void OnDisable()
    {
        if (_trigger)
            _trigger.TriggerEnter -= OnTriggerEnter;
    }

    private void OnTriggerEnter(PhysicsColliderActor other)
    {
        if (other.HasTag(PlayerTag))
        {
            Debug.Log("Player entered trigger");
        }
        else if (other.Tags.HasAny(EnemyTags))
        {
            Debug.Log("Enemy entered trigger");
        }
    }
}
```
***

# [C++](#tab/code-cpp)

```cpp
#pragma once

#include "Engine/Core/Log.h"
#include "Engine/Level/Level.h"
#include "Engine/Scripting/Script.h"
#include "Engine/Scripting/ScriptingObjectReference.h"
#include "Engine/Physics/Colliders/BoxCollider.h"

API_CLASS()
class GAME_API MyScript : public Script
{
    API_AUTO_SERIALIZATION();
    DECLARE_SCRIPTING_TYPE(MyScript);
private:
    ScriptingObjectReference<BoxCollider> _trigger;

public:
    API_FIELD() Tag PlayerTag = Tags::Get(TEXT("Player"));
    API_FIELD() Array<Tag> EnemyTags;

    void OnEnable() override
    {
        _trigger = Cast<BoxCollider>(Level::FindActor(Tags::Get(TEXT("ObjectDetector"))));
        if (_trigger)
            _trigger->TriggerEnter.Bind<MyScript, &MyScript::OnTriggerEnter>(this);
    }
    void OnDisable() override
    {
        if (_trigger)
            _trigger->TriggerEnter.Unbind<MyScript, &MyScript::OnTriggerEnter>(this);
    }

private:
    void OnTriggerEnter(PhysicsColliderActor* other)
    {
        if (other->HasTag(PlayerTag))
        {
            LOG(Info, "Player entered trigger");
        }
        else if (Tags::HasAll(other->Tags, EnemyTags))
        {
            LOG(Info, "Enemy entered trigger");
        }
    }
};
```
***

