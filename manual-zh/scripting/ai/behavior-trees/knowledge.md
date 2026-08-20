# 行为知识

每个 `Behavior` 为了执行逻辑操作，需要包含关于环境、敌人、目标和传感器的特定知识。**行为知识** 是仅包含数据的容器，用于存储与行为相关的所有数据。

知识包括：
* **黑板** - 行为黑板的实例（自定义数据）
* **目标** - 行为所有活动目标的列表
* 树 **节点相关性** - 有关活动节点的信息
* 树 **节点状态** - 所有活动节点的数据

> [!TIP]
> 黑板或目标值可以是自定义结构或对象（`FlaxEngine.Object`/`ScriptingObject`）。对于小数值推荐使用结构，对于较大的数据容器请使用对象。

![行为树节点选项](media/behavior-root-node.png)

## 黑板

**黑板** 用于存储行为树逻辑的信息。例如，它可以包含由游戏代码提供的代理当前移动速度，供路径跟随使用。典型的工作流程是创建一个黑板对象类或结构，并用字段或属性填充它。黑板类型可以在行为树的 **根节点** 上分配（见上图）。

# [C#](#tab/code-csharp)
```cs
using FlaxEngine;

/// <summary>
/// 带有对象条目的 BT 黑板。
/// </summary>
public class CSharpBlackboardObject : FlaxEngine.Object
{
    public float MoveSpeed;
    public int AmmoLeft;
    public Actor Target;

    public bool HasTarget => Target != null;
}

/// <summary>
/// 带有结构条目的 BT 黑板。
/// </summary>
public struct CSharpBlackboardStruct
{
    public float MoveSpeed;
    public int AmmoLeft;
    public Actor Target;

    public bool HasTarget => Target != null;
}
```
***

# [C++](#tab/code-cpp)

```cpp
#pragma once

#include "Engine/Scripting/ScriptingObjectReference.h"
#include "Engine/Level/Actor.h"

/// <summary>
/// 带有对象条目的 BT 黑板。
/// </summary>
API_CLASS() class GAME_API CppBlackboardObject : public ScriptingObject
{
    DECLARE_SCRIPTING_TYPE(CppBlackboardObject);

    API_FIELD() float MoveSpeed = 0.0f;
    API_FIELD() int32 AmmoLeft = 30;
    API_FIELD() ScriptingObjectReference<Actor> Target;

    API_PROPERTY() bool HasTarget() const
    {
        return Target != nullptr;
    }
};

/// <summary>
/// 带有结构条目的 BT 黑板。
/// </summary>
API_STRUCT() struct GAME_API CppBlackboardStruct
{
    DECLARE_SCRIPTING_TYPE_MINIMAL(CppBlackboardStruct);

    API_FIELD() float MoveSpeed = 200.0f;
    API_FIELD() int32 AmmoLeft = 30;
    API_FIELD() ScriptingObjectReference<Actor> Target;
};
```
***

> [!TIP]
> 黑板或目标类型可以定义[自定义编辑器](../../custom-editors/index.md)，以获得更复杂的编辑体验或自定义功能。

## 目标

**目标** 用于为行为树逻辑存储关于非常具体操作的信息。例如，它可以包含 NPC 要攻击的目标角色，或要跟随或前往的目标对象。这些数据可以放在黑板内部，但对于创建更复杂的系统（其中 BT 可以被不同的代理类型重用，例如通过节点装饰器 `Has Goal` 和选择器来访问目标数据），将 AI 的基本任务分离会有所帮助。树所使用的目标类型可以在 **根节点** 上分配（见上图）。

# [C#](#tab/code-csharp)
```cs
using FlaxEngine;

/// <summary>
/// 简单的代理目标数据。
/// </summary>
public struct MoveToGoal
{
    public Actor Target;
    public float MoveSpeed;
}
```
***

# [C++](#tab/code-cpp)

```cpp
#pragma once

#include "Engine/Scripting/ScriptingObjectReference.h"
#include "Engine/Level/Actor.h"

/// <summary>
/// 简单的代理目标数据。
/// </summary>
API_STRUCT() struct GAME_API MoveToGoal
{
    DECLARE_SCRIPTING_TYPE_MINIMAL(CppBlackboardStruct);

    API_FIELD() ScriptingObjectReference<Actor> Target;
    API_FIELD() float MoveSpeed;
};
```
***

## 知识选择器

**选择器** 通过路径（例如 `Blackboard/AmmoLeft` 或 `Goal/MoveToGoal/MoveSpeed`）提供对行为知识数据的统一访问。它可用于读取或写入用户在节点属性面板中选择的知识字段或属性（通过带有下拉列表和搜索字段的选择器）。每个选择器都提供 `Set`、`Get` 和 `TryGet` 方法来访问知识数据。

# [C#](#tab/code-csharp)
```cs
using FlaxEngine;

// 类型值选择器（浮点值）
BehaviorKnowledgeSelector<float> MovementSpeed;

// 通用值选择器
BehaviorKnowledgeSelectorAny MovementSpeed;
```
***

# [C++](#tab/code-cpp)

```cpp
#include "Engine/AI/BehaviorKnowledgeSelector.h"

// 类型值选择器（浮点值）
BehaviorKnowledgeSelector<float> MovementSpeed;

// 通用值选择器
BehaviorKnowledgeSelectorAny MovementSpeed;
```
***
