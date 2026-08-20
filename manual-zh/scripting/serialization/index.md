# 脚本序列化

**脚本序列化** 是一项功能，允许将对象保存为可移植的数据格式。之后，这些数据可用于恢复对象的状态。它在加载场景、执行热重载或记录撤销操作时使用。

Flax 使用 **Json** 格式来存储脚本和对象状态。它是一种轻量级且非常标准化的格式。Flax C# API 包含内置的序列化和反序列化对象的方法，即使在运行时也可以使用。请参阅 [JsonSerializer](https://docs.flaxengine.com/api/FlaxEngine.Json.JsonSerializer.html) 类。在底层，Flax 使用自定义的 [Json.NET](https://github.com/JamesNK/Newtonsoft.Json)，这是一个流行的 .NET 高性能 JSON 框架。

## 序列化规则

Flax 在以下情况下会序列化对象的字段或属性：

* 它是 `public` 的，或者具有 [Serialize](https://docs.flaxengine.com/api/FlaxEngine.SerializeAttribute.html) 特性（继承的 `private` 成员不会被保存——但 `protected` 成员会被保存）
* 它没有 [NoSerialize](https://docs.flaxengine.com/api/FlaxEngine.NoSerializeAttribute.html) 特性
* 它不是 `static` 的
* 它不是 `readonly` 的
* 它不是 `const` 的
* 其类型可以被序列化

[此处](https://github.com/FlaxEngine/FlaxEngine/blob/master/Source/Engine/Serialization/JsonCustomSerializers/ExtendedDefaultContractResolver.cs) 你可以找到实现 Flax 使用的序列化规则的开源文件。

Flax 的反序列化更像是用数据“填充”现有对象，而不是“完全加载”。这减少了需要保存的数据量，并有助于更改字段和属性的默认值。

## 序列化提示

以下列出了关于 Flax 序列化的各种提示：

* 对场景对象（Actor、脚本）的引用被序列化为 `Guid`（十六进制格式，内联）。请参阅 [Object.ID](https://docs.flaxengine.com/api/FlaxEngine.Object.html#FlaxEngine_Object_ID)
* 编辑器使用默认的序列化规则进行撤销操作
* Flax 在调用加载对象的 `OnAwake`/`OnStart` 方法之前，反序列化所有子场景对象（父对象可能尚未反序列化）
* 避免自定义对象类型的递归引用。最好对场景对象使用循环引用
* 在执行代码重构时，请参阅[此教程](../advanced/refactoring-renaming.md)了解如何支持旧数据格式加载

### 枚举序列化

默认情况下，枚举值使用其持有的值序列化为普通整数。这对于单个值或标志组合来说效果很好，同时提供快速的序列化。然而，当在游戏开发过程中添加或移动枚举条目时，它们的值可能不稳定。对于这种情况，枚举类型可以标记为 `EnumString` 特性，该特性适用于 C# 和 C++ 枚举。

# [C#](#tab/code-csharp)
```cs
/// <summary>
/// 作为字符串序列化的基本枚举。
/// </summary>
[EnumString]
public enum TestEnumString
{
    /// <summary>
    /// 值 1
    /// </summary>
    Value1,

    /// <summary>
    /// 值 2
    /// </summary>
    Value2,

    /// <summary>
    /// 值 3
    /// </summary>
    Value3,
}
```
***

# [C++](#tab/code-cpp)

```cpp
// 作为字符串序列化的基本枚举。
API_ENUM(Attributes="EnumString")
enum class TestEnumString
{
    // 值 1
    Value1,
    // 值 2
    Value2,
    // 值 3
    Value3,
};
```
***

## 序列化回调

Flax 支持序列化回调方法。回调可用于在序列化器进行序列化和反序列化之前和/或之后操作对象。

* `OnSerializing`
* `OnSerialized`
* `OnDeserializing`
* `OnDeserialized`

示例：

# [C#](#tab/code-csharp)
```cs
using System.Runtime.Serialization;

public class MyScript : Script
{
    [OnSerializing]
    internal void OnSerializing(StreamingContext context)
    {
        Debug.Log("OnSerializing");
    }

    [OnSerialized]
    internal void OnSerialized(StreamingContext context)
    {
        Debug.Log("OnSerialized");
    }

    [OnDeserializing]
    internal void OnDeserializing(StreamingContext context)
    {
        Debug.Log("OnDeserializing");
    }

    [OnDeserialized]
    internal void OnDeserialized(StreamingContext context)
    {
        Debug.Log("OnDeserialized");
    }
}
```
***

# [C++](#tab/code-cpp)

```cpp
#include "Engine/Serialization/ISerializeModifier.h"

API_CLASS() class GAME_API MyScript : public Script
{
    API_AUTO_SERIALIZATION();
    DECLARE_SCENE_OBJECT(MyScript);

public:
    API_FUNCTION(Attributes="OnSerializing", Hidden)
    void OnSerializing(const CallbackContext& context)
    {
    }

    API_FUNCTION(Attributes="OnSerialized", Hidden)
    void OnSerialized(const CallbackContext& context)
    {
    }

    API_FUNCTION(Attributes="OnDeserializing", Hidden)
    void OnDeserializing(const CallbackContext& context)
    {
        // 'context.Modifier->EngineBuild' 保存了已保存数据的引擎版本
    }

    API_FUNCTION(Attributes="OnDeserialized", Hidden)
    void OnDeserialized(const CallbackContext& context)
    {
        // 'context.Modifier->EngineBuild' 保存了已保存数据的引擎版本
    }
};
```
***

## 原生 C++ 序列化

要了解有关 C++ 对象序列化的信息，请参阅相关文档[此处](../cpp/serialization.md)。
