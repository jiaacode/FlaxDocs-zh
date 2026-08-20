# 操作指南：创建自定义行为树装饰器

![自定义行为树装饰器](media/custom-decorator.png)

行为树具有很强的可扩展性，这意味着你可以在游戏项目中创建自己的节点类型，或使用引擎和插件中的节点。每个节点都可以定义自定义逻辑、包含属性并存储运行时状态（每个实例）。

> [!Warning]
> 请记住，行为执行是通过作业系统（`Behavior.System`）异步完成的。

# [C#](#tab/code-csharp)
```cs
using FlaxEngine;

/// <summary>
/// 简单的节点装饰器。
/// </summary>
public class MyHasTagDecorator : BehaviorTreeDecorator
{
    /// <summary>
    /// 检查运行此 BT 的行为代理是否分配了特定的 Actor 标签。仅当未使用 TagSelector 时使用。
    /// </summary>
    public Tag ActorTag;

    /// <summary>
    /// 检查运行此 BT 的行为代理是否分配了特定的 Actor 标签。如果设置，则 Tag 不被使用。
    /// </summary>
    public BehaviorKnowledgeSelector<Tag> TagSelector;

    /// <inheritdoc />
    public override bool CanUpdate(BehaviorUpdateContext context)
    {
        if (!TagSelector.TryGet(context.Knowledge, out var tag))
            tag = ActorTag;
        var agent = context.Behavior.Actor;
        // 此处可以与关卡或游戏对象交互（请注意，此代码默认异步运行）
        return agent.HasTag(tag);
    }

#if FLAX_EDITOR
    /// <inheritdoc />
    public override string GetDebugInfo(BehaviorUpdateContext context)
    {
        if (!TagSelector.TryGet(context.Knowledge, out var tag))
            tag = ActorTag;
        return string.Format("Has tag: {0}", tag);
    }
#endif
}
```
***

# [C++](#tab/code-cpp)

```cpp
#pragma once

#include "Engine/AI/BehaviorTreeNode.h"
#include "Engine/AI/BehaviorKnowledgeSelector.h"
#include "Engine/Scripting/ScriptingObjectReference.h"

/// <summary>
/// 简单的节点装饰器。
/// </summary>
API_CLASS() class GAME_API MyHasTagDecorator : public BehaviorTreeDecorator
{
    DECLARE_SCRIPTING_TYPE(MyHasTagDecorator);
    API_AUTO_SERIALIZATION();
    
    /// <summary>
    /// 检查运行此 BT 的行为代理是否分配了特定的 Actor 标签。仅当未使用 TagSelector 时使用。
    /// </summary>
    API_FIELD() Tag ActorTag;
    
    /// <summary>
    /// 检查运行此 BT 的行为代理是否分配了特定的 Actor 标签。如果设置，则 Tag 不被使用。
    /// </summary>
    API_FIELD() BehaviorKnowledgeSelectorAny TagSelector;

public:
    // [BehaviorTreeNode]
    bool CanUpdate(const BehaviorUpdateContext& context) override
    {
        Tag tag = ActorTag;
        Variant value;
        if (TagSelector.TryGet(context.Knowledge, value))
        {
            if (auto* e = value.AsStructure<Tag>())
                tag = *e;
        }
        auto agent = context.Behavior->GetActor();
        // 此处可以与关卡或游戏对象交互（请注意，此代码默认异步运行）
        return agent->HasTag(tag);
    }
#if USE_EDITOR
    String GetDebugInfo(const BehaviorUpdateContext& context) const override
    {
        Tag tag = ActorTag;
        Variant value;
        if (TagSelector.TryGet(context.Knowledge, value))
        {
            if (auto* e = value.AsStructure<Tag>())
                tag = *e;
        }
        return String::Format(TEXT("Has tag: {0}"), tag.ToString());
    }
#endif
};

inline MyHasTagDecorator::MyHasTagDecorator(const SpawnParams& params)
    : BehaviorTreeDecorator(params)
{
}
```
***
