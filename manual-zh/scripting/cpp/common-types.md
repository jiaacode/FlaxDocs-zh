# Flax 中 C++ 的常用类型

## String（字符串）

Flax 使用 `String` 类作为字符字符串容器，它保存一个以 null 结尾的文本，以 UTF-16 编码（作为 `Char` 类型，每个字符 2 字节），并提供丰富的字符串操作 API，例如拆分、格式化、合并等。

```cpp
#include "Engine/Core/Types/String.h"

String myText = TEXT("hello there"); // 来自常量的字符串
String substring = myText.Substring(0, 5);
String connected = myText + TEXT(" ") + substring; // 连接字符串
int32 length = connected.Length(); // 获取字符串长度
const Char* str = connected.Get(); // 获取字符串内存缓冲区
String objectName = this->ToString(); // 大多数 C++ 类型都实现了 ToString() 方法
String formatted = String::Format(TEXT("my custom message number {0}"), 11); // 像专业人士一样格式化字符串
LOG(Info, "Connected: {0}", connected); // 打印到日志
```

***

对于 ANSI 和 UTF-8 字符串，请使用 `StringAnsi`，它以 `char` 格式（每个字符 1 字节）保存字符。

要了解有关字符串格式化的更多信息，请参阅[此文档](string-formatting.md)。

## StringView（字符串视图）

`StringView` 保存有关文本的信息，不同之处在于它不像 `String` 那样在内部进行分配，而只是作为字符序列及其长度的视图提供。它不必以 null 结尾。它用于各种引擎 API 中，并从 String 或常量字符串隐式创建。

```cpp
#include "Engine/Core/Types/StringView.h"

StringView myText = TEXT("hello there"); // 来自常量的字符串视图
StringView fromStr = this->ToString(); // 来自字符串的字符串视图
LOG(Info, "Connected: {0}", myText); // 打印到日志
```

***

对于 ANSI 和 UTF-8 字符串，请使用 `StringAnsiView`，它使用 `char` 格式（每个字符 1 字节）的字符。

## StringBuilder（**字符串构建器**）

`StringBuilder` 就像 `String` 一样，不同之处在于它在底层使用可调整大小的 `Array`，以在生成长字符串时提供更好的性能（例如生成日志消息）。

```cpp
#include "Engine/Core/Types/StringBuilder.h"

StringBuilder sb;
sb.Append(TEXT("here")); // 将字符串附加到缓冲区
sb.Append(TEXT(" comes "));
sb.Append(11); // 基本类型的自动格式化
sb.AppendFormat(TEXT(" and {0}"), 12); // 附加格式化文本
String str = sb.ToString(); // 提取 String（或使用 ToStringView）
LOG(Info, "sb: {0}", str); // 打印到日志
```

***

## Variant（变体）

`Variant` 是一个多用途的值容器，适用于通用数据类型，包括：
* 基本类型（例如 `int`、`float`、`bool`）
* 常见类型（例如 `String`、`Guid`）
* 数学类型（例如 `Vector3`、`Transform`、`BoundingBox`）
* 集合（例如 `Array<>`、`Dictionary<>`）
* 对象引用（例如 `Asset*`、`Actor*`）
* 枚举类型（例如 `ShadowsCastingMode`）
* 结构类型（例如 `RayCastHit`）
* 原始数据（例如 `byte[]`）
* C# 对象引用（例如 `MonoObject*`）

它包含广泛的脚本 API，用于访问数据和查询值类型，包括转换和比较。它可以序列化为原始字节流或 json（并加载回来）。脚本 API 支持 C++ 中的 `Variant` 与 C# 中的 `object` 之间的自动转换。

```cpp
#include "Engine/Core/Types/Variant.h"

Variant myValue = 11; // 存储 int
LOG(Info, "Variant type: {0}, value: {1}", myValue.Type.ToString(), myValue.ToString());
float asFloat = (float)myValue;
myValue = Vector3(1, 2, 3); // 存储 Vector3
LOG(Info, "Variant type: {0}, value: {1}", myValue.Type.ToString(), myValue.ToString());
myValue = this; // 存储对象引用
LOG(Info, "Variant type: {0}, value: {1}", myValue.Type.ToString(), myValue.ToString());
```

***

## Guid（全局标识）

`Guid` 是 *全局唯一标识符*，使用 128 位编码一个旨在唯一的数字。GUID 用于对象标识——每个资源都有唯一的 ID，每个脚本对象也使用它。这允许通过 ID 而不是名称来引用对象和资源。这也意味着通过快速查找可以快速搜索对象。

```cpp
#include "Engine/Core/Types/Guid.h"

Guid objId = this->GetID(); // 获取此对象的 ID
auto obj = Scripting::FindObject<ScriptingObject>(objId); // 通过 ID 查找对象
LOG(Info, "id: {0}", objId); // 打印到日志
```

***

> [!Tip]
> Flax Guid 与 .Net Guid 使用不同的字符串表示。在 C# 中，使用 `FlaxEngine.Json.JsonSerializer.GetStringID(id)` 将 `System.Guid` 以 Flax 格式打印为字符串（并使用 `ParseID` 将其解析回来）。

## Nullable（可空）

对于可选值，请使用 `Nullable<>` 类型，它支持保存可以未定义（未指定）的值。

```cpp
#include "Engine/Core/Types/Nullable.h"

Nullable<int32> optionA;
LOG(Info, "Is Set? {0}", optionA.HasValue());
if (optionA.HasValue())
	LOG(Info, "Value {0}", optionA.GetValue());
optionA = 11;
LOG(Info, "Is Set? {0}", optionA.HasValue());
if (optionA.HasValue())
	LOG(Info, "Value {0}", optionA.GetValue());
```

***

## Pair（键值对）

`Pair<Key, Value>` 是一个将 *Key* 和 *Value* 包装在一起的结构，可用于轻松地将两个值连接在一起。工具方法 `ToPair` 将两个值转换为一个 pair 结构。

```cpp
#include "Engine/Core/Types/Pair.h"

Pair<int32, float> pair1(11, 200.0f);
int32 key = pair1.First;
float value = pair1.Second;
auto pair2 = ToPair(12, 230.0f);
```

***

## Span（跨度）

`Span<>` 是一个用于原始数据指针和数据长度的小容器。

```cpp
#include "Engine/Core/Types/Span.h"

byte rawData[] = { 1, 2, 3, 4, 5};
Span<byte> span1(rawData, ARRAY_COUNT(rawData));
byte* ptr = span1.Get(); // 内存指针
int32 length = span1.Length(); // 项目数量
```

***

## DataContainer（数据容器）

`DataContainer<>` 的工作方式类似于 `Span<>`，不同之处在于它可以包含自分配的内存块，并支持轻松的数据序列化和与其他类型的操作。可用于轻松管理内存中的原始数据。此外，`BytesContainer`（即 `DataContainer<byte>`）可用于保存纯字节数据。

```cpp
#include "Engine/Core/Types/DataContainer.h"

DataContainer<float> someFloats;
someFloats.Allocate(10); // 为 10 个浮点数分配内存
for (int32 i = 0; i < someFloats.Length(); i++)
	someFloats.Get()[i] = 11.0f;

byte rawData[] = { 1, 2, 3, 4, 5};
BytesContainer rawBytes;
rawBytes.Link(rawData, ARRAY_COUNT(rawData)); // 链接静态数据而不分配
rawBytes.Copy(rawData, ARRAY_COUNT(rawData)); // 将静态数据复制到自分配的内存中
```

***

## DateTime（时间日期）

要执行基于日期和日历的操作，请使用内置的 `DateTime` 类型，它包含许多功能，例如：日期数学运算和转换为字符串。它使用自 *公元 0001 年 1 月 1 日* 以来 100 纳秒分辨率的刻度来表示日期和时间。Flax 还支持访问本地时间和 UTC 时间的当前系统时间（在所有支持的平台上实现）。

```cpp
#include "Engine/Core/Types/DateTime.h"

DateTime currentDateTime = DateTime::Now();
LOG(Info, "Date and time: {0}", currentDateTime); // 打印到日志
int32 year = currentDateTime.GetYear();
int32 hour = currentDateTime.GetHour();
int32 minute = currentDateTime.GetMinute();
```

***

## TimeSpan（时间跨度）

`TimeSpan` 定义了两个时间点之间的差值。例如，它可以用于对 DateTime 执行数学运算，或在秒和毫秒之间进行转换。它为时间跨度计算提供了广泛的脚本 API。

```cpp
#include "Engine/Core/Types/TimeSpan.h"
#include "Engine/Core/Types/DateTime.h"

auto time1 = DateTime::Now();
Platform::Sleep(10);
auto time2 = DateTime::Now();
TimeSpan timeDiff = time2 - time1; // 计算时间差
LOG(Info, "Time diff: {0}", timeDiff); // 打印到日志
double miliseconds = timeDiff.GetTotalMilliseconds();
```

***

## Version（版本）

`Version` 表示由 *主版本*、*次版本*、*构建号* 和 *修订号* 组成的版本号。可以轻松地从字符串解析、比较或转换为字符串。

```cpp
#include "Engine/Core/Types/Version.h"

Version version1(1, 0);
Version version2(1, 3, 323, 15);
LOG(Info, "Version1: {0}", version1.ToString());
LOG(Info, "Version2: {0}", version2.ToString());
```

***
