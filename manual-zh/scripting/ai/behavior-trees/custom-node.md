# 操作指南：创建自定义行为树节点

![自定义行为树延迟节点](media/custom-delay-node.png)

行为树具有很强的可扩展性，这意味着你可以在游戏项目中创建自己的节点类型，或使用引擎和插件中的节点。每个节点都可以定义自定义逻辑、包含属性并存储运行时状态（每个实例）。

> [!Warning]
> 请记住，行为执行是通过作业系统（`Behavior.System`）异步完成的。

> [!Warning]
> 不要将任何行为状态存储在节点属性中，而应存储在自定义节点状态数据容器中（节点不会为每个行为实例化）。

# [C#](#tab/code-csharp)
```cs
using System.Runtime.InteropServices;
using FlaxEngine;

/// <summary>
/// 简单的延迟节点。
/// </summary>
public class MyDelayNode : BehaviorTreeNode
{
    // 节点状态容器（为每个活动节点分配，请参阅 InitState/ReleaseState）
    [StructLayout(LayoutKind.Sequential)]
    private struct State
    {
        public float TimeLeft;
        public Actor ObjectRef;
    }

    /// <summary>
    /// 延迟持续时间（以秒为单位）。仅当未使用 DurationSelector 时使用。
    /// </summary>
    public float Duration = 5.0f;

    /// <summary>
    /// 延迟持续时间选择器。如果设置，则 Duration 不被使用。
    /// </summary>
    public BehaviorKnowledgeSelector<float> DurationSelector;

    /// <inheritdoc />
    public override int GetStateSize()
    {
        // 返回每个实例节点内存的大小以进行分配
        return GetStateSize<State>();
    }

    /// <inheritdoc />
    public override void InitState(BehaviorUpdateContext context)
    {
        // 初始化状态并分配它
        var state = new State
        {
            TimeLeft = Duration,
            ObjectRef = context.Behavior.Actor, // 状态可以包含对象引用
        };
        if (DurationSelector.TryGet(context.Knowledge, out var duration))
            state.TimeLeft = duration;
        NewState(context.Memory, state);
    }

    /// <inheritdoc />
    public override void ReleaseState(BehaviorUpdateContext context)
    {
        // 释放节点状态（例如对象引用）
        ref var state = ref GetState<State>(context.Memory);
        state.ObjectRef = null;
        FreeState(context.Memory);
    }

    /// <inheritdoc />
    public override BehaviorUpdateResult Update(BehaviorUpdateContext context)
    {
        // 按当前更新增量递减计时器，并在其大于 0 之前持续运行
        ref var state = ref GetState<State>(context.Memory);
        state.TimeLeft -= context.DeltaTime;
        return state.TimeLeft <= 0.0f ? BehaviorUpdateResult.Success : BehaviorUpdateResult.Running;
    }

#if FLAX_EDITOR
    /// <inheritdoc />
    public override string GetDebugInfo(BehaviorUpdateContext context)
    {
        // 仅编辑器的调试文本（显示在节点标题下方，可以多行）
        if (context.Knowledge)
        {
            ref var state = ref GetState<State>(context.Memory);
            return string.Format("Time left: {0}s", state.TimeLeft);
        }

        // 在编辑时，上下文可能不包含状态，因此显示默认值
        if (!string.IsNullOrEmpty(DurationSelector.Path))
            return string.Format("Duration: {0}", DurationSelector);
        return string.Format("Duration: {0}s", Duration);
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
#include "Engine/AI/Behavior.h"
#include "Engine/Level/Actor.h"

/// <summary>
/// 简单的延迟节点。
/// </summary>
API_CLASS() class GAME_API MyDelayNode : public BehaviorTreeNode
{
    DECLARE_SCRIPTING_TYPE(MyDelayNode);
    API_AUTO_SERIALIZATION();

    /// <summary>
    /// 延迟持续时间（以秒为单位）。仅当未使用 DurationSelector 时使用。
    /// </summary>
    API_FIELD() float Duration = 5.0f;

    /// <summary>
    /// 延迟持续时间选择器。如果设置，则 Duration 不被使用。
    /// </summary>
    API_FIELD() BehaviorKnowledgeSelector<float> DurationSelector;

public:
    // [BehaviorTreeNode]
    int32 GetStateSize() const override
    {
        // 返回每个实例节点内存的大小以进行分配
        return sizeof(State);
    }
    void InitState(const BehaviorUpdateContext& context) override
    {
        // 初始化状态并分配它
        auto state = GetState<State>(context.Memory);
        new(state)State();
        state->TimeLeft = Duration;
        state->ObjectRef = context.Behavior->GetActor(); // 状态可以包含对象引用
        DurationSelector.TryGet(context.Knowledge, state->TimeLeft);
    }
    void ReleaseState(const BehaviorUpdateContext& context) override
    {
        // 释放节点状态（例如对象引用）
        auto state = GetState<State>(context.Memory);
        state->~State();
    }
    BehaviorUpdateResult Update(const BehaviorUpdateContext& context) override
    {
        // 按当前更新增量递减计时器，并在其大于 0 之前持续运行
        auto state = GetState<State>(context.Memory);
        state->TimeLeft -= context.DeltaTime;
        return state->TimeLeft <= 0.0f ? BehaviorUpdateResult::Success : BehaviorUpdateResult::Running;
    }
#if USE_EDITOR
    String GetDebugInfo(const BehaviorUpdateContext& context) const override
    {
        // 仅编辑器的调试文本（显示在节点标题下方，可以多行）
        if (context.Knowledge)
        {
            auto state = GetState<State>(context.Memory);
            return String::Format(TEXT("Time left: {0}s"), state->TimeLeft);
        }
        // 在编辑时，上下文可能不包含状态，因此显示默认值
        if (DurationSelector.Path.HasChars())
            return String::Format(TEXT("Duration: {0}"), DurationSelector.ToString());
        return String::Format(TEXT("Duration: {0}s"), Duration);
    }
#endif

private:
    struct State
    {
        float TimeLeft;
        ScriptingObjectReference<Actor> ObjectRef;
    };
};

inline MyDelayNode::MyDelayNode(const SpawnParams& params)
    : BehaviorTreeNode(params)
{
}
```
***
