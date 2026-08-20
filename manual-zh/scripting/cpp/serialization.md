# Flax 中 C++ 的数据序列化

## ISerializable

`ISerializable` 是实现数据序列化的对象的接口。它包含 2 个方法：
* `virtual void Serialize(SerializeStream& stream, const void* otherObj)` - 将对象序列化到输出流，并与另一个对象实例（例如默认类对象）的值进行比较。如果 other 对象为 null，则序列化所有属性。
* `virtual void Deserialize(DeserializeStream& stream, ISerializeModifier* modifier)` - 从输入流反序列化对象。

在 C++ 脚本中，你可以使用 `API_AUTO_SERIALIZATION()` 宏来注入基于对象 `API_FIELDS()` 生成的自动数据序列化。或者，你也可以手动实现此接口，并使用 `Engine/Serialization/Serialization.h` 中的辅助宏和工具。

自动序列化与 [C# 序列化规则](../serialization/index.md) 匹配，其中所有公共属性和字段都被序列化。你可以通过使用标签来从序列化中排除或包含字段或属性：

```cpp
public:
    API_FIELD(Attributes="NoSerialize") float PublicVarNotSaved;

private:
    API_FIELD(Attributes="Serialize") float PrivateVarSaved;
```

***

## 序列化回调

Flax 支持序列化回调方法。回调可用于在序列化程序序列化和反序列化对象之前和/或之后操作对象。

* `OnSerializing`
* `OnSerialized`
* `OnDeserializing`
* `OnDeserialized`

示例：

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
        // 'context.Modifier->EngineBuild' 保存了所保存数据的引擎版本
    }

    API_FUNCTION(Attributes="OnDeserialized", Hidden)
    void OnDeserialized(const CallbackContext& context)
    {
        // 'context.Modifier->EngineBuild' 保存了所保存数据的引擎版本
    }
};
```

***

## Json

Flax 使用 [RapidJSON](https://rapidjson.org) 库将数据序列化为 *json* 格式。

示例：

```cpp
#include "Engine/Serialization/JsonWriters.h"
#include "Engine/Serialization/JsonSerializer.h"
#include "Engine/Platform/File.h"

rapidjson_flax::StringBuffer buffer;
// 此处也可使用 PrettyJsonWriter 以获得更好的 JSON 格式
CompactJsonWriter writer(buffer);
writer.StartObject();
object->Serialize(writer, nullptr);
writer.EndObject();
File::WriteAllBytes(TEXT("Output.json"), (byte*)buffer.GetString(), (int32)buffer.GetSize());

BytesContainer data;
File::ReadAllBytes(TEXT("Output.json"), data);
ISerializable::SerializeDocument document;
document.Parse(data.Get<char>(), data.Length());
if (!document.HasParseError())
    object->Deserialize(document, nullptr);
```

***

### 自定义类型

要为自定义原生类型或自定义数据容器实现数据序列化，请在 `Serialization` 命名空间中添加 3 个方法，如下例所示。它也可用于为模板类型定义特化实现。

```cpp
API_STRUCT(NoDefault) struct MyCustomNativeData
{
    // 结合 API_STRUCT(NoDefault)，此类型
    // 可用于脚本环境（C#、可视化脚本等）
    DECLARE_SCRIPTING_TYPE_STRUCTURE(MyCustomNativeData);
    // 使用 API_FIELD() 将所有字段暴露给脚本 API
    API_FIELD() Vector3 Direction;
    API_FIELD() float Length;
};

// C++ 不允许我们使用像 API_AUTO_SERIALIZATION(); 这样方便的东西为结构体实现自动序列化
// 因此在这种情况下，我们必须手动告诉它如何序列化和反序列化我们的数据。

#include "Engine/Serialization/Serialization.h"
namespace Serialization
{
    inline bool ShouldSerialize(const MyCustomNativeData& v, const void* otherObj)
    {
        // 这可以检测值是否与其他对象（如果不为 null）相同，并跳过序列化
        return true;
    }
    inline void Serialize(ISerializable::SerializeStream& stream, const MyCustomNativeData& v, const void* otherObj)
    {
        // 使用结构体数据填充流
        stream.StartObject();
        stream.JKEY("Direction");
        Serialize(stream, v.Direction, nullptr);
        stream.JKEY("Length");
        Serialize(stream, v.Length, nullptr);
        stream.EndObject();
    }
    inline void Deserialize(ISerializable::DeserializeStream& stream, MyCustomNativeData& v, ISerializeModifier* modifier)
    {
        // 使用流中的值填充数据
        DESERIALIZE_MEMBER(Direction, v.Direction);
        DESERIALIZE_MEMBER(Length, v.Length);
    }
}

// 如果你希望你的结构体与自动二进制序列化兼容（例如，如果你计划将结构体标记为 NetworkReplicated 标签，则需要此功能），
// 那么你也应该添加此模板。这有助于 Read/WriteStream 确定你的结构体使用哪种二进制序列化策略（在我们的例子中，我们希望它作为 POD 结构体）。

template<>
struct TIsPODType<MyCustomNativeData>
{
    enum { Value = true };
};
```

***

如果你的代码需要自动序列化自定义数据类型的字段或属性，但它不应暴露给脚本（因为它可能只用于 C++），请使用 `Hidden` 属性。

```cpp
API_FIELD(Hidden) float NativeOnlyVar;
```

***

## 流

Flax 包含用于稳健二进制数据序列化的内置文件和内存流。
* `MemoryReadStream` - 从内存读取
* `MemoryWriteStream` - 写入内存
* `FileReadStream` - 从文件读取（使用缓冲区以改善文件访问）
* `FileWriteStream` - 写入文件（使用缓冲区以改善文件访问）

所有类型都在 `Engine/Serialization/..` 中。
