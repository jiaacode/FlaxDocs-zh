# 操作指南：创建自定义 Move To 节点

下面是一个自定义 `Move To` 节点的示例，它运行业务逻辑相关代码，为游戏对象提供移动操作。默认节点逻辑会在目标 Actor 上调用虚方法 `AddMovement()`。

> [!Warning]
> 如果要为自定义移动节点存储额外的每个实例数据，请使用 C++ 脚本并让你的状态结构继承自 `BehaviorTreeMoveToNode::State`。否则，实现一个自定义移动节点。

# [C#](#tab/code-csharp)
```cs
using FlaxEngine;

/// <summary>
/// 自定义移动节点。
/// </summary>
public class MyMoveToNode : BehaviorTreeMoveToNode
{
    /// <inheritdoc />
    public override void GetAgentSize(Actor agent, out float outRadius, out float outHeight)
    {
        // 此处可以提供自定义的代理大小（半径和高度），或使用从 Actor 类型查询的默认值
        base.GetAgentSize(agent, out outRadius, out outHeight);
    }
    
    /// <inheritdoc />
    public override NavMeshRuntime GetNavMesh(Actor agent)
    {
        // 此处可以覆盖用于给定代理的导航网格
        return base.GetNavMesh(agent);
    }

    /// <inheritdoc />
    public override bool Move(Actor agent, Vector3 move)
    {
        // 此处可以执行自定义移动逻辑（例如通过实体接口或类似方式）
        // 它总是在游戏 Update 期间在主线程上调用，因此可以安全地修改游戏状态
        // 如果无法应用移动，则返回 true（节点将失败）
        return base.Move(agent, move);
    }
}
```
***

# [C++](#tab/code-cpp)

```cpp
#pragma once

#include "Engine/AI/BehaviorTreeNodes.h"

/// <summary>
/// 简单的延迟节点。
/// </summary>
API_CLASS() class GAME_API MyMoveToNode : public BehaviorTreeMoveToNode
{
    DECLARE_SCRIPTING_TYPE(MyMoveToNode);

public:
    // [BehaviorTreeNode]
    void GetAgentSize(Actor* agent, float& outRadius, float& outHeight) const override
    {
        // 此处可以提供自定义的代理大小（半径和高度），或使用从 Actor 类型查询的默认值
        BehaviorTreeMoveToNode::GetAgentSize(agent, outRadius, outHeight);
    }
    NavMeshRuntime* GetNavMesh(Actor* agent) const override
    {
        // 此处可以覆盖用于给定代理的导航网格
        return BehaviorTreeMoveToNode::GetNavMesh(agent);
        
    }
    bool Move(Actor* agent, const Vector3& move) const override
    {
        // 此处可以执行自定义移动逻辑（例如通过实体接口或类似方式）
        // 它总是在游戏 Update 期间在主线程上调用，因此可以安全地修改游戏状态
        // 如果无法应用移动，则返回 true（节点将失败）
        return BehaviorTreeMoveToNode::Move(agent, move);
    }
};

inline MyMoveToNode::MyMoveToNode(const SpawnParams& params)
    : BehaviorTreeMoveToNode(params)
{
}
```
***
