# 重构和重命名

在开发过程中，程序员有时需要重命名脚本属性或字段、更改资源数据格式或重构代码。由于这是长期项目中常见的情况，请参阅本文档页面以了解如何轻松处理这类情况。*祝你好运！*

## 重命名属性或字段

在此示例中，脚本有一个名为 `PlayerSpeed` 的字段被重命名为 `Speed`。通过向 C# 字段添加 `JsonProperty` 特性，你可以指示序列化器使用其他名称。这对于游戏脚本和 json 资源对象的工作方式相同。

```cs
// C#

// 之前：
public float PlayerSpeed;

// 之后：
[JsonProperty("PlayerSpeed")]
public float Speed;
```

***

## 重构代码时移动字段或属性

在此示例中，资源有一个名为 `WalkableRadius` 的字段，但它被移除并重构为结构体 `SurfaceOptions`。通过添加属性，你可以使用其 setter 方法在反序列化时执行数据升级。将其设为 `private`，添加 `Serialize` 特性以便使用序列化，并标记为 `Obsolete` 以便不再保存。`ContentDeprecated.Mark` 可用于指示对象已从旧格式升级其数据，这将导致在编辑器中保存源资源。

# [C#](#tab/code-csharp)
```cs
// 之前：
public float WalkableRadius;

// 之后：
public struct SurfaceOptions
{
    public float WalkRadius;
}
public SurfaceOptions Surface;

[Serialize, Obsolete, NoUndo]
private float WalkableRadius
{
    get => throw new Exception();
    set
    {
        // 升级值
        Surface.WalkRadius = value;

#if FLAX_EDITOR
        // 将内容标记为已弃用（引擎将重新保存资源）
        ContentDeprecated.Mark();
#endif
    }
}
```
***

# [C++](#tab/code-cpp)

```cpp
#include "Engine/Content/Deprecated.h"

// 如果你的类型使用 API_AUTO_SERIALIZATION()，则添加已弃用属性升级器：
private:
API_PROPERTY(Attributes="Serialize, Obsolete, NoUndo") float GetWalkableRadius() const
{
    return Surface.WalkRadius;
}

API_PROPERTY(Attributes="Serialize, Obsolete, NoUndo") void SetWalkableRadius(float value)
{
    // 升级值
    Surface.WalkRadius = value;

    // 将内容标记为已弃用（引擎将重新保存资源）
    MARK_CONTENT_DEPRECATED();
}

// 如果你手动序列化类型，则在反序列化期间读取旧的 json 条目：
void MyType::Deserialize(DeserializeStream& stream, ISerializeModifier* modifier)
{
    const auto e = SERIALIZE_FIND_MEMBER(stream, "WalkableRadius");
    if (e != stream.MemberEnd())
        Serialization::Deserialize(e->value, Surface.WalkRadius, modifier);
    // ...然后反序列化其他属性/字段
}
```
***

## 序列化回调

Flax 支持序列化回调方法，可用于在序列化器进行序列化和反序列化之前和/或之后操作对象。这可以用于在版本更改后执行更高级的数据升级。请参阅 [C++](../cpp/serialization.md) 和 [C#](../serialization/index.md) 文档部分以了解更多信息。
